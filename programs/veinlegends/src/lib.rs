//! VeinLegends Program Entry Point
//!
//! Web3 idle RPG on Solana — $VEIN utility token + $VLS governance
//! 6 Bloodlines: Delver, Ironblood, Forgeborn, Shadowvein, Stonewarden, Veinbender

use anchor_lang::prelude::*;

declare_id!("F4BZLJ42GzmBPv8iCqQ5kiNa3VVREjABdYadKCGDV9Y8");

#[program]
pub mod veinlegends {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("🩸 VeinLegends initialized — The Veins awaken!");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
