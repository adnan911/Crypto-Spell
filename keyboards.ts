import React from 'react';

export enum KeyboardId {
    CYBER_DECK = 'cyber_deck',
    ROYAL_GOLD = 'royal_gold',
    GLACIAL_GLASS = 'glacial_glass',
    OBSIDIAN = 'obsidian',
    HOLOGRAPHIC = 'holographic',
    VAPOR_WAVE = 'vapor_wave',
    EMERALD_FOREST = 'emerald_forest',
    SOLAR_FLARE = 'solar_flare',
    DEEP_SEA = 'deep_sea',
    AMETHYST = 'amethyst',
    MIDNIGHT_STEALTH = 'midnight_stealth',
    ARCTIC_FROST = 'arctic_frost',
    GOLDEN_SANDS = 'golden_sands',
    RUBY_RED = 'ruby_red',
    CARBON_FIBER = 'carbon_fiber',
    PRISM = 'prism',
    MATRIX = 'matrix',
    DIAMOND_ELITE = 'diamond_elite',
    VOID = 'void',
    LAVA_FLOW = 'lava_flow'
}

export interface KeyboardDefinition {
    id: KeyboardId;
    name: string;
    description: string;
    price: number;
    nftExclusive?: boolean; // true = requires NFT ownership
    keyStyles: React.CSSProperties;
    keyHoverStyles?: React.CSSProperties;
    keyActiveStyles?: React.CSSProperties;
    containerStyles?: React.CSSProperties;
}

