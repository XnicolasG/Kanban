import { useEffect, useRef } from "react";
import { Plus } from "../icons/Plus";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string; 
    children: React.ReactNode;
    className?: string; 
  }
  
  export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
  
    useEffect(() => {
      if (isOpen) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
      }
    }, [isOpen]);
  
    const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) {
        onClose();
      }
    };
  
    return (
      <dialog
        ref={dialogRef}
        onClick={handleOutsideClick}
        className={`alert-dialog p-4 rounded bg-zinc-900 w-full md:w-1/2 ${className} transition-all duration-150`}
      >
        <button
          className="text-white text-xl absolute right-4 hover:text-red-500 hover:scale-110 duration-150"
          onClick={onClose}
        >
          <Plus className={`rotate-45 `} />
        </button>
        {title && <h2 className="text-white text-lg mb-4">{title}</h2>}
        {children}
      </dialog>
    );
  };
