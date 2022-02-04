import React from 'react';
import './ModalBase.css'

export function ModalBase({ isOpen, children, backdropCallback, }) {
  return (
    <div 
      className={`modal-background ${isOpen ? 'background-open' : 'background-closed'}`}
    >
      <div className={`modal-card ${isOpen ? 'modal-open' : 'modal-closed'}`}>
        { children }
      </div>
    </div>
  );
}