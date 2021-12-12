import React from 'react';
import './Separator.css'

export function Separator({ verticalMargin = '8px' }) {
  return <hr className='separator' style={{ margin: `${verticalMargin} 0px` }}/>
}