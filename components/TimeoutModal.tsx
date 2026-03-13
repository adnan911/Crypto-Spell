import React from 'react';
import { RefreshCw, ArrowLeft, Hourglass } from 'lucide-react';

interface TimeoutModalProps {
    isOpen: boolean;
    onRestart: () => void;
    onMenu: () => void;
}

const TimeoutModal: React.FC<TimeoutModalProps> = ({ isOpen, onRestart, onMenu }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Modal Content */}
            <div className="relative w-full max-w-sm flex flex-col items-center text-center shadow-2xl overflow-hidden group"
                style={{
                    background: 'var(--theme-bg-secondary)',
                    borderRadius: 'var(--theme-radius)',
                    border: '1px solid var(--theme-glass-accent-border)'
                }}>

                {/* Background Grid & Glows */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[var(--theme-accent-1)]/20 to-transparent opacity-80" />
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--theme-accent-3)]/20 to-transparent opacity-50" />

                <div className="relative z-10 w-full p-8 flex flex-col items-center">
                    
                    {/* Floating Icon Orb */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-[var(--theme-accent-3)] blur-2xl opacity-40 border-radius-full" />
                        <div className="w-20 h-20 rounded-full glass flex items-center justify-center border-4 border-white/20 shadow-[0_0_30px_var(--theme-accent-3)] relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-accent-3)]/80 to-[var(--theme-accent-1)]/80 opacity-60 mix-blend-overlay" />
                             <Hourglass size={40} className="text-white drop-shadow-lg relative z-10" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 drop-shadow-md">
                        TIME'S UP
                    </h2>
                    
                    <div className="h-1 w-16 bg-gradient-to-r from-transparent via-[var(--theme-accent-3)] to-transparent mb-4 opacity-70 rounded-full" />

                    <p className="text-[var(--theme-text-muted)] font-bold mb-10 tracking-wide text-sm leading-relaxed px-4">
                        The blockchain waits for no one. You ran out of time to solve the protocol.
                    </p>

                    <div className="w-full flex flex-col gap-4">
                        <button type="button" className="btn-space w-full py-4" onClick={onRestart}>
                            <strong>RESTART NODE</strong>
                            <div id="container-stars">
                                <div id="stars"></div>
                            </div>

                            <div id="glow">
                                <div className="circle"></div>
                                <div className="circle"></div>
                            </div>
                        </button>
                        <button
                            onClick={onMenu}
                            className="w-full py-4 glass text-white/90 border border-white/10 font-black text-sm rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10"
                            style={{ borderRadius: 'calc(var(--theme-radius) * 0.8)' }}
                        >
                            <ArrowLeft size={18} />
                            ABORT TO MENU
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeoutModal;
