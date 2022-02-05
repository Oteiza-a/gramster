import React from 'react';
import { LoadingSpinner } from '../loading-spinner/LoadingSpinner';
import './LoadingOverlay.css'

export const LoadingOverlay = ({ loading }) => (
  <div className={`loading-overlay-container ${loading ? 'display-overlay' : 'hide-overlay'}`}>
    <LoadingSpinner size={60} loading={loading} />
  </div>
)