// Reusable Confirmation Modal
import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    type?: 'danger' | 'warning' | 'info';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    type = 'warning'
}) => {
    if (!isOpen) return null;

    const getColor = () => {
        switch (type) {
            case 'danger': return 'red';
            case 'warning': return 'yellow';
            case 'info': return 'blue';
            default: return 'yellow';
        }
    };

    const color = getColor();

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onCancel}
            />

            {/* Modal */}
            <div
                className="relative w-full max-w-sm p-6 text-center border-2 bg-[var(--theme-bg-primary)]"
                style={{
                    borderColor: type === 'danger' ? '#ef4444' : '#fbbf24',
                    boxShadow: `0 0 40px ${type === 'danger' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`,
                    borderRadius: 'var(--theme-radius)'
                }}
            >
                {/* Icon */}
                <div 
                    className="mx-auto mb-4 w-16 h-16 flex items-center justify-center border-2 bg-white/5"
                    style={{ 
                        borderColor: type === 'danger' ? '#ef4444' : '#fbbf24',
                        borderRadius: 'var(--theme-radius-full)'
                    }}
                >
                    <AlertTriangle size={32} className={type === 'danger' ? 'text-red-500' : 'text-yellow-400'} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-[var(--theme-text)] mb-2">{title}</h3>
                <p className="text-[var(--theme-text-muted)] font-medium mb-8 leading-relaxed">
                    {message}
                </p>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onCancel}
                        className="flex-1 py-3 px-4 font-bold text-sm bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                        style={{ borderRadius: 'var(--theme-radius)' }}
                    >
                        {cancelLabel}
                    </button>

                    <button
                        onClick={onConfirm}
                        className={`flex-1 py-3 px-4 font-bold text-sm text-black flex items-center justify-center gap-2
              ${type === 'danger' ? 'bg-red-500 hover:bg-red-400' : 'bg-yellow-400 hover:bg-yellow-300'}
            `}
                        style={{ borderRadius: 'var(--theme-radius)' }}
                    >
                        <Check size={16} />
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
