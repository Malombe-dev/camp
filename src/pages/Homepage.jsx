import React from 'react';

const Home = () => {
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
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200 shadow-lg">
              🤝 Join Our Movement
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 shadow-lg">
              📖 Read Our Vision
            </button>
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
            <button className="text-green-600 hover:text-green-700 font-semibold">
              View All Press Releases →
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <span className="text-4xl">📢</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-green-600 font-semibold mb-2">PRESS RELEASE</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Campaign Launch at Kenya Ideas Festival
                </h3>
                <p className="text-gray-600 mb-4">
                  Addressing the nation's future with bold ideas and transformative solutions for Kenya's challenges.
                </p>
                <div className="text-sm text-gray-500">July 20, 2025</div>
              </div>
            </div>

            {/* News Item 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-r from-red-400 to-pink-500 flex items-center justify-center">
                <span className="text-4xl">🎥</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-red-600 font-semibold mb-2">VIDEO</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Vision for Kenya's Future
                </h3>
                <p className="text-gray-600 mb-4">
                  Watch our comprehensive plan for economic growth, social justice, and national unity.
                </p>
                <div className="text-sm text-gray-500">July 18, 2025</div>
              </div>
            </div>

            {/* News Item 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center">
                <span className="text-4xl">🤝</span>
              </div>
              <div className="p-6">
                <div className="text-sm text-purple-600 font-semibold mb-2">ANNOUNCEMENT</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Youth Empowerment Initiative
                </h3>
                <p className="text-gray-600 mb-4">
                  Launching programs to support young entrepreneurs and create sustainable employment opportunities.
                </p>
                <div className="text-sm text-gray-500">July 15, 2025</div>
              </div>
            </div>
          </div>
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
            <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-200">
              🗳️ Register to Vote
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200">
              📧 Stay Updated
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;