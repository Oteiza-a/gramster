import React from 'react';
import './GramsterLogoText.css'

export function GramsterLogoText({ fontSize = '50px' }) {
  return (
    <div className='gramster-logo-container'>
      <h1 className='gramster-logo-1' style={{ fontSize }}>GRAM</h1>
      <h1 className='gramster-logo-2' style={{ fontSize }}>STER</h1>
    </div>
  );
}