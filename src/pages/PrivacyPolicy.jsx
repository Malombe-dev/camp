// PrivacyPolicy.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-600 to-red-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-gray-200 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="text-center">
            <div className="mb-6">
              <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-xl">
                <Shield className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-200">
              How we protect your personal information
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <div>
              <p className="text-gray-600 mb-4">
                <strong>Effective Date:</strong> December 30, 2025
              </p>
              <p className="text-gray-600">
                Civic Voice – Machakos Chapter ("we," "us," or "our") is committed to protecting 
                your privacy. This Privacy Policy explains how we collect, use, disclose, and 
                safeguard your information when you visit our website.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-gray-600">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide when you:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Subscribe to our newsletter</li>
                    <li>Submit content or comments</li>
                    <li>Contact us through our forms</li>
                    <li>Register for events or forums</li>
                  </ul>
                  <p className="mt-2">This may include your name, email address, phone number, and any other information you choose to provide.</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Automatically Collected Information</h3>
                  <p>When you visit our website, we may automatically collect certain information about your device, including:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>IP address and browser type</li>
                    <li>Operating system and device information</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring website addresses</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="space-y-2 text-gray-600">
                <p>We use the information we collect to:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Send newsletters and updates you've subscribed to</li>
                  <li>Respond to your inquiries and requests</li>
                  <li>Improve our website and services</li>
                  <li>Analyze website usage and trends</li>
                  <li>Notify you about events and public forums</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. 
                  We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>With service providers who assist in operating our website</li>
                  <li>When required by law or to protect our legal rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-600">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <div className="space-y-2 text-gray-600">
                <p>You have the right to:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications at any time</li>
                  <li>Withdraw consent where we rely on it</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
              <p className="text-gray-600">
                We use cookies and similar tracking technologies to enhance your experience on 
                our website. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
              <p className="text-gray-600">
                Our website is not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to This Policy</h2>
              <p className="text-gray-600">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact Us</h2>
              <div className="text-gray-600 space-y-2">
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3">
                  <p><strong>Email:</strong> info@civicvoice-machakos.ke</p>
                  <p><strong>Phone:</strong> +254 793 830 795</p>
                  <p><strong>Address:</strong> Machakos County, Kenya</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;