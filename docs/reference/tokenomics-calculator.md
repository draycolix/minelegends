# Tokenomics Calculator — VeinLegends

**Last updated:** 2026-06-27

---

## 💰 Supply Overview

| Token | Ticker | Supply | Inflation |
|---|---|---|---|
| Utility | $VEIN | 1,000,000,000 | Fixed, halving every 2 years |
| Governance | $VLS | 100,000,000 | 2% / year via staking |

---

## 🔥 Burn Rate Per Action

| Action | Cost ($VEIN) | Burn % | Burned | Retained |
|---|---|---|---|---|
| Forge Common | 1,000 | 80% | 800 | 200 (treasury) |
| Forge Rare | 10,000 | 80% | 8,000 | 2,000 |
| Forge Epic | 50,000 | 80% | 40,000 | 10,000 |
| Forge Legendary | 100,000 | 80% | 80,000 | 20,000 |
| Breed (Gen 0×Gen 0) | 1,000 | 25% | 250 | 750 |
| Breed (Gen 1×Gen 1) | 1,500 | 25% | 375 | 1,125 |
| Breed (Gen 6×Gen 6) | 11,400 | 25% | 2,850 | 8,550 |
| PvP Battle Entry | 10–1,000 | 50% | 5–500 | 5–500 (winner) |
| Upgrade (Common, Lv10) | 100 | 60% | 60 | 40 |
| Upgrade (Legendary, Lv50) | 50,000 | 60% | 30,000 | 20,000 |
| Tournament (Daily) | 10 | 50% | 5 | 5 (prize pool) |
| Tournament (Monthly) | 200 | 50% | 100 | 100 (prize pool) |
| Marketplace Trade | 2% fee | 100% | fee | 0 |
| Stamina Refill | 10 | 100% | 10 | 0 |
| Custom Name | 1,000 | 100% | 1,000 | 0 |

---

## 🧬 Breeding Cost Per Generation

```
Base cost = 1,000 $VEIN + 500 ore
Multiplier per gen = 1.5^gen
```

| Gen | Parents | Multiplier | Cost ($VEIN) | Ore | Burn (25%) | Max Breeds/Parent |
|---|---|---|---|---|---|---|
| 0→1 | 2× Gen 0 | 1.0× | 1,000 | 500 | 250 | 7 |
| 1→2 | 2× Gen 1 | 1.5× | 1,500 | 500 | 375 | 5 |
| 2→3 | 2× Gen 2 | 2.25× | 2,250 | 500 | 563 | 4 |
| 3→4 | 2× Gen 3 | 3.375× | 3,375 | 500 | 844 | 3 |
| 4→5 | 2× Gen 4 | 5.0625× | 5,063 | 500 | 1,266 | 2 |
| 5→6 | 2× Gen 5 | 7.59375× | 7,594 | 500 | 1,899 | 1 |
| 6→7 | 2× Gen 6 | 11.39× | 11,391 | 500 | 2,848 | 1 |
| 7+ | Sterile | — | — | — | — | 0 |

---

## 📈 Emission Schedule ($VEIN)

Emission target: fill 1B cap over ~8 years.

| Year | Emission/Month | Cumulative Supply | Halving |
|---|---|---|---|
| Year 1 | 15M | 180M | × |
| Year 2 | 15M | 360M | × |
| Year 3 | 7.5M (halving) | 450M | ✅ |
| Year 4 | 7.5M | 540M | × |
| Year 5 | 3.75M (halving) | 585M | ✅ |
| Year 6 | 3.75M | 630M | × |
| Year 7 | 1.9M (halving) | 653M | ✅ |
| Year 8 | 1.9M | 676M | × |
| ... | ... | → 1B cap | |

**Note:** 60% burn keeps circulating supply much lower than total emission.

---

## 🎮 Simulation: 1 Player (Monthly)

| Activity | Frequency | $VEIN Earned | $VEIN Spent | Net |
|---|---|---|---|---|
| Idle mining (Rare = 30/hr) | 24/7 | 21,600 | 0 | +21,600 |
| Gem Rush (avg 30/run) | 4×/day | 3,600 | 0 | +3,600 |
| Daily login streak | 30× | 150 | 0 | +150 |
| PvP (20 stake, 50% win) | 10× | +100 | -200 | -100 |
| Forge 1 Rare character | 1× | 0 | -10,000 | -10,000 |
| Breed 1× (Gen 0×Gen 0) | 1× | 0 | -1,000 | -1,000 |
| Upgrade 2 char (Lv5→Lv10) | 2× | 0 | -1,500 | -1,500 |
| Tournament entry | 2× | 0 | -20 | -20 |
| Stamina refill | 4× | 0 | -40 | -40 |
| **TOTAL** | | **+25,450** | **-12,760** | **+12,690** |

Net positive: player accumulates $VEIN → encourages spending on forge/breed.

---

## 🔥 Burn Simulation (50K MAU)

| Action | Monthly Volume | $VEIN Burned | % of Total Burn |
|---|---|---|---|
| Forge characters | 100,000 | 3.2M | 52% |
| PvP battles | 500,000 | 1.5M | 24% |
| Breeding | 10,000 | 650K | 10% |
| Upgrades | 200,000 | 500K | 8% |
| Tournaments | 25,000 | 250K | 4% |
| Marketplace | 200,000 | 100K | 2% |
| Other sinks | — | 50K | 1% |
| **TOTAL** | | **6.25M/mo** | |

---

## 🧪 Quick Calc Formula

### Forge Cost
```
Forge_Cost = rarity_base[rarity]
burn = Forge_Cost × 0.8
treasury = Forge_Cost × 0.2
```

### Breed Cost
```
Breed_Cost = 1000 × 1.5^min(gen_a, gen_b)
burn = Breed_Cost × 0.25
```

### Battle Return
```
win = stake × 0.9
burn = stake × 0.5
treasury = stake × 0.5  // (50% ke winner pool, 50% dari treasury ke winner)
```

When you win:
```
You receive: opponent_stake × 0.9
Burned: opponent_stake × 0.1
You paid: your_stake (50% burn, 50% to winner pool)
Net = +opponent_stake × 0.9 - your_stake
```

---

## 📉 Deflationary Pressure Check

```
If Total_Earned > Total_Burned → INFLASI ❌
If Total_Earned < Total_Burned → DEFLASI ✅
```

At 50K MAU, estimated:
- Earned/month: ~75M $VEIN (mining + rewards)
- Burned/month: ~6.25M $VEIN
- Net: +68.75M $VEIN per month → inflasi di tahun awal ✅ (expected)

As emission drops (halving every 2 years) + burn grows with MAU:
- Year 3+: deflationary crossover point
- Year 5+: strong deflationary pressure

---

## 🔗 Related Docs
- `docs/game-design/GDD.md` — Full game design
- `docs/tokenomics/TOKENOMICS.md` — Detailed distribution
