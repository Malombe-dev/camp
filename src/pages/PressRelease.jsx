import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiRequest, endpoints } from '../services/api';
import VideoPlayer from '../components/media/VideoPlayer';
import ImageGallery from '../components/media/ImageGallery';
import YoutubeEmbedded from '../components/media/YouTubeEmbeded';

const PressRelease = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pressRelease, setPressRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  // Helper function to determine if URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.wmv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           lowerUrl.includes('video/') || 
           url.includes('video/upload/');
  };

  // Helper function to check if it's a YouTube URL
  const isYouTubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Helper function to extract YouTube video ID
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get type emoji
  const getTypeEmoji = (type) => {
    switch (type) {
      case 'VIDEO':
        return '🎥';
      case 'PRESS RELEASE':
        return '📢';
      case 'ANNOUNCEMENT':
        return '📣';
      default:
        return '📢';
    }
  };

  // Fetch press release data
  useEffect(() => {
    const fetchPressRelease = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the specific press release
        const response = await apiRequest.get(`${endpoints.press}/${id}`);
        console.log('Press Release API Response:', response.data);

        if (response.data.success && response.data.data) {
          setPressRelease(response.data.data);
          
          // Update view count (optional - call a separate endpoint)
          try {
            await apiRequest.patch(`${endpoints.press}/${id}/view`);
          } catch (viewError) {
            console.warn('Could not update view count:', viewError);
          }
        } else {
          throw new Error('Press release not found');
        }

      } catch (error) {
        console.error('Error fetching press release:', error);
        if (error.response?.status === 404) {
          setError('Press release not found');
        } else {
          setError('Unable to load press release. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPressRelease();
    }
  }, [id]);

  // Fetch related news
  useEffect(() => {
    const fetchRelatedNews = async () => {
      if (!pressRelease) return;

      try {
        const response = await apiRequest.get(`${endpoints.press}/latest?limit=3&exclude=${id}`);
        if (response.data.success && response.data.data) {
          setRelatedNews(response.data.data);
        }
      } catch (error) {
        console.warn('Could not fetch related news:', error);
      }
    };

    fetchRelatedNews();
  }, [pressRelease, id]);

  // Render main media content
  const renderMainMedia = () => {
    if (!pressRelease) return null;

    // Check featuredImage first
    if (pressRelease.featuredImage?.url) {
      const mediaUrl = pressRelease.featuredImage.url;
      
      if (isYouTubeUrl(mediaUrl)) {
        const videoId = getYouTubeVideoId(mediaUrl);
        if (videoId) {
          return (
            <div className="mb-8">
              <YoutubeEmbedded 
                videoId={videoId}
                title={pressRelease.title}
                className="w-full aspect-video rounded-lg"
              />
            </div>
          );
        }
      } else if (isVideoUrl(mediaUrl)) {
        return (
          <div className="mb-8">
            <VideoPlayer
              src={mediaUrl}
              poster={null}
              autoplay={false}
              controls={true}
              className="w-full aspect-video rounded-lg"
            />
          </div>
        );
      } else {
        return (
          <div className="mb-8">
            <img
              src={mediaUrl}
              alt={pressRelease.title}
              className="w-full max-h-96 object-cover rounded-lg"
            />
          </div>
        );
      }
    }

    // Check attachments
    if (pressRelease.attachments?.length > 0) {
      const videoAttachments = pressRelease.attachments.filter(att => 
        att.type === 'video' || isVideoUrl(att.url)
      );
      const imageAttachments = pressRelease.attachments.filter(att => 
        att.type === 'image' || (!isVideoUrl(att.url) && !isYouTubeUrl(att.url))
      );

      if (videoAttachments.length > 0) {
        return (
          <div className="mb-8">
            <VideoPlayer
              src={videoAttachments[0].url}
              poster={pressRelease.featuredImage?.url}
              autoplay={false}
              controls={true}
              className="w-full aspect-video rounded-lg"
            />
          </div>
        );
      } else if (imageAttachments.length > 0) {
        return (
          <div className="mb-8">
            <ImageGallery
              images={imageAttachments.map(att => ({
                src: att.url,
                alt: att.caption || pressRelease.title,
                caption: att.caption || '',
              }))}
              columns={1}
              showThumbnails={imageAttachments.length > 1}
              enableLightbox={true}
              className="w-full rounded-lg"
            />
          </div>
        );
      }
    }

    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading press release...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 mb-4 text-6xl">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Try Again
            </button>
            <Link
              to="/press"
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Back to Press
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!pressRelease) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-green-600">Home</Link>
            <span>→</span>
            <Link to="/press" className="hover:text-green-600">Press Releases</Link>
            <span>→</span>
            <span className="text-gray-900">{pressRelease.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{getTypeEmoji(pressRelease.type)}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {pressRelease.type || 'PRESS RELEASE'}
              </span>
              {pressRelease.category && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  {pressRelease.category}
                </span>
              )}
              {pressRelease.featured && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {pressRelease.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>📅</span>
                {formatDate(pressRelease.publishDate || pressRelease.createdAt)}
              </div>
              
              {pressRelease.author && (
                <div className="flex items-center gap-2">
                  <span>👤</span>
                  <span>
                    {pressRelease.author.name}
                    {pressRelease.author.title && `, ${pressRelease.author.title}`}
                  </span>
                </div>
              )}
              
              {pressRelease.views > 0 && (
                <div className="flex items-center gap-2">
                  <span>👁️</span>
                  {pressRelease.views} views
                </div>
              )}
            </div>
          </header>

          {/* Media Content */}
          {renderMainMedia()}

          {/* Excerpt */}
          {pressRelease.excerpt && (
            <div className="mb-8 p-6 bg-gray-50 rounded-lg border-l-4 border-green-500">
              <p className="text-lg text-gray-700 font-medium italic">
                {pressRelease.excerpt}
              </p>
            </div>
          )}

          {/* Main Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-800 leading-relaxed whitespace-pre-line">
              {pressRelease.content}
            </div>
          </div>

          {/* Tags */}
          {pressRelease.tags && pressRelease.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {pressRelease.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this update</h3>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: pressRelease.title,
                      text: pressRelease.excerpt,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                🔗 Share
              </button>
              
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(pressRelease.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
              >
                🐦 Tweet
              </a>
              
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                📘 Facebook
              </a>
            </div>
          </div>
        </article>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Updates</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item._id}
                  to={`/press/${item._id}`}
                  className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="text-sm text-green-600 font-semibold mb-2">
                    {getTypeEmoji(item.type)} {item.type}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                    {item.excerpt}
                  </p>
                  <div className="text-xs text-gray-500">
                    {formatDate(item.publishDate || item.createdAt)}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PressRelease;