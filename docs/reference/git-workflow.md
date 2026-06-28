# Git Workflow Cheatsheet

**Project:** VeinLegends  
**Repo:** github.com/draycolix/veinlegends  
**Last updated:** 2026-06-27

---

## 🚀 Quick Start (Clone → Code → Push)

```bash
# Clone
git clone https://github.com/draycolix/veinlegends.git
cd veinlegends

# Bikin branch baru
git checkout -b feat/breeding-system

# Coding...

# Stage + commit
git add .
git commit -m "feat: add breeding instruction with genetic inheritance"

# Push
git push origin feat/breeding-system

# Buka PR di GitHub (manual atau via gh CLI)
gh pr create --title "feat: breeding system" --body "Breeding system with genetic inheritance and VRF RNG"
```

---

## 📝 Commit Message Convention

```
type: concise subject line (max 72 chars)

Optional body explaining what and why.
```

| Type | Kapan |
|---|---|
| `feat:` | Fitur baru |
| `fix:` | Bug fix |
| `refactor:` | Refactor code (no behavior change) |
| `docs:` | Dokumentasi |
| `chore:` | Build, config, dependency |
| `test:` | Test aja |
| `style:` | Format, whitespace (no code change) |

**Contoh:**
```
feat: add breed_characters instruction with VRF randomness

Implements the breeding system as defined in GDD v2.0.
- Gen 0-7 cap, 1.5x cost multiplier per generation
- 5% mutation chance
- Uses Switchboard VRF for provably fair genetic RNG
```

---

## 🌿 Branch Strategy

```
main                    ← production-ready
  └── develop           ← integration branch (opsional)
       ├── feat/xxx     ← fitur baru
       ├── fix/xxx      ← bug fix
       └── chore/xxx    ← config, build, docs
```

| Branch | Purpose |
|---|---|
| `main` | Production, selalu bisa di-deploy |
| `develop` | Development, merge feat/fix ke sini dulu |
| `feat/*` | Fitur: `feat/breeding`, `feat/card-battle` |
| `fix/*` | Bug fix: `fix/token-transfer` |
| `chore/*` | Chore: `chore/update-anchor-0.31` |

---

## 🧪 Daily Commands

### Status

```bash
git status                    # file changed
git status -s                 # compact
git diff                      # lihat perubahan (unstaged)
git diff --staged             # lihat perubahan (staged)
git log --oneline -10         # 10 commit terakhir
git log --oneline --graph     # graph visual
```

### Staging

```bash
git add <file>                # stage 1 file
git add programs/             # stage folder
git add -p                    # stage interaktif (pilih hunk)
git reset <file>              # unstage file
git checkout -- <file>        # buang perubahan (HATI-HATI)
```

### Commit

```bash
git commit -m "message"       # commit staged
git commit -am "message"      # stage all + commit (skip add)
git commit --amend            # edit commit terakhir
git commit --amend -m "new"   # ganti message commit terakhir
```

### Branch

```bash
git branch                        # lihat branch lokal
git branch -a                     # lihat semua (termasuk remote)
git checkout -b feat/baru         # bikin + switch
git switch feat/baru              # switch (Git 2.23+)
git branch -d feat/baru           # hapus branch lokal
git push origin --delete feat/x   # hapus branch remote
```

---

## 🔄 Sync & Merge

```bash
# Update dari remote
git fetch origin              # ambil update (tidak merge)
git pull origin main          # fetch + merge
git pull --rebase origin main # fetch + rebase (lebih bersih)

# Merge branch ke main
git checkout main
git merge feat/breeding
git push origin main

# Rebase branch (biar history rapi)
git checkout feat/breeding
git rebase main
# Kalau conflict: resolve → git add → git rebase --continue
# Kalau stuck: git rebase --abort
```

---

## ⏪ Undo / Recovery

```bash
# Undo commit terakhir (keep changes)
git reset --soft HEAD~1

# Undo commit + unstage (keep changes di filesystem)
git reset HEAD~1

# Undo commit + buang semua changes (HATI-HATI)
git reset --hard HEAD~1

# Revert commit tertentu (bikin commit baru)
git revert <commit-sha>

# Stash (simpan sementara)
git stash                     # simpan perubahan
git stash pop                 # ambil kembali
git stash list                # lihat daftar
git stash drop                # hapus stash terakhir
```

---

## 🐙 GitHub CLI (`gh`)

```bash
# Login (sekali aja)
gh auth login

# PR
gh pr create --title "feat: xxx" --body "deskripsi"
gh pr list                     # lihat PR open
gh pr view                     # lihat PR saat ini
gh pr checkout <number>        # checkout PR orang lain

# Issue
gh issue create --title "bug: xxx" --body "langkah reproduce"
gh issue list
gh issue view <number>

# Repo
gh repo view                    # info repo
gh repo clone draycolix/veinlegends
```

---

## 🏷️ Tag & Release

```bash
# Tag
git tag v0.1.0                 # bikin tag
git tag -a v1.0.0 -m "Mainnet launch"  # annotated tag
git push origin v0.1.0         # push tag
git push --tags                # push semua tag

# Release via gh
gh release create v0.1.0 --title "Pre-devnet" --notes "Initial scaffolding"
```

---

## 🔀 Resolve Conflict

```bash
# Saat merge/rebase conflict:
git status                     # lihat file conflict

# File conflict ada marker:
# <<<<<<< HEAD
# kode versi lo
# =======
# kode versi remote
# >>>>>>> feat/breeding

# Setelah resolve manual:
git add <file>
git commit                    # untuk merge
git rebase --continue         # untuk rebase

# Tools bantu:
git mergetool                 # buka visual diff tool
```

---

## 📋 .gitignore (Project Ini)

```gitignore
# Dependencies
node_modules/
target/

# Build
dist/
.next/
build/

# Env
.env
.env.local

# IDE
.vscode/
.idea/

# OS
Thumbs.db
.DS_Store

# Anchor
test-ledger/

# Keypair (JANGAN COMMIT!)
*.json  # exclude solana keypairs
!tsconfig.json
!package.json
!package-lock.json

# Log
*.log
```

---

## ⚠️ Yang Jangan Dilakuin

| ❌ Jangan | ✅ Lakukan |
|---|---|
| Commit file `.env` | `.gitignore` + `.env.example` |
| Commit keypair Solana | Simpan di `~/.config/solana/` |
| `git push --force` ke `main` | `git push --force-with-lease` |
| Commit langsung ke `main` | Selalu lewat branch + PR |
| Merge tanpa review | Minimal self-review PR |
| Commit besar (>500 lines) | Commit kecil per fitur |
| `git add .` asal | `git add -p` atau `git diff` dulu |

---

## 🔗 Reference

- [Oh Shit, Git!](https://ohshitgit.com/) — recovery dari kesalahan umum
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