export const KEYBOARDS: Record<KeyboardId, KeyboardDefinition> = {
    [KeyboardId.CYBER_DECK]: {
        id: KeyboardId.CYBER_DECK,
        name: 'Cyber Deck',
        description: 'Neon geometric outlines with dark hacker glass.',
        price: 5000,
        containerStyles: {
            background: 'linear-gradient(180deg, rgba(0, 20, 10, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)',
            borderTop: '2px solid rgba(0, 255, 136, 0.2)',
        },
        keyStyles: {
            background: 'rgba(5, 10, 5, 0.8)',
            border: '1px solid rgba(0, 255, 136, 0.5)',
            color: '#00ff88',
            fontFamily: '"Space Mono", monospace',
            textShadow: '0 0 5px rgba(0, 255, 136, 0.5)',
            boxShadow: 'inset 0 0 10px rgba(0, 255, 136, 0.1), 0 0 10px rgba(0,0,0,0.5)',
            borderRadius: '2px',
        },
        keyActiveStyles: {
            background: 'rgba(0, 255, 136, 0.2)',
            boxShadow: 'inset 0 0 20px rgba(0, 255, 136, 0.5), 0 0 15px rgba(0, 255, 136, 0.3)',
        }
    },

    [KeyboardId.ROYAL_GOLD]: {
        id: KeyboardId.ROYAL_GOLD,
        name: 'Royal Gold',
        description: 'Heavy gold bars wrapped in velvet shadow.',
        price: 40000,
        nftExclusive: true,
        containerStyles: {
            background: 'linear-gradient(to bottom, transparent 0%, rgba(20, 10, 0, 0.9) 100%)',
        },
        keyStyles: {
            background: 'linear-gradient(180deg, #ffdf00 0%, #d4af37 100%)',
            border: 'none',
            borderBottom: '4px solid #b8860b',
            color: '#2a1b00',
            fontWeight: '900',
            textShadow: '0 1px 0px rgba(255,255,255,0.5)',
            boxShadow: '0 4px 6px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.4)',
            borderRadius: '6px',
        },
        keyActiveStyles: {
            transform: 'translateY(4px)',
            borderBottom: '0px',
            background: 'linear-gradient(180deg, #d4af37 0%, #daa520 100%)',
            boxShadow: '0 0px 4px rgba(0,0,0,0.8), inset 0 2px 10px rgba(0,0,0,0.2)',
        }
    },

    [KeyboardId.GLACIAL_GLASS]: {
        id: KeyboardId.GLACIAL_GLASS,
        name: 'Glacial Glass',
        description: 'Pure, frozen glassmorphism. Crisp and elegant.',
        price: 10000,
        containerStyles: {
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
        },
        keyStyles: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255,255,255,0.4)',
            borderTop: '1px solid rgba(255,255,255,0.4)',
            color: '#ffffff',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
        },
        keyActiveStyles: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            boxShadow: '0 0px 10px 0 rgba(255, 255, 255, 0.2), inset 0 0 10px rgba(255,255,255,0.1)',
        }
    },

    [KeyboardId.OBSIDIAN]: {
        id: KeyboardId.OBSIDIAN,
        name: 'Obsidian',
        description: 'Matte black, extreme heavy shadows. Minimalist.',
        price: 20000,
        nftExclusive: true,
        containerStyles: {
            background: '#0a0a0a',
        },
        keyStyles: {
            background: '#141414',
            border: '1px solid #222222',
            borderBottom: '4px solid #000000',
            color: '#888888',
            fontWeight: '700',
            boxShadow: '0 4px 10px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.05)',
            borderRadius: '8px',
        },
        keyActiveStyles: {
            transform: 'translateY(4px)',
            borderBottom: '0px',
            background: '#0f0f0f',
            color: '#ffffff',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,1)',
            textShadow: '0 0 10px rgba(255,255,255,0.5)',
        }
    },

    [KeyboardId.HOLOGRAPHIC]: {
        id: KeyboardId.HOLOGRAPHIC,
        name: 'Holographic',
        description: 'Shimmering iridescent colors that feel alien.',
        price: 75000,
        nftExclusive: true,
        containerStyles: {
            background: 'transparent',
        },
        keyStyles: {
            background: 'linear-gradient(120deg, rgba(255,192,203,0.3) 0%, rgba(173,216,230,0.3) 50%, rgba(221,160,221,0.3) 100%)',
            backgroundSize: '200% auto',
            border: '2px solid transparent',
            backgroundClip: 'padding-box',
            position: 'relative',
            color: '#ffffff',
            textShadow: '0 0 10px rgba(255,255,255,0.8)',
            boxShadow: '0 4px 15px rgba(255, 192, 203, 0.2)',
            borderRadius: '999px',
            fontWeight: '900',
        },
        keyHoverStyles: {
            backgroundPosition: 'right center',
        },
        keyActiveStyles: {
            background: 'linear-gradient(120deg, rgba(255,192,203,0.5) 0%, rgba(173,216,230,0.5) 50%, rgba(221,160,221,0.5) 100%)',
            boxShadow: '0 0 20px rgba(173, 216, 230, 0.6), inset 0 0 15px rgba(255,255,255,0.5)',
        }
    },

    [KeyboardId.VAPOR_WAVE]: {
        id: KeyboardId.VAPOR_WAVE,
        name: 'Vapor Wave',
        description: 'Retro 80s aesthetic with pink and teal gradients.',
        price: 15000,
        containerStyles: {
            background: 'linear-gradient(to top, #ff71ce 0%, #01cdfe 100%)',
            borderTop: '2px solid #05ffa1',
        },
        keyStyles: {
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid #b967ff',
            color: '#ffffff',
            fontWeight: 'bold',
            backdropFilter: 'blur(5px)',
            borderRadius: '4px',
            textShadow: '2px 2px #ff71ce',
        },
        keyActiveStyles: {
            background: '#b967ff',
            transform: 'scale(0.95)',
        }
    },

    [KeyboardId.EMERALD_FOREST]: {
        id: KeyboardId.EMERALD_FOREST,
        name: 'Emerald Forest',
        description: 'Deep forest greens with earthy organic tones.',
        price: 12000,
        containerStyles: {
            background: '#0a2e1a',
        },
        keyStyles: {
            background: 'linear-gradient(135deg, #1d4d2f 0%, #0a2e1a 100%)',
            border: '1px solid #2e7d32',
            color: '#a5d6a7',
            borderRadius: '8px',
            boxShadow: '0 4px #061c10',
        },
        keyActiveStyles: {
            transform: 'translateY(2px)',
            boxShadow: '0 2px #061c10',
        }
    },

    [KeyboardId.SOLAR_FLARE]: {
        id: KeyboardId.SOLAR_FLARE,
        name: 'Solar Flare',
        description: 'Intense sun-like energy with burning orange glows.',
        price: 25000,
        containerStyles: {
            background: 'radial-gradient(circle at center, #ff8c00 0%, #000 70%)',
        },
        keyStyles: {
            background: 'rgba(255, 140, 0, 0.15)',
            border: '1px solid rgba(255, 140, 0, 0.5)',
            color: '#ffa500',
            boxShadow: '0 0 15px rgba(255, 69, 0, 0.3)',
            borderRadius: '12px',
        },
        keyActiveStyles: {
            background: 'rgba(255, 69, 0, 0.4)',
            borderColor: '#ff4500',
            boxShadow: '0 0 25px rgba(255, 69, 0, 0.6)',
        }
    },

    [KeyboardId.DEEP_SEA]: {
        id: KeyboardId.DEEP_SEA,
        name: 'Deep Sea',
        description: 'Calm abyssal blues with bioluminescent accents.',
        price: 18000,
        containerStyles: {
            background: '#001a33',
        },
        keyStyles: {
            background: 'rgba(0, 51, 102, 0.6)',
            border: '1px solid #00ffff',
            color: '#00ffff',
            borderRadius: '15px',
            boxShadow: 'inset 0 0 10px rgba(0, 255, 255, 0.2)',
        },
        keyActiveStyles: {
            background: '#00ffff',
            color: '#001a33',
        }
    },

    [KeyboardId.AMETHYST]: {
        id: KeyboardId.AMETHYST,
        name: 'Amethyst',
        description: 'Royal crystalline purple with sharp geometric cuts.',
        price: 22000,
        containerStyles: {
            background: 'linear-gradient(135deg, #1a0a2e 0%, #4a2c7c 100%)',
        },
        keyStyles: {
            background: 'rgba(138, 43, 226, 0.2)',
            border: '2px solid #9932cc',
            color: '#e6e6fa',
            clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
            borderRadius: '0',
            fontWeight: 'bold',
        },
        keyActiveStyles: {
            background: '#9932cc',
            color: '#ffffff',
        }
    },

    [KeyboardId.MIDNIGHT_STEALTH]: {
        id: KeyboardId.MIDNIGHT_STEALTH,
        name: 'Midnight Stealth',
        description: 'Tactical black with subtle carbon fiber textures.',
        price: 30000,
        containerStyles: {
            background: '#050505',
        },
        keyStyles: {
            background: '#111111',
            border: '1px solid #333333',
            color: '#444444',
            borderRadius: '2px',
            transition: 'all 0.1s ease',
        },
        keyActiveStyles: {
            color: '#ffffff',
            borderColor: '#666666',
            boxShadow: '0 0 10px rgba(255,255,255,0.2)',
        }
    },

    [KeyboardId.ARCTIC_FROST]: {
        id: KeyboardId.ARCTIC_FROST,
        name: 'Arctic Frost',
        description: 'Crystal clear ice keys with a cold white glow.',
        price: 28000,
        nftExclusive: true,
        containerStyles: {
            background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
        },
        keyStyles: {
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid #81d4fa',
            color: '#0277bd',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
        keyActiveStyles: {
            background: '#81d4fa',
            color: '#ffffff',
        }
    },

    [KeyboardId.GOLDEN_SANDS]: {
        id: KeyboardId.GOLDEN_SANDS,
        name: 'Golden Sands',
        description: 'Warm, sun-kissed tan keys for a desert vibe.',
        price: 8000,
        containerStyles: {
            background: '#f4a460',
        },
        keyStyles: {
            background: '#ffdead',
            border: '1px solid #d2b48c',
            color: '#8b4513',
            borderRadius: '5px',
            boxShadow: '0 3px #cd853f',
        },
        keyActiveStyles: {
            transform: 'translateY(2px)',
            boxShadow: '0 1px #cd853f',
        }
    },

    [KeyboardId.RUBY_RED]: {
        id: KeyboardId.RUBY_RED,
        name: 'Ruby Red',
        description: 'Deep blood-red gemstone keys with polished edges.',
        price: 45000,
        nftExclusive: true,
        containerStyles: {
            background: '#3d0000',
        },
        keyStyles: {
            background: 'linear-gradient(to bottom, #ff3333, #990000)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            boxShadow: '0 4px #660000',
        },
        keyActiveStyles: {
            transform: 'translateY(3px)',
            boxShadow: '0 1px #660000',
        }
    },

    [KeyboardId.CARBON_FIBER]: {
        id: KeyboardId.CARBON_FIBER,
        name: 'Carbon Fiber',
        description: 'Performance-grade composite weave for pro speed.',
        price: 55000,
        nftExclusive: true,
        containerStyles: {
            background: '#111',
        },
        keyStyles: {
            background: '#222 url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkYGD4D8SMQAwGcAY2AbmSIAY2AbmSIAY2AbmSIAbmY8f9GAAAAABJRU5ErkJggg==")',
            border: '1px solid #000',
            color: '#fff',
            fontFamily: 'Orbitron, sans-serif',
            borderRadius: '4px',
            boxShadow: 'inset 0 0 5px rgba(255,255,255,0.1)',
        },
        keyActiveStyles: {
            background: '#444',
            transform: 'scale(1.02)',
        }
    },

    [KeyboardId.PRISM]: {
        id: KeyboardId.PRISM,
        name: 'Prism',
        description: 'Reflective surfaces that split light into a rainbow.',
        price: 60000,
        nftExclusive: true,
        containerStyles: {
            background: '#f8f8f8',
        },
        keyStyles: {
            background: 'white',
            border: '1px solid #ddd',
            color: '#333',
            boxShadow: '-2px -2px 5px rgba(255,0,0,0.2), 2px 2px 5px rgba(0,0,255,0.2)',
            borderRadius: '8px',
        },
        keyActiveStyles: {
            background: 'linear-gradient(45deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f)',
            color: 'white',
        }
    },

    [KeyboardId.MATRIX]: {
        id: KeyboardId.MATRIX,
        name: 'Matrix',
        description: 'Falling green code. Free your mind.',
        price: 35000,
        nftExclusive: true,
        containerStyles: {
            background: '#000',
        },
        keyStyles: {
            background: '#000',
            border: '1px solid #00ff00',
            color: '#00ff00',
            fontFamily: 'monospace',
            textShadow: '0 0 8px #00ff00',
            borderRadius: '0',
            animation: 'pulse 2s infinite',
        },
        keyActiveStyles: {
            background: '#00ff00',
            color: '#000',
        }
    },

    [KeyboardId.DIAMOND_ELITE]: {
        id: KeyboardId.DIAMOND_ELITE,
        name: 'Diamond Elite',
        description: 'Pure, faceted diamond keys for total luxury.',
        price: 50000,
        nftExclusive: true,
        containerStyles: {
            background: 'linear-gradient(135deg, #f0f8ff 0%, #ffffff 100%)',
        },
        keyStyles: {
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #fff',
            color: '#b0e0e6',
            boxShadow: '0 0 15px rgba(176, 224, 230, 0.5)',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            borderRadius: '0',
            fontWeight: '900',
        },
        keyActiveStyles: {
            background: '#ffffff',
            boxShadow: '0 0 30px rgba(176, 224, 230, 0.8)',
        }
    },

    [KeyboardId.VOID]: {
        id: KeyboardId.VOID,
        name: 'The Void',
        description: 'Black holes where light cannot escape. Pure gravity.',
        price: 75000,
        nftExclusive: true,
        containerStyles: {
            background: '#000',
        },
        keyStyles: {
            background: 'transparent',
            border: '2px dashed #444',
            color: '#ffffff',
            borderRadius: '50%',
            opacity: '0.8',
        },
        keyActiveStyles: {
            opacity: '1',
            borderColor: '#fff',
            boxShadow: '0 0 20px #fff',
        }
    },

    [KeyboardId.LAVA_FLOW]: {
        id: KeyboardId.LAVA_FLOW,
        name: 'Lava Flow',
        description: 'Active magma beneath obsidian tiles. Watch your step.',
        price: 100000,
        nftExclusive: true,
        containerStyles: {
            background: '#200',
        },
        keyStyles: {
            background: '#111',
            border: '2px solid #ff4500',
            color: '#ff4500',
            boxShadow: '0 0 10px #ff4500, inset 0 0 10px #8b0000',
            borderRadius: '12px',
            fontWeight: 'bold',
        },
        keyActiveStyles: {
            background: '#ff4500',
            color: '#000',
            boxShadow: '0 0 30px #ff4500',
        }
    }
};

export const getKeyboard = (id: KeyboardId): KeyboardDefinition => {
    return KEYBOARDS[id];
};

export const getAllKeyboards = (): KeyboardDefinition[] => {
    return Object.values(KEYBOARDS);
};
