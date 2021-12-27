import React from 'react';
import { LinearProgress } from '@mui/material';
import './HorizontalLoading.css'

export const HorizontalLoading = ({ loading, marginTop = '15px', marginBottom = '15px' }) => (
  loading 
    ? <div className='horizontal-loading-wrapper' style={{ marginTop, marginBottom }}>
        <LinearProgress color='secondary' />
        <LinearProgress color='primary' variant='determinate' value={100} />
      </div>
    : <></>
)