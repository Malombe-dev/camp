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
  const [heroSlide, setHeroSlide] = useState(0);

  // Fetch latest news on component mount
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiRequest.get(`${endpoints.press}/latest?limit=3`);
        console.log('Full API URL:', `${apiRequest.defaults.baseURL}${endpoints.press}/latest?limit=3`);
        console.log('API Response:', response.data);
        
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

  // Auto-advance hero carousel
  useEffect(() => {
    const heroImages = getHeroImages();
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setHeroSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [latestNews]);

  // Get images for hero carousel - get 4 most recent with images
  const getHeroImages = () => {
    if (latestNews.length === 0) return [];
    
    // Sort by date (most recent first) and filter for images only
    return latestNews
      .filter(item => item.featuredImage?.url && !isVideoUrl(item.featuredImage.url))
      .sort((a, b) => new Date(b.publishDate || b.createdAt) - new Date(a.publishDate || a.createdAt))
      .slice(0, 4);
  };

  // Helper function to determine if URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.wmv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           lowerUrl.includes('video/') || 
           url.includes('video/upload/');
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
    if (item.featuredImage?.url) {
      const mediaUrl = item.featuredImage.url;
      
      if (isVideoUrl(mediaUrl)) {
        return (
          <VideoPlayer
            src={mediaUrl}
            poster={null}
            autoplay={false}
            controls={true}
            muted={true}
            className="w-full h-full object-cover"
            style={{ minHeight: '192px' }}
          />
        );
      } else {
        return (
          <img
            src={mediaUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        );
      }
    }

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

    return (
      <span className="text-4xl text-white">{getNewsEmoji(item.type)}</span>
    );
  };

  const heroImages = getHeroImages();

  return (
    <div className="bg-white">
      {/* Hero Section with Animated Background Carousel */}
      <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {heroImages.length > 0 ? (
            <>
              {heroImages.map((item, index) => (
                <div
                  key={item._id || index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === heroSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={item.featuredImage.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Dark overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60" />
                </div>
              ))}
              
              {/* Carousel Navigation Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setHeroSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === heroSlide 
                        ? 'bg-white w-8' 
                        : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-black to-red-700" />
          )}
        </div>

        {/* Floating Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full py-20">
          {/* Logo with glassmorphism effect */}
          <div className="flex justify-center mb-8 animate-float">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl border border-white/30">
              <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center">
                <img
                  src="/favicon.png"
                  alt="Civic Voice Icon"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          </div>
          
          {/* Main heading with glassmorphism background */}
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-8 md:p-12 mb-8 shadow-2xl border border-white/10 max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
              CIVIC VOICE
              <br />
              <span className="text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.5)]">MACHAKOS</span>
              <br />
              <span className="text-red-400 drop-shadow-[0_0_30px_rgba(248,113,113,0.5)]">CHAPTER</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg max-w-4xl mx-auto font-medium">
              Informing. Engaging. Empowering Machakos.
              <br />
              Independent civic and political coverage for our county.
            </p>
          </div>
          
          {/* Floating action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/about">
              <button className="group backdrop-blur-sm bg-green-600/70 hover:bg-green-600/90 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 border border-green-400/40 min-w-[220px]">
                <span className="flex items-center justify-center gap-2">
                  <span className="group-hover:animate-bounce">📖</span>
                  Learn About Us
                </span>
              </button>
            </Link>

            <Link to="/press">
              <button className="group backdrop-blur-sm bg-white/15 hover:bg-white/25 border-2 border-white/60 hover:border-white text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 min-w-[220px]">
                <span className="flex items-center justify-center gap-2">
                  <span className="group-hover:animate-bounce">📰</span>
                  Read Latest News
                </span>
              </button>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8">
            <div className="flex flex-col items-center gap-2 text-white/70">
              <span className="text-sm">Scroll to explore</span>
              <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none" />
      </section>

      {/* Key Messages Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Coverage Focus</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive reporting on politics, governance, and public accountability in Machakos County
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* County Governance Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">County Governance</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">
                Tracking county assembly proceedings, budget allocations, and implementation of 
                development projects across Machakos.
              </p>
            </div>

            {/* Public Accountability Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Public Accountability</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">
                Monitoring use of public resources, investigating service delivery issues, and 
                holding leaders accountable to residents.
              </p>
            </div>

            {/* Civic Engagement Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Civic Engagement</h3>
              </div>
              <p className="text-gray-600 text-center leading-relaxed">
                Amplifying citizen voices, facilitating public discourse, and promoting active 
                participation in county decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Latest Coverage</h2>
            <Link to="/press">
              <button className="text-green-600 hover:text-green-700 font-semibold">
                View All Stories →
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
              <p className="text-gray-600 text-center">No stories available at the moment.</p>
              <p className="text-gray-500 text-sm text-center mt-2">Check back soon for the latest coverage.</p>
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
                      
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <span className="text-4xl text-white">{getNewsEmoji(item.type)}</span>
                      </div>

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
                        {item.type || 'NEWS'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {item.excerpt || 'Click to read the full story.'}
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
            Stay Informed About Machakos County
          </h2>
          <p className="text-xl text-gray-100 mb-8">
            Get the latest updates on governance, policy, and accountability. Subscribe to our 
            newsletter for weekly coverage delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
                📧 Submit a Story Tip
              </button>
            </Link>
            
            <button 
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
              onClick={() => setIsNewsletterOpen(true)}
            >
              📬 Subscribe to Newsletter
            </button>

            <Modal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)}>
              <NewsletterSignup />
            </Modal>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;