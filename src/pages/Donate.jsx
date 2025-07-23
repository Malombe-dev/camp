import React, { useState } from 'react';
import { CreditCard, Smartphone, Building2, Users, Target, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: '',
    occupation: '',
    employer: '',
    anonymous: false
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [500, 1000, 2500, 5000, 10000, 25000];

  const impactMessages = {
    500: "Feeds 5 volunteers for a day during campaign events",
    1000: "Covers transportation for rural outreach programs",
    2500: "Funds campaign materials for one constituency",
    5000: "Sponsors a town hall meeting in your community",
    10000: "Supports voter education programs for 1 week",
    25000: "Funds campaign activities for an entire county"
  };

  const campaignStats = {
    raised: 15750000,
    goal: 50000000,
    donors: 2847,
    counties: 47
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount('');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Thank you for your donation! You will receive a confirmation shortly.');
    }, 2000);
  };

  const finalAmount = selectedAmount || customAmount;
  const progressPercentage = (campaignStats.raised / campaignStats.goal) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Donate - Support the Reset Movement | Campaign 2027"
        description="Join thousands of Kenyans supporting real change. Your contribution helps build a better Kenya through transparent leadership and accountable governance."
        keywords="donate, support campaign, Kenya election 2027, political donation, campaign funding"
      />

      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Support the Reset Movement
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join thousands of Kenyans investing in real change. Your contribution helps build a better Kenya through transparent leadership and accountable governance.
            </p>
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-3xl font-bold mb-2">
                KSh {campaignStats.raised.toLocaleString()} raised
              </div>
              <div className="text-lg mb-4">
                Goal: KSh {campaignStats.goal.toLocaleString()}
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-3 mb-4">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span>{campaignStats.donors.toLocaleString()} donors</span>
                <span>{campaignStats.counties} counties represented</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Make Your Contribution</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Select Amount (KSh)</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 text-center font-semibold transition-all ${
                        selectedAmount === amount
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-primary'
                      }`}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    min="100"
                  />
                </div>

                {finalAmount && impactMessages[finalAmount] && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start">
                      <Target className="text-green-600 mr-2 mt-0.5" size={16} />
                      <p className="text-green-800 text-sm">
                        <strong>Your Impact:</strong> {impactMessages[finalAmount]}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      paymentMethod === 'mpesa'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <Smartphone className="mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold">M-Pesa</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <CreditCard className="mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold">Card</div>
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      paymentMethod === 'bank'
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 hover:border-primary'
                    }`}
                  >
                    <Building2 className="mx-auto mb-1" size={20} />
                    <div className="text-sm font-semibold">Bank</div>
                  </button>
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Donor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    value={donorInfo.fullName}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={donorInfo.email}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                  
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={donorInfo.phone}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  />
                  
                  <select
                    name="county"
                    value={donorInfo.county}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                    required
                  >
                    <option value="">Select County *</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kiambu">Kiambu</option>
                    <option value="nakuru">Nakuru</option>
                    {/* Add more counties */}
                  </select>
                  
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    value={donorInfo.occupation}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                  
                  <input
                    type="text"
                    name="employer"
                    placeholder="Employer"
                    value={donorInfo.employer}
                    onChange={handleInputChange}
                    className="p-3 border border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  />
                </div>
                
                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="anonymous"
                      checked={donorInfo.anonymous}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm">Make this donation anonymous</span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!finalAmount || isProcessing}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  finalAmount && !isProcessing
                    ? 'bg-primary text-white hover:bg-primary-dark'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : (
                  `Donate KSh ${finalAmount ? parseInt(finalAmount).toLocaleString() : '0'}`
                )}
              </button>
            </form>
          </div>

          {/* Campaign Impact & Info */}
          <div className="space-y-8">
            {/* Why Donate */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Why Your Support Matters</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Users className="text-primary mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold">Grassroots Campaign</h4>
                    <p className="text-gray-600 text-sm">Powered by ordinary Kenyans who believe in change, not special interests.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Shield className="text-primary mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold">Transparent Leadership</h4>
                    <p className="text-gray-600 text-sm">Every shilling is accounted for and spent on programs that benefit all Kenyans.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <TrendingUp className="text-primary mr-3 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold">Real Impact</h4>
                    <p className="text-gray-600 text-sm">Your contribution directly supports voter education and community outreach.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Donors */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recent Supporters</h3>
              <div className="space-y-3">
                {[
                  { name: "Sarah M.", location: "Nairobi", amount: 2500, time: "2 hours ago" },
                  { name: "James K.", location: "Mombasa", amount: 1000, time: "5 hours ago" },
                  { name: "Anonymous", location: "Kiambu", amount: 5000, time: "1 day ago" },
                  { name: "Mary W.", location: "Nakuru", amount: 1500, time: "1 day ago" },
                ].map((donor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">{donor.name}</div>
                      <div className="text-sm text-gray-600">{donor.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">KSh {donor.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{donor.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-start">
                <CheckCircle className="text-blue-600 mr-3 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-2">Secure & Compliant</h4>
                  <p className="text-blue-700 text-sm">
                    All donations are processed securely and comply with Kenya's campaign finance regulations. 
                    You'll receive a receipt for your records and tax purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;