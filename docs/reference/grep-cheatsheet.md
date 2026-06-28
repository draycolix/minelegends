# Grep Cheatsheet — Cari di Folder Rekursif

**Created:** 2026-06-27 oleh Musya
**Path project:** `C:\project\veinlegends`

---

## ⚡ Satu Perintah

```bash
grep -rl "kata_kunci" /path/folder
```
- `-r` = recursive (telusuri subfolder)
- `-l` = hanya nama file

---

## Opsi Berguna

| Flag | Fungsi | Contoh |
|---|---|---|
| `-r` | Recursive subfolder | `grep -r "error" .` |
| `-l` | Hanya nama file | `grep -rl "TODO" ./src` |
| `-i` | Case-insensitive | `grep -rli "api_key" .` |
| `-n` | Nomor baris | `grep -rn "FIXME" .` |
| `-w` | Kata utuh | `grep -rw "port" .` |
| `-A 3` | 3 baris setelah | `grep -rA3 "Error" logs/` |
| `-B 2` | 2 baris sebelum | `grep -rB2 "panic" .` |
| `--include` | Filter extension | `grep -rl "MNLG" --include="*.rs" .` |
| `--exclude-dir` | Skip folder | `grep -rl "key" --exclude-dir=node_modules .` |

---

## Kombo Sering Dipakai

```bash
# Cari di file Rust
grep -rn "breed" --include="*.rs" programs/

# Skip node_modules + .git + target
grep -rl "solana" --exclude-dir={node_modules,.git,target} .

# Tampilkan nama file + isi + nomor baris
grep -rn "struct.*Character" programs/

# Hitung jumlah file yang match
grep -rl "TODO" . | wc -l

# Cari + buka di vim
vim $(grep -rl "config" --include="*.toml" .)
```

---

## Biar Ingat

```
-r   = masuk folder
-l   = nama file aja
-i   = gak peduli kapital
-n   = nomor baris
-w   = kata utuh
```
