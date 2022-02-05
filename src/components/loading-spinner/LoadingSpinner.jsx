import React from 'react';
import { CircularProgress } from '@mui/material';
import './LoadingSpinner.css'

export const LoadingSpinner = ({ loading, size, containerHeight }) => {
  const smallSize = size - ((20 / 100) * size)

  if (!loading) return ''

  return (
    <div className='spinner-container' style={{ height:`${containerHeight}px` }}>
      <div className='spinner-wrapper' style={{ width:`${size}px`, height: `${size}px`}}>
        <CircularProgress color='primary' size={size} className='loading-spinner-wrapper'/>
        <CircularProgress color='secondary' size={smallSize} className='loading-spinner-wrapper'/>
      </div>
    </div>
  )
}