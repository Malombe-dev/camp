import React, { useState, useEffect } from 'react';

const ImageGallery = ({ 
  images = [], 
  columns = 3, 
  showThumbnails = true,
  enableLightbox = true,
  className = ""
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(new Set());

  useEffect(() => {
    if (images.length === 0) {
      setIsLoading(false);
      return;
    }

    // Preload images
    const imagePromises = images.map((img, index) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          setLoadedImages(prev => new Set([...prev, index]));
          resolve();
        };
        image.onerror = reject;
        image.src = img.src || img.url || img;
      });
    });

    Promise.allSettled(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, [images]);

  const openLightbox = (index) => {
    if (!enableLightbox) return;
    setCurrentIndex(index);
    setSelectedImage(images[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        prevImage();
        break;
      case 'ArrowRight':
        nextImage();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, currentIndex]);

  if (isLoading && images.length > 0) {
    return (
      <div className="gallery-loading">
        <div className="loading-grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="loading-placeholder">
              <div className="shimmer"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="gallery-empty">
        <div className="empty-state">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21,15 16,10 5,21"/>
          </svg>
          <p>No images to display</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`image-gallery ${className}`}>
        <div 
          className="gallery-grid" 
          style={{ 
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: '16px'
          }}
        >
          {images.map((image, index) => {
            const imgSrc = image.src || image.url || image;
            const imgAlt = image.alt || image.caption || `Gallery image ${index + 1}`;
            const imgCaption = image.caption || image.title;
            
            return (
              <div key={index} className="gallery-item">
                <div 
                  className={`image-container ${enableLightbox ? 'clickable' : ''}`}
                  onClick={() => openLightbox(index)}
                >
                  {!loadedImages.has(index) && (
                    <div className="image-placeholder">
                      <div className="shimmer"></div>
                    </div>
                  )}
                  
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    className={`gallery-image ${loadedImages.has(index) ? 'loaded' : ''}`}
                    loading="lazy"
                  />
                  
                  {enableLightbox && (
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                        </svg>
                        <span>View Full Size</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {imgCaption && (
                  <div className="image-caption">
                    <p>{imgCaption}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && enableLightbox && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-container">
            <button 
              className="lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <button 
              className="lightbox-nav lightbox-prev"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={selectedImage.src || selectedImage.url || selectedImage}
                alt={selectedImage.alt || selectedImage.caption || 'Gallery image'}
                className="lightbox-image"
              />
              
              {(selectedImage.caption || selectedImage.title) && (
                <div className="lightbox-caption">
                  <h4>{selectedImage.title}</h4>
                  <p>{selectedImage.caption}</p>
                </div>
              )}
            </div>

            <button 
              className="lightbox-nav lightbox-next"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>

            <div className="lightbox-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {showThumbnails && images.length > 1 && (
            <div className="lightbox-thumbnails">
              {images.map((img, index) => (
                <button
                  key={index}
                  className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    setSelectedImage(images[index]);
                  }}
                >
                  <img
                    src={img.src || img.url || img}
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ImageGallery;