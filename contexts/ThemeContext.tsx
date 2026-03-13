// Theme Context - Global theme state management for CryptoSpell
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { ThemeId, ThemeDefinition, getTheme, THEMES } from '../themes';
import { KeyboardId, KeyboardDefinition, getKeyboard, KEYBOARDS } from '../keyboards';
import { soundManager } from '../services/soundManager';

interface ThemeContextValue {
    currentTheme: ThemeDefinition;
    unlockedThemes: ThemeId[];
    setTheme: (id: ThemeId) => void;
    purchaseTheme: (id: ThemeId) => boolean;
    isUnlocked: (id: ThemeId) => boolean;
    canAfford: (id: ThemeId, coins: number) => boolean;
    currentKeyboard: KeyboardDefinition | null;
    unlockedKeyboards: KeyboardId[];
    setKeyboard: (id: KeyboardId | null) => void;
    purchaseKeyboard: (id: KeyboardId) => boolean;
    isKeyboardUnlocked: (id: KeyboardId) => boolean;
    canAffordKeyboard: (id: KeyboardId, coins: number) => boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'cryptospell_themes_v1';

interface ThemeStorage {
    activeTheme: ThemeId;
    unlockedThemes: ThemeId[];
    activeKeyboard?: KeyboardId | null;
    unlockedKeyboards?: KeyboardId[];
}

// Apply theme CSS variables to document
const applyThemeToDocument = (theme: ThemeDefinition) => {
    const root = document.documentElement;

    // Colors
    root.style.setProperty('--theme-bg-primary', theme.colors.bgPrimary);
    root.style.setProperty('--theme-bg-secondary', theme.colors.bgSecondary);
    root.style.setProperty('--theme-bg-tertiary', theme.colors.bgTertiary);
    root.style.setProperty('--theme-accent-1', theme.colors.accent1);
    root.style.setProperty('--theme-accent-2', theme.colors.accent2);
    root.style.setProperty('--theme-accent-3', theme.colors.accent3);
    root.style.setProperty('--theme-text', theme.colors.text);
    root.style.setProperty('--theme-text-muted', theme.colors.textMuted);
    root.style.setProperty('--theme-glass', theme.colors.glass);
    root.style.setProperty('--theme-glass-border', theme.colors.glassBorder);
    root.style.setProperty('--theme-glass-accent', theme.colors.glassAccent);
    root.style.setProperty('--theme-glass-accent-border', theme.colors.glassAccentBorder);

    // Gradients
    root.style.setProperty('--theme-gradient-bg', theme.gradients.background);
    root.style.setProperty('--theme-gradient-overlay', theme.gradients.backgroundOverlay);
    root.style.setProperty('--theme-gradient-btn1', theme.gradients.button1);
    root.style.setProperty('--theme-gradient-btn2', theme.gradients.button2);
    root.style.setProperty('--theme-gradient-btn3', theme.gradients.button3);
    root.style.setProperty('--theme-gradient-progress', theme.gradients.progress);

    // Orbs
    root.style.setProperty('--theme-orb-1', theme.orbColors.orb1);
    root.style.setProperty('--theme-orb-2', theme.orbColors.orb2);
    root.style.setProperty('--theme-orb-3-border', theme.orbColors.orb3Border);
    root.style.setProperty('--theme-orb-4-border', theme.orbColors.orb4Border);

    // Border Radius
    root.style.setProperty('--theme-radius', theme.borderRadius);
    root.style.setProperty('--theme-radius-full', theme.borderRadiusFull);

    // Update sound pitch
    soundManager.setPitchModifier(theme.soundPitch);

    // Apply special theme classes
    const specialThemes = [
        ThemeId.TECHNO, 
        ThemeId.VOID, 
        ThemeId.MIDNIGHT, 
        ThemeId.NEON_DRIFT,
        ThemeId.CONSTRUCTIVIST,
        ThemeId.DE_STIJL,
        ThemeId.POP_ART,
        ThemeId.PSYCHEDELIC,
        ThemeId.RETRO_FUTURISM
    ];
    specialThemes.forEach(t => root.classList.remove(`theme-${t}`));
    
    if (specialThemes.includes(theme.id)) {
        root.classList.add(`theme-${theme.id}`);
    }
};

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeDefinition>(getTheme(ThemeId.DEFAULT));
    const [unlockedThemes, setUnlockedThemes] = useState<ThemeId[]>([ThemeId.DEFAULT]);
    const [currentKeyboard, setCurrentKeyboard] = useState<KeyboardDefinition | null>(null);
    const [unlockedKeyboards, setUnlockedKeyboards] = useState<KeyboardId[]>([]);

