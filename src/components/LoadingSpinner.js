import React from 'react';

const LoadingSpinner = ({ size = 'medium', message = 'Loading...', className = '' }) => {
  const sizes = {
    small: 'w-6 h-6',
    medium: 'w-12 h-12', 
    large: 'w-16 h-16'
  };

  return (
    <div className={`loading-state ${className}`}>
      <div className={`spinner ${sizes[size]}`}></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
