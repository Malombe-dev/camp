import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../components/common/Modal';
import NewsletterSignup from '../components/forms/NewsletterSignup';
import { apiRequest, endpoints } from '../services/api';
import VideoPlayer from '../components/media/VideoPlayer';
import ImageGallery from '../components/media/ImageGallery';

const Home = () => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch latest news on component mount
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the latest endpoint with proper limit
        const response = await apiRequest.get(`${endpoints.press}/latest?limit=3`);
        console.log('Full API URL:', `${apiRequest.defaults.baseURL}${endpoints.press}/latest?limit=3`);
        
        console.log('API Response:', response.data);
        
        // Handle the response structure from your backend
        if (response.data.success && response.data.data) {
          setLatestNews(response.data.data);
        } else {
          throw new Error('Invalid response format');
        }

      } catch (error) {
        console.error('Error fetching latest news:', error);
        setError('Unable to load latest updates. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // Helper function to determine if URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.wmv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           lowerUrl.includes('video/') || 
           url.includes('video/upload/'); // Cloudinary video URLs
  };

  // Helper function to get emoji based on type
  const getNewsEmoji = (type) => {
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

  // Helper function to get gradient classes
  const getGradientClass = (index) => {
    const gradients = [
      'from-green-400 to-blue-500',
      'from-red-400 to-pink-500',
      'from-purple-400 to-indigo-500'
    ];
    return gradients[index % gradients.length];
  };

  // Helper function to get text color class
  const getTextColorClass = (index) => {
    const colors = ['text-green-600', 'text-red-600', 'text-purple-600'];
    return colors[index % colors.length];
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function to render media content
  const renderMediaContent = (item) => {
    // Check if featuredImage exists and is a video
    if (item.featuredImage?.url) {
      const mediaUrl = item.featuredImage.url;
      
      if (isVideoUrl(mediaUrl)) {
        return (
          <VideoPlayer
            src={mediaUrl}
            poster={null} // No poster for now, could add a thumbnail later
            autoplay={false}
            controls={true}
            muted={true}
            className="w-full h-full object-cover"
            style={{ minHeight: '192px' }} // h-48 equivalent
          />
        );
      } else {
        return (
          <img
            src={mediaUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        );
      }
    }

    // Check for attachments (fallback)
    if (item.attachments?.length > 0) {
      const videoAttachment = item.attachments.find(att => att.type === 'video');
      const imageAttachments = item.attachments.filter(att => att.type === 'image');

      if (videoAttachment) {
        return (
          <VideoPlayer
            src={videoAttachment.url}
            poster={item.featuredImage?.url}
            autoplay={false}
            controls={true}
            muted={true}
            className="w-full h-full object-cover"
          />
        );
      } else if (imageAttachments.length > 0) {
        return (
          <ImageGallery
            images={imageAttachments.map(att => ({
              src: att.url,
              alt: att.caption || item.title,
              caption: att.caption || '',
            }))}
            columns={1}
            showThumbnails={false}
            enableLightbox={false}
            className="w-full h-full object-cover"
          />
        );
      }
    }

    // Fallback to emoji
    return (
      <span className="text-4xl text-white">{getNewsEmoji(item.type)}</span>
    );
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-700 via-black to-red-700 min-h-screen flex items-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl">
              <span className="text-6xl">🇰🇪</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            RESET.
            <br />
            <span className="text-green-400">RESTORE.</span>
            <br />
            <span className="text-red-400">REBUILD.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Together, we will transform Kenya with integrity, justice, and unwavering commitment to the people. 
            Join the movement for a stronger, united Kenya.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg">
                🤝 Join Our Movement
              </button>
            </Link>

            <Link to="/vision">
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
                📖 Read Our Vision
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Messages Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Promise to Kenya</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A vision for transformation rooted in justice, transparency, and service to all Kenyans
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Reset Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">RESET</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">
                Breaking away from failed systems and corrupt practices. We will establish new foundations 
                of governance built on transparency, accountability, and the rule of law.
              </p>
            </div>

            {/* Restore Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">RESTORE</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">
                Rebuilding trust in our institutions and restoring Kenya's dignity on the global stage. 
                We will heal the divisions and unite our nation under shared values and common purpose.
              </p>
            </div>

            {/* Rebuild Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏗️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">REBUILD</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">
                Constructing a modern Kenya with robust infrastructure, quality education, accessible healthcare, 
                and economic opportunities for every citizen, regardless of background.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Latest Updates</h2>
            <Link to="/press">
              <button className="text-green-600 hover:text-green-700 font-semibold">
                View All Press Releases →
              </button>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-red-500 mb-4">⚠️</div>
              <p className="text-gray-600 text-center">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 text-green-600 hover:text-green-700 font-semibold"
              >
                Try Again
              </button>
            </div>
          ) : latestNews.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <div className="text-gray-400 mb-4 text-4xl">📰</div>
              <p className="text-gray-600 text-center">No updates available at the moment.</p>
              <p className="text-gray-500 text-sm text-center mt-2">Check back soon for the latest news and announcements.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestNews.map((item, index) => (
                <Link
                  key={item._id || item.id}
                  to={`/press/${item._id || item.id}`}
                  className="block group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                    <div className="h-48 bg-black flex items-center justify-center overflow-hidden relative">
                      {renderMediaContent(item)}
                      
                      {/* Fallback emoji (hidden by default, shown when image fails) */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <span className="text-4xl text-white">{getNewsEmoji(item.type)}</span>
                      </div>

                      {/* Video indicator overlay */}
                      {(item.featuredImage?.url && isVideoUrl(item.featuredImage.url)) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white bg-opacity-90 rounded-full p-3">
                            <span className="text-2xl">▶️</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className={`text-sm ${getTextColorClass(index)} font-semibold mb-2 flex items-center gap-2`}>
                        <span>{getNewsEmoji(item.type)}</span>
                        {item.type || 'PRESS RELEASE'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.excerpt || 'Click to read more about this update.'}
                      </p>
                      <div className="text-sm text-gray-500 flex items-center justify-between">
                        <span>{formatDate(item.publishDate || item.createdAt)}</span>
                        {item.views > 0 && (
                          <span className="flex items-center gap-1">
                            👁️ {item.views}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Be Part of Kenya's Transformation
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Your voice matters. Your participation makes the difference. Join thousands of Kenyans 
            committed to building a better future for our nation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register-to-vote">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                🗳️ Register to Vote
              </button>
            </Link>
            
            <button 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
              onClick={() => setIsNewsletterOpen(true)}
            >
              📧 Stay Updated
            </button>

            <Modal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)}>
              <NewsletterSignup />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;