    // Load saved theme data on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            const allPossibleThemes = Object.values(ThemeId);
            
            if (saved) {
                const data: ThemeStorage = JSON.parse(saved);
                if (data.activeKeyboard) {
                    setCurrentKeyboard(getKeyboard(data.activeKeyboard));
                }
                const theme = getTheme(data.activeTheme || ThemeId.DEFAULT);
                setCurrentTheme(theme);
                
                // Respect saved unlocked themes
                const mergedThemes = Array.from(new Set([ThemeId.DEFAULT, ...(data.unlockedThemes || [])]));
                setUnlockedThemes(mergedThemes);
                
                if (data.unlockedKeyboards) {
                    setUnlockedKeyboards(data.unlockedKeyboards);
                }
                
                applyThemeToDocument(theme);
            } else {
                setUnlockedThemes([ThemeId.DEFAULT]);
                applyThemeToDocument(currentTheme);
            }
        } catch (e) {
            console.error('Failed to load theme data', e);
            applyThemeToDocument(currentTheme);
        }
    }, []);

    // Save theme data whenever it changes
    const saveThemeData = useCallback((activeTheme: ThemeId, unlocked: ThemeId[], activeKbd: KeyboardId | null, unlockedKbds: KeyboardId[]) => {
        try {
            const data: ThemeStorage = { 
                activeTheme, 
                unlockedThemes: unlocked,
                activeKeyboard: activeKbd,
                unlockedKeyboards: unlockedKbds
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('Failed to save theme data', e);
        }
    }, []);

    const setTheme = useCallback((id: ThemeId) => {
        const theme = getTheme(id);
        setCurrentTheme(theme);
        applyThemeToDocument(theme);
        saveThemeData(id, unlockedThemes, currentKeyboard ? currentKeyboard.id : null, unlockedKeyboards);
    }, [unlockedThemes, currentKeyboard, unlockedKeyboards, saveThemeData]);

    const setKeyboard = useCallback((id: KeyboardId | null) => {
        const kb = id ? getKeyboard(id) : null;
        setCurrentKeyboard(kb);
        saveThemeData(currentTheme.id, unlockedThemes, id, unlockedKeyboards);
    }, [currentTheme, unlockedThemes, unlockedKeyboards, saveThemeData]);


    const isUnlocked = useCallback((id: ThemeId) => {
        return unlockedThemes.includes(id);
    }, [unlockedThemes]);

    const canAfford = useCallback((id: ThemeId, coins: number) => {
        const theme = THEMES[id];
        return theme && coins >= theme.price;
    }, []);

    const purchaseTheme = useCallback((id: ThemeId) => {
        if (unlockedThemes.includes(id)) {
            return true; // Already owned
        }

        const theme = THEMES[id];
        if (!theme) return false;

        // Unlock the theme (coin deduction happens in ThemeShop)
        const newUnlocked = [...unlockedThemes, id];
        setUnlockedThemes(newUnlocked);
        saveThemeData(currentTheme.id, newUnlocked, currentKeyboard ? currentKeyboard.id : null, unlockedKeyboards);

        return true;
    }, [unlockedThemes, currentTheme, currentKeyboard, unlockedKeyboards, saveThemeData]);

    const purchaseKeyboard = useCallback((id: KeyboardId) => {
        if (unlockedKeyboards.includes(id)) return true;
        const kb = KEYBOARDS[id];
        if (!kb) return false;

        const newUnlocked = [...unlockedKeyboards, id];
        setUnlockedKeyboards(newUnlocked);
        saveThemeData(currentTheme.id, unlockedThemes, currentKeyboard ? currentKeyboard.id : null, newUnlocked);
        return true;
    }, [unlockedKeyboards, currentTheme, currentKeyboard, unlockedThemes, saveThemeData]);

    const isKeyboardUnlocked = useCallback((id: KeyboardId) => unlockedKeyboards.includes(id), [unlockedKeyboards]);
    const canAffordKeyboard = useCallback((id: KeyboardId, coins: number) => {
        const kb = KEYBOARDS[id];
        return kb && coins >= kb.price;
    }, []);

    const value: ThemeContextValue = {
        currentTheme,
        unlockedThemes,
        setTheme,
        purchaseTheme,
        isUnlocked,
        canAfford,
        currentKeyboard,
        unlockedKeyboards,
        setKeyboard,
        purchaseKeyboard,
        isKeyboardUnlocked,
        canAffordKeyboard,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextValue => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export default ThemeContext;
