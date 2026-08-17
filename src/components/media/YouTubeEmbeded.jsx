import React, { useState } from 'react';

const YouTubeEmbed = ({ 
  videoId, 
  title = "Campaign Video", 
  width = "100%", 
  height = "315",
  autoplay = false,
  showControls = true,
  showInfo = true,
  className = ""
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Extract video ID from various YouTube URL formats
  const extractVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : url;
  };

  const finalVideoId = extractVideoId(videoId) || videoId;

  if (!finalVideoId) {
    return (
      <div className={`youtube-embed error ${className}`}>
        <div className="error-message">
          <p>Invalid video ID provided</p>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube.com/embed/${finalVideoId}?${[
    autoplay ? 'autoplay=1' : '',
    !showControls ? 'controls=0' : '',
    !showInfo ? 'showinfo=0' : '',
    'rel=0',
    'modestbranding=1'
  ].filter(Boolean).join('&')}`;

  const thumbnailUrl = `https://img.youtube.com/vi/${finalVideoId}/maxresdefault.jpg`;

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div className={`youtube-embed ${className}`} style={{ width }}>
      <div className="video-container" style={{ paddingBottom: '56.25%', position: 'relative' }}>
        {!isLoaded && !hasError && (
          <div className="video-placeholder">
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="thumbnail"
              onError={() => setHasError(true)}
            />
            <div className="play-button">
              <svg width="68" height="48" viewBox="0 0 68 48">
                <path 
                  d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
                  fill="#f00"
                />
                <path d="M 45,24 27,14 27,34" fill="#fff" />
              </svg>
            </div>
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
          </div>
        )}

        {hasError && (
          <div className="video-error">
            <div className="error-content">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              <p>Unable to load video</p>
              <small>Please check your internet connection</small>
            </div>
          </div>
        )}

        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            border: 'none',
            opacity: isLoaded ? 1 : 0
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      <div className="video-info">
        <h4 className="video-title">{title}</h4>
        <div className="video-actions">
          <a 
            href={`https://www.youtube.com/watch?v=${finalVideoId}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="watch-on-youtube"
          >
            Watch on YouTube
          </a>
          <button 
            className="share-button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: title,
                  url: `https://www.youtube.com/watch?v=${finalVideoId}`
                });
              } else {
                navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${finalVideoId}`);
                // You could show a toast notification here
              }
            }}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for embedding multiple videos in a playlist format
export const YouTubePlaylist = ({ videos, className = "" }) => {
  const [currentVideo, setCurrentVideo] = useState(0);

  if (!videos || videos.length === 0) {
    return (
      <div className="youtube-playlist-error">
        <p>No videos available</p>
      </div>
    );
  }

  return (
    <div className={`youtube-playlist ${className}`}>
      <div className="main-video">
        <YouTubeEmbed
          videoId={videos[currentVideo].id}
          title={videos[currentVideo].title}
        />
      </div>

      <div className="playlist-sidebar">
        <h3>Campaign Videos</h3>
        <div className="video-list">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className={`playlist-item ${index === currentVideo ? 'active' : ''}`}
              onClick={() => setCurrentVideo(index)}
            >
              <img 
                src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="playlist-thumbnail"
              />
              <div className="playlist-info">
                <h4>{video.title}</h4>
                <p>{video.description}</p>
                <span className="video-duration">{video.duration || '0:00'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YouTubeEmbed;