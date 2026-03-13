import React from 'react';

interface DailyChallengeProps {
    onBack: () => void;
    onPlay: () => void;
    missions?: Record<string, { progress: number; isClaimed: boolean }>;
    loginRewardClaimed?: boolean;
    milestonesClaimed?: number[];
    onClaim: (id: string, reward: number) => void;
    onClaimLoginReward?: (reward: { currency: 'COINS' | 'GEMS', amount: number }) => void;
    onClaimMilestoneChest?: (index: number, reward: { currency: 'COINS' | 'GEMS', amount: number }) => void;
    completionHistory?: { date: string; completed: boolean }[];
    coins?: number;

    streak?: number;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ 
    onBack, onPlay, missions, onClaim, coins = 0, streak = 0, completionHistory = []
}) => {
    // Helper to calculate safely
    const getMission = (id: string) => missions?.[id] || { progress: 0, isClaimed: false };
    
    // Hardcoded logic to map our existing 3 missions to the requested template UI
    const m1 = getMission('tier_a_5');
    const m2 = getMission('streak_10');
    const m3 = getMission('boss_1');

    const totalReadyOrClaimed = [m1, m2, m3].filter(m => {
        if (m === m1) return m.isClaimed || m.progress >= 5;
        if (m === m2) return m.isClaimed || m.progress >= 10;
        if (m === m3) return m.isClaimed || m.progress >= 1;
        return false;
    }).length;

    const isM1Ready = m1.progress >= 5 && !m1.isClaimed;
    const isM2Ready = m2.progress >= 10 && !m2.isClaimed;
    const isM3Ready = m3.progress >= 1 && !m3.isClaimed;

    // We take the last 6 from history, plus today
    const historyToDisplay = Array.from({ length: 7 }).map((_, i) => {
        const isToday = i === 6;
        const historyIndex = i - (6 - completionHistory.length);
        
        let completed = false;
        if (isToday) {
            completed = totalReadyOrClaimed === 3;
        } else if (historyIndex >= 0 && historyIndex < completionHistory.length) {
            completed = completionHistory[historyIndex].completed;
        }
        
        return { label: isToday ? 'Today' : `D-${6-i}`, completed, isToday };
    });

    return (
        <div className="fixed inset-0 min-h-[100dvh] bg-[#0d1a35] z-50 text-[#e4e4e4] flex justify-center overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,800;1,700&family=Exo+2:wght@300;400;600;700;900&display=swap');

                .daily-challenge-container {
                    --navy: #142143;
                    --gold: #ffaf00;
                    --gold-light: #ffd166;
                    --silver: #e4e4e4;
                    --blue: #1a5d94;
                    --blue-mid: #11225b;
                    --bg: #0d1a35;
                    --card: rgba(20,33,67,0.85);
                    --card-border: rgba(255,175,0,0.18);
                    --glow-gold: rgba(255,175,0,0.35);
                    --glow-blue: rgba(26,93,148,0.5);
                    --text: #e4e4e4;
                    --dim: rgba(228,228,228,0.45);
                    
                    font-family: 'Exo 2', sans-serif;
                    width: 100%;
                    max-width:390px;
                    height: 100%;
                    position: relative;
                    overflow-x: hidden;
                    background: linear-gradient(168deg, #0a1628 0%, #0d1a35 40%, #111e40 70%, #0b1830 100%);
                }

                .bg-grid {
                    position: absolute; inset: 0;
                    background-image:
                      linear-gradient(rgba(26,93,148,0.07) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(26,93,148,0.07) 1px, transparent 1px);
                    background-size: 32px 32px;
                    mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%);
                    pointer-events: none;
                }

                .bg-hex {
                    position: absolute;
                    top: -60px; left: -80px;
                    width: 340px; height: 340px;
                    opacity: 0.055;
                    pointer-events: none;
                }

                .orb-1 {
                    position: absolute;
                    top: -40px; right: -60px;
                    width: 280px; height: 280px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,175,0,0.22) 0%, transparent 70%);
                    pointer-events: none;
                }
                .orb-2 {
                    position: absolute;
                    bottom: 30%; left: -80px;
                    width: 260px; height: 260px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(26,93,148,0.3) 0%, transparent 70%);
                    pointer-events: none;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                    padding: 0 0 100px;
                    height: 100%;
                    overflow-y: auto;
                }

                /* Hide scrollbar for Chrome, Safari and Opera */
                .content-wrapper::-webkit-scrollbar {
                  display: none;
                }

                /* Hide scrollbar for IE, Edge and Firefox */
                .content-wrapper {
                  -ms-overflow-style: none;  /* IE and Edge */
                  scrollbar-width: none;  /* Firefox */
                }

                .dc-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 52px 22px 18px;
                }

                .header-back {
                    width: 38px; height: 38px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                }
                .header-back svg { width:16px; height:16px; stroke: var(--silver); }

                .header-title {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 20px;
                    font-weight: 800;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    color: var(--silver);
                }

                .credits-badge {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #1a3a6e 0%, #142143 100%);
                    border: 1px solid rgba(255,175,0,0.4);
                    border-radius: 20px;
                    padding: 6px 14px 6px 8px;
                    box-shadow: 0 0 14px rgba(255,175,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
                }

                .credits-badge span {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 17px;
                    font-weight: 700;
                    color: var(--gold);
                    letter-spacing: 1px;
                }

                .progress-card {
                    margin: 8px 18px 0;
                    background: linear-gradient(135deg, rgba(26,93,148,0.35) 0%, rgba(17,34,91,0.5) 100%);
                    border: 1px solid rgba(255,175,0,0.2);
                    border-radius: 18px;
                    padding: 20px 22px 22px;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.07);
                }

                .progress-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 3px;
                    color: var(--gold);
                    text-transform: uppercase;
                    margin-bottom: 4px;
                }

                .progress-title-row {
                    display: flex;
                    align-items: baseline;
                    justify-content: space-between;
                    margin-bottom: 14px;
                }

                .progress-title {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 28px;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                    color: #fff;
                    text-transform: uppercase;
                }

                .progress-count {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 26px;
                    font-weight: 700;
                    color: var(--gold);
                    letter-spacing: 2px;
                }

                .progress-count em { color: rgba(228,228,228,0.4); font-style: normal; }

                .seg-bar {
                    display: flex;
                    gap: 6px;
                    margin-bottom: 14px;
                }
                .seg {
                    flex: 1;
                    height: 6px;
                    border-radius: 4px;
                    background: rgba(255,255,255,0.1);
                    overflow: hidden;
                    position: relative;
                }
                .seg.done {
                    background: linear-gradient(90deg, var(--gold) 0%, #ffd166 100%);
                    box-shadow: 0 0 8px var(--glow-gold);
                }

                .section-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 4px;
                    text-transform: uppercase;
                    color: rgba(255,175,0,0.6);
                    padding: 20px 22px 8px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .section-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, rgba(255,175,0,0.2), transparent);
                }

                .history-row {
                    display: flex;
                    gap: 5px;
                    padding: 0 18px;
                    justify-content: space-between;
                }

                .day-dot {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                }

                .day-icon-wrap {
                    width: 36px; height: 36px;
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    position: relative;
                }

                .day-dot.past .day-icon-wrap {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.08);
                }

                .day-dot.today .day-icon-wrap {
                    background: linear-gradient(135deg, rgba(255,175,0,0.2), rgba(26,93,148,0.3));
                    border: 1.5px solid var(--gold);
                    box-shadow: 0 0 12px rgba(255,175,0,0.3);
                }

                .day-label {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 9px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: var(--dim);
                    text-transform: uppercase;
                }
                .day-dot.today .day-label { color: var(--gold); }

                .quests {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    padding: 0 18px;
                }

                .quest-card {
                    position: relative;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                }

                .quest-card-inner {
                    position: relative;
                    background: linear-gradient(135deg, rgba(20,33,67,0.92) 0%, rgba(17,34,91,0.7) 100%);
                    border: 1px solid rgba(255,175,0,0.15);
                    border-radius: 16px;
                    padding: 16px 16px 14px;
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    box-shadow: 0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05);
                    overflow: hidden;
                }

                .quest-icon {
                    width: 52px; height: 52px;
                    border-radius: 13px;
                    flex-shrink: 0;
                    position: relative;
                    display: flex; align-items: center; justify-content: center;
                }

                .quest-icon-glow {
                    position: absolute; inset: 0;
                    border-radius: 13px;
                    opacity: 0.6;
                    filter: blur(6px);
                }

                .quest-icon-svg {
                    position: relative;
                    z-index: 2;
                    width: 36px; height: 36px;
                    filter: drop-shadow(0 2px 6px rgba(0,0,0,0.5));
                }

                .icon-spell .quest-icon-glow { background: radial-gradient(circle, rgba(0,220,180,0.7), rgba(0,150,140,0.3)); }
                .icon-spell { background: linear-gradient(145deg, #0d3a35, #0a2828); border: 1px solid rgba(0,220,180,0.3); }

                .icon-streak .quest-icon-glow { background: radial-gradient(circle, rgba(255,140,40,0.7), rgba(200,80,0,0.3)); }
                .icon-streak { background: linear-gradient(145deg, #2a1a08, #1a1008); border: 1px solid rgba(255,140,40,0.3); }

                .icon-boss .quest-icon-glow { background: radial-gradient(circle, rgba(255,100,50,0.6), rgba(150,30,10,0.3)); }
                .icon-boss { background: linear-gradient(145deg, #2a1008, #1a0a04); border: 1px solid rgba(200,80,30,0.3); }

                .quest-body {
                    flex: 1;
                    min-width: 0;
                }

                .quest-name {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 17px;
                    font-weight: 800;
                    letter-spacing: 0.8px;
                    color: #fff;
                    text-transform: uppercase;
                    line-height: 1.1;
                    margin-bottom: 4px;
                }

                .quest-progress-text {
                    font-family: 'Exo 2', sans-serif;
                    font-size: 11px;
                    font-weight: 400;
                    color: var(--dim);
                    margin-bottom: 10px;
                    letter-spacing: 0.3px;
                }

                .quest-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 6px;
                }
                .quest-meta .pct {
                    font-family: 'Exo 2', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    color: var(--dim);
                    letter-spacing: 1px;
                }

                .quest-bar-wrap {
                    height: 5px;
                    background: rgba(255,255,255,0.08);
                    border-radius: 3px;
                    overflow: visible;
                    position: relative;
                }

                .quest-bar-fill {
                    height: 100%;
                    border-radius: 3px;
                    position: relative;
                }
                .quest-bar-fill.teal {
                    background: linear-gradient(90deg, #00b4a0, #00dcc0);
                    box-shadow: 0 0 8px rgba(0,220,180,0.6);
                }
                .quest-bar-fill.orange {
                    background: linear-gradient(90deg, #f06000, #ff9a00);
                    box-shadow: 0 0 8px rgba(255,154,0,0.6);
                }

                .reward-pill {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    background: linear-gradient(135deg, rgba(255,175,0,0.15), rgba(255,175,0,0.05));
                    border: 1px solid rgba(255,175,0,0.3);
                    border-radius: 20px;
                    padding: 5px 10px 5px 7px;
                    box-shadow: 0 0 10px rgba(255,175,0,0.1);
                }

                .reward-pill span {
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 16px;
                    font-weight: 700;
                    color: var(--gold);
                    letter-spacing: 0.5px;
                }

                .reward-pct {
                    font-family: 'Exo 2', sans-serif;
                    font-size: 10px;
                    font-weight: 600;
                    color: var(--dim);
                    letter-spacing: 1px;
                    margin-top: 4px;
                    text-align: right;
                }

                .quest-card.locked .quest-card-inner {
                    opacity: 0.6;
                    background: linear-gradient(135deg, rgba(15,20,40,0.95) 0%, rgba(12,18,38,0.8) 100%);
                    border-color: rgba(255,255,255,0.07);
                }

                .quest-start-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: linear-gradient(135deg, #1a5d94 0%, #0e3a60 100%);
                    border: 1px solid rgba(26,93,148,0.7);
                    border-radius: 10px;
                    padding: 8px 14px;
                    font-family: 'Barlow Condensed', sans-serif;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: var(--silver);
                    box-shadow: 0 0 12px rgba(26,93,148,0.3);
                    white-space: nowrap;
                    flex-shrink: 0;
                }

                .claim-btn {
                    background: linear-gradient(135deg, #ffaf00 0%, #b87000 100%);
                    border: 1px solid rgba(255,175,0,0.7);
                    color: #142143;
                }

                .lock-badge {
                    position: absolute;
                    top: 10px; right: 10px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 8px;
                    padding: 4px 8px;
                    font-family: 'Exo 2', sans-serif;
                    font-size: 9px;
                    font-weight: 600;
                    color: rgba(228,228,228,0.35);
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
            `}</style>

            <div className="daily-challenge-container">
                <div className="bg-grid" />
                
                <svg className="bg-hex" viewBox="0 0 300 300" fill="none">
                    <polygon points="150,10 280,80 280,220 150,290 20,220 20,80" stroke="#1a5d94" strokeWidth="1.5" fill="none" opacity="0.7"/>
                    <polygon points="150,40 255,98 255,202 150,260 45,202 45,98" stroke="#ffaf00" strokeWidth="0.8" fill="none" opacity="0.4"/>
                    <polygon points="150,70 230,115 230,185 150,230 70,185 70,115" stroke="#1a5d94" strokeWidth="0.5" fill="none" opacity="0.3"/>
                </svg>

                <div className="orb-1" />
                <div className="orb-2" />

                <div className="content-wrapper scrollbar-hide">
                    {/* Header */}
                    <div className="dc-header">
                        <div className="header-back" onClick={onBack}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </div>
                        <span className="header-title">Daily Challenges</span>
                        <div className="credits-badge">
                            <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none">
                                <circle cx="11" cy="10" r="8" fill="url(#coinG)"/>
                                <circle cx="11" cy="10" r="6" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
                                <text x="11" y="14" textAnchor="middle" fontSize="7" fontWeight="900" fill="rgba(120,60,0,0.7)">$</text>
                            </svg>
                            <span>{coins}</span>
                        </div>
                    </div>

                    {/* Overall Progress */}
                    <div className="progress-card">
                        <svg className="absolute top-0 right-0 w-[100px] h-[100px] opacity-[0.04]" viewBox="0 0 100 100" fill="none">
                            <circle cx="100" cy="0" r="80" stroke="#ffaf00" strokeWidth="1" fill="none"/>
                            <circle cx="100" cy="0" r="55" stroke="#1a5d94" strokeWidth="0.5" fill="none"/>
                        </svg>

                        <div className="progress-label">Overall Progress</div>
                        <div className="progress-title-row">
                            <div className="progress-title">Daily Completion</div>
                            <div className="progress-count">{totalReadyOrClaimed}<em>/3</em></div>
                        </div>
                        <div className="seg-bar">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className={`seg ${i < totalReadyOrClaimed ? 'done' : ''}`} />
                            ))}
                        </div>
                        <div className="text-[#dim] text-[11px] flex items-center gap-1.5 opacity-60">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ffaf00" strokeWidth="2" strokeLinecap="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                            </svg>
                            Complete all to earn bonus rewards
                        </div>
                    </div>

                    {/* 7-Day History */}
                    <div className="section-label">7-Day History</div>
                    <div className="history-row">
                        {historyToDisplay.map((day, i) => (
                            <div key={i} className={`day-dot ${day.isToday ? 'today' : 'past'}`}>
                                <div className="day-icon-wrap">
                                    {day.completed ? (
                                        <svg viewBox="0 0 24 24" fill="none" stroke={day.isToday ? '#ffaf00' : '#00dcc0'} strokeWidth="2.5" strokeLinecap="round" width="16" height="16">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                    ) : day.isToday ? (
                                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                                            <circle cx="12" cy="12" r="9" stroke="var(--gold)" strokeWidth="1.8"/>
                                            <line x1="12" y1="8" x2="12" y2="12" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round"/>
                                            <line x1="12" y1="12" x2="15" y2="14" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
                                        </svg>
                                    ) : (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="rgba(228,228,228,0.25)" strokeWidth="2.5" strokeLinecap="round" width="14" height="14">
                                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                        </svg>
                                    )}
                                </div>
                                <span className="day-label">{day.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Active Quests */}
                    <div className="section-label">Active Quests</div>
                    <div className="quests">
                        
                        {/* QUEST 1: Spell 5 Tier A Assets */}
                        <div className={`quest-card ${m1.isClaimed ? 'opacity-60' : ''}`} onClick={() => isM1Ready && onClaim('tier_a_5', 300)}>
                            <div className="quest-card-inner">
                                <div className="quest-icon icon-spell">
                                    <div className="quest-icon-glow" />
                                    <svg className="quest-icon-svg" viewBox="0 0 36 36" fill="none">
                                        <path d="M18 4 L28 14 L22 32 L14 32 L8 14 Z" fill="#00dcc0" fillOpacity="0.8" />
                                        <path d="M18 4 L28 14 L18 18 L8 14 Z" fill="#00ffe8" fillOpacity="0.85" />
                                        <circle cx="18" cy="16" r="2.5" fill="white" fillOpacity="0.7" />
                                    </svg>
                                </div>

                                <div className="quest-body">
                                    <div className="quest-name">Spell 5 Tier A Assets</div>
                                    <div className="quest-meta">
                                        <div className="quest-progress-text">{Math.min(m1.progress, 5)} / 5 completed</div>
                                        <div className="pct">{Math.round(Math.min(100, (m1.progress / 5) * 100))}%</div>
                                    </div>
                                    <div className="quest-bar-wrap">
                                        <div className="quest-bar-fill teal" style={{ width: `${Math.min(100, (m1.progress / 5) * 100)}%` }} />
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    {m1.isClaimed ? (
                                        <span className="text-[10px] font-bold text-[#00dcc0] uppercase tracking-widest">Claimed</span>
                                    ) : isM1Ready ? (
                                        <button className="quest-start-btn claim-btn">CLAIM</button>
                                    ) : (
                                        <div className="reward-pill">
                                            <span>+300</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* QUEST 2: Achieve a 10x Streak */}
                        <div className={`quest-card ${m2.isClaimed ? 'opacity-60' : ''}`} onClick={() => isM2Ready && onClaim('streak_10', 500)}>
                            <div className="quest-card-inner">
                                <div className="quest-icon icon-streak">
                                    <div className="quest-icon-glow" />
                                    <svg className="quest-icon-svg" viewBox="0 0 36 36" fill="none">
                                        <path d="M18 4 C24 10 28 15 26 22 C25 26 22 29 18 30 C14 29 11 26 10 22 C8 15 12 10 18 4Z" fill="#ff6a00" />
                                        <ellipse cx="18" cy="23" rx="3" ry="4" fill="white" fillOpacity="0.5" />
                                    </svg>
                                </div>

                                <div className="quest-body">
                                    <div className="quest-name">Achieve a 10x Streak</div>
                                    <div className="quest-meta">
                                        <div className="quest-progress-text">{Math.min(m2.progress, 10)} / 10 completed</div>
                                        <div className="pct">{Math.round(Math.min(100, (m2.progress / 10) * 100))}%</div>
                                    </div>
                                    <div className="quest-bar-wrap">
                                        <div className="quest-bar-fill orange" style={{ width: `${Math.min(100, (m2.progress / 10) * 100)}%` }} />
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    {m2.isClaimed ? (
                                        <span className="text-[10px] font-bold text-[#00dcc0] uppercase tracking-widest">Claimed</span>
                                    ) : isM2Ready ? (
                                        <button className="quest-start-btn claim-btn">CLAIM</button>
                                    ) : (
                                        <div className="reward-pill">
                                            <span>+500</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* QUEST 3: Defeat 1 World Boss */}
                        <div className={`quest-card ${m3.isClaimed ? 'opacity-60' : ''}`} onClick={() => isM3Ready && onClaim('boss_1', 1500)}>
                            <div className="quest-card-inner">
                                <div className="quest-icon icon-boss">
                                    <div className="quest-icon-glow" />
                                    <svg className="quest-icon-svg" viewBox="0 0 36 36" fill="none">
                                        <path d="M18 5 L30 10 L30 20 C30 27 24 31 18 33 C12 31 6 27 6 20 L6 10 Z" fill="#cc3a10" />
                                        <circle cx="18" cy="19" r="4" fill="white" fillOpacity="0.2" />
                                    </svg>
                                </div>

                                <div className="quest-body">
                                    <div className="quest-name">Defeat 1 World Boss</div>
                                    <div className="quest-progress-text">{isM3Ready ? '1 / 1 completed' : 'Unlocks at Level 50'}</div>
                                </div>

                                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                    {m3.isClaimed ? (
                                        <span className="text-[10px] font-bold text-[#00dcc0] uppercase tracking-widest">Claimed</span>
                                    ) : isM3Ready ? (
                                        <button className="quest-start-btn claim-btn">CLAIM</button>
                                    ) : (
                                        <button onClick={(e) => { e.stopPropagation(); onPlay(); }} className="quest-start-btn">START</button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DailyChallenge;
