# Rust untuk Anchor Cheatsheet

**Project:** VeinLegends  
**Last updated:** 2026-06-27

---

## 📦 Entry Point: `lib.rs`

```rust
use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod veinlegends {
    use super::*;

    pub fn forge_character(ctx: Context<ForgeCharacter>, class: u8, name: String) -> Result<()> {
        let character = &mut ctx.accounts.character;
        character.owner = ctx.accounts.player.key();
        character.class = class;
        character.name = name;
        character.gen = 0; // Gen 0 = forged
        Ok(())
    }

    pub fn breed_characters(
        ctx: Context<BreedCharacters>,
        parent_a_stats: [u8; 4],
        parent_b_stats: [u8; 4],
    ) -> Result<()> {
        // ...
        Ok(())
    }
}
```

---

## 🧱 Account Struct: `state.rs`

### Basic Account

```rust
use anchor_lang::prelude::*;

#[account]
pub struct Character {
    pub owner: Pubkey,         // wallet yg punya
    pub class: u8,             // 0=Miner, 1=Warrior, 2=Forger, 3=Scout, 4=Guardian, 5=Alchemist
    pub name: String,          // max 32 bytes
    pub rarity: u8,            // 0=Common, 1=Rare, 2=Epic, 3=Legendary
    pub gen: u8,               // 0-7
    pub stats: [u8; 4],        // [STR, AGI, INT, LUCK]
    pub level: u8,
    pub xp: u64,
    pub last_breed: i64,       // unix timestamp
    pub breed_count: u8,
    pub mutation: Option<u8>,  // None = no mutation
    pub bump: u8,              // PDA bump
}
```

### Space Calculation

```rust
impl Character {
    pub const LEN: usize = 8 +  // discriminator
        32 +                     // owner (Pubkey)
        1 + 32 + 4 +             // name (String)
        1 +                      // class
        1 +                      // rarity
        1 +                      // gen
        4 +                      // stats [u8;4]
        1 +                      // level
        8 +                      // xp
        8 +                      // last_breed
        1 +                      // breed_count
        1 + 1 +                  // mutation (Option<u8>)
        1;                       // bump
}
```

---

## 📝 Instruction Context — `instructions.rs`

### PDA Derivation

```rust
#[derive(Accounts)]
pub struct ForgeCharacter<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        init,
        payer = player,
        space = Character::LEN,
        seeds = [b"character", player.key().as_ref(), &count.to_le_bytes()],
        bump
    )]
    pub character: Account<'info, Character>,

    pub system_program: Program<'info, System>,
}
```

### Seeds Pattern

```rust
// Single seed
seeds = [b"character", player.key().as_ref()]

// Multiple seeds with number
seeds = [b"character", player.key().as_ref(), &id.to_le_bytes()]

// Seed with string
seeds = [b"vault", token_mint.key().as_ref()]

// Seed with another account's key
seeds = [b"game_state", game.key().as_ref()]
```

---

## 🔒 Constraints Cheatsheet

| Constraint | Effect |
|---|---|
| `#[account(mut)]` | Account can be modified |
| `#[account(init, payer = X, space = N)]` | Create PDA, X pays rent |
| `#[account(close = destination)]` | Close account, send rent to destination |
| `#[account(has_one = owner)]` | Check owner field matches |
| `#[account(constraint = character.level < 50)]` | Custom validation |
| `#[account(address = PUBKEY)]` | Check exact address |
| `#[account(token::mint = mint)]` | Token mint check |
| `#[account(token::authority = owner)]` | Token auth check |

### Common Constraint Combos

```rust
#[account(
    init,
    payer = player,
    space = Character::LEN,
    seeds = [b"character", player.key().as_ref(), &id.to_le_bytes()],
    bump
)]
pub character: Account<'info, Character>,

#[account(
    mut,
    has_one = owner,
    constraint = character.gen < 7 @ ErrorCode::CharacterSterile,
)]
pub character: Account<'info, Character>,

#[account(
    mut,
    seeds = [b"vault"],
    bump,
)]
pub vault: SystemAccount<'info>,
```

---

## 🔢 CPI (Cross-Program Invocation)

### Token Transfer (SPL)

