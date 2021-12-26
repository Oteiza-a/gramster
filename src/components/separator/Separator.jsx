import React from 'react';
import { colorPalette } from '../../fixed-data/colorPalette'
import './Separator.css'

export function Separator({ marginTop = '8px', marginBottom = '8px', color = colorPalette.neutralWhite }) {
  return <hr className='separator' style={{ marginTop, marginBottom, borderTop: `2px solid ${color}`  }}/>
}