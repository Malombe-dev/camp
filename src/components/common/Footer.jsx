import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  Heart 
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Campaign Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              {/* <img 
                src="/images/logo.png" 
                alt="Campaign 2027 Logo" 
                className="h-12 w-12 mr-3"
              /> */}
              <span className="text-6xl">🇰🇪</span>
              <div>
                <h3 className="text-xl font-bold text-blue-400">Campaign 2027</h3>
                <p className="text-sm text-gray-400">"Reset. Restore. Rebuild."</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Join us in building a better Kenya. Together, we can reset our systems, 
              restore our values, and rebuild our nation for future generations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-sm text-gray-300">
                  Nairobi Campaign Headquarters<br />
                  P.O. Box 12345, Nairobi, Kenya
                </span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-sm text-gray-300">+254 793 830 795</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-sm text-gray-300">info@campaign2027.ke</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h4>
            <nav className="space-y-3">
              <Link 
                to="/about" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                About Your Name
              </Link>
              <Link 
                to="/policies" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Our Policies
              </Link>
              <Link 
                to="/press" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Press Releases
              </Link>
              <Link 
                to="/events" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Campaign Events
              </Link>
              <Link 
                to="/moments" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Campaign Moments
              </Link>
            </nav>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-blue-400">Get Involved</h4>
            <nav className="space-y-3">
              <Link 
                to="/join" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Volunteer
              </Link>
              <Link 
                to="/donate" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Donate
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </nav>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-300">Stay Updated</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-blue-400"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-md transition-colors duration-200">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a 
                href="https://facebook.com/campaign2027" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              
              <a 
                href="https://twitter.com/campaign2027" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              
              <a 
                href="https://instagram.com/campaign2027" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              
              <a 
                href="https://youtube.com/campaign2027" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} Campaign 2027. Made with{' '}
                <Heart className="inline h-4 w-4 text-red-500" />{' '}
                for Kenya.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2 text-xs text-gray-500">
                <Link to="/privacy" className="hover:text-blue-400">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-blue-400">Terms of Service</Link>
                <Link to="/accessibility" className="hover:text-blue-400">Accessibility</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;