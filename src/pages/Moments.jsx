import React, { useState, useEffect } from 'react';
import { Eye, Heart, Calendar, MapPin, Search, X, ChevronLeft, ChevronRight, Link2, Check, Facebook, Twitter, Instagram, Share2 } from 'lucide-react';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';

const Moments = () => {
  const [moments, setMoments] = useState([]);
  const [filteredMoments, setFilteredMoments] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 24,
    total: 0,
    pages: 1
  });

  const categories = [
    { id: 'all', label: 'All Coverage', emoji: '📸' },
    { id: 'campaign', label: 'Political Coverage', emoji: '🎯' },
    { id: 'community', label: 'Community Events', emoji: '🤝' },
    { id: 'speeches', label: 'Speeches & Forums', emoji: '🎤' },
    { id: 'meetings', label: 'County Meetings', emoji: '💼' }
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    const heroImages = getHeroImages();
    if (heroImages.length > 0) {
      const interval = setInterval(() => {
        setHeroSlide((prev) => (prev + 1) % heroImages.length);
      }, 5000); // Change slide every 5 seconds

      return () => clearInterval(interval);
    }
  }, [moments]);

  // Get featured or recent images for hero carousel
  const getHeroImages = () => {
    if (moments.length === 0) return [];
    
    // Get featured moments first, then fill with recent ones
    const featured = moments.filter(m => m.featured).slice(0, 5);
    const needed = 5 - featured.length;
    const recent = moments.filter(m => !m.featured).slice(0, needed);
    
    return [...featured, ...recent].slice(0, 5);
  };

  // Get media URLs from moment (handles both single and multiple)
  const getMediaUrls = (moment) => {
    if (moment.mediaUrls && moment.mediaUrls.length > 0) {
      return moment.mediaUrls;
    } else if (moment.mediaUrl) {
      return [moment.mediaUrl];
    }
    return [];
  };

  // Generate shareable URL for moment
  const getMomentUrl = (moment) => {
    return `${window.location.origin}/moments/${moment._id}`;
  };

  // Handle copy link
  const handleCopyLink = async (moment) => {
    try {
      const url = getMomentUrl(moment);
      await navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.log('Error copying link:', err);
    }
  };

  // Handle social media sharing
  const handleShareFacebook = (moment) => {
    const url = getMomentUrl(moment);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleShareTwitter = (moment) => {
    const url = getMomentUrl(moment);
    const text = `${moment.title} - ${moment.description}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const handleShareInstagram = (moment) => {
    handleCopyLink(moment);
    alert('Link copied! Open Instagram and paste it in your post or story.');
    setShowShareMenu(false);
  };

  // Fetch gallery items
  const fetchMoments = async (category = 'all', page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_BASE}/api/gallery?page=${page}&limit=24`;
      
      if (category !== 'all') {
        url += `&category=${category}`;
      }
      
      if (search) {
        url += `&search=${encodeURIComponent(search)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setMoments(data.data || []);
        setFilteredMoments(data.data || []);
        setCategoryCounts(data.categoryCounts || {});
        setPagination(data.pagination || {
          page: 1,
          limit: 24,
          total: 0,
          pages: 1
        });
      } else {
        setError('Failed to load coverage');
      }
    } catch (err) {
      console.error('Error fetching coverage:', err);
      setError('Failed to load coverage. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Increment view count when viewing a moment
  const handleViewMoment = async (moment) => {
    try {
      const response = await fetch(`${API_BASE}/api/gallery/${moment._id}`, {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        
        setMoments(prevMoments => 
          prevMoments.map(m => 
            m._id === moment._id 
              ? { ...m, views: data.data.views }
              : m
          )
        );

        setSelectedImage(data.data);
        setCurrentSlide(0);
      }
    } catch (err) {
      console.error('Error tracking view:', err);
      setSelectedImage(moment);
      setCurrentSlide(0);
    }
  };

  // Handle like
  const handleLike = async (momentId, e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const response = await fetch(`${API_BASE}/api/gallery/${momentId}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const newLikes = data.data.likes;
        
        setMoments(prevMoments =>
          prevMoments.map(m =>
            m._id === momentId
              ? { ...m, likes: newLikes }
              : m
          )
        );

        setFilteredMoments(prevMoments =>
          prevMoments.map(m =>
            m._id === momentId
              ? { ...m, likes: newLikes }
              : m
          )
        );

        if (selectedImage && selectedImage._id === momentId) {
          setSelectedImage(prev => ({ ...prev, likes: newLikes }));
        }
      }
    } catch (err) {
      console.error('Error liking moment:', err);
    }
  };

  useEffect(() => {
    fetchMoments(selectedCategory, pagination.page, searchTerm);
  }, [selectedCategory, pagination.page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== undefined) {
        fetchMoments(selectedCategory, 1, searchTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  const getCategoryIcon = (category) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.emoji : '📸';
  };

  const handleLoadMore = () => {
    if (pagination.page < pagination.pages) {
      setPagination(prev => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const nextSlide = () => {
    const mediaUrls = getMediaUrls(selectedImage);
    setCurrentSlide((prev) => (prev + 1) % mediaUrls.length);
  };

  const prevSlide = () => {
    const mediaUrls = getMediaUrls(selectedImage);
    setCurrentSlide((prev) => (prev - 1 + mediaUrls.length) % mediaUrls.length);
  };

  const heroImages = getHeroImages();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0">
          {heroImages.length > 0 ? (
            <>
              {heroImages.map((moment, index) => {
                const mediaUrls = getMediaUrls(moment);
                const firstMedia = mediaUrls[0];
                
                return (
                  <div
                    key={moment._id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === heroSlide ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {firstMedia && firstMedia.resourceType !== 'video' ? (
                      <img
                        src={firstMedia.url}
                        alt={moment.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-green-600 to-red-600" />
                    )}
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-60" />
                  </div>
                );
              })}
              
              {/* Carousel Navigation Dots */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
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
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-red-600" />
          )}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Coverage Gallery
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto mb-8">
              Documenting governance, community events, and civic engagement across Machakos County
            </p>
            
            {categoryCounts && (
              <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-12">
                <div className="text-center backdrop-blur-sm bg-white bg-opacity-10 px-6 py-4 rounded-lg">
                  <div className="text-4xl font-bold">{categoryCounts.all || 0}</div>
                  <div className="text-sm opacity-90 mt-1">Total Coverage</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white bg-opacity-10 px-6 py-4 rounded-lg">
                  <div className="text-4xl font-bold">
                    {moments.reduce((sum, m) => sum + (m.views || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90 mt-1">Total Views</div>
                </div>
                <div className="text-center backdrop-blur-sm bg-white bg-opacity-10 px-6 py-4 rounded-lg">
                  <div className="text-4xl font-bold">
                    {moments.reduce((sum, m) => sum + (m.likes || 0), 0).toLocaleString()}
                  </div>
                  <div className="text-sm opacity-90 mt-1">Engagements</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10" />
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search coverage by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setPagination(prev => ({ ...prev, page: 1 }));
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.emoji}</span>
                {category.label}
                {categoryCounts && categoryCounts[category.id] !== undefined && (
                  <span className="ml-2 text-sm opacity-75">
                    ({category.id === 'all' ? categoryCounts.all : categoryCounts[category.id]})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Moments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {loading && moments.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-block w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600 text-lg">Loading coverage...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-gray-600 text-lg mb-4">{error}</p>
              <button
                onClick={() => fetchMoments(selectedCategory, pagination.page, searchTerm)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : filteredMoments.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📸</div>
              <p className="text-gray-600 text-lg">No coverage found</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-green-600 hover:text-green-700 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMoments.map((moment) => {
                  const mediaUrls = getMediaUrls(moment);
                  const firstMedia = mediaUrls[0];

                  return (
                    <div
                      key={moment._id}
                      className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer ${
                        moment.featured ? 'ring-2 ring-green-500' : ''
                      }`}
                      onClick={() => handleViewMoment(moment)}
                    >
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                        {firstMedia ? (
                          firstMedia.resourceType === 'video' ? (
                            <video
                              src={firstMedia.url}
                              className="w-full h-full object-cover"
                              muted
                            />
                          ) : (
                            <img
                              src={firstMedia.url}
                              alt={moment.title}
                              className="w-full h-full object-cover"
                            />
                          )
                        ) : (
                          <div className="text-6xl">{moment.image || '📸'}</div>
                        )}
                        
                        {mediaUrls.length > 1 && (
                          <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            📷 {mediaUrls.length}
                          </div>
                        )}
                        
                        <div className="absolute bottom-2 right-2 flex gap-2">
                          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Eye size={12} /> {moment.views || 0}
                          </span>
                          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Heart size={12} /> {moment.likes || 0}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(moment.category)}`}>
                            {getCategoryIcon(moment.category)} {moment.category.charAt(0).toUpperCase() + moment.category.slice(1)}
                          </span>
                          {moment.featured && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                              ⭐ Featured
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{moment.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">{moment.description}</p>

                        <div className="flex items-center text-sm text-gray-500 mb-4 gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {moment.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} /> {formatDate(moment.date)}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewMoment(moment);
                          }}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                          View Full Coverage
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {pagination.page < pagination.pages && (
                <div className="text-center mt-12">
                  <button
                    onClick={handleLoadMore}
                    disabled={loading}
                    className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading...' : `Load More (${pagination.page} of ${pagination.pages})`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Image Modal with Carousel */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                {(() => {
                  const mediaUrls = getMediaUrls(selectedImage);
                  const currentMedia = mediaUrls[currentSlide];
                  
                  return currentMedia ? (
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
                        alt={`${selectedImage.title} - ${currentSlide + 1}`}
                        className="w-full h-full object-contain"
                      />
                    )
                  ) : (
                    <div className="text-8xl">{selectedImage.image || '📸'}</div>
                  );
                })()}

                {getMediaUrls(selectedImage).length > 1 && (
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
                    
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {getMediaUrls(selectedImage).map((_, index) => (
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
                    
                    <div className="absolute top-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {currentSlide + 1} / {getMediaUrls(selectedImage).length}
                    </div>
                  </>
                )}
              </div>

              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(selectedImage.category)}`}>
                  {getCategoryIcon(selectedImage.category)} {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar size={16} /> {formatDate(selectedImage.date)}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedImage.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedImage.description}</p>

              <div className="flex items-center text-gray-600 mb-4 gap-4">
                <span className="flex items-center gap-1">
                  <MapPin size={18} /> {selectedImage.location}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={18} /> {selectedImage.views || 0} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart size={18} /> {selectedImage.likes || 0} engagements
                </span>
              </div>

              {selectedImage.photographer?.name && (
                <div className="text-sm text-gray-500 mb-4 border-t pt-4">
                  <p>📷 Photo by: {selectedImage.photographer.name}</p>
                  {selectedImage.photographer.credit && (
                    <p className="text-xs mt-1">{selectedImage.photographer.credit}</p>
                  )}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={(e) => handleLike(selectedImage._id, e)}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart size={18} /> Engage ({selectedImage.likes || 0})
                </button>
                
                <div className="flex-1 relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 size={18} /> Share Coverage
                  </button>

                  {showShareMenu && (
                    <>
                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-20">
                        <button
                          onClick={() => handleCopyLink(selectedImage)}
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
                          onClick={() => handleShareFacebook(selectedImage)}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                        >
                          <Facebook className="h-5 w-5 text-blue-600" />
                          <span>Share on Facebook</span>
                        </button>
                        
                        <button
                          onClick={() => handleShareTwitter(selectedImage)}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                        >
                          <Twitter className="h-5 w-5 text-sky-500" />
                          <span>Share on X (Twitter)</span>
                        </button>
                        
                        <button
                          onClick={() => handleShareInstagram(selectedImage)}
                          className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-pink-600" />
                          <span>Share on Instagram</span>
                        </button>
                      </div>
                      
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
      )}
    </div>
  );
};

export default Moments;