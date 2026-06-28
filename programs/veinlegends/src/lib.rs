//! VeinLegends — Idle Mining Program
//!
//! Stake a character → accumulate $VEIN over time → claim
//! Mining rate depends on character stats stored in the stake account.

use anchor_lang::prelude::*;

declare_id!("F4BZLJ42GzmBPv8iCqQ5kiNa3VVREjABdYadKCGDV9Y8");

#[program]
pub mod veinlegends {
    use super::*;

    /// Initialize the global mining config (called once by admin)
    pub fn initialize_mining(
        ctx: Context<InitializeMining>,
        base_rate: u64,       // base VEIN per hour for 1 mining stat
        max_stake_slots: u8,  // max slots per user
        claim_cooldown_secs: i64,
    ) -> Result<()> {
        let config = &mut ctx.accounts.mining_config;
        config.authority = ctx.accounts.authority.key();
        config.base_rate = base_rate;
        config.max_stake_slots = max_stake_slots;
        config.claim_cooldown_secs = claim_cooldown_secs;
        config.total_staked = 0;
        config.total_claimed = 0;
        config.bump = ctx.bumps.mining_config;
        Ok(())
    }

    /// Stake a character to start mining VEIN
    pub fn stake_character(
        ctx: Context<StakeCharacter>,
        slot_index: u8,       // which slot (0-5)
        character_name: String, // character name (max 32 bytes)
        mining_stat: u8,      // 1-10
        rarity_multiplier: u8, // 100 = 1.0x, 200 = 2.0x (basis points)
        bloodline_bonus: u8,  // 100 = 1.0x, 150 = 1.5x (basis points)
    ) -> Result<()> {
        let stake = &mut ctx.accounts.stake_account;
        let config = &ctx.accounts.mining_config;
        let clock = Clock::get()?;

        // Validate slot index
        require!(slot_index < config.max_stake_slots, MiningError::InvalidSlot);

        // Calculate mining rate: base_rate * mining_stat * rarity * bloodline / 10000
        let effective_rate = config.base_rate
            .checked_mul(mining_stat as u64).unwrap()
            .checked_mul(rarity_multiplier as u64).unwrap()
            .checked_mul(bloodline_bonus as u64).unwrap()
            .checked_div(10000).unwrap();

        stake.owner = ctx.accounts.authority.key();
        stake.slot_index = slot_index;
        stake.character_name = character_name;
        stake.mining_stat = mining_stat;
        stake.rarity_multiplier = rarity_multiplier;
        stake.bloodline_bonus = bloodline_bonus;
        stake.effective_rate = effective_rate;
        stake.staked_at = clock.unix_timestamp;
        stake.last_claimed_at = clock.unix_timestamp;
        stake.accumulated_vein = 0;
        stake.total_claimed = 0;
        stake.active = true;
        stake.bump = ctx.bumps.stake_account;

        // Update global config
        let config_mut = &mut ctx.accounts.mining_config;
        config_mut.total_staked = config_mut.total_staked.checked_add(1).unwrap();

        msg!("Staked: {} | Rate: {} VEIN/hr | Slot: {}",
            stake.character_name, effective_rate, slot_index);
        Ok(())
    }

    /// Claim accumulated VEIN from a stake account
    pub fn claim_vein(ctx: Context<ClaimVein>) -> Result<()> {
        let stake = &mut ctx.accounts.stake_account;
        let clock = Clock::get()?;

        require!(stake.active, MiningError::NotActive);
        require!(stake.owner == ctx.accounts.authority.key(), MiningError::Unauthorized);

        // Calculate elapsed time in hours
        let elapsed_secs = clock.unix_timestamp
            .checked_sub(stake.last_claimed_at)
            .unwrap_or(0);
        let elapsed_hours = elapsed_secs as u64 / 3600;

        // Cap at 24 hours
        let capped_hours = elapsed_hours.min(24);

        // Accumulated = rate * hours
        let new_vein = stake.effective_rate
            .checked_mul(capped_hours)
            .unwrap();

        if new_vein > 0 {
            stake.accumulated_vein = stake.accumulated_vein.checked_add(new_vein).unwrap();
            stake.total_claimed = stake.total_claimed.checked_add(new_vein).unwrap();
            
            let config = &mut ctx.accounts.mining_config;
            config.total_claimed = config.total_claimed.checked_add(new_vein).unwrap();

            msg!("Claimed: {} VEIN ({} hrs elapsed)", new_vein, capped_hours);
        }

        stake.last_claimed_at = clock.unix_timestamp;
        Ok(())
    }

