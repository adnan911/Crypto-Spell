// Theme Engine - Dynamic Theme Definitions for CryptoSpell
// Each theme provides a complete visual identity

export enum ThemeId {
    DEFAULT = 'default',
    SOLARIS = 'solaris',
    NEON_DRIFT = 'neon_drift',
    MIDNIGHT = 'midnight',
    GLACIAL = 'glacial',
    VAPOR = 'vapor',
    CONSTRUCTIVIST = 'constructivist',
    DE_STIJL = 'de_stijl',
    POP_ART = 'pop_art',
    PSYCHEDELIC = 'psychedelic',
    RETRO_FUTURISM = 'retro_futurism',
    RUBY = 'ruby',
    TECHNO = 'techno',
    VOID = 'void'
}

export interface ThemeDefinition {
    id: ThemeId;
    name: string;
    description: string;
    price: number;
    icon: string;
    nftExclusive?: boolean;
    colors: {
        bgPrimary: string;
        bgSecondary: string;
        bgTertiary: string;
        accent1: string;
        accent2: string;
        accent3: string;
        text: string;
        textMuted: string;
        glass: string;
        glassBorder: string;
        glassAccent: string;
        glassAccentBorder: string;
    };
    gradients: {
        background: string;
        backgroundOverlay: string;
        button1: string;
        button2: string;
        button3: string;
        progress: string;
    };
    orbColors: {
        orb1: string;
        orb2: string;
        orb3Border: string;
        orb4Border: string;
    };
    confettiColors: string[];
    soundPitch: number;
    borderRadius: string;
    borderRadiusFull: string;
}

