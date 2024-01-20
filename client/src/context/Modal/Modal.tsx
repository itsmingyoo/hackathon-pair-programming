import React, { useRef, useState, useContext, ReactNode, ReactElement, Dispatch, SetStateAction } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalContextType {
    modalRef: React.RefObject<HTMLDivElement>;
    modalContent: ReactElement | null;
    setModalContent: Dispatch<SetStateAction<ReactElement | null>>;
    setOnModalClose: Dispatch<SetStateAction<(() => void) | null>>;
    closeModal: () => void;
}

const ModalContext = React.createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
    children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [modalContent, setModalContent] = useState<ReactElement | null>(null);
    const [onModalClose, setOnModalClose] = useState<(() => void) | null>(null);

    const closeModal = () => {
        setModalContent(null);
        if (typeof onModalClose === 'function') {
            const callback = onModalClose;
            setOnModalClose(null);
            callback();
        }
    };

    const contextValue = {
        modalRef,
        modalContent,
        setModalContent,
        setOnModalClose,
        closeModal,
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal() {
    const context = useContext(ModalContext);

    if (!context) return null;

    const { modalRef, modalContent, closeModal } = context;

    if (!modalRef.current || !modalContent) return null;

    return ReactDOM.createPortal(
        <div id="modal">
            <div id="modal-background" onClick={closeModal} />
            <div id="modal-content">{modalContent}</div>
        </div>,
        modalRef.current
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
