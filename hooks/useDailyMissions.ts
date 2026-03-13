import React, { useState, useEffect } from 'react';
import { ActiveGameState, HintType } from '../types';

export const useDailyMissions = (
  initialSession: ActiveGameState,
  persistenceService: typeof import('../services/persistence').persistenceService,
  setSession: React.Dispatch<React.SetStateAction<ActiveGameState>>
) => {
  useEffect(() => {
    const saved = persistenceService.loadProgress();
    if (saved) {
      const today = new Date().toDateString();
      
      const savedDailyMissions = saved.dailyMissions ? {
        ...initialSession.dailyMissions,
        ...saved.dailyMissions,
        missions: {
          ...initialSession.dailyMissions.missions,
          ...(saved.dailyMissions.missions || {})
        }
      } : initialSession.dailyMissions;
      
      const isNewDay = savedDailyMissions.date !== today;
      let newSession = { ...initialSession, ...saved };
      
      if (isNewDay) {
        const lastSavedDateStr = savedDailyMissions.date;
        const lastSavedDate = new Date(lastSavedDateStr);
        const currentDate = new Date(today);
        
        const timeDiff = currentDate.getTime() - lastSavedDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
        
        let newLoginStreak = saved.loginStreak || 0;
        
        if (daysDiff <= 1) {
          newLoginStreak += 1;
        } else {
          newLoginStreak = 1;
        }

        const oldMissions = savedDailyMissions.missions || {};
        const oldM1 = oldMissions['tier_a_5'] || { progress: 0, isClaimed: false };
        const oldM2 = oldMissions['streak_10'] || { progress: 0, isClaimed: false };
        const oldM3 = oldMissions['boss_1'] || { progress: 0, isClaimed: false };

        const wasYesterdayComplete = 
          (oldM1.progress >= 5 && oldM1.isClaimed) &&
          (oldM2.progress >= 10 && oldM2.isClaimed) &&
          (oldM3.progress >= 1 && oldM3.isClaimed);

        let newHistory = [...(savedDailyMissions.completionHistory || [])];
        
        newHistory.push({
          date: lastSavedDateStr,
          completed: wasYesterdayComplete
        });

        if (daysDiff > 1) {
            for (let i = 1; i < Math.min(daysDiff, 7); i++) {
                const missedDate = new Date(lastSavedDate.getTime() + (i * 1000 * 3600 * 24));
                newHistory.push({
                    date: missedDate.toDateString(),
                    completed: false
                });
            }
        }

        if (newHistory.length > 7) {
            newHistory = newHistory.slice(newHistory.length - 7);
        }

        newSession = {
            ...newSession,
            loginStreak: newLoginStreak,
            dailyMissions: {
                ...initialSession.dailyMissions, 
                date: today,
                completionHistory: newHistory
            }
        };
      } else {
          newSession = {
              ...newSession,
              dailyMissions: savedDailyMissions
          };
      }

      setSession(newSession);
    }
  }, []);
};
