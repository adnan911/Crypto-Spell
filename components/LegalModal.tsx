import React from 'react';
import { X, Shield, FileText, AlertCircle, RefreshCw, Mail } from 'lucide-react';
import { soundManager } from '../services/soundManager';

interface LegalModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    content: string;
    type: 'privacy' | 'terms' | 'risk' | 'refund';
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content, type }) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'privacy': return <Shield className="text-emerald-400" size={24} />;
            case 'terms': return <FileText className="text-blue-400" size={24} />;
            case 'risk': return <AlertCircle className="text-amber-400" size={24} />;
            case 'refund': return <RefreshCw className="text-rose-400" size={24} />;
            default: return <FileText className="text-white/70" size={24} />;
        }
    };

    const getAccentColor = () => {
        switch (type) {
            case 'privacy': return 'rgba(52, 211, 153, 0.2)';
            case 'terms': return 'rgba(96, 165, 250, 0.2)';
            case 'risk': return 'rgba(251, 191, 36, 0.2)';
            case 'refund': return 'rgba(251, 113, 133, 0.2)';
            default: return 'rgba(255, 255, 255, 0.1)';
        }
    };

    // Helper to render "markdown-like" sections
    const renderContent = (text: string) => {
        return text.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
                return <h2 key={i} className="text-lg font-black text-white mt-6 mb-3 uppercase tracking-wider border-b border-white/10 pb-1">{line.replace('# ', '')}</h2>;
            }
            if (line.startsWith('## ')) {
                return <h3 key={i} className="text-sm font-bold text-white/90 mt-4 mb-2 uppercase tracking-widest">{line.replace('## ', '')}</h3>;
            }
            if (line.startsWith('* ')) {
                return <li key={i} className="ml-4 text-white/60 text-sm mb-1 list-disc">{line.replace('* ', '')}</li>;
            }
            if (line.trim() === '') return <div key={i} className="h-2" />;
            return <p key={i} className="text-white/70 text-sm leading-relaxed mb-3">{line}</p>;
        });
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/90 backdrop-blur-md" 
                onClick={() => { soundManager.playClick(); onClose(); }}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col bg-black/40 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                {/* Accent Glow */}
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 blur-3xl rounded-full opacity-20 pointer-events-none" 
                    style={{ backgroundColor: getAccentColor() }}
                />

                {/* Header */}
                <header className="px-8 pt-8 pb-4 flex items-center justify-between border-b border-white/5 shrink-0 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
                            {getIcon()}
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white tracking-tight uppercase leading-none">{title}</h1>
                            <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] mt-1 uppercase">CryptoSpell Legal</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => { soundManager.playClick(); onClose(); }}
                        className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white border border-transparent hover:border-white/10"
                    >
                        <X size={24} />
                    </button>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar relative z-10 bg-gradient-to-b from-transparent to-black/20">
                    <div className="prose prose-invert max-w-none">
                        {renderContent(content)}
                    </div>
                    
                    {/* Contact Support Footer in Modal */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-3 text-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/60">
                            <Mail size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-1">Need Clarification?</p>
                            <a 
                                href="mailto:onchainersLab@gmail.com" 
                                className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                onchainersLab@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Gradient Over Content (Subtle) */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
};

export default LegalModal;
