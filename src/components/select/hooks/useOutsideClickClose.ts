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
    const handlePointerDown = (e: MouseEvent) => {
      if (!isOpen) return;
      const el = rootRef.current;
      // если клик вне rootRef — закрываем
      if (el && !el.contains(e.target as Node)) {
        onClose?.();
        onChange(false);
      }
    };

    // слушаем на pointerdown (mousedown) в capture-фазе
    window.addEventListener('pointerdown', handlePointerDown, true);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown, true);
    };
  }, [isOpen, rootRef, onClose, onChange]);
};
