import React, { useRef, useEffect } from 'react';
import { X, Award } from 'lucide-react';

interface LevelsModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentLevel: number;
}

// Data structure for the vertical timeline chunks (50 levels each)
const ERA_CHUNKS = [
    { start: 1, end: 50, name: 'NOVICE' },
    { start: 51, end: 100, name: 'EXPLORER' },
    { start: 101, end: 150, name: 'TRADER' },
    { start: 151, end: 200, name: 'ANALYST' },
    { start: 201, end: 250, name: 'DIAMOND HANDS' },
    { start: 251, end: 300, name: 'DEGEN' },
    { start: 301, end: 350, name: 'WHALE' },
    { start: 351, end: 400, name: 'ORACLE' },
    { start: 401, end: 450, name: 'CYBERPUNK' },
    { start: 451, end: 500, name: 'SATOSHI' }
];

// Data structure for Rank bands (10 levels each)
const RANK_CHUNKS = [
    { start: 1, end: 10, name: 'BRONZE' },
    { start: 11, end: 20, name: 'SILVER' },
    { start: 21, end: 30, name: 'GOLD' },
    { start: 31, end: 40, name: 'PLATINUM' },
    { start: 41, end: 50, name: 'EMERALD' },
    { start: 51, end: 60, name: 'DIAMOND' },
    { start: 61, end: 70, name: 'MASTER' },
    { start: 71, end: 80, name: 'GRANDMASTER' }
];

type TabType = 'ERA' | 'RANK';

const LevelsModal: React.FC<LevelsModalProps> = ({ isOpen, onClose, currentLevel }) => {
    const [activeTab, setActiveTab] = React.useState<TabType>('ERA');
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the active level chunk on open or tab change
    useEffect(() => {
        if (isOpen && scrollRef.current) {
            const activeElement = scrollRef.current.querySelector('.chunk-active');
            if (activeElement) {
                setTimeout(() => {
                    activeElement.scrollIntoView({ behavior: 'auto', block: 'center' });
                }, 100);
            }
        }
    }, [isOpen, currentLevel, activeTab]);

    if (!isOpen) return null;

    const currentChunks = activeTab === 'ERA' ? ERA_CHUNKS : RANK_CHUNKS;

    // Special case handling for Grandmaster being 71+ (no upper bound technically in the game loop)
    const isLevelActive = (level: number, chunk: { start: number, end: number, name: string }) => {
        if (chunk.name === 'GRANDMASTER' && level >= 71) return true;
        return level >= chunk.start && level <= chunk.end;
    };

    const isLevelPast = (level: number, chunk: { start: number, end: number, name: string }) => {
        if (chunk.name === 'GRANDMASTER') return false; // Never past the final rank
        return level > chunk.end;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div 
                className="relative w-full max-w-sm max-h-[80vh] flex flex-col bg-[var(--theme-bg-secondary)] border border-[var(--theme-glass-accent-border)] shadow-2xl overflow-hidden"
                style={{ borderRadius: 'var(--theme-radius)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-[var(--theme-glass-accent-border)] bg-black/20 z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-[var(--theme-accent-1)] to-[var(--theme-accent-2)] shadow-[0_0_15px_var(--theme-accent-1)]">
                            <Award className="text-white" size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white tracking-wider">ROADMAP</h2>
                            <p className="text-xs font-bold text-[var(--theme-text-muted)] tracking-[0.2em] uppercase">Current: Level {currentLevel}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center glass rounded-full hover:bg-white/10 text-white/70 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[var(--theme-glass-accent-border)] bg-[var(--theme-bg-tertiary)]/50">
                    <button
                        onClick={() => setActiveTab('ERA')}
                        className={`flex-1 py-3 text-xs font-black uppercase tracking-widest
                            ${activeTab === 'ERA' 
                                ? 'text-[var(--theme-accent-2)] border-b-2 border-[var(--theme-accent-2)] bg-[var(--theme-accent-2)]/10' 
                                : 'text-[var(--theme-text-muted)] hover:text-white'}
                        `}
                    >
                        ERA PATH
                    </button>
                    <button
                        onClick={() => setActiveTab('RANK')}
                        className={`flex-1 py-3 text-xs font-black uppercase tracking-widest
                            ${activeTab === 'RANK' 
                                ? 'text-[var(--theme-accent-3)] border-b-2 border-[var(--theme-accent-3)] bg-[var(--theme-accent-3)]/10' 
                                : 'text-[var(--theme-text-muted)] hover:text-white'}
                        `}
                    >
                        RANK PATH
                    </button>
                </div>

                {/* Timeline Content */}
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 custom-scrollbar relative"
                >
                    <div className="flex flex-col gap-[2px] pb-12">
                        {currentChunks.map((chunk, index) => {
                            const isActive = isLevelActive(currentLevel, chunk);
                            const isPast = isLevelPast(currentLevel, chunk);

                            // Choose the accent color based on the selected tab
                            const accentVar = activeTab === 'ERA' ? 'var(--theme-accent-2)' : 'var(--theme-accent-3)';

                            return (
                                <div 
                                    key={index}
                                    className={`relative flex-1 px-5 py-3.5 select-none flex items-center justify-between overflow-hidden group
                                        ${isActive ? 'chunk-active z-10' : 'z-0'} 
                                        ${isPast ? 'opacity-90' : 'opacity-40'}
                                    `}
                                    style={{ borderRadius: '6px' }}
                                >
                                    {/* Elegant Background Layer */}
                                    <div className={`absolute inset-0
                                        ${isActive 
                                            ? `bg-gradient-to-r from-[${accentVar}]/20 via-black/40 to-black/60 border border-[${accentVar}]/30` 
                                            : 'bg-black/30 border border-white/5'
                                        }
                                    `} style={{ borderRadius: '6px' }}></div>
                                    
                                    {/* Active Left Indicator Bar */}
                                    {isActive && (
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-[${accentVar}] shadow-[0_0_15px_${accentVar}]`}></div>
                                    )}

                                    <div className="relative z-10 flex items-center gap-3">
                                        <h3 className={`font-black text-[13px] tracking-[0.2em] uppercase m-0
                                            ${isActive ? `text-[${accentVar}] drop-shadow-[0_0_8px_${accentVar}] glow-text` : 'text-white/80'}
                                        `}>
                                            {chunk.name}
                                        </h3>
                                    </div>
                                    <span className={`relative z-10 text-[9px] uppercase font-bold tracking-widest
                                        ${isActive ? `text-white drop-shadow-md` : 'text-white/40'}
                                    `}>
                                        {chunk.name === 'GRANDMASTER' ? 'LVL 71+' : `LEVEL ${chunk.start} - ${chunk.end}`}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                {/* Bottom Fade Gradient Overlay indicating scroll */}
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[var(--theme-bg-secondary)] to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default LevelsModal;