```rust
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

let cpi_ctx = CpiContext::new(
    ctx.accounts.token_program.to_account_info(),
    Transfer {
        from: ctx.accounts.from_token.to_account_info(),
        to: ctx.accounts.to_token.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    },
);
token::transfer(cpi_ctx, amount)?;
```

### PDA as Signer

```rust
let seeds = &[b"vault", &[ctx.bumps.vault]];
let signer_seeds = &[&seeds[..]];

let cpi_ctx = CpiContext::new_with_signer(
    ctx.accounts.token_program.to_account_info(),
    Transfer {
        from: ctx.accounts.vault_token.to_account_info(),
        to: ctx.accounts.destination.to_account_info(),
        authority: ctx.accounts.vault.to_account_info(),
    },
    signer_seeds,
);
token::transfer(cpi_ctx, amount)?;
```

---

## ❌ Error Codes — `errors.rs`

```rust
use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Character is sterile (Gen 7)")]
    CharacterSterile,           // 6000 (0x1770)

    #[msg("Breed cooldown not expired")]
    BreedCooldown,             // 6001

    #[msg("Not enough $VEIN")]
    InsufficientMNLG,          // 6002

    #[msg("Invalid class ID")]
    InvalidClass,              // 6003

    #[msg("Max breed count exceeded")]
    MaxBreedExceeded,          // 6004

    #[msg("Not the character owner")]
    NotOwner,                  // 6005

    #[msg("Invalid stats")]
    InvalidStats,              // 6006

    #[msg("Matchmaking failed")]
    MatchmakingFailed,         // 6007
}
```

**Error Code Formula:** Anchor assigns starting at `6000`.  
Client decode: `const base = 6000; const code = errorCode - base;`

---

## 📊 Event Emission

```rust
#[event]
pub struct CharacterForged {
    pub character: Pubkey,
    pub owner: Pubkey,
    pub class: u8,
    pub rarity: u8,
    pub gen: u8,
    pub stats: [u8; 4],
    pub timestamp: i64,
}

// Emit
emit!(CharacterForged {
    character: character.key(),
    owner: ctx.accounts.player.key(),
    class,
    rarity,
    gen: 0,
    stats,
    timestamp: Clock::get()?.unix_timestamp,
});
```

---

## 🧮 On-Chain RNG (Untuk Breeding)

### Switchboard VRF Pattern

```rust
use switchboard_solana::prelude::*;

#[derive(Accounts)]
pub struct RequestRandomness<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,
    // Switchboard accounts...
    pub switchboard_program: Program<'info, Switchboard>,
}

// Simpler: deterministic pseudo-RNG based on recent blockhash
fn pseudo_random(slot: u64, seed: u64) -> u8 {
    let hash = anchor_lang::solana_program::hash::hash(
        &[slot.to_le_bytes(), seed.to_le_bytes()].concat()
    );
    hash.to_bytes()[0]  // 0-255
}
```

---

## 🔁 Common Patterns

### Init if not exists OR mutate if exists

```rust
#[derive(Accounts)]
pub struct UpsertPlayer<'info> {
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        init_if_needed,
        payer = player,
        space = PlayerState::LEN,
        seeds = [b"player_state", player.key().as_ref()],
        bump,
    )]
    pub player_state: Account<'info, PlayerState>,

    pub system_program: Program<'info, System>,
}
```

### Multiple instructions in one transaction

```rust
// Anchor methods can be composed
let tx = program
    .methods
    .instruction1(args1)
    .accounts(accounts1)
    .instruction()
    .add(
        program
            .methods
            .instruction2(args2)
            .accounts(accounts2)
            .instruction()
    );

await provider.sendAndConfirm(tx);
```

### Read-Only Account

```rust
#[account(
    seeds = [b"config"],
    bump,
)]
pub config: Account<'info, GameConfig>,  // no #[account(mut)] = read-only
```

---

## 🧪 Unit Testing (Rust Native)

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_pseudo_random() {
        let result = pseudo_random(100, 42);
        assert!(result < 255);
    }
}
```

---

## ⚡ Performance Tips

| Tip | Detail |
|---|---|
| Minimize account size | `u8` over `u64` where possible |
| Pack booleans | Use bitflags instead of individual `bool` fields |
| Batch operations | One instruction = multiple state changes |
| Use `&mut` refs | Avoid `.clone()` on accounts |
| Compute budget | `compute_units` cap = 200K per tx in v1 |
