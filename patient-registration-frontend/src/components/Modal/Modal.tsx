import React from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  messageType: 'error' | 'multiple-errors' | 'success' | 'info'; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message, messageType }) => {
  if (!isOpen) return null;

  let modalClassName = 'modal';
  let contentClassName = 'modal-content';
  let modalTitleClassName = 'modal-title';

  // Determinar clases y estilos basados en el tipo de mensaje
  if (messageType === 'error') {
    modalClassName += ' modal-error';
    modalTitleClassName += ' error';
    contentClassName += ' modal-error-content';
  } else if (messageType === 'multiple-errors') {
    modalClassName += ' modal-multiple-errors';
    modalTitleClassName += ' error';
    contentClassName += ' modal-multiple-errors-content';
  } else if (messageType === 'success') {
    modalClassName += ' modal-success';
    modalTitleClassName += ' success';
    contentClassName += ' modal-success-content';
  } else {
    modalClassName += ' modal-info';
    modalTitleClassName += ' info';
    contentClassName += ' modal-info-content';
  }

  return (
    <div className="modal-background">
      <div className={modalClassName}>
        <div className={contentClassName}>
          
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          {messageType === 'error' && (
            <>
              <h3 className={modalTitleClassName}>Error</h3>
              <p>{message}</p>
            </>
          )}
          {messageType === 'multiple-errors' && (
            <>
              <h3 className={modalTitleClassName}>Errors</h3>
              <ul>
                {message.split('\n').map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </>
          )}
          {messageType === 'success' && (
            <>
              <h3 className={modalTitleClassName}>Success</h3>
              <p>{message}</p>
            </>
          )}
          {messageType === 'info' && (
            <>
              <h3 className={modalTitleClassName}>Info</h3>
              <p>{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
