import React from 'react';

// Components
import { Grid, IconButton } from '@mui/material';
import { Separator } from '../separator/Separator';

// Helpers
import { colorPalette } from '../../fixed-data/colorPalette'

// Icons
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OutboundTwoToneIcon from '@mui/icons-material/OutboundTwoTone';

// CSS
import './SheetItem.css'

export function SheetItem({ sheet, onShow }) {
  return (
    <div>
      <div className='sheet-item-container'>

        <Grid container alignItems='center'>

          <Grid item xs={2}>
            <div className='sheet-icon-container sheet-arrow-icon-size'>
              <ArrowForwardIosIcon color='primary' fontSize='inherit' />
            </div>
          </Grid>

          <Grid item xs={6}>
            <div className='sheet-name-container'>
              <p className='text no-m s-bold'>{sheet.name}</p>
            </div>
          </Grid>

          <Grid item xs={2}>
            <div className='sheet-type-container'>
              <p className='text no-m s-bold'>{sheet.type}</p>
            </div>
          </Grid>

          <Grid item xs={2} container justifyContent='flex-end'>
            <div className='sheet-icon-container'>
              <IconButton className='sheet-show-icon-size' onClick={() => onShow(sheet.id)}>
                <OutboundTwoToneIcon color='primary' fontSize='inherit' />
              </IconButton>
            </div>
          </Grid>

        </Grid>

      </div>

      <Separator color={colorPalette.darkerWhite} marginTop='0px' marginBottom='0px' />
    </div>
  )
}