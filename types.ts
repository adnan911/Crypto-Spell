export enum GameState {
  STUDIO_SPLASH = 'STUDIO_SPLASH',
  SPLASH = 'SPLASH',
  LANDING = 'LANDING',
  PLAYING = 'PLAYING',
  COMPLETED_WORD = 'COMPLETED_WORD',
  GAME_OVER = 'GAME_OVER',
  DAILY_CHALLENGE = 'DAILY_CHALLENGE',
  META_SHOP = 'META_SHOP',
  SETTINGS = 'SETTINGS',
  NFT = 'NFT'
}

export enum Theme {
  MODERN = 'MODERN',
  BRUTALIST = 'BRUTALIST'
}

export enum MarketTier {
  ACCUMULATION = 'ACCUMULATION',
  BULL_RUN = 'BULL_RUN',
  CORRECTION = 'CORRECTION',
  BLACK_SWAN = 'BLACK_SWAN'
}

// Plan A: New Enums
export enum LevelBand {
  BRONZE = 'BRONZE',       // 1-10
  SILVER = 'SILVER',       // 11-20
  GOLD = 'GOLD',           // 21-30
  PLATINUM = 'PLATINUM',   // 31-40
  EMERALD = 'EMERALD',     // 41-50
  DIAMOND = 'DIAMOND',     // 51-60
  MASTER = 'MASTER',       // 61-70
  GRANDMASTER = 'GRANDMASTER' // 71+
}

export enum HintType {
  REVEAL_ONE = 'REVEAL_ONE',
  REVEAL_FIRST_LAST = 'REVEAL_FIRST_LAST',
  SHOW_TICKER = 'SHOW_TICKER',
  SHOW_CATEGORY = 'SHOW_CATEGORY',
  SHOW_CHAIN = 'SHOW_CHAIN',
  REMOVE_WRONG = 'REMOVE_WRONG',
  REVEAL_VOWELS = 'REVEAL_VOWELS',
  USE_SHORT_NAME = 'USE_SHORT_NAME'
}

export enum Currency {
  COINS = 'COINS'
}

export enum PopularityTier {
  A = 'Tier A', // Household
  B = 'Tier B', // Staples
  C = 'Tier C', // Niche
  D = 'Tier D'  // Deep cuts
}

export enum Sector {
  L1 = 'L1', L2 = 'L2', DEFI = 'DeFi', DEX = 'DEX',
  NFT = 'NFT', GAMING = 'Gaming', WALLET = 'Wallet',
  EXCHANGE = 'Exchange', INFRA = 'Infra', MEME = 'Meme',
  STABLECOIN = 'Stablecoin', ORACLE = 'Oracle', AI = 'AI'
}

export enum Chain {
  BITCOIN = 'Bitcoin', ETHEREUM = 'Ethereum', SOLANA = 'Solana',
  BSC = 'BSC', COSMOS = 'Cosmos', MULTICHAIN = 'Multi-chain',
  DOT = 'Polkadot', OTHER = 'Other'
}

export interface ScoreEntry {
  score: number;
  date: string;
}

export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  color: string;
  // Metadata for filtering/balancing
  tier: PopularityTier;
  sector: Sector;
  chain: Chain;
  aliases?: string[]; // e.g., ['UNI'] for Uniswap
  legacyNames?: string[]; // For rebrand levels
}

export interface GameSettings {
  soundEnabled: boolean;
  reducedMotion: boolean;
  theme: Theme;
}

export interface DailyMissionState {
  progress: number;
  isClaimed: boolean;
}

export interface ActiveGameState {
  stars: number;
  coins: number;
  // gems removed — coins-only economy
  level: number;
  xp: number;   // New progression
  streak: number;
  loginStreak: number;
  bestStreak: number;
  progressInLevel: number;
  totalInLevel: number;
  currentInput: (string | null)[];
  selectedSlotIndex: number | null;
  selectionPool: string[];
  // State for current round
  hintsUsed: HintType[];
  failedAttempts: number; // For retry penalty
  wasNearMissSaved?: boolean; // Track if current round was saved by near-miss logic (for penalty)
  consecutiveFailsOnLevel: number; // For adaptive difficulty (timer/clarity boost)

  // Anti-frustration
  learningTokens: number;

  // Persistence fields
  unlockedHints: HintType[];
  dailyHintCounts: {
    date: string;
    counts: Partial<Record<HintType, number>>;
  }; // Updated to track date for daily reset

  // Metagame
  milestonesClaimed: number[];
  totalPerfects: number;
  recentAssetIds: string[]; // For confusable cooldown
  unlockedKeyboards: string[];
  currentKeyboard: string | null;

  // Daily Missions
  dailyMissions: {
    date: string;
    missions: Record<string, DailyMissionState>;
    loginRewardClaimed: boolean;
    milestonesClaimed: number[]; // e.g. [1, 2, 3, 4] for the four chests
    completionHistory: { date: string; completed: boolean }[]; // Tracks last 7 days of full completions
  };
}

// Plan B: Fast Progression Ranks
export enum Era {
  NOVICE = 'NOVICE',               // 1-50: Clean
  EXPLORER = 'EXPLORER',           // 51-100: Rotation
  TRADER = 'TRADER',               // 101-150: Pixel
  ANALYST = 'ANALYST',             // 151-200: Glitch
  DIAMOND_HANDS = 'DIAMOND HANDS', // 201-250: Invert/Neon
  DEGEN = 'DEGEN',                 // 251-300: Blur/Frost
  WHALE = 'WHALE',                 // 301-350: Silhouette
  ORACLE = 'ORACLE',               // 351-400: Shatter (Puzzle?) or Glass
  CYBERPUNK = 'CYBERPUNK',         // 401-450: Zoom/Burn
  SATOSHI = 'SATOSHI'              // 451-500: Invisible/Void
}

export interface VisualConfig {
  era: Era;
  filterClass: string; // CSS class for filter
  rotation: number;    // Degrees
  scale: number;       // Zoom level
  opacity: number;     // For void/ghost
  overlay?: string;    // Special overlay (ice, fire, matrix)
}

export interface LevelConfig {
  band: LevelBand; // Kept for backward compatibility logic
  era: Era;        // New 500-level progression
  poolSize: number;
  timer: number;
  basePoints: number;
  hideTimer: boolean;
  visual: VisualConfig; // Visual mutation settings
  allowPartials: boolean; 
  isHardTimer: boolean;
}
