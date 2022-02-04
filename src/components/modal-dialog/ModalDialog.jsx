import React from 'react';
import { Button } from '@mui/material';
import './ModalDialog.css'

export function ModalDialog({ 
  icon, 
  title, 
  text, 
  acceptButtonText, 
  rejectButtonText,
  acceptButtonCallback,
  rejectButtonCallback,
}) {
  return (
    <div className='modal-dialog-container'>

      <div className='dialog-icon-container'>
        {icon}
      </div>

      <div className='dialog-content'>

        <p className='title'>{title}</p>
        <span className='text'>{text}</span>

        <div className='dialog-buttons-container'>

          {Boolean(rejectButtonText) && 
            <Button 
              onClick={rejectButtonCallback} 
              variant="contained"
              color='error'
            >
              {rejectButtonText}
            </Button>
          }

          {Boolean(acceptButtonText) &&
            <Button 
              onClick={acceptButtonCallback} 
              variant="contained"
              color='primary'
            >
              {acceptButtonText}
            </Button>
          }
        </div>
      </div>
    </div>
  );
}