import React from 'react';

const About = () => {
  const achievements = [
    {
      year: "2024-Present",
      title: "Civic Information Platform",
      description: "Providing independent coverage of governance, public policy, and leadership in Machakos County",
      icon: "📰"
    },
    {
      year: "Focus Areas", 
      title: "County Governance",
      description: "Monitoring county assembly proceedings, budget allocations, and development projects",
      icon: "🏛️"
    },
    {
      year: "Core Mission",
      title: "Public Accountability", 
      description: "Tracking implementation of county policies and use of public resources",
      icon: "⚖️"
    },
    {
      year: "Community",
      title: "Civic Engagement",
      description: "Creating platforms for public dialogue on issues affecting Machakos residents",
      icon: "🤝"
    }
  ];

  const values = [
    {
      title: "Independence",
      description: "Unbiased reporting not affiliated with any political party or government institution",
      icon: "🌟"
    },
    {
      title: "Transparency", 
      description: "Promoting openness in governance and holding leaders accountable to the people",
      icon: "📊"
    },
    {
      title: "Engagement",
      description: "Amplifying citizens' voices and facilitating meaningful public discourse", 
      icon: "💬"
    },
    {
      title: "Accuracy",
      description: "Providing factual, well-researched information on county affairs and policies",
      icon: "✓"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 to-red-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-40 h-40 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl">
                <span className="text-6xl">🗣️</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Civic Voice – Machakos Chapter
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              The People's Voice in Machakos County
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
          </div>
          
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-xl">
              Civic Voice – Machakos Chapter is an independent civic and political information 
              platform dedicated to covering governance, public policy, and leadership issues 
              affecting Machakos County.
            </p>
            
            <p>
              We provide timely news, informed analysis, and a space for public engagement while 
              promoting transparency, accountability, and responsible leadership. Our mission is 
              to empower Machakos residents with accurate information about county affairs, 
              development projects, and decisions that impact their daily lives.
            </p>
            
            <p>
              Through investigative reporting, policy analysis, and community engagement, we serve 
              as a bridge between county leadership and the people. We believe that informed citizens 
              are essential for effective democratic governance and sustainable development.
            </p>
            
            <p>
              Our platform operates independently, without affiliation to any political party, 
              government institution, or electoral body. We are committed to objective journalism 
              and giving voice to all perspectives within Machakos County.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <h3 className="font-bold text-gray-900 mb-2">Editorial Disclaimer</h3>
            <p className="text-sm text-gray-700">
              Civic Voice – Machakos Chapter is an independent platform and is not affiliated 
              with any political party, government institution, or electoral body. Opinions 
              expressed by contributors are their own and do not necessarily reflect the views 
              of this platform.
            </p>
          </div>
        </div>
      </div>

      {/* Focus Areas */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Focus Areas</h2>
            <p className="text-xl text-gray-600">Coverage that matters to Machakos residents</p>
          </div>

          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{achievement.icon}</span>
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900">{achievement.title}</h3>
                      <span className="text-green-600 font-semibold">{achievement.year}</span>
                    </div>
                    <p className="text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Principles</h2>
            <p className="text-xl text-gray-600">Values that guide our coverage</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">Our Mission</h2>
          
          <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <blockquote className="text-xl md:text-2xl text-white italic leading-relaxed mb-6">
              "To inform, engage, and empower Machakos residents through independent journalism, 
              promoting transparency in governance, accountability in leadership, and active 
              citizen participation in shaping our county's future."
            </blockquote>
            <cite className="text-gray-200 font-semibold">- Civic Voice Team</cite>
          </div>
        </div>
      </div>

      {/* Community Voices */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Readers Say</h2>
            <p className="text-xl text-gray-600">Feedback from Machakos residents</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MN</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mary Ndunge</div>
                  <div className="text-sm text-gray-600">Small Business Owner, Machakos Town</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finally, a platform that keeps us informed about what's happening in our county. 
                The coverage is balanced and helps us understand how decisions affect our community."
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JM</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">James Mutua</div>
                  <div className="text-sm text-gray-600">Teacher, Kangundo</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Civic Voice provides the accountability journalism Machakos needs. They report 
                on issues that matter to ordinary residents."
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Ann Kavata</div>
                  <div className="text-sm text-gray-600">Youth Leader, Mlolongo</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform gives young people a voice in county matters. It's helping us 
                engage more meaningfully with governance issues."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;