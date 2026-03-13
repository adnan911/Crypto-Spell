import { CRYPTO_ASSETS, getLevelConfig as getConfigFromConst, getLevelBand } from '../constants';
import { CryptoAsset, ActiveGameState, HintType, LevelBand, PopularityTier, Sector } from '../types';

export const gameLogic = {
  // Get a random asset (TODO: Implement strict band-based filtering in Phase 3)
  // Get a random asset with Band-based filtering and Fairness Cooldown
  getRandomAsset: (level: number, excludeIds: string[] = [], recentIds: string[] = []): CryptoAsset => {
    const band = getLevelBand(level);

    // Band-based Tier Filtering
    let allowedTiers: PopularityTier[] = [];
    let allowedSectors: Sector[] | null = null; // null means all

    switch (band) {
      case LevelBand.BRONZE: // 1-10
        allowedTiers = [PopularityTier.A];
        break;
      case LevelBand.SILVER: // 11-20
      case LevelBand.GOLD: // 21-30
        allowedTiers = [PopularityTier.A, PopularityTier.B];
        break;
      case LevelBand.PLATINUM: // 31-40
      case LevelBand.EMERALD: // 41-50
        allowedTiers = [PopularityTier.B, PopularityTier.C];
        break;
      // You could add a Meme band check using level number, but since MEMES band is gone,
      // we'll let Master/Grandmaster pull from all tiers.
      default:
        allowedTiers = [PopularityTier.A, PopularityTier.B, PopularityTier.C, PopularityTier.D];
    }

    // Filter Candidates
    let candidates = CRYPTO_ASSETS.filter(a => {
      // Exclude explictly excluded types (if any)
      if (excludeIds.includes(a.id)) return false;

      // SAFETY: Exclude names longer than 15 chars for 15-grid
      // Use clean length (no spaces)
      if (a.name.replace(/[^A-Za-z0-9]/g, '').length > 15) return false;

      // Tier check
      if (allowedTiers.length > 0 && !allowedTiers.includes(a.tier)) return false;

      // Sector check
      if (allowedSectors && !allowedSectors.includes(a.sector)) return false;

      return true;
    });

    // Deck Shuffle Logic:
    // 1. Try to find candidates NOT in recentIds (which we treat as 'played' list)
    let freshCandidates = candidates.filter(a => !recentIds.includes(a.id));

    // 2. If we ran out of fresh candidates for this band (Depleted Pool), 
    //    we must recycling. In a real deck shuffle, we'd clear the memory.
    //    Here we just return to the full candidate pool.
    if (freshCandidates.length === 0) {
      // Option: we could signal to the App to clear history, but simpler is to just use full pool
      // and maybe keep just the very last 1 to avoid direct back-to-back.
      freshCandidates = candidates;

      // Anti-repeater (back-to-back) check if we just reshuffled
      if (freshCandidates.length > 1 && recentIds.length > 0) {
        freshCandidates = freshCandidates.filter(a => a.id !== recentIds[0]);
      }
    }

    // Ultimate fallback if still empty (shouldn't happen)
    if (freshCandidates.length === 0) freshCandidates = CRYPTO_ASSETS;

    return freshCandidates[Math.floor(Math.random() * freshCandidates.length)];
  },

  // Wrapper to get config
  getLevelConfig: (level: number) => {
    return getConfigFromConst(level);
  },

  // Helper to get the actual target word based on "8 letter" rule
  getTargetWord: (asset: CryptoAsset): string => {
    // If name length (including spaces) is > 8, use symbol
    return asset.name.length > 8 ? asset.symbol : asset.name;
  },

  // Helper to determine if input is a Rebrand (Legacy Name)
  isRebrand: (input: string, asset: CryptoAsset): boolean => {
    if (!asset.legacyNames) return false;
    return asset.legacyNames.some(legacy => legacy === input);
  },

  // Plan A: Anti-Tilt Logic (Levenshtein 1-edit distance)
  checkSubmission: (inputStr: string, asset: CryptoAsset): 'WIN' | 'REBRAND_WIN' | 'NEAR_MISS' | 'FAIL' => {
    const input = inputStr.toUpperCase().replace(/\s+/g, '');
    const targetWord = gameLogic.getTargetWord(asset);
    const target = targetWord.toUpperCase().replace(/\s+/g, '');

    // 1. Exact Match
    if (input === target) return 'WIN';

    // 2. Rebrand Match (Legacy)
    if (asset.legacyNames) {
      const isLegacyMatch = asset.legacyNames.some(legacy => legacy.toUpperCase().replace(/\s+/g, '') === input);
      if (isLegacyMatch) return 'REBRAND_WIN';
    }

    // 3. Near Miss Logic (Edit Distance <= 1)
    // Simple iterative Levenshtein for distance 1
    if (Math.abs(input.length - target.length) > 1) return 'FAIL';

    let diff = 0;
    let i = 0, j = 0;
    while (i < input.length && j < target.length) {
      if (input[i] !== target[j]) {
        diff++;
        if (diff > 1) return 'FAIL';
        // Advance logic based on length
        if (input.length > target.length) i++; // Deletion
        else if (input.length < target.length) j++; // Insertion
        else { i++; j++; } // Substitution
      } else {
        i++; j++;
      }
    }
    // Account for trailing char
    if (i < input.length || j < target.length) diff++;

    return diff <= 1 ? 'NEAR_MISS' : 'FAIL';
  },

  getConfusables: (char: string): string[] => {
    const map: Record<string, string[]> = {
      'O': ['0', 'Q', 'D'], '0': ['O'],
      'I': ['1', 'L'], '1': ['I'], 'L': ['I'],
      'M': ['N', 'W'], 'N': ['M'],
      'S': ['5', 'Z'], '5': ['S'],
      'B': ['8', 'P', 'R'], '8': ['B'],
      'E': ['F', '3'], '3': ['E'],
      'A': ['4', '@', 'V'],
      'T': ['7', 'Y'],
      'G': ['6', 'C'], 'C': ['G']
    };
    return map[char] || [];
  },

  generatePool: (word: string, level: number, legacyNames: string[] = []): string[] => {
    const config = getConfigFromConst(level);
    // Sanitize: Remove spaces and non-alphanumeric chars
    const cleanWord = word.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const letters = cleanWord.split('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const pool = [...letters];

    // Add Legacy letters if applicable (for Rebrand levels)
    if (legacyNames.length > 0 && Math.random() > 0.5) {
      const cleanLegacy = legacyNames[0].toUpperCase().replace(/[^A-Z0-9]/g, '');
      const legacyChars = cleanLegacy.split('');
      
      for (const c of legacyChars) {
        if (pool.length >= config.poolSize) break; // Strict cap
        if (!pool.includes(c)) pool.push(c);
      }
    }

    // Fill remaining spots
    while (pool.length < config.poolSize) {
      // Logic for Confusables in higher bands
      if (level > 25 && Math.random() > 0.7) {
        // Pick a random letter from the word and find a confusable
        const targetChar = letters[Math.floor(Math.random() * letters.length)];
        const confusables = gameLogic.getConfusables(targetChar);
        if (confusables.length > 0) {
          pool.push(confusables[Math.floor(Math.random() * confusables.length)]);
          continue;
        }
      }

      const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
      pool.push(randomChar);
    }

    return gameLogic.shuffle(pool);
  },

  shuffle: <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  },

  // Plan A Scoring Formula
  calculateScore: (
    level: number,
    timeMax: number,
    timeUsed: number,
    streak: number,
    hintsUsedCount: number,
    retries: number,
    isPerfect: boolean,
    wasNearMissSaved: boolean
  ): number => {
    const B = 100 + (8 * level); // Base points

    // Time Bonus (Max 40% of Base)
    let TimeBonus = 0;
    if (timeMax > 0 && timeUsed < timeMax) {
      const timeFraction = Math.max(0, (timeMax - timeUsed) / timeMax);
      TimeBonus = Math.round(0.4 * B * timeFraction);
    }

    // Perfect Bonus (25% of B)
    // Definition: First attempt (retries=0), no hints, no near-miss save, 
    // and if timer active, timeUsed <= 60% of timeMax (which means >40% time left)
    let PerfectBonus = 0;
    if (isPerfect) {
      // Double check time constraint if timer exists
      const isTimeValid = timeMax > 0 ? (timeUsed <= 0.6 * timeMax) : true;
      if (isTimeValid) {
        PerfectBonus = Math.round(0.25 * B);
      }
    }

    // Streak Multiplier (Max 1.5x)
    const StreakMult = 1 + (0.05 * Math.min(streak, 10));

    // Hint Penalties (Plan A: 10%, +18%, +28%...)
    // const HintPenalty = Math.round(B * (0.12 * hintsUsedCount)); // Old
    let hintPenaltyRate = 0;
    if (hintsUsedCount > 0) hintPenaltyRate += 0.10;
    if (hintsUsedCount > 1) hintPenaltyRate += 0.18;
    if (hintsUsedCount > 2) hintPenaltyRate += 0.28;
    // For 4+ hints, just add 28% each (or cap it). Let's keep adding 0.28 for simplicity or cap at 1.0
    if (hintsUsedCount > 3) hintPenaltyRate += (0.28 * (hintsUsedCount - 3));

    const HintPenalty = Math.round(B * hintPenaltyRate);

    // Retry Penalty (15% per retry)
    const RetryPenalty = Math.round(B * (0.15 * retries));

    // Typo Penalty (10% if saved by near-miss)
    const TypoPenalty = wasNearMissSaved ? Math.round(B * 0.10) : 0;

    // Final Calc
    let rawScore = B + TimeBonus + PerfectBonus - HintPenalty - RetryPenalty - TypoPenalty;
    rawScore = Math.max(0, rawScore); // No negative scores

    return Math.round(rawScore * StreakMult);
  },

  // Plan A Coin Earning Formula
  calculateCoinsEarned: (
    level: number,
    timeMax: number,
    timeUsed: number,
    streak: number,
    hintsUsedCount: number,
    retries: number,
    isPerfect: boolean
  ): number => {
    // Base: 30 + 3*L
    let base = 30 + (3 * level);

    // Flawless Bonus: +50%
    let flawlessBonus = 0;
    if (isPerfect) {
      flawlessBonus = Math.round(base * 0.5);
    }

    // Speed Bonus: +25% (if solved under 30% of total time)
    let speedBonus = 0;
    if (timeMax > 0 && timeUsed <= 0.3 * timeMax && isPerfect) {
      speedBonus = Math.round(base * 0.25);
    }

    // Streak Multiplier: Max 15 streak = Max 2.5x multiplier
    let streakMult = 1.0;
    if (streak > 0) {
      streakMult = 1.0 + (Math.min(streak, 15) * 0.1);
    }

    // Final calculation
    let rawScore = base + flawlessBonus + speedBonus;
    return Math.round(rawScore * streakMult);
  },

  // Plan A XP Formula
  calculateXP: (
    level: number,
    isPerfect: boolean,
    hintsUsedCount: number,
    retries: number
  ): number => {
    // XP = 20 + 2*L + 5*(Perfect?1:0) - 3*H - 2*R
    let xp = 20 + (2 * level);

    if (isPerfect) xp += 5;

    xp -= (3 * hintsUsedCount);
    xp -= (2 * retries);

    return Math.max(5, xp); // XP Floor of 5
  }
};
