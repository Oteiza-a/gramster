import React from 'react';
import ViewInArTwoToneIcon from '@mui/icons-material/ViewInArTwoTone';
import './Empty.css'

export function Empty({ primaryText, secondaryText, containerHeight }) {
  return (
    <div className='empty-container' style={{ height: containerHeight }}>
      <div className='empty-icon-container' style={{ height: '65px' }}>
        <ViewInArTwoToneIcon color='secondary' fontSize='inherit' />
      </div>
      {primaryText && 
        <div>
          <p className='subtitle s-bold empty-text'>{primaryText}</p>
        </div>
      }
      {secondaryText &&
        <div>
          <p className='text empty-text'>{secondaryText}</p>
        </div>
      }
    </div>
  );
}