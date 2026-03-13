import { ScoreEntry, GameSettings, Theme, ActiveGameState } from '../types';

const KEYS = {
  SCORES: 'cryptospell_high_scores_v2',
  SETTINGS: 'cryptospell_settings_v2',
  PROGRESS: 'cryptospell_progress_v3'
};

export const persistenceService = {
  getHighScores: (): ScoreEntry[] => {
    try {
      const data = localStorage.getItem(KEYS.SCORES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Failed to load scores", e);
      return [];
    }
  },

  saveScore: (entry: ScoreEntry) => {
    try {
      const scores = persistenceService.getHighScores();
      scores.push(entry);
      scores.sort((a, b) => b.score - a.score);
      localStorage.setItem(KEYS.SCORES, JSON.stringify(scores.slice(0, 10)));
    } catch (e) {
      console.error("Failed to save score", e);
    }
  },

  getSettings: (): GameSettings => {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
    return {
      soundEnabled: true,
      reducedMotion: false,
      theme: Theme.MODERN
    };
  },

  saveSettings: (settings: GameSettings) => {
    try {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error("Failed to save settings", e);
    }
  },

  _generateChecksum: (data: string): string => {
    let hash = 0;
    const salt = "cs_salt_77"; 
    const combined = data + salt;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash.toString(36);
  },

  saveProgress: (state: ActiveGameState) => {
    try {
      const data = JSON.stringify(state);
      const checksum = persistenceService._generateChecksum(data);
      localStorage.setItem(KEYS.PROGRESS, data);
      localStorage.setItem(KEYS.PROGRESS + '_sig', checksum);
    } catch (e) {
      console.error("Failed to save progress", e);
    }
  },

  loadProgress: (): ActiveGameState | null => {
    try {
      const data = localStorage.getItem(KEYS.PROGRESS);
      const sig = localStorage.getItem(KEYS.PROGRESS + '_sig');
      
      if (!data) return null;
      
      // Verification
      const expectedSig = persistenceService._generateChecksum(data);
      if (sig !== expectedSig) {
        console.warn("Security Alert: Progress data tampering detected! Reverting to safe state.");
        return null; 
      }

      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to load progress", e);
      return null;
    }
  }
};