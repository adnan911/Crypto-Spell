import React from 'react';
import { Milestone } from '../services/milestones';
import { Trophy, Coins, Sparkles, MoveRight } from 'lucide-react';

interface MilestoneModalProps {
    milestone: Milestone;
    onClaim: () => void;
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ milestone, onClaim }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <div 
                className="relative w-full max-w-sm bg-gradient-to-b from-[var(--theme-bg-tertiary)] to-[var(--theme-bg-primary)] border border-[var(--theme-glass-accent-border)] p-8 shadow-[0_0_100px_rgba(168,85,247,0.4)] text-center"
                style={{ borderRadius: 'var(--theme-radius)' }}
            >

                {/* Glow Effect */}
                <div 
                    className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-60 bg-[var(--theme-accent-1)]/30 blur-[100px] pointer-events-none"
                    style={{ borderRadius: 'var(--theme-radius-full)' }}
                />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div 
                        className="w-24 h-24 bg-gradient-to-tr from-[var(--theme-accent-3)] to-[var(--theme-accent-2)] flex items-center justify-center shadow-xl"
                        style={{ borderRadius: 'var(--theme-radius-full)' }}
                    >
                        <Trophy size={48} className="text-white drop-shadow-md" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--theme-accent-3)] via-[var(--theme-text)] to-[var(--theme-accent-3)] mb-2">
                            MILESTONE!
                        </h2>
                        <p className="text-[var(--theme-text-muted)] font-bold uppercase tracking-widest text-sm">
                            Level {milestone.level} Reached
                        </p>
                    </div>

                    <div 
                        className="bg-white/5 border border-[var(--theme-glass-border)] p-6 w-full flex flex-col gap-4"
                        style={{ borderRadius: 'var(--theme-radius)' }}
                    >
                        <div className="flex items-center justify-center gap-2">
                            <Sparkles className="text-[var(--theme-accent-3)]" size={16} />
                            <span className="text-[var(--theme-text)] font-bold text-lg">{milestone.badge} Badge</span>
                            <Sparkles className="text-[var(--theme-accent-3)]" size={16} />
                        </div>

                        <div className="h-px bg-white/10 w-full" />

                        <div className="flex justify-around">
                            <div className="flex flex-col items-center gap-1">
                                <Coins className="text-[var(--theme-accent-3)]" size={24} />
                                <span className="text-[var(--theme-text)] font-black">+{milestone.coins}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClaim}
                        className="w-full py-4 btn-theme-1 text-white font-black text-xl shadow-lg flex items-center justify-center gap-2 group"
                        style={{ borderRadius: 'var(--theme-radius)' }}
                    >
                        CLAIM REWARDS
                        <MoveRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MilestoneModal;
