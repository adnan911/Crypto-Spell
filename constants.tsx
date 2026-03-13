import React from 'react';
import { CryptoAsset, MarketTier, PopularityTier, Sector, Chain, LevelBand, LevelConfig, Era, VisualConfig } from './types';

// Enriched assets with metadata for Plan A
export const CRYPTO_ASSETS: CryptoAsset[] = [
  // Top 10 by market cap (Tier A)
  { id: '1', name: 'BITCOIN', symbol: 'BTC', color: '#F7931A', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.BITCOIN },
  { id: '2', name: 'ETHEREUM', symbol: 'ETH', color: '#627EEA', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.ETHEREUM },
  { id: '3', name: 'BINANCE', symbol: 'BNB', color: '#F3BA2F', tier: PopularityTier.A, sector: Sector.EXCHANGE, chain: Chain.BSC },
  { id: '4', name: 'SOLANA', symbol: 'SOL', color: '#14F195', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.SOLANA },
  { id: '5', name: 'RIPPLE', symbol: 'XRP', color: '#23292F', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.OTHER },
  { id: '6', name: 'CARDANO', symbol: 'ADA', color: '#0033AD', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.OTHER },
  { id: '7', name: 'AVALANCHE', symbol: 'AVAX', color: '#E84142', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.OTHER },
  { id: '8', name: 'DOGECOIN', symbol: 'DOGE', color: '#C2A633', tier: PopularityTier.A, sector: Sector.MEME, chain: Chain.OTHER },
  { id: '9', name: 'POLKADOT', symbol: 'DOT', color: '#E6007A', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.DOT },
  { id: '10', name: 'POLYGON', symbol: 'MATIC', color: '#8247E5', tier: PopularityTier.A, sector: Sector.L2, chain: Chain.ETHEREUM, legacyNames: ['MATIC'] },

  // Major altcoins (Tier B)
  { id: '11', name: 'CHAINLINK', symbol: 'LINK', color: '#2A5ADA', tier: PopularityTier.B, sector: Sector.ORACLE, chain: Chain.MULTICHAIN },
  { id: '12', name: 'LITECOIN', symbol: 'LTC', color: '#BFBBBB', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: '13', name: 'UNISWAP', symbol: 'UNI', color: '#FF007A', tier: PopularityTier.B, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: '14', name: 'STELLAR', symbol: 'XLM', color: '#14B6E7', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: '15', name: 'COSMOS', symbol: 'ATOM', color: '#2E3148', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.COSMOS },
  { id: '16', name: 'MONERO', symbol: 'XMR', color: '#FF6600', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: '17', name: 'FILECOIN', symbol: 'FIL', color: '#0090FF', tier: PopularityTier.B, sector: Sector.INFRA, chain: Chain.OTHER },
  { id: '18', name: 'TRON', symbol: 'TRX', color: '#FF0013', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: '19', name: 'AAVE', symbol: 'AAVE', color: '#B6509E', tier: PopularityTier.B, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: '20', name: 'ALGORAND', symbol: 'ALGO', color: '#000000', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'axs', name: 'AXIE INFINITY', symbol: 'AXS', color: '#0055D5', tier: PopularityTier.B, sector: Sector.GAMING, chain: Chain.ETHEREUM },

  // DeFi & Layer 2 (Tier B/C)
  { id: '21', name: 'FANTOM', symbol: 'FTM', color: '#1969FF', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: '22', name: 'MAKER', symbol: 'MKR', color: '#1AAB9B', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: '23', name: 'THETA', symbol: 'THETA', color: '#2AB8E6', tier: PopularityTier.C, sector: Sector.INFRA, chain: Chain.OTHER },
  { id: '24', name: 'TEZOS', symbol: 'XTZ', color: '#2C7DF7', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: '25', name: 'HEDERA', symbol: 'HBAR', color: '#000000', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: '26', name: 'SAND', symbol: 'SAND', color: '#00ADEF', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: '27', name: 'MANA', symbol: 'MANA', color: '#FF2D55', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: '28', name: 'KUSAMA', symbol: 'KSM', color: '#000000', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.DOT },
  { id: '29', name: 'ENJIN', symbol: 'ENJ', color: '#7866D5', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: '30', name: 'CHILIZ', symbol: 'CHZ', color: '#CD0124', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.OTHER },

  // More popular coins
  { id: '31', name: 'CURVE', symbol: 'CRV', color: '#FF6B6B', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: '32', name: 'COMPOUND', symbol: 'COMP', color: '#00D395', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: '33', name: 'SYNTHETIX', symbol: 'SNX', color: '#00D1FF', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: '34', name: 'SUSHI', symbol: 'SUSHI', color: '#FA52A0', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: '35', name: 'GRAPH', symbol: 'GRT', color: '#6747ED', tier: PopularityTier.C, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: '36', name: 'YEARN', symbol: 'YFI', color: '#006AE3', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'rpl', name: 'ROCKET POOL', symbol: 'RPL', color: '#FFAC59', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: '37', name: 'DASH', symbol: 'DASH', color: '#008CE7', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: '38', name: 'ZCASH', symbol: 'ZEC', color: '#ECB244', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: '40', name: 'WAVES', symbol: 'WAVES', color: '#0155FF', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },

  // Emerging & Trending
  { id: '41', name: 'NEAR', symbol: 'NEAR', color: '#000000', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: '42', name: 'FLOW', symbol: 'FLOW', color: '#00EF8B', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: '43', name: 'KAVA', symbol: 'KAVA', color: '#FF564F', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.COSMOS },
  { id: '44', name: 'CELO', symbol: 'CELO', color: '#35D07F', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: '45', name: 'ANKR', symbol: 'ANKR', color: '#2E6BED', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: '46', name: 'OCEAN', symbol: 'OCEAN', color: '#000000', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.ETHEREUM } as any, // Adding AI locally
  { id: '47', name: 'BAND', symbol: 'BAND', color: '#516AFF', tier: PopularityTier.D, sector: Sector.ORACLE, chain: Chain.COSMOS },
  { id: '48', name: 'IOTA', symbol: 'IOTA', color: '#242424', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: '49', name: 'QTUM', symbol: 'QTUM', color: '#2E9AD0', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: '50', name: 'RAVENCOIN', symbol: 'RVN', color: '#384182', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },

  // Meme & Community
  { id: '51', name: 'SHIBA', symbol: 'SHIB', color: '#FFA409', tier: PopularityTier.A, sector: Sector.MEME, chain: Chain.ETHEREUM },
  { id: '52', name: 'GALA', symbol: 'GALA', color: '#000000', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: '53', name: 'CAKE', symbol: 'CAKE', color: '#D1884F', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.BSC },
  { id: '54', name: 'LUNA', symbol: 'LUNA', color: '#172852', tier: PopularityTier.A, sector: Sector.L1, chain: Chain.OTHER, legacyNames: ['TERRA'] },
  { id: '55', name: 'NEO', symbol: 'NEO', color: '#00E599', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },

  // --- GENERATED ASSETS (Offline Batch) ---
  { id: 'usdt', name: 'TETHER', symbol: 'USDT', color: '#26A17B', tier: PopularityTier.A, sector: Sector.STABLECOIN, chain: Chain.MULTICHAIN },
  { id: 'usdc', name: 'USDC', symbol: 'USDC', color: '#2775CA', tier: PopularityTier.A, sector: Sector.STABLECOIN, chain: Chain.MULTICHAIN },
  { id: 'ton', name: 'TONCOIN', symbol: 'TON', color: '#0098EA', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'dai', name: 'DAI', symbol: 'DAI', color: '#F5AC37', tier: PopularityTier.B, sector: Sector.STABLECOIN, chain: Chain.ETHEREUM },
  { id: 'leo', name: 'LEO TOKEN', symbol: 'LEO', color: '#F7931A', tier: PopularityTier.C, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'okb', name: 'OKB', symbol: 'OKB', color: '#2D61AE', tier: PopularityTier.C, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'ldo', name: 'LIDO DAO', symbol: 'LDO', color: '#00A3FF', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'apt', name: 'APTOS', symbol: 'APT', color: '#2DD8A7', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'arb', name: 'ARBITRUM', symbol: 'ARB', color: '#2D374B', tier: PopularityTier.B, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'vet', name: 'VECHAIN', symbol: 'VET', color: '#15BDFF', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'qnt', name: 'QUANT', symbol: 'QNT', color: '#000000', tier: PopularityTier.C, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: 'op', name: 'OPTIMISM', symbol: 'OP', color: '#FF0420', tier: PopularityTier.C, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'imx', name: 'IMMUTABLE', symbol: 'IMX', color: '#0D0D0D', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'klay', name: 'KLAYTN', symbol: 'KLAY', color: '#FF3300', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'frx', name: 'FRAX SHARE', symbol: 'FXS', color: '#000000', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'cfx', name: 'CONFLUX', symbol: 'CFX', color: '#1E3DE4', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'gt', name: 'GATE TOKEN', symbol: 'GT', color: '#C63434', tier: PopularityTier.C, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'pepe', name: 'PEPE', symbol: 'PEPE', color: '#32CD32', tier: PopularityTier.C, sector: Sector.MEME, chain: Chain.ETHEREUM },
  { id: 'floki', name: 'FLOKI', symbol: 'FLOKI', color: '#FEF403', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.BSC },
  { id: 'xec', name: 'ECASH', symbol: 'XEC', color: '#212C42', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: '1inch', name: '1INCH', symbol: '1INCH', color: '#1B314F', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'rune', name: 'THORCHAIN', symbol: 'RUNE', color: '#33FF99', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.OTHER },
  { id: 'dydx', name: 'DYDX', symbol: 'DYDX', color: '#6966FF', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'cvx', name: 'CONVEX', symbol: 'CVX', color: '#FF5C28', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'zil', name: 'ZILLIQA', symbol: 'ZIL', color: '#49C1BF', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'gmx', name: 'GMX', symbol: 'GMX', color: '#2D42FC', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'woo', name: 'WOO NETWORK', symbol: 'WOO', color: '#000000', tier: PopularityTier.D, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'bat', name: 'BAT', symbol: 'BAT', color: '#FF5000', tier: PopularityTier.C, sector: Sector.INFRA, chain: Chain.ETHEREUM, aliases: ['BASIC ATTENTION'] },
  { id: 'ar', name: 'ARWEAVE', symbol: 'AR', color: '#222222', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.OTHER },
  { id: 'one', name: 'HARMONY', symbol: 'ONE', color: '#00AEE9', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'audio', name: 'AUDIUS', symbol: 'AUDIO', color: '#CC00FF', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.SOLANA },
  { id: 'hot', name: 'HOLO', symbol: 'HOT', color: '#00A6E3', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.OTHER },
  { id: 'glmr', name: 'MOONBEAM', symbol: 'GLMR', color: '#E1147B', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.DOT },
  { id: 'rose', name: 'OASIS NETWORK', symbol: 'ROSE', color: '#0057B8', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'fet', name: 'FETCH AI', symbol: 'FET', color: '#1E2336', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.ETHEREUM },
  { id: 'agix', name: 'SINGULARITY', symbol: 'AGIX', color: '#6816D3', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.ETHEREUM },
  { id: 'rndr', name: 'RENDER', symbol: 'RNDR', color: '#FF2E2E', tier: PopularityTier.C, sector: Sector.INFRA, chain: Chain.SOLANA },
  { id: 'ont', name: 'ONTOLOGY', symbol: 'ONT', color: '#32A4BE', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'omg', name: 'OMG NETWORK', symbol: 'OMG', color: '#101010', tier: PopularityTier.D, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'zrx', name: '0X', symbol: 'ZRX', color: '#000000', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: 'skl', name: 'SKALE', symbol: 'SKL', color: '#000000', tier: PopularityTier.D, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'waxp', name: 'WAX', symbol: 'WAXP', color: '#F08900', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.OTHER },
  { id: 'sc', name: 'SIACOIN', symbol: 'SC', color: '#00CBA0', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.OTHER },
  { id: 'gno', name: 'GNOSIS', symbol: 'GNO', color: '#001428', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: 'bal', name: 'BALANCER', symbol: 'BAL', color: '#1E1E1E', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'sxp', name: 'SOLAR', symbol: 'SXP', color: '#FD5621', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'kda', name: 'KADENA', symbol: 'KDA', color: '#ED098F', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'lsk', name: 'LISK', symbol: 'LSK', color: '#0D4EA0', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'nano', name: 'NANO', symbol: 'XNO', color: '#4A90E2', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'zen', name: 'HORIZEN', symbol: 'ZEN', color: '#041742', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'glm', name: 'GOLEM', symbol: 'GLM', color: '#181E6D', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: 'flux', name: 'FLUX', symbol: 'FLUX', color: '#2B61D1', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.OTHER },
  { id: 'sys', name: 'SYSCOIN', symbol: 'SYS', color: '#0082C6', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'hive', name: 'HIVE', symbol: 'HIVE', color: '#FF112D', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'steem', name: 'STEEM', symbol: 'STEEM', color: '#1A5099', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'strax', name: 'STRATIS', symbol: 'STRAX', color: '#118DFB', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'movr', name: 'MOONRIVER', symbol: 'MOVR', color: '#F2B705', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.DOT },
  { id: 'ckb', name: 'NERVOS', symbol: 'CKB', color: '#000000', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'uma', name: 'UMA', symbol: 'UMA', color: '#FF4A4A', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'pla', name: 'PLAYDAPP', symbol: 'PLA', color: '#1A1A1A', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'api3', name: 'API3', symbol: 'API3', color: '#000000', tier: PopularityTier.D, sector: Sector.ORACLE, chain: Chain.ETHEREUM },
  { id: 'rlc', name: 'IEXEC', symbol: 'RLC', color: '#FFD800', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: 'nmr', name: 'NUMERAIRE', symbol: 'NMR', color: '#000000', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.ETHEREUM },
  { id: 'storj', name: 'STORJ', symbol: 'STORJ', color: '#2683FF', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.ETHEREUM },
  { id: 'ogn', name: 'ORIGIN', symbol: 'OGN', color: '#1A82FF', tier: PopularityTier.D, sector: Sector.NFT, chain: Chain.ETHEREUM },

  // --- MEGA BATCH: DEFI, GAMING, AI, LEGACY (100+ More) ---
  { id: 'alpaca', name: 'ALPACA', symbol: 'ALPACA', color: '#F8B045', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.BSC },
  { id: 'baker', name: 'BAKERY', symbol: 'BAKE', color: '#E98858', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.BSC },
  { id: 'burger', name: 'BURGER', symbol: 'BURGER', color: '#E57E25', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.BSC },
  { id: 'cream', name: 'CREAM', symbol: 'CREAM', color: '#68E4D7', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'dodo', name: 'DODO', symbol: 'DODO', color: '#FAD42C', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'perp', name: 'PERPETUAL', symbol: 'PERP', color: '#1C9EA1', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'ray', name: 'RAYDIUM', symbol: 'RAY', color: '#3A2B89', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.SOLANA },
  { id: 'srm', name: 'SERUM', symbol: 'SRM', color: '#35AFBC', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.SOLANA },
  { id: 'orca', name: 'ORCA', symbol: 'ORCA', color: '#F7C334', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.SOLANA },
  { id: 'joe', name: 'TRADER JOE', symbol: 'JOE', color: '#D65C5C', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.OTHER },
  { id: 'lrc', name: 'LOOPRING', symbol: 'LRC', color: '#1C60FF', tier: PopularityTier.C, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'ren', name: 'REN', symbol: 'REN', color: '#002540', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.ETHEREUM },
  { id: 'knc', name: 'KYBER', symbol: 'KNC', color: '#31CB9E', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'bnt', name: 'BANCOR', symbol: 'BNT', color: '#0F2B56', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.ETHEREUM },
  { id: 'zks', name: 'ZKSWAP', symbol: 'ZKS', color: '#6079F5', tier: PopularityTier.D, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'mir', name: 'MIRROR', symbol: 'MIR', color: '#272F47', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.OTHER },
  { id: 'anc', name: 'ANCHOR', symbol: 'ANC', color: '#23C15D', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.OTHER },
  { id: 'jup', name: 'JUPITER', symbol: 'JUP', color: '#C2F348', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.SOLANA },
  { id: 'pyth', name: 'PYTH', symbol: 'PYTH', color: '#E6DAFE', tier: PopularityTier.C, sector: Sector.ORACLE, chain: Chain.SOLANA },
  { id: 'jto', name: 'JITO', symbol: 'JTO', color: '#6A9E8C', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.SOLANA },
  { id: 'bonk', name: 'BONK', symbol: 'BONK', color: '#E88B11', tier: PopularityTier.C, sector: Sector.MEME, chain: Chain.SOLANA },
  { id: 'wif', name: 'WIF', symbol: 'WIF', color: '#B6967A', tier: PopularityTier.C, sector: Sector.MEME, chain: Chain.SOLANA },
  { id: 'msol', name: 'MARINADE', symbol: 'MNDE', color: '#21C497', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.SOLANA },
  { id: 'hnt', name: 'HELIUM', symbol: 'HNT', color: '#3E4E98', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.SOLANA },
  { id: 'mobile', name: 'HELIUM MOBILE', symbol: 'MOBILE', color: '#0285C5', tier: PopularityTier.D, sector: Sector.INFRA, chain: Chain.SOLANA },

  // --- GAMING & METAVERSE ---
  { id: 'ilv', name: 'ILLUVIUM', symbol: 'ILV', color: '#3A1F6E', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'ghst', name: 'AAVEGOTCHI', symbol: 'GHST', color: '#C920FF', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.OTHER },
  { id: 'pyr', name: 'VULCAN FORGED', symbol: 'PYR', color: '#FF3300', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.OTHER },
  { id: 'gods', name: 'GODS UNCHAINED', symbol: 'GODS', color: '#F4CA6D', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'magic', name: 'MAGIC', symbol: 'MAGIC', color: '#6A41CC', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.OTHER },
  { id: 'atlas', name: 'STAR ATLAS', symbol: 'ATLAS', color: '#0979C3', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.SOLANA },
  { id: 'beam', name: 'BEAM', symbol: 'BEAM', color: '#00D1FF', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.OTHER },
  { id: 'bigtime', name: 'BIG TIME', symbol: 'BIGTIME', color: '#E8AA2D', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'pixel', name: 'PIXELS', symbol: 'PIXEL', color: '#27AE60', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'ron', name: 'RONIN', symbol: 'RON', color: '#1273EA', tier: PopularityTier.C, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'xai', name: 'XAI', symbol: 'XAI', color: '#FF2E2E', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.ETHEREUM },
  { id: 'ace', name: 'FUSIONIST', symbol: 'ACE', color: '#3C49F7', tier: PopularityTier.D, sector: Sector.GAMING, chain: Chain.BSC },
  
  // --- AI & BIG DATA ---
  { id: 'wld', name: 'WORLDCOIN', symbol: 'WLD', color: '#FFFFFF', tier: PopularityTier.C, sector: Sector.AI, chain: Chain.ETHEREUM },
  { id: 'tao', name: 'BITTENSOR', symbol: 'TAO', color: '#000000', tier: PopularityTier.C, sector: Sector.AI, chain: Chain.OTHER },
  { id: 'akt', name: 'AKASH', symbol: 'AKT', color: '#EC4C4C', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.COSMOS },
  { id: 'arkm', name: 'ARKHAM', symbol: 'ARKM', color: '#FFFFFF', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.ETHEREUM },
  { id: 'ctxc', name: 'CORTEX', symbol: 'CTXC', color: '#4585F6', tier: PopularityTier.D, sector: Sector.AI, chain: Chain.ETHEREUM },
  
  // --- OLD SCHOOL & CLASSICS ---
  { id: 'ppc', name: 'PEERCOIN', symbol: 'PPC', color: '#3CB054', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'nmc', name: 'NAMECOIN', symbol: 'NMC', color: '#186C9D', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'dgb', name: 'DIGIBYTE', symbol: 'DGB', color: '#0066CC', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'rdd', name: 'REDDCOIN', symbol: 'RDD', color: '#E11D2B', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.OTHER },
  { id: 'pot', name: 'POTCOIN', symbol: 'POT', color: '#154C22', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.OTHER },
  { id: 'nxs', name: 'NEXUS', symbol: 'NXS', color: '#0084B7', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'ark', name: 'ARK', symbol: 'ARK', color: '#C91B26', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'nxt', name: 'NXT', symbol: 'NXT', color: '#008FBB', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'ardr', name: 'ARDOR', symbol: 'ARDR', color: '#3C87C7', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'bts', name: 'BITSHARES', symbol: 'BTS', color: '#00A9E0', tier: PopularityTier.D, sector: Sector.DEX, chain: Chain.OTHER },
  
  // --- EXCHANGE TOKENS ---
  { id: 'kcs', name: 'KUCOIN', symbol: 'KCS', color: '#0093DD', tier: PopularityTier.C, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'ht', name: 'HUOBI', symbol: 'HT', color: '#2A55E6', tier: PopularityTier.C, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'mx', name: 'MX TOKEN', symbol: 'MX', color: '#10D179', tier: PopularityTier.D, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'bgb', name: 'BITGET', symbol: 'BGB', color: '#00F0FF', tier: PopularityTier.C, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  { id: 'cro', name: 'CRONOS', symbol: 'CRO', color: '#002D74', tier: PopularityTier.B, sector: Sector.EXCHANGE, chain: Chain.OTHER },
  
  // --- MEME COINS ---
  { id: 'myro', name: 'MYRO', symbol: 'MYRO', color: '#000000', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.SOLANA },
  { id: 'wen', name: 'WEN', symbol: 'WEN', color: '#FFFFFF', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.SOLANA },
  { id: 'coq', name: 'COQ INU', symbol: 'COQ', color: '#B6242B', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.OTHER },
  { id: 'mog', name: 'MOG COIN', symbol: 'MOG', color: '#FF0000', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.ETHEREUM },
  { id: 'ladys', name: 'LADYS', symbol: 'LADYS', color: '#000000', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.ETHEREUM },
  { id: 'aideoge', name: 'AIDOGE', symbol: 'AIDOGE', color: '#2B2B2B', tier: PopularityTier.D, sector: Sector.MEME, chain: Chain.OTHER },
  
  // --- LAYER 1 & 2 ---
  { id: 'metis', name: 'METIS', symbol: 'METIS', color: '#00D2FF', tier: PopularityTier.D, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'manta', name: 'MANTA', symbol: 'MANTA', color: '#FF6699', tier: PopularityTier.D, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'zk', name: 'ZKSYNC', symbol: 'ZK', color: '#1E2333', tier: PopularityTier.C, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'strk', name: 'STARKNET', symbol: 'STRK', color: '#2A0C43', tier: PopularityTier.C, sector: Sector.L2, chain: Chain.ETHEREUM },
  { id: 'tia', name: 'CELESTIA', symbol: 'TIA', color: '#7B2BF9', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.COSMOS },
  { id: 'sei', name: 'SEI', symbol: 'SEI', color: '#A1282D', tier: PopularityTier.C, sector: Sector.L1, chain: Chain.COSMOS },
  { id: 'inj', name: 'INJECTIVE', symbol: 'INJ', color: '#24E1E6', tier: PopularityTier.C, sector: Sector.DEFI, chain: Chain.COSMOS },
  { id: 'osmo', name: 'OSMOSIS', symbol: 'OSMO', color: '#7B04D6', tier: PopularityTier.C, sector: Sector.DEX, chain: Chain.COSMOS },
  { id: 'sui', name: 'SUI', symbol: 'SUI', color: '#4DA2FF', tier: PopularityTier.B, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'astr', name: 'ASTAR', symbol: 'ASTR', color: '#1B6DC1', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.DOT },
  { id: 'cfg', name: 'CENTRIFUGE', symbol: 'CFG', color: '#FBC02D', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.DOT },
  { id: 'aca', name: 'ACALA', symbol: 'ACA', color: '#FF3B30', tier: PopularityTier.D, sector: Sector.DEFI, chain: Chain.DOT },
  
  // --- PRIVACY ---
  { id: 'scrt', name: 'SECRET', symbol: 'SCRT', color: '#000000', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.COSMOS },
  { id: 'firo', name: 'FIRO', symbol: 'FIRO', color: '#D9232A', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
  { id: 'xvg', name: 'VERGE', symbol: 'XVG', color: '#00CBFF', tier: PopularityTier.D, sector: Sector.L1, chain: Chain.OTHER },
];

// Helper to determine band from level
export const getLevelBand = (level: number): LevelBand => {
  if (level <= 10) return LevelBand.BRONZE;
  if (level <= 20) return LevelBand.SILVER;
  if (level <= 30) return LevelBand.GOLD;
  if (level <= 40) return LevelBand.PLATINUM;
  if (level <= 50) return LevelBand.EMERALD;
  if (level <= 60) return LevelBand.DIAMOND;
  if (level <= 70) return LevelBand.MASTER;
  return LevelBand.GRANDMASTER;
};

// Plan B: Fast Progression Ranks
export const getLevelEra = (level: number): Era => {
  if (level <= 50) return Era.NOVICE;
  if (level <= 100) return Era.EXPLORER;
  if (level <= 150) return Era.TRADER;
  if (level <= 200) return Era.ANALYST;
  if (level <= 250) return Era.DIAMOND_HANDS;
  if (level <= 300) return Era.DEGEN;
  if (level <= 350) return Era.WHALE;
  if (level <= 400) return Era.ORACLE;
  if (level <= 450) return Era.CYBERPUNK;
  return Era.SATOSHI;
};

const getVisualConfig = (era: Era, level: number): VisualConfig => {
  const intensity = (level % 50) / 50; // 0.0 to 1.0 within era
  
  switch (era) {
    case Era.EXPLORER:
      return { era, filterClass: '', rotation: (level % 2 === 0 ? 1 : -1) * (intensity * 15), scale: 1, opacity: 1 };
    case Era.TRADER:
      return { era, filterClass: 'filter-pixelate', rotation: 0, scale: 1, opacity: 1 };
    case Era.ANALYST:
      return { era, filterClass: 'filter-glitch', rotation: 0, scale: 1, opacity: 1 };
    case Era.DIAMOND_HANDS:
      return { era, filterClass: 'filter-invert', rotation: 0, scale: 1, opacity: 1 };
    case Era.DEGEN:
      return { era, filterClass: 'filter-blur', rotation: 0, scale: 1, opacity: 1 };
    case Era.WHALE:
      return { era, filterClass: 'filter-silhouette', rotation: 0, scale: 1, opacity: 1 };
    case Era.ORACLE:
      return { era, filterClass: 'filter-glass', rotation: 0, scale: 1, opacity: 1 };
    case Era.CYBERPUNK:
      return { era, filterClass: '', rotation: 0, scale: 1 + (intensity * 0.5), opacity: 1 };
    case Era.SATOSHI:
      return { era, filterClass: 'filter-void', rotation: 0, scale: 1, opacity: 0.8 - (intensity * 0.8) }; // Fade out
    case Era.NOVICE:
    default:
      return { era, filterClass: '', rotation: 0, scale: 1, opacity: 1 };
  }
};

export const getLevelConfig = (level: number): LevelConfig => {
  const band = getLevelBand(level);
  const era = getLevelEra(level);
  
  // Algorithmic Difficulty
  const basePoints = 100 + (Math.floor(level / 10) * 10);
  const timer = Math.max(10, 30 - (Math.floor(level / 50) * 2)); // Drops 2s every era, min 10s
  
  // Visuals
  const visual = getVisualConfig(era, level);

  return {
    band,
    era,
    poolSize: 15, // STRICTLY 15 ALWAYS
    timer,
    basePoints,
    hideTimer: level > 300, 
    visual,
    allowPartials: level > 150, // Allow partial matching for harder levels
    isHardTimer: level > 100
  };
};

// Backward compatibility for visual themes
export const getTier = (level: number): MarketTier => {
  const band = getLevelBand(level);
  switch (band) {
    case LevelBand.BRONZE:
    case LevelBand.SILVER:
      return MarketTier.ACCUMULATION;
    case LevelBand.GOLD:
    case LevelBand.PLATINUM:
      return MarketTier.BULL_RUN;
    case LevelBand.EMERALD:
    case LevelBand.DIAMOND:
      return MarketTier.CORRECTION;
    case LevelBand.MASTER:
    case LevelBand.GRANDMASTER:
      return MarketTier.BLACK_SWAN;
    default:
      return MarketTier.ACCUMULATION;
  }
};

// Get real crypto logo as an image
export const getCryptoIcon = (symbol: string, size = 64) => {
  const sym = symbol.toLowerCase();
  const localLogo = `assets/logos/${sym}.png`;
  const apiLogo = `https://assets.coincap.io/assets/icons/${sym}@2x.png`;

  return (
    <img
      src={localLogo}
      alt={symbol}
      width={size}
      height={size}
      className="drop-shadow-lg"
      style={{ objectFit: 'contain' }}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        // If local fails, try API
        if (target.src.includes(localLogo)) {
          target.src = apiLogo;
        } else if (target.src.includes(apiLogo)) {
          // Both failed - show generic circle with symbol initial
          target.style.display = 'none';
          const parent = target.parentElement;
          if (parent) {
            // We can't easily add a sibling from here in a pure way without a wrapper component
            // but we can at least set a reliable generic fallback image
            target.src = 'https://assets.coincap.io/assets/icons/btc@2x.png'; // Still BTC for now but we've tried local/specific API first
            target.style.display = 'block';
            target.style.filter = 'grayscale(1) opacity(0.5)';
          }
        }
      }}
    />
  );
};
