import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-ink/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative bg-surface rounded-xl border border-line shadow-lg max-w-2xl w-full p-6 md:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col animate-[pop_0.3s_ease]">
        <div className="flex items-center justify-between pb-4 border-b border-line mb-4 flex-none">
          {title && <h2 className="text-xl font-bold">{title}</h2>}
          <button
            onClick={onClose}
            className="w-9 h-9 border border-line rounded-lg flex items-center justify-center hover:bg-surface-2 transition ml-auto"
            aria-label="Tutup"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 stroke-current">
              <path d="M6 6l12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 pr-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
