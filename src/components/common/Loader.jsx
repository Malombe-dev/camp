import React from 'react';

const Loader = ({ 
  size = 'medium', 
  color = 'blue', 
  fullScreen = false, 
  message = 'Loading...',
  showMessage = true 
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16',
    xlarge: 'w-24 h-24'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    yellow: 'border-yellow-600',
    white: 'border-white'
  };

  const SpinnerComponent = () => (
    <div className="flex flex-col items-center justify-center">
      {/* Main Spinner */}
      <div className="relative">
        <div 
          className={`
            ${sizeClasses[size]} 
            border-4 
            ${colorClasses[color]} 
            border-t-transparent 
            rounded-full 
            animate-spin
          `}
        ></div>
        
        {/* Inner spinner for more dynamic effect */}
        <div 
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${size === 'small' ? 'w-3 h-3' : size === 'medium' ? 'w-5 h-5' : size === 'large' ? 'w-8 h-8' : 'w-12 h-12'} 
            border-2 
            ${colorClasses[color]} 
            border-b-transparent 
            rounded-full 
            animate-spin
            animation-duration-500
          `}
          style={{
            animationDirection: 'reverse',
            animationDuration: '0.8s'
          }}
        ></div>
      </div>

      {/* Loading Message */}
      {showMessage && (
        <div className={`mt-4 text-center ${color === 'white' ? 'text-white' : 'text-gray-600'}`}>
          <p className={`${size === 'small' ? 'text-sm' : size === 'large' || size === 'xlarge' ? 'text-lg' : 'text-base'} font-medium`}>
            {message}
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center mt-2 space-x-1">
            <div 
              className={`w-2 h-2 ${color === 'white' ? 'bg-white' : 'bg-gray-400'} rounded-full animate-bounce`}
              style={{ animationDelay: '0ms' }}
            ></div>
            <div 
              className={`w-2 h-2 ${color === 'white' ? 'bg-white' : 'bg-gray-400'} rounded-full animate-bounce`}
              style={{ animationDelay: '150ms' }}
            ></div>
            <div 
              className={`w-2 h-2 ${color === 'white' ? 'bg-white' : 'bg-gray-400'} rounded-full animate-bounce`}
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <SpinnerComponent />
        </div>
      </div>
    );
  }

  // Inline loader
  return (
    <div className="flex items-center justify-center p-4">
      <SpinnerComponent />
    </div>
  );
};

// Campaign-specific themed loader
export const CampaignLoader = ({ fullScreen = false, message = 'Loading Campaign Data...' }) => {
  return (
    <div className={fullScreen ? 'fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center z-50' : 'flex items-center justify-center p-8'}>
      <div className="text-center">
        {/* Campaign Logo with pulse animation */}
        <div className="mb-6">
          <div className="relative mx-auto w-20 h-20 mb-4">
            <img 
              src="/images/logo.png" 
              alt="Campaign 2027" 
              className="w-full h-full object-contain animate-pulse"
            />
            <div className="absolute inset-0 border-4 border-white border-opacity-30 rounded-full animate-ping"></div>
          </div>
          
          <h3 className="text-white text-xl font-bold mb-2">Campaign 2027</h3>
          <p className="text-blue-200 text-sm mb-4">"Reset. Restore. Rebuild."</p>
        </div>

        {/* Custom spinner with Kenya flag colors */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-4 border-green-500 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-white border-l-transparent rounded-full animate-spin" style={{ animationDuration: '0.6s' }}></div>
        </div>

        <p className="text-white text-lg font-medium mb-2">{message}</p>
        
        {/* Animated progress bar */}
        <div className="w-64 mx-auto bg-blue-800 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 via-white to-green-500 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Simple button loader
export const ButtonLoader = ({ size = 'small' }) => {
  return (
    <div className={`${sizeClasses[size] || 'w-5 h-5'} border-2 border-white border-t-transparent rounded-full animate-spin`}></div>
  );
};

const sizeClasses = {
  small: 'w-4 h-4',
  medium: 'w-6 h-6',
  large: 'w-8 h-8'
};

export default Loader;