import React from 'react';
import { colorPalette } from '../../fixed-data/colorPalette'
import './Separator.css'

export function Separator({ verticalMargin = '8px', color = colorPalette.neutralWhite }) {
  return <hr className='separator' style={{ margin: `${verticalMargin} 0px`, borderTop: `2px solid ${color}`  }}/>
}