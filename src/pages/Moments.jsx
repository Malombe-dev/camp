import React, { useState } from 'react';

const Moments = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Moments', count: 24 },
    { id: 'campaign', label: 'Campaign Events', count: 8 },
    { id: 'community', label: 'Community Visits', count: 7 },
    { id: 'speeches', label: 'Speeches & Rallies', count: 6 },
    { id: 'meetings', label: 'Meetings', count: 3 }
  ];

  const moments = [
    {
      id: 1,
      title: "Campaign Launch at Kenya Ideas Festival",
      category: 'campaign',
      date: '2025-07-20',
      location: 'Nairobi',
      description: "Official campaign launch with thousands of supporters. A historic moment marking the beginning of Kenya's transformation journey.",
      image: "🏟️",
      featured: true
    },
    {
      id: 2,
      title: "Meeting with Youth Leaders",
      category: 'meetings',
      date: '2025-07-18',
      location: 'Kisumu',
      description: "Engaging with young leaders to discuss employment opportunities, entrepreneurship support, and education reforms.",
      image: "👥",
      featured: true
    },
    {
      id: 3,
      title: "Community Visit in Turkana",
      category: 'community',
      date: '2025-07-15',
      location: 'Turkana',
      description: "Understanding the challenges faced by pastoralist communities and discussing sustainable development solutions.",
      image: "🏘️",
      featured: false
    },
    {
      id: 4,
      title: "Economic Forum Address",
      category: 'speeches',
      date: '2025-07-12',
      location: 'Mombasa',
      description: "Presenting comprehensive economic policies to business leaders and stakeholders at the Coast Economic Forum.",
      image: "💼",
      featured: true
    },
    {
      id: 5,
      title: "Healthcare Workers Appreciation",
      category: 'community',
      date: '2025-07-10',
      location: 'Eldoret',
      description: "Recognizing the dedication of healthcare workers and outlining plans for healthcare system improvement.",
      image: "🏥",
      featured: false
    },
    {
      id: 6,
      title: "University Students Rally",
      category: 'speeches',
      date: '2025-07-08',
      location: 'Nakuru',
      description: "Addressing university students on education reform, research funding, and career opportunities.",
      image: "🎓",
      featured: false
    },
    {
      id: 7,
      title: "Farmers' Meeting in Meru",
      category: 'meetings',
      date: '2025-07-05',
      location: 'Meru',
      description: "Discussing agricultural policies, subsidies, and market access with farming communities.",
      image: "🌾",
      featured: false
    },
    {
      id: 8,
      title: "Women Leaders Summit",
      category: 'campaign',
      date: '2025-07-02',
      location: 'Nairobi',
      description: "Engaging with women leaders on gender equality, women empowerment, and inclusive governance.",
      image: "👩‍💼",
      featured: true
    }
  ];

  const filteredMoments = moments.filter(moment => {
    return selectedCategory === 'all' || moment.category === selectedCategory;
  });

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
    switch(category) {
      case 'campaign': return '🎯';
      case 'community': return '🤝';
      case 'speeches': return '🎤';
      case 'meetings': return '🤝';
      default: return '📸';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Campaign Moments</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Capturing the journey of transformation across every corner of Kenya
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold">47</div>
              <div className="text-sm opacity-80">Counties Visited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm opacity-80">Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">50K+</div>
              <div className="text-sm opacity-80">Kenyans Engaged</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{getCategoryIcon(category.id)}</span>
                {category.label}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Moments Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMoments.map((moment) => (
              <div
                key={moment.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ${
                  moment.featured ? 'ring-2 ring-green-500' : ''
                }`}
              >
                {/* Image Placeholder with Emoji */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl">
                  {moment.image}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(moment.category)}`}>
                      {moment.category.charAt(0).toUpperCase() + moment.category.slice(1)}
                    </span>
                    {moment.featured && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{moment.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{moment.description}</p>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="mr-4">📍 {moment.location}</span>
                    <span>📅 {formatDate(moment.date)}</span>
                  </div>

                  <button
                    onClick={() => setSelectedImage(moment)}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors">
              Load More Moments
            </button>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="relative">
              <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-8xl">
                {selectedImage.image}
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-opacity-75 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(selectedImage.category)}`}>
                  {selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}
                </span>
                <span className="text-sm text-gray-500">📅 {formatDate(selectedImage.date)}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selectedImage.title}</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedImage.description}</p>

              <div className="flex items-center text-gray-600 mb-4">
                <span className="mr-4">📍 {selectedImage.location}</span>
              </div>

              <div className="flex space-x-4">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  Share Moment
                </button>
                <button className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moments;