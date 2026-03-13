## Assumptions and design goals (explicit)

* **Session length:** 2–5 minutes; average 6–10 attempts per session (depending on time pressure).
* **Core loop:** show logo (sometimes partial/obscured) → player types the project name → submit.
* **Input tolerance:** case-insensitive; whitespace/hyphen tolerant; supports common aliases; optional punctuation ignored.
* **Progression philosophy:** fair, predictable ramp; frustration is managed via retries, adaptive hints, and “near-miss” saves.
* **Content source:** curated list of crypto brands/logos with metadata (popularity tier, sector, chain/ecosystem, rebrands/aliases).

---

## 1) Level structure to 100 (bands, rules, mechanics)

### Band 1: Levels 1–10 — Onboarding (ultra-recognizable, clean logos)

**Logo difficulty rules**

* Full, high-contrast logos; no cropping, no color swaps.
* No similar-looking brands within the same level set.

**Spelling difficulty rules**

* 3–7 characters; common words; no tricky letter sequences.
* Accept brand + common casing variants (e.g., “Uniswap” vs “UNI” only if you decide ticker is valid—recommended: ticker is *not* a win condition).

**Time pressure**

* Optional timer introduced as “bonus only” (no fail on time), e.g., 20s soft timer.

**Distractors**

* None (pure free-typing).

**New mechanics introduced**

* Tutorial on case-insensitivity, spaces, “Close answer” feedback.
* First hint type unlock: **Reveal 1 Letter** (free once per level in this band).

---

### Band 2: Levels 11–25 — Common majors (top-of-mind, short names)

**Logo difficulty rules**

* Minor cropping (up to 15%); occasional monochrome silhouette.
* Light background changes.

**Spelling difficulty rules**

* 5–10 characters; one tricky letter per 3–4 levels (e.g., “Polygon”, “Avalanche”).
* Start introducing **two-word names** (e.g., “Bitcoin Cash”) but accept “BitcoinCash” (no space).

**Time pressure**

* Soft timer becomes meaningful: time bonus increases; no hard fail until level 21+.

**Distractors**

* Introduce **keyboard clutter** once every few levels: show 12-letter bank (optional mode) while still allowing typing.

**New mechanics introduced**

* Streaks and time bonus explained.
* Hint type unlock: **Show Ticker**.

---

### Band 3: Levels 26–40 — Ecosystem staples (DeFi/L2/infra; moderate ambiguity)

**Logo difficulty rules**

* Partial logo reveals (crop 25–35%), or blur edges slightly.
* Similar color palettes appear across levels (but avoid same-session collisions).

**Spelling difficulty rules**

* 8–14 characters; more compound names; double letters; “y/i” swaps, etc.
* Introduce **brand vs protocol** nuance (e.g., “Arbitrum”, “Optimism”, “Chainlink”).

**Time pressure**

* Hard timer begins on level 31: 25s baseline; failure possible on timeout.

**Distractors**

* Start including **2–3 “confusables”** in the same session pool (not same level) (e.g., L2 brands together).

**New mechanics introduced**

* “Near-miss” system (“You’re 1–2 edits away—use 1 hint to confirm”).
* Hint type unlock: **Remove Wrong Letters** (for letter-bank mode).

---

### Band 4: Levels 41–60 — Similar-logo zone + rebrands (memory and precision)

**Logo difficulty rules**

* Color removed 40% of the time (monochrome).
* Partial + rotated 10–15 degrees occasionally.
* Introduce “legacy logos” (pre-rebrand) with explicit rules.

**Spelling difficulty rules**

* 10–18 characters; hyphens/spaces; occasional punctuation ignored.
* Introduce **rebrand acceptance**: old name counts as correct when flagged in content metadata.

**Time pressure**

* 20–22s baseline; time bonus smaller to avoid punishing slower typers (focus shifts to accuracy).

**Distractors**

* Similar-sounding names appear (e.g., “Synthetix” vs “Synthetic” as a fake distractor—only if you use multiple choice/letter-bank).

**New mechanics introduced**

* “Brand education card” after clear: 1-line fact (category/chain) to reinforce learning.
* Hint type unlock: **Show Category** (DeFi/L2/NFT/Exchange/Infra/Meme).

---

### Band 5: Levels 61–75 — Long names + niche-but-known (advanced spelling)

**Logo difficulty rules**

* Heavier obstruction: 50% partials; pattern overlays; low-opacity watermark.
* Occasionally show **icon-only** when brand usually uses wordmark too.

**Spelling difficulty rules**

* 14–24 characters; multi-word names more common.
* Tricky sequences: “-swap”, “finance”, “protocol”, “dao” suffixes.

**Time pressure**

* Timer adaptive: baseline 22s, but increases +5s for names >18 chars (fairness rule).

**Distractors**

* Confusables by suffix/prefix (e.g., multiple “Swap” brands) but do not place near-identical brands back-to-back.

**New mechanics introduced**

* “Auto-space assist” (player can type without spaces; system normalizes).
* Hint type unlock: **Reveal Vowels** (reveals all vowels positions; powerful but costly).

---

### Band 6: Levels 76–85 — Memecoins + playful brands (high confusion, low spelling difficulty variance)

**Logo difficulty rules**

* Logos may include mascots; sometimes show **cropped mascot face** only.
* Background noise; comedic decoys (non-crypto images) used *sparingly* as “attention checks” (max 1 per 10 levels).

**Spelling difficulty rules**

* 4–12 characters but high similarity (e.g., themed animal coins).
* Accept common stylizations (e.g., repeated letters) only if officially used; otherwise require canonical spelling.

**Time pressure**

* Slightly lower timer (18–20s) because names are shorter; accuracy still matters.

**Distractors**

* Strongest confusable sets: dog/cat/frog themes.
* If player fails twice in a row, the game avoids same-theme for next attempt (anti-tilt).

**New mechanics introduced**

* “Combo save”: once per day, a failed level can be converted into a pass if the player is within near-miss threshold.

---

### Band 7: Levels 86–94 — Hard mode (obscured logos + precision spelling)

**Logo difficulty rules**

* Silhouette-only 40% of the time; partial + monochrome combos.
* Introduce “negative space” recognition (logo cutouts).

**Spelling difficulty rules**

* 12–26 characters; more uncommon letter pairs (x, z, y).
* Tighten alias acceptance (only top 1–2 common aliases).

**Time pressure**

* Hard timer 18–20s; adaptive +3–6s for long names.

**Distractors**

* If using letter-bank mode: 18–22 letters with 3–5 decoys.

**New mechanics introduced**

* “Two-step confirm” optional: player can spend 1 cheap hint to see ticker before final submit (reduces rage-quits).

---

### Band 8: Levels 95–100 — Mastery finals (boss levels + mixed mechanics)

**Logo difficulty rules**

* Boss levels at 95, 98, 100: multi-stage reveal (3 frames).
* Minimal cues; sometimes show only a portion of the mark.

**Spelling difficulty rules**

* Mix of long + tricky + rebrands.
* Require canonical project name (aliases accepted only if explicitly mapped).

**Time pressure**

* Boss: 3 attempts; timer per attempt; points scale per remaining attempts.

**Distractors**

* Highest confusable density across the whole game, but still fair: no “identical logo twins” in a single boss.

**New mechanics introduced**

* Mastery badge, endgame progression loop (daily challenge ladder).

---

### Level bands parameter table (single table as requested)

| Level Band         | Levels | Logo Difficulty       | Spelling Difficulty         | Time Pressure           | Distractors/Confusables    | New Mechanics                   |
| ------------------ | -----: | --------------------- | --------------------------- | ----------------------- | -------------------------- | ------------------------------- |
| Onboarding         |   1–10 | Full color, no crop   | 3–7 chars                   | Soft timer (bonus only) | None                       | Tutorial, Reveal 1 Letter       |
| Majors             |  11–25 | Light crop/mono       | 5–10 chars, some 2-word     | Soft → early hard       | Light letter-bank optional | Streaks, Show Ticker            |
| Staples            |  26–40 | Partial/blur          | 8–14 chars, tricky pairs    | Hard timer starts       | Session confusables        | Near-miss, Remove Wrong Letters |
| Similar + Rebrands |  41–60 | Mono/rotate/legacy    | 10–18 chars, rebrands       | 20–22s                  | Similar-sounding sets      | Category card, Show Category    |
| Long + Niche       |  61–75 | Obstruction/icon-only | 14–24 chars                 | Adaptive by length      | Prefix/suffix families     | Auto-space, Reveal Vowels       |
| Memecoins          |  76–85 | Mascot crops/noise    | 4–12 chars, high similarity | 18–20s                  | Theme-heavy confusables    | Daily combo save                |
| Hard Mode          |  86–94 | Silhouette/negative   | 12–26 chars                 | 18–20s adaptive         | Larger decoy banks         | Cheap confirm hint              |
| Finals             | 95–100 | Boss multi-frame      | Mixed + strict canonical    | Multi-attempt boss      | Highest fair density       | Badges, endgame loop            |

