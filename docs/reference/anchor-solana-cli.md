# Anchor + Solana CLI Cheatsheet

**Project:** VeinLegends  
**Last updated:** 2026-06-27

---

## ⚡ Solana CLI — Perintah Dasar

### Config

```bash
solana config get                    # liat config saat ini
solana config set --url devnet       # switch ke devnet
solana config set --url localhost    # switch ke localnet
solana config set --url mainnet-beta # switch ke mainnet (HATI-HATI)
```

### Wallet / Keypair

```bash
solana-keygen new -o ~/my-keypair.json    # generate keypair baru
solana address                             # liat pubkey
solana balance                             # cek saldo
solana airdrop 2                           # devnet: minta 2 SOL
solana airdrop 5 <RECIPIENT>               # devnet: kirim ke wallet lain
```

### Transaction

```bash
solana transfer <RECIPIENT> 0.1 --allow-unfunded-recipient
solana transaction-history <ADDRESS> --limit 10
solana confirm <SIGNATURE>
```

### Program

```bash
solana program show <PROGRAM_ID>       # liat detail program
solana program deploy target/deploy/*.so  # deploy (OLD way)
solana program close <PROGRAM_ID>      # tutup program → refund rent
solana logs <PROGRAM_ID>               # streaming logs
solana logs --url devnet <PROGRAM_ID>  # logs di devnet
```

### Network

```bash
solana cluster-version        # versi cluster
solana epoch-info             # info epoch
solana validators             # daftar validator
solana ping                   # test latency ke cluster
```

---

## ⚓ Anchor CLI — Build, Deploy, Test

### Build

```bash
anchor build                          # build program (output: target/deploy/)
anchor build --provider.cluster devnet # build untuk devnet
anchor idl build                      # generate IDL dari program Rust
```

### Deploy

```bash
anchor deploy                                        # deploy ke network di Anchor.toml
anchor deploy --provider.cluster devnet              # deploy ke devnet
anchor upgrade target/deploy/veinlegends.so          # upgrade program (perlu upgrade authority)
anchor deploy --provider.cluster mainnet --program-key <PROGRAM_KEYPAIR>
```

### Test

```bash
anchor test                                          # build + deploy lokal + run test
anchor test --skip-build                             # skip build (kalau udah compiled)
anchor test --skip-deploy                            # skip deploy (kalau udah on-chain)
anchor test --provider.cluster devnet                # test di devnet
anchor run <script>                                  # run custom script dari Anchor.toml
```

### Key Management

```bash
anchor keys list                     # liat semua program ID yang aktif
anchor keys sync                     # sync program ID dari on-chain ke Anchor.toml
```

---

## 📁 Struktur Anchor Project

```
veinlegends/
├── Anchor.toml              # Anchor config (network, program IDs, scripts)
├── Cargo.toml               # Rust workspace
├── programs/
│   └── veinlegends/
│       ├── Cargo.toml       # Program dependencies
│       └── src/
│           ├── lib.rs       # Entry point, module declarations, #[program]
│           ├── state.rs     # Account struct definitions
│           ├── instructions.rs / # Instruction implementations
│           ├── constants.rs     # Magic numbers, seeds
│           └── errors.rs        # Custom error codes
├── tests/
│   └── veinlegends.ts       # Integration tests (TypeScript)
├── app/                     # Frontend (Next.js)
└── target/
    ├── deploy/              # Compiled .so files
    └── idl/                 # Generated IDL JSON
```

---

## 🔑 Anchor.toml Format

```toml
[features]
seeds = false                # true = generate PDA seeds in IDL
skip-lint = false

[programs.localnet]
veinlegends = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"

[programs.devnet]
veinlegends = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS"

[provider]
cluster = "devnet"           # localnet | devnet | mainnet
wallet = "~/.config/solana/id.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json tests/**/*.ts"
```

---

## 🧪 Anchor Test Pattern (TypeScript)

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Minelegends } from "../target/types/veinlegends";

describe("veinlegends", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Minelegends as Program<Minelegends>;

  it("forges a character", async () => {
    const tx = await program.methods
      .forgeCharacter("Warrior")
      .accounts({
        player: player.publicKey,
        character: characterPda,
        mint: mintPda,
      })
      .signers([player])
      .rpc();

    console.log("Tx:", tx);
  });
});
```

---

## 🐛 Debugging

```bash
# Lihat log program yang running
solana logs <PROGRAM_ID>

# Lihat log transaksi spesifik
solana logs <PROGRAM_ID> | grep <SIGNATURE>

# Anchor error codes
anchor idl parse --file target/idl/veinlegends.json

# Test satu file aja
anchor test --skip-build tests/veinlegends.ts

# Cek apakah program deployed
solana program show <PROGRAM_ID>
```

---

## 🚀 Quick Workflow (Devnet)

```bash
# 1. Build
anchor build

# 2. Cek saldo wallet (butuh SOL buat deploy ~2 SOL)
solana balance

# 3. Airdrop kalau kurang
solana airdrop 5

# 4. Deploy
anchor deploy --provider.cluster devnet

# 5. Test (kalau mau test on-chain)
anchor test --provider.cluster devnet --skip-build

# 6. Verify
solana program show <PROGRAM_ID>
```

---

## ⚠️ Pitfalls

| Masalah | Solusi |
|---|---|
| "account already in use" | Program ID collision. Generate baru: `anchor keys list` → check `declare_id!` |
| "insufficient funds" | Airdrop SOL di devnet, atau transfer di mainnet |
| "custom program error 0x0" | Check `errors.rs` — error code mapping |
| "failed to send transaction" | Network congested, retry atau naikin priority fee |
| PDA not found | Seed mismatch. Check `Pubkey::find_program_address([...])` |
| IDL sync issues | Run `anchor idl fetch <PROGRAM_ID>` lalu `anchor idl init` |
