import React, { useState, useEffect } from 'react';

const Press = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});
  // inside Press.jsx, just under your other state
  const token = localStorage.getItem('token');
  const authHeader = { Authorization: token ? `Bearer ${token}` : '' };

  // API base URL - adjust this to match your backend
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';


  const categories = [
    { id: 'all', label: 'All Releases', count: 0 },
    { id: 'PRESS RELEASE', label: 'Press Releases', count: 0 },
    { id: 'VIDEO', label: 'Videos', count: 0 },
    { id: 'ANNOUNCEMENT', label: 'Announcements', count: 0 }
  ];

  // Fetch all press releases
  const fetchPressReleases = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
  
      const response = await fetch(`${API_BASE}/api/press`, { headers: authHeader });
  
      if (response.status === 401 || response.status === 403) {
        // Not authenticated → kick to login and remember where to come back
        window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
        return;
      }
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${response.statusText} — ${errorText}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON response but received something else.');
      }
  
      const data = await response.json();
      const releases = data.data || data.pressReleases || data || [];
      setPressReleases(Array.isArray(releases) ? releases : []);
      setError(null);
    } catch (err) {
      const errorMessage = err.message.includes('fetch')
        ? 'Unable to connect to server. Please check if the API server is running.'
        : `API Error: ${err.message}`;
      setError(errorMessage);
      console.error('Error fetching press releases:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch press releases by type
  const fetchPressByType = async (type) => {
    try {
      setLoading(true);
      console.log('Fetching by type:', `${API_BASE}/api/press/type/${type}`);
      
      
      const response = await fetch(`${API_BASE}/api/press/type/${type}`, { headers: authHeader });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);
        throw new Error(`Expected JSON but received: ${contentType}`);
      }
      
      const data = await response.json();
      const releases = data.data || data.pressReleases || data || [];
      setPressReleases(Array.isArray(releases) ? releases : []);
      setError(null);
    } catch (err) {
      const errorMessage = err.message.includes('fetch') 
        ? 'Unable to connect to server. Please check if the API server is running.'
        : `API Error: ${err.message}`;
      setError(errorMessage);
      console.error('Error fetching press releases by type:', err);
    } finally {
      setLoading(false);
    }
  };

  // Search press releases
  const searchPressReleases = async (query) => {
    try {
      setLoading(true);
      console.log('Searching:', `${API_BASE}/api/press/search?q=${encodeURIComponent(query)}`);
      
      const response = await fetch(`${API_BASE}/api/press/search?q=${encodeURIComponent(query)}`, { headers: authHeader });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);
        throw new Error(`Expected JSON but received: ${contentType}`);
      }
      
      const data = await response.json();
      const releases = data.data || data.pressReleases || data || [];
      setPressReleases(Array.isArray(releases) ? releases : []);
      setError(null);
    } catch (err) {
      const errorMessage = err.message.includes('fetch') 
        ? 'Unable to connect to server. Please check if the API server is running.'
        : `API Error: ${err.message}`;
      setError(errorMessage);
      console.error('Error searching press releases:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchPressReleases();
  }, []);

  // Handle category change
  useEffect(() => {
    if (searchTerm.trim()) {
      // If there's a search term, don't filter by category yet
      return;
    }
    
    if (selectedCategory === 'all') {
      fetchPressReleases();
    } else {
      fetchPressByType(selectedCategory);
    }
  }, [selectedCategory]);

  // Handle search with debouncing
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.trim()) {
        searchPressReleases(searchTerm);
      } else {
        // When search is cleared, reapply the current category filter
        if (selectedCategory === 'all') {
          fetchPressReleases();
        } else {
          fetchPressByType(selectedCategory);
        }
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory]);

  // Update category counts based on current data
  const updatedCategories = categories.map(category => {
    if (category.id === 'all') {
      return { ...category, count: pressReleases.length };
    }
    
    // Count releases of this type from the current data
    const count = pressReleases.filter(release => 
      release.type === category.id || 
      release.category === category.id
    ).length;
    
    return { ...category, count };
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'ANNOUNCEMENT': return '📢';
      case 'PRESS RELEASE': return '📋';
      case 'VIDEO': return '🎥';
      default: return '📰';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'ANNOUNCEMENT': return 'bg-blue-100 text-blue-800';
      case 'PRESS RELEASE': return 'bg-green-100 text-green-800';
      case 'VIDEO': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReadMore = (pressId) => {
    // Navigate to individual press release or open modal
    // You can implement routing here based on your needs
    window.open(`/press/${pressId}`, '_blank');
  };

  if (loading && pressReleases.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading press releases...</p>
        </div>
      </div>
    );
  }

  if (error && pressReleases.length === 0) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">⚠️</span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Press Releases</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchPressReleases}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const featuredReleases = pressReleases.filter(release => release.featured);

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-red-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Press Center
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
            Latest news, statements, and updates from our campaign. 
            Stay informed on our vision for Kenya's transformation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <input
                type="text"
                placeholder="Search press releases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <span className="text-gray-400">🔍</span>
              </div>
              {loading && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                </div>
              )}
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {updatedCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    console.log('Category clicked:', category.id);
                    setSelectedCategory(category.id);
                    setSearchTerm(''); // Clear search when changing category
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Releases */}
        {selectedCategory === 'all' && featuredReleases.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Releases</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredReleases.map((release) => (
                <div key={release._id} className="bg-gradient-to-br from-green-50 to-red-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(release.type)}`}>
                        <span className="mr-1">{getCategoryIcon(release.type)}</span>
                        {release.type?.charAt(0).toUpperCase() + release.type?.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(release.publishedAt || release.createdAt)}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {release.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {release.excerpt || release.content?.substring(0, 200) + '...'}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => handleReadMore(release._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                      >
                        Read Full Release
                      </button>
                      <span className="text-sm text-gray-500">
                        {release.readTime || Math.ceil((release.content?.length || 0) / 1000) + ' min read'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Releases */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Press Releases' : 
               updatedCategories.find(cat => cat.id === selectedCategory)?.label}
            </h2>
            <span className="text-gray-500">
              {pressReleases.length} release{pressReleases.length !== 1 ? 's' : ''} found
            </span>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading...</p>
            </div>
          )}

          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div key={release._id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(release.type)}`}>
                          <span className="mr-1">{getCategoryIcon(release.type)}</span>
                          {release.type?.charAt(0).toUpperCase() + release.type?.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(release.publishedAt || release.createdAt)}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">
                          {release.readTime || Math.ceil((release.content?.length || 0) / 1000) + ' min read'}
                        </span>
                        {release.featured && (
                          <>
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-medium">
                              Featured
                            </span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                        {release.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {release.excerpt || release.content?.substring(0, 200) + '...'}
                      </p>

                      {release.tags && release.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {release.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <button 
                        onClick={() => handleReadMore(release._id)}
                        className="bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pressReleases.length === 0 && !loading && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📭</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No releases found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search terms.' : 'No press releases available at the moment.'}
              </p>
            </div>
          )}
        </div>

        {/* Media Contact Section */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Media Contact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              For media inquiries, interview requests, or additional information, 
              please contact our press team.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">press@campaign2027.ke</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+254 700 000 000</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
              <p className="text-gray-600">Mon-Fri, 9AM-5PM EAT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Press;