import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div
      className={`fixed z-[120] bg-ink text-white px-5 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 pointer-events-none
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0`}
    >
      {message}
    </div>
  );
};
export default Toast;
