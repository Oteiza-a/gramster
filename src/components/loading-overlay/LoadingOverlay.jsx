import React from 'react';
import { CircularProgress } from '@mui/material';
import './LoadingOverlay.css'

export const LoadingOverlay = ({ loading }) => (
  <div className={`loading-overlay-container ${loading ? 'display-overlay' : 'hide-overlay'}`} >
    <div className='overlay-loading'>
      <CircularProgress color='primary' size={60} />
    </div>
    <div className='overlay-loading'>
      <CircularProgress color='secondary' size={50} />
    </div>
  </div>
)