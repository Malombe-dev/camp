import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Eye, Heart, Calendar, MapPin, ChevronLeft, ChevronRight, ArrowLeft, Share2, Link2, Check, Facebook, Twitter, Instagram } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';

const MomentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [moment, setMoment] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    fetchMoment();
  }, [id]);

  const fetchMoment = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE}/api/gallery/${id}`);
      const data = await response.json();

      if (data.success) {
        setMoment(data.data);
      } else {
        setError('Moment not found');
      }
    } catch (err) {
      console.error('Error fetching moment:', err);
      setError('Failed to load moment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMediaUrls = (moment) => {
    if (moment?.mediaUrls && moment.mediaUrls.length > 0) {
      return moment.mediaUrls;
    } else if (moment?.mediaUrl) {
      return [moment.mediaUrl];
    }
    return [];
  };

  const getMomentUrl = () => {
    return window.location.href;
  };

  const handleCopyLink = async () => {
    try {
      const url = getMomentUrl();
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.log('Error copying link:', err);
    }
  };

  const handleShareFacebook = () => {
    const url = getMomentUrl();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleShareTwitter = () => {
    const url = getMomentUrl();
    const text = `${moment.title} - ${moment.description}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleShareInstagram = () => {
    handleCopyLink();
    alert('Link copied! Open Instagram and paste it in your post or story.');
    setShowShareMenu(false);
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/gallery/${id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMoment(prev => ({ ...prev, likes: data.data.likes }));
      }
    } catch (err) {
      console.error('Error liking moment:', err);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'campaign': return 'bg-green-100 text-green-800';
      case 'community': return 'bg-blue-100 text-blue-800';
      case 'speeches': return 'bg-red-100 text-red-800';
      case 'meetings': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const nextSlide = () => {
    const mediaUrls = getMediaUrls(moment);
    setCurrentSlide((prev) => (prev + 1) % mediaUrls.length);
  };

  const prevSlide = () => {
    const mediaUrls = getMediaUrls(moment);
    setCurrentSlide((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 text-lg">Loading moment...</p>
        </div>
      </div>
    );
  }

  if (error || !moment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-gray-600 text-lg mb-4">{error || 'Moment not found'}</p>
          <button
            onClick={() => navigate('/moments')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

  const mediaUrls = getMediaUrls(moment);
  const currentMedia = mediaUrls[currentSlide];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/moments')}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Gallery</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
          {/* Image Carousel */}
          <div className="relative h-96 md:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {currentMedia ? (
              currentMedia.resourceType === 'video' ? (
                <video
                  src={currentMedia.url}
                  controls
                  className="w-full h-full object-contain"
                  key={currentSlide}
                />
              ) : (
                <img
                  src={currentMedia.url}
                  alt={`${moment.title} - ${currentSlide + 1}`}
                  className="w-full h-full object-contain"
                />
              )
            ) : (
              <div className="text-8xl">📸</div>
            )}

            {/* Carousel Navigation */}
            {mediaUrls.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {mediaUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide 
                          ? 'bg-white w-8' 
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>

                {/* Counter */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {currentSlide + 1} / {mediaUrls.length}
                </div>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(moment.category)}`}>
                {moment.category.charAt(0).toUpperCase() + moment.category.slice(1)}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar size={16} /> {formatDate(moment.date)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{moment.title}</h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{moment.description}</p>

            <div className="flex items-center text-gray-600 mb-6 gap-6 flex-wrap">
              <span className="flex items-center gap-2">
                <MapPin size={20} /> {moment.location}
              </span>
              <span className="flex items-center gap-2">
                <Eye size={20} /> {moment.views || 0} views
              </span>
              <span className="flex items-center gap-2">
                <Heart size={20} /> {moment.likes || 0} engagements
              </span>
            </div>

            {moment.photographer?.name && (
              <div className="text-sm text-gray-500 mb-6 border-t pt-6">
                <p>📷 Photo by: {moment.photographer.name}</p>
                {moment.photographer.credit && (
                  <p className="text-xs mt-1">{moment.photographer.credit}</p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleLike}
                className="flex-1 min-w-[200px] bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Heart size={20} /> Engage ({moment.likes || 0})
              </button>

              <div className="flex-1 min-w-[200px] relative">
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={20} /> Share
                </button>

                {/* Share Menu Dropdown */}
                {showShareMenu && (
                  <>
                    <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-20">
                      <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                      >
                        {linkCopied ? (
                          <>
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-green-500 font-medium">Link copied!</span>
                          </>
                        ) : (
                          <>
                            <Link2 className="h-5 w-5" />
                            <span>Copy link</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={handleShareFacebook}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                      >
                        <Facebook className="h-5 w-5 text-blue-600" />
                        <span>Share on Facebook</span>
                      </button>
                      
                      <button
                        onClick={handleShareTwitter}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                      >
                        <Twitter className="h-5 w-5 text-sky-500" />
                        <span>Share on X (Twitter)</span>
                      </button>
                      
                      <button
                        onClick={handleShareInstagram}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                      >
                        <Instagram className="h-5 w-5 text-pink-600" />
                        <span>Share on Instagram</span>
                      </button>
                    </div>
                    
                    {/* Backdrop to close menu */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowShareMenu(false)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomentDetail;