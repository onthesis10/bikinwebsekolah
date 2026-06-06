import React, { useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  avatarText?: string;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  avatarText,
  children,
}) => {
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
    <div className="fixed inset-0 z-[90]">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-[440px] bg-surface shadow-lg flex flex-col animate-[slidein_0.28s_cubic-bezier(0.2,0.7,0.2,1)] z-10 border-l border-line">
        <div className="p-[22px] border-b border-line flex items-center gap-[14px] flex-none">
          {avatarText && (
            <span className="w-[50px] h-[50px] rounded-[14px] bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-lg">
              {avatarText}
            </span>
          )}
          <div>
            {title && <div className="text-[1.15rem] font-extrabold">{title}</div>}
            {subtitle && <div className="text-[0.82rem] text-muted">{subtitle}</div>}
          </div>
          <button
            onClick={onClose}
            className="ml-auto w-[38px] h-[38px] border border-line rounded-[10px] flex items-center justify-center hover:bg-surface-2 transition"
            aria-label="Tutup"
          >
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px] stroke-current">
              <path d="M6 6l12 12M18 6 6 18" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="p-[22px] overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Drawer;
export type { DrawerProps };