---

## 2) Points + XP (formulas + examples)

### Scoring components (plain-text formulas)

**Definitions**

* `L` = current level (1–100)
* `B` = base points for the level
* `Tmax` = time limit seconds (if applicable)
* `t` = seconds used (0..Tmax)
* `S` = current win streak count (consecutive first-try clears)
* `H` = number of hints used this round
* `R` = retry count on this level (0 for first attempt)
* `E` = edit distance between guess and correct (for typo handling)

#### Base points

* `B = 100 + 8*L`

  * Level 1: 108
  * Level 50: 500
  * Level 100: 900

#### Time bonus (only if timer is active; otherwise 0)

* `TimeBonus = round(0.4 * B * max(0, (Tmax - t)/Tmax))`

  * Max time bonus = 40% of base points.

#### Streak multiplier

* `StreakMult = 1 + 0.05 * min(S, 10)`

  * Caps at +50% for streaks ≥ 10.

#### Perfect-level bonus

* Perfect = first attempt, no hints, no near-miss assist, and `t <= 0.6*Tmax` when timer active.
* `PerfectBonus = 0.25 * B` if perfect else 0

#### Hint penalty

* `HintPenalty = B * (0.10*H1 + 0.18*H2 + 0.28*H3 + ...)`

  * Apply increasing marginal penalty per hint used in a single round.
  * Practically: first hint -10% of B, second additional -18%, third additional -28%.

#### Retry penalty

* `RetryPenalty = B * (0.15 * R)`

  * Encourages learning without making retries pointless.

#### Typo handling (anti-frustration)

* If `E <= 1` (one edit away) and time not expired: treat as “Close” and allow **one free resubmit** within 5 seconds (no penalty).
* If `E <= 2` and no resubmit: apply partial penalty:

  * `TypoPenalty = 0.10 * B`
* Otherwise `TypoPenalty = 0`

#### Total points

* `Points = round((B + TimeBonus + PerfectBonus - HintPenalty - RetryPenalty - TypoPenalty) * StreakMult)`
* Minimum floor: `Points >= 0` (never negative).

---

### XP formula (progression tuned separately from points)

* `XP = 20 + 2*L + 5*(Perfect?1:0) - 3*H - 2*R`
* XP floor: minimum 5 XP on a completed level (keeps progress moving).

---

### Example calculations (3 sample rounds)

#### Example A (Level 8, onboarding; no hard timer)

* `L=8 → B=100+8*8=164`
* Timer inactive → `TimeBonus=0`
* Streak `S=3 → StreakMult=1+0.05*3=1.15`
* No hints `H=0`, retry `R=0`, perfect (no timer but first try no hints) → `PerfectBonus=0.25*164=41`
* Points:

  * Raw = `164 + 0 + 41 = 205`
  * Final = `205 * 1.15 = 235.75 → 236`
* XP:

  * `XP=20+2*8 +5 -0 -0 = 41`

#### Example B (Level 37, hard timer; 1 hint; not perfect)

* `L=37 → B=100+8*37=396`
* `Tmax=25`, `t=18`
* `TimeBonus=0.4*396*((25-18)/25)=158.4*(7/25)=44.352 → 44`
* Streak `S=6 → StreakMult=1.30`
* Hints: `H=1 → HintPenalty=0.10*396=39.6 → 40`
* Retry `R=0`; typo penalty 0; perfect? no (hint used).
* Raw = `396 + 44 - 40 = 400`
* Final = `400 * 1.30 = 520`
* XP = `20+2*37 +0 -3*1 -0 = 91`

#### Example C (Level 92, hard mode; 2 retries; 2 hints; close-typo saved)

* `L=92 → B=100+8*92=836`
* `Tmax=20`, `t=19`
* `TimeBonus=0.4*836*((1)/20)=334.4*0.05=16.72 → 17`
* Streak `S=0 → StreakMult=1.0`
* Hints: 2 hints

  * HintPenalty = `0.10*836 + 0.18*836 = 83.6 + 150.48 = 234.08 → 234`
