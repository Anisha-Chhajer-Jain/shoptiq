import React from 'react';
import './ErrorState.css';

export const ErrorState = ({ title = 'Something went wrong', message = 'An error occurred while trying to load the data. Please try again.', onRetry }) => {
  return (
    <div className="error-state-container">
      <div className="error-state-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>
      <h3 className="error-state-title">{title}</h3>
      <p className="error-state-desc">{message}</p>
      {onRetry && (
        <button className="error-state-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};
