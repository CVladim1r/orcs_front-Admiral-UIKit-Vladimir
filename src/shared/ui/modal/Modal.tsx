import type { FC } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({ isOpen, children, title, onClose }) => {
  return createPortal(
    <dialog className={`modal  ${isOpen ? 'modal-open' : null}`}>
      <div className="modal-box">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        {title ? <h3 className="font-bold text-lg">{title}</h3> : null}
        {children}
      </div>
    </dialog>,
    document.body,
  );
};