* Retries: `R=2 → RetryPenalty=0.15*836*2=250.8 → 251`
* Typo saved via free resubmit (E<=1) → `TypoPenalty=0`
* Raw = `836 + 17 - 234 - 251 = 368`
* Final = `368`
* XP = `20+2*92 -3*2 -2*2 = 20+184-6-4=194`

---

## 3) Hint system (types, costs, unlocks, scaling)

### Hint currency model

* Two currencies:

  * **Coins (soft):** earned frequently; used for light hints.
  * **Gems (hard):** earned sparingly; used for powerful hints or multi-hint bundles.

### Hint types (at least 5; here are 7)

1. **Reveal 1 Letter** (reveals a random unrevealed letter position)
2. **Reveal First + Last Letter** (two letters at once; strong early confirmer)
3. **Show Ticker** (e.g., BTC, ETH)
4. **Show Category** (Exchange / L1 / L2 / DeFi / NFT / Meme / Infra)
5. **Show Chain/Ecosystem** (Ethereum, Solana, Cosmos, etc., or “Multi-chain”)
6. **Remove Wrong Letters** (only in letter-bank mode; removes 4–8 decoys)
7. **Reveal Vowels** (reveals all vowels positions; very strong for long names)

### Unlock schedule (by level)

* Level 1: Reveal 1 Letter (free tutorial use)
* Level 12: Show Ticker
* Level 28: Remove Wrong Letters
* Level 45: Show Category
* Level 55: Reveal First + Last
* Level 65: Show Chain/Ecosystem
* Level 70: Reveal Vowels

### Costs (scale by level band)

Let `BandIndex` be 1..8 per table.

**Coins cost (soft hints)**

* Reveal 1 Letter: `Cost = 30 + 10*BandIndex`
* Show Ticker: `Cost = 60 + 15*BandIndex`
* Show Category: `Cost = 70 + 15*BandIndex`
* Remove Wrong Letters: `Cost = 80 + 20*BandIndex`

**Gems cost (power hints)**

* Reveal First + Last: `Cost = 1 + floor(BandIndex/3)` (1–3 gems)
* Show Chain/Ecosystem: `Cost = 2 + floor(BandIndex/3)` (2–4 gems)
* Reveal Vowels: `Cost = 3 + floor(BandIndex/2)` (3–7 gems)

### Daily free hints + earn options

* **Daily free:** 3 “Reveal 1 Letter” + 1 “Show Ticker” (refresh daily).
* **Ad/earn (optional, fair):**

  * Watch ad → +1 random soft hint (max 5/day).
  * Optional “hint mission” (play 5 rounds) → +2 soft hints.

### Scaling with level

* From level 41+, each hint use increases next hint cost in the same round by +20% (soft anti-spam).
* From level 76+, the game recommends *information hints* (ticker/category) before letter reveals (better learning, less brute force).

---

## 4) Earning & rewards (currencies, level-ups, milestones, comeback)

### Currencies

* **Coins (soft):** primary earn; spent on most hints and cosmetic UI unlocks (themes, frames).
* **Gems (hard):** premium; spent on strong hints, “boss safety net,” and streak protection.

### Earning sources

**Per-level**

* Win: `CoinsEarned = 20 + 2*L`
* Perfect: +`10 + L` coins
* Streak bonus: +`5 * min(S,10)` coins

**Missions (daily/weekly)**

* Daily: “Clear 10 logos” / “3 perfect rounds” / “No-hint run” → coins + small gems.
* Weekly: “Clear 60 logos” / “Beat 3 boss levels” → bigger gem reward.

**Achievements**

* Streak 5/10/20
* First time completing a band
* “No hint” clears in hard mode
* “Rebrand historian” (correctly answer legacy name)

### Level-up rewards

* Every level: small coin drip (already implicit in wins).
* Every 5 levels: **Hint bundle** (2 soft hints).
* Every 10 levels: **Gem payout** + cosmetic unlock token.

### Milestone rewards

* Levels 10, 25, 40, 60, 75, 85, 94, 100:

  * Coins lump sum (scaled), 3–10 gems, unique badge/title.

### Comeback mechanic for failed levels (anti-frustration)

* On failure, player earns **Learning Tokens**:

  * `LearningTokens += 1` per failed attempt, up to 3 per level.
* Spend 3 Learning Tokens to claim one of:

  * +1 free soft hint on next attempt, or
  * +5 seconds time extension once, or
  * “Show Ticker” free.
