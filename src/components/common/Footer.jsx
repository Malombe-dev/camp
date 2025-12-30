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
          
          {/* Platform Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-3">🗳️</span>
              <div>
                <h3 className="text-xl font-bold text-cyan-400">Civic Voice</h3>
                <p className="text-sm text-gray-400">Machakos Chapter</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Independent civic and political platform covering governance, public policy, 
              and leadership accountability in Machakos County.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-cyan-400 mr-3" />
                <span className="text-sm text-gray-300">
                  Machakos County, Kenya
                </span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-cyan-400 mr-3" />
                <span className="text-sm text-gray-300">+254 793 830 795</span>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-cyan-400 mr-3" />
                <span className="text-sm text-gray-300">info@civicvoice-machakos.ke</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-cyan-400">Explore</h4>
            <nav className="space-y-3">
              <Link 
                to="/about" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                About Us
              </Link>
              <Link 
                to="/press" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                News & Analysis
              </Link>
              <Link 
                to="/governance" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Governance Reports
              </Link>
              <Link 
                to="/events" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Public Forums
              </Link>
              <Link 
                to="/moments" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Media Gallery
              </Link>
            </nav>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-cyan-400">Participate</h4>
            <nav className="space-y-3">
              <Link 
                to="/contribute" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Contribute Content
              </Link>
              <Link 
                to="/subscribe" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Subscribe to Updates
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
              <Link 
                to="/report" 
                className="block text-gray-300 hover:text-cyan-400 transition-colors duration-200"
              >
                Report an Issue
              </Link>
            </nav>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-300">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:border-cyan-400 text-white"
                />
                <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-r-md transition-colors duration-200">
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
                href="https://facebook.com/civicvoicemachakos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              
              <a 
                href="https://twitter.com/civicvoicemks" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              
              <a 
                href="https://instagram.com/civicvoicemachakos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              
              <a 
                href="https://youtube.com/civicvoicemachakos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                © {currentYear} Civic Voice – Machakos Chapter. Made with{' '}
                <Heart className="inline h-4 w-4 text-cyan-500" />{' '}
                for Machakos.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-2 text-xs text-gray-500">
                <Link to="/privacy" className="hover:text-cyan-400">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-cyan-400">Terms of Use</Link>
                <Link to="/editorial-policy" className="hover:text-cyan-400">Editorial Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <p className="text-xs text-gray-500 text-center">
            <strong>Disclaimer:</strong> Civic Voice – Machakos Chapter is an independent platform 
            and is not affiliated with any political party, government institution, or electoral body. 
            Opinions expressed by contributors are their own.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;