import React, { useEffect } from 'react';
import { Lightbulb, X } from 'lucide-react';

interface HintToastProps {
    message: string;
    subtext?: string;
    isVisible: boolean;
    onClose: () => void;
    type?: 'INFO' | 'SUCCESS' | 'WARNING';
}

const HintToast: React.FC<HintToastProps> = ({
    message, subtext, isVisible, onClose, type = 'INFO'
}) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onClose, 4000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    const bgStyles = type === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500/50' :
        type === 'WARNING' ? 'bg-orange-500/20 border-orange-500/50' :
            'bg-purple-500/20 border-purple-500/50';

    return (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4 pointer-events-none">
            <div className={`
        relative backdrop-blur-xl border rounded-2xl p-4 shadow-2xl 
        ${bgStyles}
      `}>
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <Lightbulb size={20} className="text-yellow-400" fill="currentColor" />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-white font-bold text-lg leading-tight drop-shadow-md">
                            {message}
                        </h3>
                        {subtext && (
                            <p className="text-white/70 text-sm mt-1 font-medium">
                                {subtext}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HintToast;