* Additionally: after **2 consecutive failures**, next attempt guarantees:

  * One extra partial reveal frame (logo clarity +10%) OR
  * Timer +5 seconds (whichever is more appropriate for that level’s difficulty).

---

## 5) Content & balancing (taxonomy + guardrails)

### Content taxonomy (tag every brand)

**Popularity tiers**

* Tier A: household crypto brands (BTC, ETH, Binance, etc.)
* Tier B: widely known ecosystem staples (major DeFi/L2/infra)
* Tier C: niche but recognizable (sector leaders, older projects)
* Tier D: deep cuts (used sparingly; mostly late game)

**Sector/category**

* L1 / L2 / DeFi / DEX / Lending / Derivatives / NFT / Gaming / Wallet / Exchange / Stablecoin / Infra / Oracle / Bridge / Meme

**Chain/ecosystem**

* Ethereum, Solana, Cosmos, Polkadot, BSC, Base, Arbitrum, Optimism, etc., plus “Multi-chain”.

**Name complexity**

* Length bucket (<=6, 7–10, 11–16, 17+)
* Tricky letter bucket (x/z/y, double consonants, “th”, “ch”, etc.)
* Multi-word / hyphenated / acronym-in-name

**Logo recognizability**

* Icon-only strong vs wordmark-dependent
* Color-dependent vs silhouette-readable

### Guardrails (quality and fairness)

* **Avoid brand confusion:** never place near-identical logos back-to-back; enforce a “confusable cooldown” of 3 levels.
* **Rebrands:** maintain `canonical_name`, `legacy_names[]`, `ticker[]`, and `valid_aliases[]`.

  * If content flagged as rebrand, accept both canonical and legacy for that level (unless it’s an explicit “rebrand challenge” level in late bands).
* **Aliases:** accept common abbreviations only if unambiguous and widely used (e.g., “BNB” is ticker; but win condition should be “Binance” unless you intentionally support ticker-as-answer mode).
* **Input normalization:** case-insensitive, trim whitespace, ignore punctuation like “.” “,” “’” “-” and treat multiple spaces as one.
* **Offensive / scam tokens:** exclude obvious scam/rug brands; keep content safe for broad audiences.
* **Localization (optional later):** keep canonical English names; allow localized keyboard input without penalizing diacritics (if any arise).

---

## 6) “Level 1–100 at a glance” milestones (mini-checklist)

| Milestone               |  Level(s) | What changes / unlocks                  | Player reward             |
| ----------------------- | --------: | --------------------------------------- | ------------------------- |
| First mastery step      |       1–3 | Tutorial + close-answer resubmit        | Free Reveal 1 Letter uses |
| Timer introduced (soft) |      4–10 | Time bonus only                         | +Coins ramp begins        |
| Ticker hint unlock      |        12 | Show Ticker available                   | +1 Gem                    |
| Hard timer starts       |        31 | Timeout can fail                        | +Cosmetic token           |
| Rebrands begin          |        41 | Legacy acceptance rules                 | +3 Gems                   |
| Category hint unlock    |        45 | Show Category                           | +Hint bundle              |
| Long-name fairness      |        61 | Adaptive timer by length                | +5 Gems                   |
| Memecoin confusion band |        76 | Theme confusables + combo save          | +Badge                    |
| Hard mode begins        |        86 | Silhouette-heavy                        | +7 Gems                   |
| Finals & bosses         | 95/98/100 | Multi-stage reveals, multi-attempt boss | Final badge + big payout  |

---

## Tuning knobs (8–12 variables to adjust in live balancing)

1. Base points growth rate (`B = 100 + 8*L`) coefficient.
2. Time bonus cap (currently 40% of B).
3. Streak multiplier slope and cap (currently +5% per streak up to 10).
4. Perfect bonus percentage (currently 25% of B).
5. Hint penalty curve (10%, +18%, +28%…) and/or per-hint scaling.
6. Retry penalty rate (currently 15% of B per retry).
7. Timer baselines per band and adaptive seconds per name length.
8. Daily free hint allotment and ad cap (if enabled).
9. Confusable cooldown length (currently 3 levels).
10. Near-miss thresholds (edit distance 1 free resubmit; 2 minor penalty).
11. Coin and gem earn rates (win, perfect, streak, missions).
12. Boss level attempt count and fail-safety conversion frequency (daily combo save limits).
