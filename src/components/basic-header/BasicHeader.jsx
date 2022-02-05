import React from 'react';
import './BasicHeader.css'

export function BasicHeader({ whiteText = '', secondText = '', icon = '' }) {
  return (
    <div className='flex-text-wrapper'>
      {icon 
        ? <div className='header-icon-container'>{icon}</div>
        : ''
      }
      <div className='title no-m'>{whiteText}</div>
      <div className='title no-m primary-text'>{secondText}</div>
    </div>
  );
}