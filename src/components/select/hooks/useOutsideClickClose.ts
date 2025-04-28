import { useEffect } from 'react';

type UseOutsideClickClose = {
  isOpen: boolean;
  rootRef: React.RefObject<HTMLElement>;
  onClose?: () => void;
  onChange: (newState: boolean) => void;
};

export const useOutsideClickClose = ({
  isOpen,
  rootRef,
  onClose,
  onChange,
}: UseOutsideClickClose) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!isOpen) return; // если уже закрыто — ни в коем разе не трогаем
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) {
        onClose?.();
        onChange(false);
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isOpen, rootRef, onClose, onChange]);
};