    /// Unstake a character (auto-claims before unstaking)
    pub fn unstake_character(ctx: Context<UnstakeCharacter>) -> Result<()> {
        let stake = &mut ctx.accounts.stake_account;
        
        require!(stake.active, MiningError::NotActive);
        require!(stake.owner == ctx.accounts.authority.key(), MiningError::Unauthorized);

        // Auto-claim remaining
        let clock = Clock::get()?;
        let elapsed_secs = clock.unix_timestamp
            .checked_sub(stake.last_claimed_at)
            .unwrap_or(0);
        let elapsed_hours = (elapsed_secs as u64 / 3600).min(24);
        let remaining = stake.effective_rate.checked_mul(elapsed_hours).unwrap();
        
        if remaining > 0 {
            stake.accumulated_vein = stake.accumulated_vein.checked_add(remaining).unwrap();
            stake.total_claimed = stake.total_claimed.checked_add(remaining).unwrap();
            
            let config = &mut ctx.accounts.mining_config;
            config.total_claimed = config.total_claimed.checked_add(remaining).unwrap();
        }

        stake.active = false;

        let config = &mut ctx.accounts.mining_config;
        config.total_staked = config.total_staked.checked_sub(1).unwrap();

        msg!("Unstaked: {} | Total claimed: {} VEIN",
            stake.character_name, stake.total_claimed);
        Ok(())
    }
}

// ============================================================
// ACCOUNTS
// ============================================================

#[derive(Accounts)]
pub struct InitializeMining<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + MiningConfig::LEN,
        seeds = [b"mining_config"],
        bump
    )]
    pub mining_config: Account<'info, MiningConfig>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(slot_index: u8, character_name: String, mining_stat: u8, rarity_multiplier: u8, bloodline_bonus: u8)]
pub struct StakeCharacter<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        seeds = [b"mining_config"],
        bump = mining_config.bump,
    )]
    pub mining_config: Account<'info, MiningConfig>,

    #[account(
        init,
        payer = authority,
        space = 8 + StakeAccount::LEN,
        seeds = [b"stake", authority.key().as_ref(), &[slot_index]],
        bump
    )]
    pub stake_account: Account<'info, StakeAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ClaimVein<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"mining_config"],
        bump = mining_config.bump,
    )]
    pub mining_config: Account<'info, MiningConfig>,

    #[account(
        mut,
        seeds = [b"stake", authority.key().as_ref(), &[stake_account.slot_index]],
        bump = stake_account.bump,
    )]
    pub stake_account: Account<'info, StakeAccount>,
}

#[derive(Accounts)]
pub struct UnstakeCharacter<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"mining_config"],
        bump = mining_config.bump,
    )]
    pub mining_config: Account<'info, MiningConfig>,

    #[account(
        mut,
        close = authority,
        seeds = [b"stake", authority.key().as_ref(), &[stake_account.slot_index]],
        bump = stake_account.bump,
    )]
    pub stake_account: Account<'info, StakeAccount>,
}

// ============================================================
// DATA STRUCTURES
// ============================================================

#[account]
pub struct MiningConfig {
    pub authority: Pubkey,
    pub base_rate: u64,             // VEIN/hr per mining stat point
    pub max_stake_slots: u8,
    pub claim_cooldown_secs: i64,
    pub total_staked: u64,
    pub total_claimed: u64,
    pub bump: u8,
}

impl MiningConfig {
    pub const LEN: usize = 32 + 8 + 1 + 8 + 8 + 8 + 1;
}

#[account]
pub struct StakeAccount {
    pub owner: Pubkey,
    pub slot_index: u8,
    pub character_name: String,      // max 32 bytes
    pub mining_stat: u8,
    pub rarity_multiplier: u8,       // basis points (100 = 1.0x)
    pub bloodline_bonus: u8,         // basis points (100 = 1.0x)
    pub effective_rate: u64,         // VEIN/hr
    pub staked_at: i64,
    pub last_claimed_at: i64,
    pub accumulated_vein: u64,
    pub total_claimed: u64,
    pub active: bool,
    pub bump: u8,
}

impl StakeAccount {
    pub const LEN: usize = 32 + 1 + (4 + 32) + 1 + 1 + 1 + 8 + 8 + 8 + 8 + 8 + 1 + 1;
}

// ============================================================
// ERRORS
// ============================================================

#[error_code]
pub enum MiningError {
    #[msg("Invalid slot index")]
    InvalidSlot,
    #[msg("Stake account is not active")]
    NotActive,
    #[msg("Unauthorized: not the owner")]
    Unauthorized,
    #[msg("Slot already occupied")]
    SlotOccupied,
    #[msg("Arithmetic overflow")]
    Overflow,
}
