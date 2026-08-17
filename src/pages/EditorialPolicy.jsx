// ================================
// EditorialPolicy.jsx
// ================================
import React from 'react';
import { Link } from 'react-router-dom';
import { Edit3, ArrowLeft } from 'lucide-react';

const EditorialPolicy = () => {
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
                <Edit3 className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Editorial Policy
            </h1>
            <p className="text-xl text-gray-200">
              Our commitment to journalistic integrity
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
                This Editorial Policy outlines the principles and standards that guide our 
                journalism at Civic Voice – Machakos Chapter. We are committed to providing 
                accurate, fair, and independent coverage of civic and political affairs in 
                Machakos County.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Independence and Integrity</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  Civic Voice – Machakos Chapter operates independently and is not affiliated 
                  with any political party, government institution, or electoral body.
                </p>
                <p><strong>We commit to:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Maintaining editorial independence from political and commercial interests</li>
                  <li>Making decisions based on journalistic merit, not external pressure</li>
                  <li>Disclosing any potential conflicts of interest</li>
                  <li>Refusing content that compromises our independence</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Accuracy and Verification</h2>
              <div className="space-y-3 text-gray-600">
                <p>Accuracy is the foundation of our journalism.</p>
                <p><strong>Our standards include:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Verifying information from multiple reliable sources</li>
                  <li>Clearly distinguishing between facts and opinions</li>
                  <li>Providing context and background information</li>
                  <li>Promptly correcting errors and publishing corrections prominently</li>
                  <li>Not publishing unverified rumors or speculation as fact</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Fairness and Balance</h2>
              <div className="space-y-3 text-gray-600">
                <p>We strive to present multiple perspectives on issues affecting Machakos County.</p>
                <p><strong>This means:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Seeking comment from all relevant parties before publication</li>
                  <li>Presenting diverse viewpoints fairly</li>
                  <li>Avoiding bias in language and presentation</li>
                  <li>Giving subjects of criticism the opportunity to respond</li>
                  <li>Acknowledging when perspectives are unavailable</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Transparency</h2>
              <div className="space-y-3 text-gray-600">
                <p>We believe in being transparent about our journalism.</p>
                <p><strong>We commit to:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Clearly identifying sources when possible</li>
                  <li>Explaining our methodology for investigations and analysis</li>
                  <li>Disclosing when we use anonymous sources and why</li>
                  <li>Being clear about opinion pieces versus news reporting</li>
                  <li>Acknowledging limitations in our coverage</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sources and Attribution</h2>
              <div className="space-y-3 text-gray-600">
                <p><strong>We follow these principles:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Identifying sources whenever possible</li>
                  <li>Using anonymous sources only when necessary for important public interest stories</li>
                  <li>Verifying the credibility and motivations of sources</li>
                  <li>Properly attributing information, quotes, and ideas</li>
                  <li>Not paying sources for information</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Respect and Dignity</h2>
              <div className="space-y-3 text-gray-600">
                <p>We treat subjects and readers with respect.</p>
                <p><strong>This includes:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Avoiding inflammatory or sensational language</li>
                  <li>Being sensitive to victims of tragedy or crime</li>
                  <li>Respecting privacy where appropriate</li>
                  <li>Avoiding stereotypes and discriminatory language</li>
                  <li>Conducting interviews professionally and ethically</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Corrections and Accountability</h2>
              <div className="space-y-3 text-gray-600">
                <p>We take responsibility for our work.</p>
                <p><strong>When errors occur:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>We correct them promptly and transparently</li>
                  <li>Corrections are published prominently</li>
                  <li>We explain what was wrong and why</li>
                  <li>Readers can report concerns via our contact channels</li>
                  <li>We review our processes to prevent similar errors</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. User-Generated Content</h2>
              <div className="space-y-3 text-gray-600">
                <p>We welcome contributions from the community but maintain standards.</p>
                <p><strong>Submitted content must:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Be factual and verifiable</li>
                  <li>Respect the privacy and dignity of others</li>
                  <li>Avoid hate speech, defamation, or harassment</li>
                  <li>Comply with Kenyan laws</li>
                  <li>Be clearly labeled as opinion when applicable</li>
                </ul>
                <p className="mt-3">
                  We reserve the right to edit or reject submitted content that does not meet 
                  these standards. Opinions expressed by contributors are their own and do not 
                  necessarily reflect the views of Civic Voice – Machakos Chapter.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Conflicts of Interest</h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  Our staff and contributors must disclose any personal, financial, or political 
                  interests that could affect their reporting.
                </p>
                <p><strong>We prohibit:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Accepting gifts or favors from sources</li>
                  <li>Covering stories where there is a personal interest</li>
                  <li>Political activism by staff that conflicts with objective reporting</li>
                  <li>Using our platform for personal or commercial gain</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Legal and Ethical Compliance</h2>
              <div className="space-y-3 text-gray-600">
                <p>We operate within the framework of Kenyan law and journalistic ethics.</p>
                <p><strong>This includes:</strong></p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Respecting defamation and libel laws</li>
                  <li>Protecting confidential sources when legally possible</li>
                  <li>Following data protection regulations</li>
                  <li>Adhering to election reporting guidelines</li>
                  <li>Consulting legal advice when necessary</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <div className="text-gray-600 space-y-2">
                <p>
                  If you have concerns about our editorial standards or wish to report an error, 
                  please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mt-3">
                  <p><strong>Editorial Team:</strong> editorial@civicvoice-machakos.ke</p>
                  <p><strong>General Inquiries:</strong> info@civicvoice-machakos.ke</p>
                  <p><strong>Phone:</strong> +254 793 830 795</p>
                </div>
              </div>
            </section>

            {/* Statement Box */}
            <div className="bg-gradient-to-r from-green-50 to-red-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <p className="text-gray-800 font-medium">
                This Editorial Policy is a living document that may be updated to reflect evolving 
                best practices in journalism. We are committed to upholding these standards in 
                service of the people of Machakos County.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorialPolicy;