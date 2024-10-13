import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <button style={modalStyles.closeButton} onClick={onClose}>X</button>
                {children}
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Đảm bảo modal hiển thị trên cùng
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        position: 'absolute',
        top: '10px',
        right: '10px',
    },
};

export default Modal;
