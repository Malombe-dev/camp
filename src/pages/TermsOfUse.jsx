// ================================
// TermsOfUse.jsx
// ================================
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const TermsOfUse = () => {
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
                <FileText className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Terms of Use
            </h1>
            <p className="text-xl text-gray-200">
              Guidelines for using our platform
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
                Welcome to Civic Voice – Machakos Chapter. By accessing or using our website, 
                you agree to be bound by these Terms of Use. Please read them carefully.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600">
                By accessing and using this website, you accept and agree to be bound by these 
                Terms of Use and our Privacy Policy. If you do not agree, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
              <div className="space-y-3 text-gray-600">
                <p>You agree to use this website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the website.</p>
                <p><strong>Prohibited activities include:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Posting false, misleading, or defamatory content</li>
                  <li>Harassment, threats, or hate speech</li>
                  <li>Violating intellectual property rights</li>
                  <li>Attempting to hack or disrupt the website</li>
                  <li>Spamming or unauthorized advertising</li>
                  <li>Impersonating others</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Content and Intellectual Property</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  All content on this website, including text, graphics, logos, images, and 
                  software, is the property of Civic Voice – Machakos Chapter or its content 
                  suppliers and is protected by copyright and intellectual property laws.
                </p>
                <p>
                  You may view, download, and print content for personal, non-commercial use 
                  only. Any other use requires our prior written permission.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User-Generated Content</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  When you submit content (comments, articles, photos, etc.) to our website:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>You retain ownership of your content</li>
                  <li>You grant us a non-exclusive license to use, reproduce, and display your content</li>
                  <li>You represent that you own or have rights to the content</li>
                  <li>You agree your content does not violate any laws or third-party rights</li>
                </ul>
                <p className="mt-3">
                  We reserve the right to remove any content that violates these Terms or our 
                  Editorial Policy without notice.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Disclaimer of Warranties</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  This website and its content are provided "as is" without any warranties, 
                  express or implied. We do not guarantee:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>The accuracy, completeness, or timeliness of information</li>
                  <li>Uninterrupted or error-free operation of the website</li>
                  <li>That defects will be corrected</li>
                  <li>That the website is free from viruses or harmful components</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-600">
                To the fullest extent permitted by law, Civic Voice – Machakos Chapter shall not 
                be liable for any indirect, incidental, special, consequential, or punitive damages 
                arising from your use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. External Links</h2>
              <p className="text-gray-600">
                Our website may contain links to third-party websites. We are not responsible for 
                the content, privacy practices, or terms of use of these external sites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Indemnification</h2>
              <p className="text-gray-600">
                You agree to indemnify and hold harmless Civic Voice – Machakos Chapter from any 
                claims, damages, or expenses arising from your use of the website or violation of 
                these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modifications to Terms</h2>
              <p className="text-gray-600">
                We reserve the right to modify these Terms at any time. Changes will be effective 
                immediately upon posting. Your continued use of the website constitutes acceptance 
                of the modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law</h2>
              <p className="text-gray-600">
                These Terms shall be governed by and construed in accordance with the laws of Kenya. 
                Any disputes shall be subject to the exclusive jurisdiction of the courts of Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Information</h2>
              <div className="text-gray-600 space-y-2">
                <p>For questions about these Terms of Use, contact us:</p>
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

export default TermsOfUse;