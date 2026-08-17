import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VolunteerForm from '../components/forms/VolunteerForm';
import ContactForm from '../components/forms/ContactForm';
import SEO from '../components/common/SEO';

const Join = () => {
  const [activeTab, setActiveTab] = useState('volunteer');
  const [stats, setStats] = useState({
    volunteers: 0,
    counties: 0,
    events: 0
  });

  useEffect(() => {
    const animateStats = () => {
      const targetStats = { volunteers: 15420, counties: 47, events: 156 };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let current = { volunteers: 0, counties: 0, events: 0 };

      const timer = setInterval(() => {
        current.volunteers = Math.min(current.volunteers + Math.ceil(targetStats.volunteers / steps), targetStats.volunteers);
        current.counties = Math.min(current.counties + Math.ceil(targetStats.counties / steps), targetStats.counties);
        current.events = Math.min(current.events + Math.ceil(targetStats.events / steps), targetStats.events);

        setStats({ ...current });

        if (current.volunteers === targetStats.volunteers && 
            current.counties === targetStats.counties && 
            current.events === targetStats.events) {
          clearInterval(timer);
        }
      }, increment);
    };

    animateStats();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <SEO 
        title="Join Our Movement - Reset. Restore. Rebuild Kenya 2027"
        description="Join thousands of Kenyans working to reset, restore, and rebuild our nation. Volunteer for the 2027 presidential campaign."
        keywords="volunteer Kenya, 2027 elections, political campaign, David Maraga, reset restore rebuild"
      />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-r from-green-600 via-green-700 to-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Join the <span className="text-yellow-300">Movement</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto">
              Together, we will Reset. Restore. Rebuild Kenya for all.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              {[
                { value: stats.volunteers, label: 'Volunteers', color: 'text-yellow-300' },
                { value: stats.counties, label: 'Counties', color: 'text-blue-300' },
                { value: stats.events, label: 'Events', color: 'text-green-300' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-2`}>
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </div>
                  <div className="text-green-100 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            
            <motion.a
              href="#volunteer-form"
              className="inline-flex items-center px-8 py-4 bg-yellow-400 text-green-900 font-bold rounded-full text-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Join as Volunteer</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Become a grassroots champion in your community. Every voice matters in building our nation's future.
              </p>
              <button
                onClick={() => setActiveTab('volunteer')}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Volunteer Now
              </button>
            </motion.div>

            <motion.div
              className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl">🏢</div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Partner with Us</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Organizations and community groups can amplify our impact through strategic partnerships.
              </p>
              <button
                onClick={() => setActiveTab('partner')}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Partner Today
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section id="volunteer-form" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of Kenyans who are already working to reset, restore, and rebuild our nation.
            </p>
          </motion.div>

          {/* Modern Tab Design */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-full p-1 shadow-lg">
              <div className="flex space-x-1">
                <button
                  className={`px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === 'volunteer' 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                  onClick={() => handleTabChange('volunteer')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Volunteer
                  </span>
                </button>
                <button
                  className={`px-6 py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 ${
                    activeTab === 'partner' 
                      ? 'bg-purple-600 text-white shadow-md' 
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                  onClick={() => handleTabChange('partner')}
                >
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    Partner
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Form Container */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white">
              <h3 className="text-2xl font-bold">
                {activeTab === 'volunteer' ? 'Volunteer Registration' : 'Partnership Application'}
              </h3>
              <p className="text-green-100 mt-2">
                {activeTab === 'volunteer' 
                  ? 'Tell us about yourself and how you can contribute to our movement' 
                  : 'Tell us about your organization and how we can work together'}
              </p>
            </div>
            
            <div className="p-6 sm:p-8">
              {activeTab === 'volunteer' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <VolunteerForm />
                </motion.div>
              )}

              {activeTab === 'partner' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="space-y-6">
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-purple-900">Partnership Benefits</h4>
                          <p className="mt-1 text-sm text-purple-700">
                            Partner organizations receive campaign materials, training, and opportunities to collaborate on community initiatives.
                          </p>
                        </div>
                      </div>
                    </div>
                    <ContactForm type="partner" />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Need Help Getting Started?</h2>
            <p className="text-xl text-green-100 mb-8">
              Our team is here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@campaign2027.ke" className="inline-flex items-center px-6 py-3 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Us
              </a>
              <a href="tel:+254700123456" className="inline-flex items-center px-6 py-3 bg-yellow-400 text-green-800 font-semibold rounded-full hover:bg-yellow-300 transition-colors">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call: 0700 123 456
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Join;