import React from 'react';
import { ThemeId } from '../themes';

interface ThemeIconProps {
    themeId: ThemeId;
    className?: string;
    size?: number;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({ themeId, className = "", size = 24 }) => {
    const viewBox = "0 0 24 24";
    
    switch (themeId) {
        case ThemeId.DEFAULT: // Cosmic Purple - Nebula/Stars
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2L14.5 9H22L16 13L18.5 20L12 16L5.5 20L8 13L2 9H9.5L12 2Z" fill="currentColor" opacity="0.8" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 4L6 6M18 4L20 6M4 20L6 18M18 20L20 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
            );
        case ThemeId.SOLARIS: // Solaris Gold - Sun/Corona
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <circle cx="12" cy="12" r="6" fill="currentColor" />
                    <path d="M12 2V4M12 20V22M2 12H4M20 12H22M4.93 4.93L6.34 6.34M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
                </svg>
            );
        case ThemeId.NEON_DRIFT: // Neon Drift - Cyber car/lines
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M3 18L21 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M5 14L19 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <path d="M7 10L17 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
                    <rect x="6" y="14" width="12" height="4" rx="1" fill="currentColor" />
                    <path d="M10 14V11M14 14V11" stroke="currentColor" strokeWidth="1" />
                </svg>
            );
        case ThemeId.MIDNIGHT: // Midnight Stealth - Shuriken/Stealth eye
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="currentColor" />
                    <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
            );
        case ThemeId.GLACIAL: // Ice Glacial - Crystal
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2L20 8V16L12 22L4 16V8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M12 2V22M4 8L20 16M4 16L20 8" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
                </svg>
            );
        case ThemeId.VAPOR: // Vapor Bloom - Fan/Flower
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" />
                    <path d="M12 12C12 12 14 8 16 8C18 8 18 10 18 10C18 12 12 12 12 12Z" fill="currentColor" />
                    <path d="M12 12C12 12 10 16 8 16C6 16 6 14 6 14C6 12 12 12 12 12Z" fill="currentColor" opacity="0.8" />
                    <path d="M12 12C12 12 8 10 8 8C8 6 10 6 10 6C12 6 12 12 12 12Z" fill="currentColor" opacity="0.6" />
                    <path d="M12 12C12 12 16 14 18 14C20 14 20 16 20 16C20 18 12 12 12 12Z" fill="currentColor" opacity="0.4" />
                </svg>
            );
        case ThemeId.CONSTRUCTIVIST: // Constructivism - Flag/Gears
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <rect x="4" y="4" width="16" height="12" fill="currentColor" />
                    <path d="M4 4L20 16M4 16L20 4" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                    <rect x="2" y="2" width="20" height="20" stroke="currentColor" strokeWidth="1" />
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
                </svg>
            );
        case ThemeId.DE_STIJL: // De Stijl - Grid
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <rect x="2" y="2" width="6" height="6" fill="#ff0000" />
                    <rect x="10" y="2" width="12" height="6" fill="currentColor" fillOpacity="0.1" />
                    <rect x="2" y="10" width="6" height="12" fill="#0066ff" />
                    <rect x="10" y="10" width="12" height="12" fill="#ffcc00" />
                    <path d="M10 2V22M2 10H22" stroke="currentColor" strokeWidth="2" />
                </svg>
            );
        case ThemeId.POP_ART: // Pop Art - Explosion
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2L15 8L21 6L18 12L22 18L15 16L12 22L9 16L2 18L6 12L3 6L9 8L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
                    <circle cx="12" cy="12" r="4" fill="white" />
                    <circle cx="12" cy="12" r="2" fill="black" />
                </svg>
            );
        case ThemeId.PSYCHEDELIC: // Psychedelic - Swirl
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" fill="currentColor" />
                    <path d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            );
        case ThemeId.RETRO_FUTURISM: // Retro Futurism - Rocket
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2C12 2 8 8 8 14C8 16 9.79 18 12 18C14.21 18 16 16 16 14C16 8 12 2 12 2Z" fill="currentColor" />
                    <path d="M8 14L4 18M16 14L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="10" r="1.5" fill="white" />
                    <path d="M10 20L12 22L14 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            );
        case ThemeId.RUBY: // Ruby Luxury - Gem
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <path d="M12 2L2 9L12 22L22 9L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M2 9H22M7 9L12 2M17 9L12 2M7 9L12 22M17 9L12 22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    <path d="M12 6L15 9L12 12L9 9L12 6Z" fill="currentColor" fillOpacity="0.3" />
                </svg>
            );
        case ThemeId.TECHNO: // Techno HUD - Satellite
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <rect x="8" y="8" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12H2M16 12H22M12 8V2M12 16V22" stroke="currentColor" strokeWidth="1" opacity="0.6" />
                    <rect x="2" y="10" width="2" height="4" fill="currentColor" />
                    <rect x="20" y="10" width="2" height="4" fill="currentColor" />
                    <rect x="10" y="2" width="4" height="2" fill="currentColor" />
                    <rect x="10" y="20" width="4" height="2" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
            );
        case ThemeId.VOID: // Event Horizon - Black Hole
            return (
                <svg width={size} height={size} viewBox={viewBox} fill="none" className={className}>
                    <circle cx="12" cy="12" r="6" fill="black" />
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                    <path d="M12 4C16.42 4 20 7.58 20 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path d="M12 20C7.58 20 4 16.42 4 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                </svg>
            );
        default:
            return null;
    }
};
