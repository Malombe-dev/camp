import React, { useState } from 'react';

const Press = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Releases', count: 12 },
    { id: 'announcement', label: 'Announcements', count: 4 },
    { id: 'statement', label: 'Statements', count: 5 },
    { id: 'speech', label: 'Speeches', count: 3 }
  ];

  const pressReleases = [
    {
      id: 1,
      title: "Campaign Launch: A New Dawn for Kenya",
      category: 'announcement',
      date: '2025-07-20',
      excerpt: "Today marks the beginning of a transformative journey for our beloved Kenya. With the launch of our presidential campaign, we commit to resetting failed systems, restoring public trust, and rebuilding our nation stronger than ever before.",
      readTime: '5 min read',
      featured: true
    },
    {
      id: 2,
      title: "Addressing Kenya's Economic Challenges",
      category: 'statement',
      date: '2025-07-18',
      excerpt: "Our comprehensive economic plan focuses on job creation, supporting small businesses, and ensuring sustainable growth that benefits every Kenyan. We will prioritize transparency in government spending and eliminate wasteful expenditure.",
      readTime: '4 min read',
      featured: false
    },
    {
      id: 3,
      title: "Speech at Kenya Ideas Festival",
      category: 'speech',
      date: '2025-07-15',
      excerpt: "Kenya's future lies in the hands of its people. At the Kenya Ideas Festival, we outlined our vision for inclusive development, educational reform, and technological innovation that will propel Kenya into the next generation.",
      readTime: '8 min read',
      featured: true
    },
    {
      id: 4,
      title: "Youth Empowerment Initiative Announcement",
      category: 'announcement',
      date: '2025-07-12',
      excerpt: "Launching a comprehensive youth empowerment program that will create 500,000 jobs over the next five years through skills training, entrepreneurship support, and technology innovation hubs across all 47 counties.",
      readTime: '3 min read',
      featured: false
    },
    {
      id: 5,
      title: "Healthcare Reform: A Right, Not a Privilege",
      category: 'statement',
      date: '2025-07-10',
      excerpt: "Healthcare is a fundamental human right. Our administration will implement universal healthcare coverage, modernize medical facilities, and ensure no Kenyan suffers due to lack of access to quality medical care.",
      readTime: '6 min read',
      featured: false
    },
    {
      id: 6,
      title: "Education for All: Building Tomorrow's Leaders",
      category: 'statement',
      date: '2025-07-08',
      excerpt: "Every child deserves quality education. We will increase education funding, improve teacher welfare, modernize curriculum to include digital skills, and ensure no child is left behind due to financial constraints.",
      readTime: '5 min read',
      featured: false
    }
  ];

  const filteredReleases = pressReleases.filter(release => {
    const matchesCategory = selectedCategory === 'all' || release.category === selectedCategory;
    const matchesSearch = release.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         release.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'announcement': return '📢';
      case 'statement': return '📋';
      case 'speech': return '🎤';
      default: return '📰';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'statement': return 'bg-green-100 text-green-800';
      case 'speech': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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
        {selectedCategory === 'all' && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Releases</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {pressReleases.filter(release => release.featured).map((release) => (
                <div key={release.id} className="bg-gradient-to-br from-green-50 to-red-50 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(release.category)}`}>
                        <span className="mr-1">{getCategoryIcon(release.category)}</span>
                        {release.category.charAt(0).toUpperCase() + release.category.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">{formatDate(release.date)}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {release.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {release.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
                        Read Full Release
                      </button>
                      <span className="text-sm text-gray-500">{release.readTime}</span>
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
               categories.find(cat => cat.id === selectedCategory)?.label}
            </h2>
            <span className="text-gray-500">
              {filteredReleases.length} release{filteredReleases.length !== 1 ? 's' : ''} found
            </span>
          </div>

          <div className="space-y-6">
            {filteredReleases.map((release) => (
              <div key={release.id} className="bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(release.category)}`}>
                          <span className="mr-1">{getCategoryIcon(release.category)}</span>
                          {release.category.charAt(0).toUpperCase() + release.category.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(release.date)}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{release.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                        {release.title}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {release.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <button className="bg-gray-100 hover:bg-green-600 hover:text-white text-gray-700 px-4 py-2 rounded-lg font-medium transition-all duration-200">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredReleases.length === 0 && (
            <div className="text-center py-16">
              <span className="text-6xl mb-4 block">📭</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No releases found</h3>
              <p className="text-gray-600">Try adjusting your search terms or filters.</p>
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