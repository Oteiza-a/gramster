import { TextField } from '@mui/material';
import React from 'react';

// Components
import { Separator } from '../../components/separator/Separator'

// Utils
import { colorPalette } from '../../fixed-data/colorPalette'

// CSS
import './SheetForm.css'

export function SheetForm() {

  return (
    <div className='sheet-page-container'>
      <div className='basic-page-template'>

        <div className='flex-text-wrapper'>
          <div className='title'>Create</div>
          <div className='title primary-text'>New Sheet</div>
        </div>

        <Separator color={colorPalette.darkerWhite} />

        <div className="sheet-from-container">
          <TextField label='Name' variant='filled' />
        </div>

      </div>
    </div>
  );
}