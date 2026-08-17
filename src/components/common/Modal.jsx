import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = ''
}) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    xlarge: 'max-w-6xl',
    fullscreen: 'max-w-full mx-4 my-4 h-[calc(100vh-2rem)]'
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (closeOnEscape && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Store the currently focused element
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      
      // Restore focus to previously active element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeOnEscape, onClose]);

  // Handle overlay click
  const handleOverlayClick = (event) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div 
        className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
        onClick={handleOverlayClick}
      >
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          aria-hidden="true"
        ></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal panel */}
        <div 
          ref={modalRef}
          tabIndex="-1"
          className={`
            inline-block w-full 
            ${sizeClasses[size]} 
            px-6 py-4 
            my-8 
            overflow-hidden 
            text-left 
            align-middle 
            transition-all 
            transform 
            bg-white 
            shadow-2xl 
            rounded-2xl 
            ${size === 'fullscreen' ? '' : 'sm:max-h-[90vh] overflow-y-auto'}
            ${className}
          `}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="flex-1">
                {title && (
                  <h3 
                    id="modal-title"
                    className="text-xl font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </h3>
                )}
              </div>
              
              {showCloseButton && (
                <button
                  type="button"
                  className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div className={`${(title || showCloseButton) ? 'mt-4' : ''}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal
export const ConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Action", 
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default" // default, danger, success
}) => {
  const buttonColors = {
    default: "bg-blue-600 hover:bg-blue-700",
    danger: "bg-red-600 hover:bg-red-700",
    success: "bg-green-600 hover:bg-green-700"
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
    >
      <div className="mt-4">
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors duration-200"
            onClick={onClose}
          >
            {cancelText}
          </button>
          
          <button
            type="button"
            className={`px-4 py-2 text-white ${buttonColors[type]} rounded-lg transition-colors duration-200`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// Image Modal for gallery viewing
export const ImageModal = ({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt, 
  caption,
  showNavigation = false,
  onNext,
  onPrevious
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="fullscreen"
      className="bg-black bg-opacity-90"
      closeOnOverlayClick={true}
    >
      <div className="flex items-center justify-center h-full p-4">
        <div className="relative max-w-full max-h-full">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="max-w-full max-h-full object-contain"
          />
          
          {caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
              <p className="text-center">{caption}</p>
            </div>
          )}

          {/* Navigation buttons */}
          {showNavigation && (
            <>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                onClick={onPrevious}
                aria-label="Previous image"
              >
                <X className="w-6 h-6 rotate-90" />
              </button>
              
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-200"
                onClick={onNext}
                aria-label="Next image"
              >
                <X className="w-6 h-6 -rotate-90" />
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Modal;