export const THEMES: Record<ThemeId, ThemeDefinition> = {
    [ThemeId.DEFAULT]: {
        id: ThemeId.DEFAULT,
        name: 'Cosmic Purple',
        description: 'Deep cosmic aesthetics with vibrant magentas.',
        price: 0,
        icon: '🌌',
        colors: {
            bgPrimary: '#0f0720',
            bgSecondary: '#1a0b35',
            bgTertiary: '#2d1255',
            accent1: '#ff00ff',
            accent2: '#00ffff',
            accent3: '#ff77ff',
            text: '#ffffff',
            textMuted: '#a088c5',
            glass: 'rgba(25, 10, 50, 0.4)',
            glassBorder: 'rgba(255, 0, 255, 0.2)',
            glassAccent: 'rgba(255, 0, 255, 0.1)',
            glassAccentBorder: 'rgba(255, 0, 255, 0.4)',
        },
        gradients: {
            background: 'radial-gradient(circle at top right, #1a0b35 0%, #0f0720 100%)',
            backgroundOverlay: 'linear-gradient(180deg, rgba(15, 7, 32, 0) 0%, rgba(15, 7, 32, 0.8) 100%)',
            button1: 'linear-gradient(135deg, #ff00ff 0%, #7700ff 100%)',
            button2: 'linear-gradient(135deg, #00ffff 0%, #0077ff 100%)',
            button3: 'linear-gradient(135deg, #ff00ff 0%, #00ffff 100%)',
            progress: 'linear-gradient(90deg, #ff00ff, #00ffff)',
        },
        orbColors: {
            orb1: 'rgba(255, 0, 255, 0.2)',
            orb2: 'rgba(0, 255, 255, 0.15)',
            orb3Border: 'rgba(255, 0, 255, 0.3)',
            orb4Border: 'rgba(0, 255, 255, 0.2)',
        },
        confettiColors: ['#ff00ff', '#00ffff', '#7700ff'],
        soundPitch: 1.0,
        borderRadius: '16px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.SOLARIS]: {
        id: ThemeId.SOLARIS,
        name: 'Solaris Gold',
        description: 'Elite amber glow with liquid gold accents.',
        price: 1500,
        icon: '☀️',
        colors: {
            bgPrimary: '#1a1200',
            bgSecondary: '#2d1f00',
            bgTertiary: '#453200',
            accent1: '#ffbf00',
            accent2: '#ff8c00',
            accent3: '#ffd700',
            text: '#ffffff',
            textMuted: '#b59b5d',
            glass: 'rgba(45, 31, 0, 0.5)',
            glassBorder: 'rgba(255, 191, 0, 0.2)',
            glassAccent: 'rgba(255, 191, 0, 0.1)',
            glassAccentBorder: 'rgba(255, 191, 0, 0.5)',
        },
        gradients: {
            background: 'radial-gradient(circle at center, #2d1f00 0%, #1a1200 100%)',
            backgroundOverlay: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))',
            button1: 'linear-gradient(135deg, #ffbf00 0%, #b8860b 100%)',
            button2: 'linear-gradient(135deg, #ff8c00 0%, #ff4500 100%)',
            button3: 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)',
            progress: 'linear-gradient(90deg, #ffbf00, #ff8c00)',
        },
        orbColors: {
            orb1: 'rgba(255, 191, 0, 0.2)',
            orb2: 'rgba(255, 140, 0, 0.15)',
            orb3Border: 'rgba(255, 215, 0, 0.3)',
            orb4Border: 'rgba(184, 134, 11, 0.2)',
        },
        confettiColors: ['#ffbf00', '#ff8c00', '#ffd700'],
        soundPitch: 0.95,
        borderRadius: '20px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.NEON_DRIFT]: {
        id: ThemeId.NEON_DRIFT,
        name: 'Neon Drift',
        description: 'Hyper-saturated cyberpunk nightlife vibes.',
        price: 3000,
        icon: '🏎️',
        colors: {
            bgPrimary: '#050510',
            bgSecondary: '#101030',
            bgTertiary: '#1a1a4a',
            accent1: '#ff0055',
            accent2: '#00ffcc',
            accent3: '#7700ff',
            text: '#ffffff',
            textMuted: '#8899cc',
            glass: 'rgba(10, 10, 40, 0.6)',
            glassBorder: 'rgba(255, 0, 85, 0.3)',
            glassAccent: 'rgba(0, 255, 204, 0.1)',
            glassAccentBorder: 'rgba(0, 255, 204, 0.5)',
        },
        gradients: {
            background: 'linear-gradient(180deg, #050510 0%, #101030 100%)',
            backgroundOverlay: 'repeating-linear-gradient(0deg, transparent 0%, rgba(0,255,204,0.02) 1px, transparent 2px)',
            button1: 'linear-gradient(135deg, #ff0055 0%, #880055 100%)',
            button2: 'linear-gradient(135deg, #00ffcc 0%, #0088aa 100%)',
            button3: 'linear-gradient(135deg, #7700ff 0%, #ff0055 100%)',
            progress: 'linear-gradient(90deg, #ff0055, #00ffcc, #7700ff)',
        },
        orbColors: {
            orb1: 'rgba(255, 0, 85, 0.3)',
            orb2: 'rgba(0, 255, 204, 0.2)',
            orb3Border: 'rgba(119, 0, 255, 0.4)',
            orb4Border: 'rgba(255, 0, 85, 0.2)',
        },
        confettiColors: ['#ff0055', '#00ffcc', '#7700ff'],
        soundPitch: 1.1,
        borderRadius: '4px',
        borderRadiusFull: '0px',
    },

    [ThemeId.MIDNIGHT]: {
        id: ThemeId.MIDNIGHT,
        name: 'Midnight Stealth',
        description: 'Tactical matte black with radioactive green.',
        price: 5000,
        icon: '🥷',
        colors: {
            bgPrimary: '#0a0a0a',
            bgSecondary: '#141414',
            bgTertiary: '#1f1f1f',
            accent1: '#39ff14',
            accent2: '#00ff41',
            accent3: '#1a1a1a',
            text: '#e0e0e0',
            textMuted: '#666666',
            glass: 'rgba(20, 20, 20, 0.8)',
            glassBorder: 'rgba(57, 255, 20, 0.1)',
            glassAccent: 'rgba(57, 255, 20, 0.05)',
            glassAccentBorder: 'rgba(57, 255, 20, 0.4)',
        },
        gradients: {
            background: 'linear-gradient(to bottom, #141414, #0a0a0a)',
            backgroundOverlay: 'linear-gradient(to right, rgba(57,255,20,0.02) 1px, transparent 1px)',
            button1: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            button2: 'linear-gradient(135deg, #39ff14 0%, #1a9900 100%)',
            button3: 'linear-gradient(135deg, #222 0%, #111 100%)',
            progress: 'linear-gradient(90deg, #0a0a0a, #39ff14)',
        },
        orbColors: {
            orb1: 'rgba(57, 255, 20, 0.1)',
            orb2: 'rgba(0, 0, 0, 0.5)',
            orb3Border: 'rgba(57, 255, 20, 0.2)',
            orb4Border: 'rgba(255, 255, 255, 0.05)',
        },
        confettiColors: ['#39ff14', '#00ff41', '#1a1a1a'],
        soundPitch: 0.85,
        borderRadius: '2px',
        borderRadiusFull: '4px',
    },

    [ThemeId.GLACIAL]: {
        id: ThemeId.GLACIAL,
        name: 'Ice Glacial',
        description: 'Frozen glass aesthetics with arctic clarity.',
        price: 8000,
        icon: '🧊',
        colors: {
            bgPrimary: '#f0faff',
            bgSecondary: '#e0f4ff',
            bgTertiary: '#d1edff',
            accent1: '#00aaff',
            accent2: '#00e5ff',
            accent3: '#ffffff',
            text: '#003366',
            textMuted: '#6699cc',
            glass: 'rgba(255, 255, 255, 0.6)',
            glassBorder: 'rgba(0, 170, 255, 0.2)',
            glassAccent: 'rgba(0, 170, 255, 0.1)',
            glassAccentBorder: 'rgba(0, 170, 255, 0.4)',
        },
        gradients: {
            background: 'radial-gradient(circle at top left, #ffffff 0%, #e0f4ff 100%)',
            backgroundOverlay: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%)',
            button1: 'linear-gradient(135deg, #00aaff 0%, #0066cc 100%)',
            button2: 'linear-gradient(135deg, #00e5ff 0%, #00aacc 100%)',
            button3: 'linear-gradient(135deg, #ffffff 0%, #e0f4ff 100%)',
            progress: 'linear-gradient(90deg, #00aaff, #00e5ff, #ffffff)',
        },
        orbColors: {
            orb1: 'rgba(0, 170, 255, 0.15)',
            orb2: 'rgba(255, 255, 255, 0.8)',
            orb3Border: 'rgba(0, 170, 255, 0.3)',
            orb4Border: 'rgba(0, 229, 255, 0.2)',
        },
        confettiColors: ['#00aaff', '#00e5ff', '#ffffff'],
        soundPitch: 1.2,
        borderRadius: '24px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.VAPOR]: {
        id: ThemeId.VAPOR,
        name: 'Vapor Bloom',
        description: 'Dreamy pastel gradients and retro nostalgia.',
        price: 12000,
        icon: '🌸',
        colors: {
            bgPrimary: '#fff0f5',
            bgSecondary: '#f0f5ff',
            bgTertiary: '#f5fff0',
            accent1: '#ff71ce',
            accent2: '#01cdfe',
            accent3: '#b967ff',
            text: '#4a4a4a',
            textMuted: '#9b9b9b',
            glass: 'rgba(255, 255, 255, 0.7)',
            glassBorder: 'rgba(255, 113, 206, 0.2)',
            glassAccent: 'rgba(1, 205, 254, 0.1)',
            glassAccentBorder: 'rgba(255, 113, 206, 0.5)',
        },
        gradients: {
            background: 'linear-gradient(45deg, #fff0f5 0%, #f0f5ff 100%)',
            backgroundOverlay: 'linear-gradient(to bottom, transparent, rgba(230,190,255,0.2))',
            button1: 'linear-gradient(135deg, #ff71ce 0%, #ff00aa 100%)',
            button2: 'linear-gradient(135deg, #01cdfe 0%, #0099cc 100%)',
            button3: 'linear-gradient(135deg, #b967ff 0%, #7700ff 100%)',
            progress: 'linear-gradient(90deg, #ff71ce, #01cdfe, #b967ff)',
        },
        orbColors: {
            orb1: 'rgba(255, 113, 206, 0.2)',
            orb2: 'rgba(1, 205, 254, 0.2)',
            orb3Border: 'rgba(185, 103, 255, 0.3)',
            orb4Border: 'rgba(255, 255, 255, 0.5)',
        },
        confettiColors: ['#ff71ce', '#01cdfe', '#b967ff'],
        soundPitch: 1.05,
        borderRadius: '30px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.CONSTRUCTIVIST]: {
        id: ThemeId.CONSTRUCTIVIST,
        name: 'Constructivism',
        description: 'Bold diagonals and propaganda-inspired high-contrast red/black.',
        price: 18000,
        icon: '🚩',
        nftExclusive: true,
        colors: {
            bgPrimary: '#1a1a1a',
            bgSecondary: '#2b2b2b',
            bgTertiary: '#000000',
            accent1: '#e60000',
            accent2: '#ffffff',
            accent3: '#ff3333',
            text: '#ffffff',
            textMuted: '#999999',
            glass: 'rgba(0, 0, 0, 0.8)',
            glassBorder: 'rgba(230, 0, 0, 0.3)',
            glassAccent: 'rgba(230, 0, 0, 0.1)',
            glassAccentBorder: 'rgba(230, 0, 0, 0.6)',
        },
        gradients: {
            background: 'linear-gradient(135deg, #1a1a1a 0%, #000000 100%)',
            backgroundOverlay: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(230,0,0,0.03) 35px, rgba(230,0,0,0.03) 70px)',
            button1: 'linear-gradient(135deg, #e60000 0%, #800000 100%)',
            button2: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
            button3: 'linear-gradient(135deg, #000000 0%, #e60000 100%)',
            progress: 'linear-gradient(90deg, #e60000, #ffffff)',
        },
        orbColors: {
            orb1: 'rgba(230, 0, 0, 0.2)',
            orb2: 'rgba(255, 255, 255, 0.05)',
            orb3Border: 'rgba(230, 0, 0, 0.4)',
            orb4Border: 'rgba(0, 0, 0, 1)',
        },
        confettiColors: ['#e60000', '#ffffff', '#000000'],
        soundPitch: 0.8,
        borderRadius: '0px',
        borderRadiusFull: '0px',
    },

    [ThemeId.DE_STIJL]: {
        id: ThemeId.DE_STIJL,
        name: 'De Stijl',
        description: 'Strict Bauhaus-era grids with primary colors and minimal lines.',
        price: 22000,
        icon: '🧱',
        nftExclusive: true,
        colors: {
            bgPrimary: '#ffffff',
            bgSecondary: '#f0f0f0',
            bgTertiary: '#e0e0e0',
            accent1: '#ff0000',
            accent2: '#222222',
            accent3: '#ffcc00',
            text: '#000000',
            textMuted: '#666666',
            glass: 'rgba(255, 255, 255, 0.9)',
            glassBorder: 'rgba(0, 0, 0, 1)',
            glassAccent: 'rgba(0, 102, 255, 0.1)',
            glassAccentBorder: 'rgba(0, 0, 0, 0.8)',
        },
        gradients: {
            background: 'linear-gradient(to bottom, #ffffff, #f0f0f0)',
            backgroundOverlay: 'linear-gradient(90deg, #000 1px, transparent 1px) 0 0 / 100px 100px, linear-gradient(0deg, #000 1px, transparent 1px) 0 0 / 100px 100px',
            button1: 'linear-gradient(135deg, #ff0000 0%, #990000 100%)',
            button2: 'linear-gradient(135deg, #0066ff 0%, #0033aa 100%)',
            button3: 'linear-gradient(135deg, #ffcc00 0%, #ccaa00 100%)',
            progress: 'linear-gradient(90deg, #ff0000, #0066ff, #ffcc00)',
        },
        orbColors: {
            orb1: 'rgba(255, 0, 0, 0.1)',
            orb2: 'rgba(0, 102, 255, 0.1)',
            orb3Border: 'rgba(0, 0, 0, 0.4)',
            orb4Border: 'rgba(255, 204, 0, 0.3)',
        },
        confettiColors: ['#ff0000', '#0066ff', '#ffcc00', '#000000'],
        soundPitch: 1.0,
        borderRadius: '0px',
        borderRadiusFull: '0px',
    },

    [ThemeId.POP_ART]: {
        id: ThemeId.POP_ART,
        name: 'Pop Art',
        description: 'Loud comic-style colors with halftone dots and bold outlines.',
        price: 28000,
        icon: '💥',
        nftExclusive: true,
        colors: {
            bgPrimary: '#ffed00',
            bgSecondary: '#00adef',
            bgTertiary: '#ec008c',
            accent1: '#ec008c',
            accent2: '#000000',
            accent3: '#00adef',
            text: '#000000',
            textMuted: '#333333',
            glass: 'rgba(255, 255, 255, 0.8)',
            glassBorder: 'rgba(0, 0, 0, 1)',
            glassAccent: 'rgba(236, 0, 140, 0.1)',
            glassAccentBorder: 'rgba(0, 0, 0, 0.7)',
        },
        gradients: {
            background: 'radial-gradient(circle, #ffed00 0%, #ffc000 100%)',
            backgroundOverlay: 'radial-gradient(circle, #fff 10%, transparent 11%) 0 0/20px 20px, radial-gradient(circle, #fff 10%, transparent 11%) 10px 10px/20px 20px',
            button1: 'linear-gradient(135deg, #ec008c 0%, #990055 100%)',
            button2: 'linear-gradient(135deg, #00adef 0%, #0077aa 100%)',
            button3: 'linear-gradient(135deg, #ffffff 0%, #cccccc 100%)',
            progress: 'linear-gradient(90deg, #ec008c, #00adef, #ffed00)',
        },
        orbColors: {
            orb1: 'rgba(236, 0, 140, 0.2)',
            orb2: 'rgba(0, 173, 239, 0.2)',
            orb3Border: 'rgba(0, 0, 0, 0.5)',
            orb4Border: 'rgba(255, 255, 255, 0.4)',
        },
        confettiColors: ['#ec008c', '#00adef', '#ffed00', '#000000'],
        soundPitch: 1.1,
        borderRadius: '12px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.PSYCHEDELIC]: {
        id: ThemeId.PSYCHEDELIC,
        name: 'Psychedelic',
        description: 'Trippy rainbow gradients and melting liquid shapes.',
        price: 50000,
        icon: '🌈',
        nftExclusive: true,
        colors: {
            bgPrimary: '#2d0a4e',
            bgSecondary: '#4e0a4e',
            bgTertiary: '#0a424e',
            accent1: '#00ffcc',
            accent2: '#ff00ff',
            accent3: '#ffff00',
            text: '#ffffff',
            textMuted: '#b967ff',
            glass: 'rgba(45, 10, 78, 0.7)',
            glassBorder: 'rgba(185, 103, 255, 0.3)',
            glassAccent: 'rgba(255, 0, 255, 0.15)',
            glassAccentBorder: 'rgba(0, 255, 204, 0.6)',
        },
        gradients: {
            background: 'linear-gradient(135deg, #2d0a4e, #4e0a4e, #0a424e)',
            backgroundOverlay: 'radial-gradient(ellipse at 50% 50%, rgba(255, 0, 255, 0.1), transparent)',
            button1: 'linear-gradient(135deg, #ff00ff 0%, #7700ff 100%)',
            button2: 'linear-gradient(135deg, #00ffcc 0%, #009966 100%)',
            button3: 'linear-gradient(135deg, #ffff00 0%, #ff6600 100%)',
            progress: 'linear-gradient(90deg, #ff00ff, #00ffcc, #ffff00)',
        },
        orbColors: {
            orb1: 'rgba(255, 0, 255, 0.3)',
            orb2: 'rgba(0, 255, 204, 0.3)',
            orb3Border: 'rgba(255, 255, 0, 0.4)',
            orb4Border: 'rgba(185, 103, 255, 0.2)',
        },
        confettiColors: ['#ff00ff', '#00ffcc', '#ffff00', '#7700ff'],
        soundPitch: 1.05,
        borderRadius: '50px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.RETRO_FUTURISM]: {
        id: ThemeId.RETRO_FUTURISM,
        name: 'Retro Futurism',
        description: 'Optimistic 1950s sci-fi with clean curves and atomic tech.',
        price: 75000,
        icon: '🚀',
        nftExclusive: true,
        colors: {
            bgPrimary: '#e8dbc5',
            bgSecondary: '#dcc6ab',
            bgTertiary: '#c8a98d',
            accent1: '#ff4d00',
            accent2: '#008b8b',
            accent3: '#556b2f',
            text: '#2c2c2c',
            textMuted: '#5d5d5d',
            glass: 'rgba(232, 219, 197, 0.8)',
            glassBorder: 'rgba(255, 77, 0, 0.2)',
            glassAccent: 'rgba(0, 139, 139, 0.1)',
            glassAccentBorder: 'rgba(255, 77, 0, 0.5)',
        },
        gradients: {
            background: 'radial-gradient(circle at 50% 50%, #e8dbc5, #dcc6ab)',
            backgroundOverlay: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.05))',
            button1: 'linear-gradient(135deg, #ff4d00 0%, #cc3d00 100%)',
            button2: 'linear-gradient(135deg, #008b8b 0%, #006666 100%)',
            button3: 'linear-gradient(135deg, #556b2f 0%, #3d4f21 100%)',
            progress: 'linear-gradient(90deg, #ff4d00, #008b8b, #556b2f)',
        },
        orbColors: {
            orb1: 'rgba(255, 77, 0, 0.15)',
            orb2: 'rgba(0, 139, 139, 0.15)',
            orb3Border: 'rgba(85, 107, 47, 0.2)',
            orb4Border: 'rgba(44, 44, 44, 0.05)',
        },
        confettiColors: ['#ff4d00', '#008b8b', '#556b2f'],
        soundPitch: 0.95,
        borderRadius: '100px 20px 100px 20px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.RUBY]: {
        id: ThemeId.RUBY,
        name: 'Ruby Luxury',
        description: 'Crimson silk textures and royal gold trim.',
        price: 35000,
        icon: '💎',
        nftExclusive: true,
        colors: {
            bgPrimary: '#1a0000',
            bgSecondary: '#2d0505',
            bgTertiary: '#450a0a',
            accent1: '#ff0000',
            accent2: '#d4af37',
            accent3: '#800000',
            text: '#ffffff',
            textMuted: '#b57a7a',
            glass: 'rgba(45, 5, 5, 0.6)',
            glassBorder: 'rgba(212, 175, 55, 0.3)',
            glassAccent: 'rgba(255, 0, 0, 0.1)',
            glassAccentBorder: 'rgba(212, 175, 55, 0.5)',
        },
        gradients: {
            background: 'radial-gradient(circle at center, #2d0505 0%, #1a0000 100%)',
            backgroundOverlay: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)',
            button1: 'linear-gradient(135deg, #ff0000 0%, #800000 100%)',
            button2: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
            button3: 'linear-gradient(135deg, #ff0000 0%, #d4af37 100%)',
            progress: 'linear-gradient(90deg, #ff0000, #d4af37)',
        },
        orbColors: {
            orb1: 'rgba(255, 0, 0, 0.2)',
            orb2: 'rgba(212, 175, 55, 0.15)',
            orb3Border: 'rgba(255, 0, 0, 0.3)',
            orb4Border: 'rgba(212, 175, 55, 0.4)',
        },
        confettiColors: ['#ff0000', '#d4af37', '#800000'],
        soundPitch: 0.98,
        borderRadius: '12px',
        borderRadiusFull: '9999px',
    },

    [ThemeId.TECHNO]: {
        id: ThemeId.TECHNO,
        name: 'Techno HUD',
        description: 'Advanced data-grid UI for high-speed spelling.',
        price: 50000,
        icon: '🛰️',
        nftExclusive: true,
        colors: {
            bgPrimary: '#0a0f14',
            bgSecondary: '#111821',
            bgTertiary: '#1a2430',
            accent1: '#00d2ff',
            accent2: '#3a7bd5',
            accent3: '#ffffff',
            text: '#00d2ff',
            textMuted: '#3a7bd5',
            glass: 'rgba(10, 15, 20, 0.9)',
            glassBorder: 'rgba(0, 210, 255, 0.3)',
            glassAccent: 'rgba(0, 210, 255, 0.1)',
            glassAccentBorder: 'rgba(0, 210, 255, 0.6)',
        },
        gradients: {
            background: 'linear-gradient(135deg, #0a0f14 0%, #111821 100%)',
            backgroundOverlay: 'linear-gradient(to right, rgba(0,210,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,210,255,0.05) 1px, transparent 1px)',
            button1: 'linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)',
            button2: 'linear-gradient(135deg, #1a2430 0%, #0a0f14 100%)',
            button3: 'linear-gradient(135deg, #00d2ff 0%, #ffffff 100%)',
            progress: 'linear-gradient(90deg, #0a0f14, #00d2ff)',
        },
        orbColors: {
            orb1: 'rgba(0, 210, 255, 0.2)',
            orb2: 'rgba(58, 123, 213, 0.2)',
            orb3Border: 'rgba(0, 210, 255, 0.4)',
            orb4Border: 'rgba(255, 255, 255, 0.1)',
        },
        confettiColors: ['#00d2ff', '#3a7bd5', '#ffffff'],
        soundPitch: 1.15,
        borderRadius: '0px',
        borderRadiusFull: '0px',
    },

    [ThemeId.VOID]: {
        id: ThemeId.VOID,
        name: 'Event Horizon',
        description: 'The absolute singularity. Pure gravity and light.',
        price: 100000,
        icon: '🕳️',
        nftExclusive: true,
        colors: {
            bgPrimary: '#000000',
            bgSecondary: '#050505',
            bgTertiary: '#111111',
            accent1: '#ffffff',
            accent2: '#333333',
            accent3: '#999999',
            text: '#ffffff',
            textMuted: '#444444',
            glass: 'rgba(0, 0, 0, 1)',
            glassBorder: 'rgba(255, 255, 255, 0.1)',
            glassAccent: 'rgba(255, 255, 255, 0.05)',
            glassAccentBorder: 'rgba(255, 255, 255, 0.8)',
        },
        gradients: {
            background: 'radial-gradient(circle at center, #050505 0%, #000000 100%)',
            backgroundOverlay: 'radial-gradient(circle at center, transparent 0%, rgba(255,255,255,0.02) 100%)',
            button1: 'linear-gradient(135deg, #ffffff 0%, #999999 100%)',
            button2: 'linear-gradient(135deg, #111 0%, #000 100%)',
            button3: 'linear-gradient(135deg, #333 0%, #111 100%)',
            progress: 'linear-gradient(90deg, #000, #fff)',
        },
        orbColors: {
            orb1: 'rgba(255, 255, 255, 0.1)',
            orb2: 'rgba(255, 255, 255, 0.05)',
            orb3Border: 'rgba(255, 255, 255, 0.2)',
            orb4Border: 'rgba(255, 255, 255, 0.1)',
        },
        confettiColors: ['#ffffff', '#999999', '#333333'],
        soundPitch: 0.8,
        borderRadius: '9999px',
        borderRadiusFull: '9999px',
    },
};

export const getTheme = (id: ThemeId): ThemeDefinition => {
    return THEMES[id] || THEMES[ThemeId.DEFAULT];
};

export const getAllThemes = (): ThemeDefinition[] => {
    return Object.values(THEMES);
};
