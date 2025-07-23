import React from 'react';

const About = () => {
  const achievements = [
    {
      year: "2016-2019",
      title: "Chief Justice of Kenya",
      description: "Led groundbreaking judicial reforms and strengthened the independence of the judiciary",
      icon: "⚖️"
    },
    {
      year: "2003-2016", 
      title: "Court of Appeal Judge",
      description: "Delivered landmark judgments on constitutional law and human rights",
      icon: "📜"
    },
    {
      year: "1999-2003",
      title: "High Court Judge", 
      description: "Served with distinction in commercial and constitutional matters",
      icon: "🏛️"
    },
    {
      year: "1975-1999",
      title: "Legal Practice",
      description: "Built successful legal practice focusing on constitutional and commercial law",
      icon: "💼"
    }
  ];

  const values = [
    {
      title: "Integrity",
      description: "Unwavering commitment to honesty, transparency, and ethical leadership",
      icon: "🌟"
    },
    {
      title: "Justice", 
      description: "Equal treatment and fair opportunities for all Kenyans regardless of background",
      icon: "⚖️"
    },
    {
      title: "Unity",
      description: "Bringing together all communities for a stronger, more cohesive Kenya", 
      icon: "🤝"
    },
    {
      title: "Progress",
      description: "Innovation and development that benefits every corner of our nation",
      icon: "🚀"
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
                <span className="text-6xl"><img src="/images/m.jpg" alt="" className='w-40 h-40 bg-white rounded-full mx-auto flex items-center justify-center shadow-2xl"' /></span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Your Name
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto">
              Distinguished Jurist, Constitutional Scholar, and Visionary Leader
            </p>
          </div>
        </div>
      </div>

      {/* Biography Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">A Life of Service</h2>
          </div>
          
          <div className="text-gray-600 leading-relaxed space-y-6">
            <p className="text-xl">
              The Honorable your name has dedicated his life to the service of justice, 
              constitutional law, and the betterment of Kenya. With over four decades of 
              distinguished service in the legal profession, he brings unparalleled experience 
              and unwavering integrity to the highest office in the land.
            </p>
            
            <p>
              Born and raised in Kenya, Justice name's journey began with a deep commitment 
              to education and justice. He obtained his Bachelor of Laws degree with distinction 
              and was admitted to the bar in 1975. His legal career has been marked by landmark 
              cases that have shaped Kenya's constitutional landscape and strengthened democratic institutions.
            </p>
            
            <p>
              As Chief Justice, he oversaw critical judicial reforms that enhanced the independence 
              of the judiciary and improved access to justice for all Kenyans. His leadership during 
              challenging periods demonstrated his commitment to constitutional principles and the 
              rule of law, earning him respect across the political spectrum.
            </p>
            
            <p>
              Now, Justice name brings his wealth of experience, proven leadership, and vision 
              for a transformed Kenya to serve as the next President of the Republic, committed to 
              resetting, restoring, and rebuilding our great nation.
            </p>
          </div>
        </div>
      </div>

      {/* Career Timeline */}
      <div className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Career Milestones</h2>
            <p className="text-xl text-gray-600">A distinguished career in service to Kenya</p>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Guiding Principles</h2>
            <p className="text-xl text-gray-600">The values that will guide our administration</p>
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

      {/* Vision Statement */}
      <div className="py-20 bg-gradient-to-r from-green-600 to-red-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-8">Our Vision for Kenya</h2>
          
          <div className="bg-white bg-opacity-10 rounded-2xl p-8 backdrop-blur-sm">
            <blockquote className="text-xl md:text-2xl text-white italic leading-relaxed mb-6">
              "I envision a Kenya where justice prevails, where every citizen has equal opportunity 
              to thrive, where corruption is a relic of the past, and where our diversity becomes 
              our greatest strength. Together, we will build a nation that works for all."
            </blockquote>
            <cite className="text-gray-200 font-semibold">- your name</cite>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Kenyans Say</h2>
            <p className="text-xl text-gray-600">Testimonials from across the nation</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">MK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Mary Kipkoech</div>
                  <div className="text-sm text-gray-600">Small Business Owner, Nakuru</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "His integrity during his time as Chief Justice gives me confidence that he will 
                bring the same principles to the presidency. Kenya needs honest leadership."
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">JO</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">James Otieno</div>
                  <div className="text-sm text-gray-600">University Lecturer, Kisumu</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "A leader who understands the law and constitution. His track record shows 
                he can bring the change Kenya desperately needs."
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-bold">AW</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Amina Wanjiku</div>
                  <div className="text-sm text-gray-600">Community Leader, Nairobi</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finally, a candidate who puts principles before politics. His vision for 
                unity gives me hope for Kenya's future."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;