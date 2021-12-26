import React from 'react';
import './BasicHeader.css'

export function BasicHeader({ whiteText = '', secondText = '', icon = '' }) {
  return (
    <div className='flex-text-wrapper'>
      {icon 
        ? <div className='header-icon-container'>{icon}</div>
        : ''
      }
      <div className='title'>{whiteText}</div>
      <div className='title primary-text'>{secondText}</div>
    </div>
  );
}