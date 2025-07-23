import React, { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Building2, Users, Target, TrendingUp, Shield, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import axios from 'axios'; // or your own api helper

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

  // live recent supporters
  const [recentSupporters, setRecentSupporters] = useState([]);

  // --- fetch recent supporters on mount ---
  useEffect(() => {
    axios.get('/api/donations/recent')
      .then(res => setRecentSupporters(res.data))
      .catch(() => setRecentSupporters([]));
  }, []);

  // --- predefined amounts & impact messages ---
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

  // --- handlers ---
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
    setDonorInfo(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // … your existing submit logic …
    setTimeout(() => {
      setIsProcessing(false);
      alert('Thank you for your donation!');
    }, 2000);
  };

  const finalAmount = selectedAmount || customAmount || 0;
  const progressPercentage = Math.min((campaignStats.raised / campaignStats.goal) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <SEO
        title="Donate - Support the Reset Movement | Campaign 2027"
        description="Join thousands of Kenyans supporting real change. Your contribution helps build a better Kenya."
        keywords="donate, Kenya election 2027, campaign funding"
      />

      {/* Hero (no extra top space) */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 via-green-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Support the Reset Movement
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Join thousands of Kenyans investing in real change.
          </p>

          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <div className="text-3xl font-bold mb-2">KSh {campaignStats.raised.toLocaleString()} raised</div>
            <div className="text-lg mb-3">Goal: KSh {campaignStats.goal.toLocaleString()}</div>
            <div className="w-full bg-white/30 rounded-full h-3 mb-3">
              <div
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>{campaignStats.donors.toLocaleString()} donors</span>
              <span>{campaignStats.counties} counties represented</span>
            </div>
          </div>
        </div>
      </section>

      {/* main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* donation form */}
          <div className="bg-white rounded-xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6">Make Your Contribution</h2>

            <form onSubmit={handleSubmit}>
              {/* amount selection */}
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
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {amount.toLocaleString()}
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                  min="100"
                />
                {finalAmount > 0 && impactMessages[finalAmount] && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-800">
                    <Target className="inline w-4 h-4 mr-1" />
                    <strong>Your Impact:</strong> {impactMessages[finalAmount]}
                  </div>
                )}
              </div>

              {/* payment method */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3">Payment Method</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'mpesa', icon: Smartphone, label: 'M-Pesa' },
                    { key: 'card', icon: CreditCard, label: 'Card' },
                    { key: 'bank', icon: Building2, label: 'Bank' }
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPaymentMethod(key)}
                      className={`p-3 rounded-lg border-2 text-center transition-all ${
                        paymentMethod === key
                          ? 'border-green-600 bg-green-600 text-white'
                          : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      <Icon className="mx-auto mb-1" size={20} />
                      <div className="text-sm font-semibold">{label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* donor info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Donor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="fullName" placeholder="Full Name *" value={donorInfo.fullName} onChange={handleInputChange} required />
                  <input name="email" type="email" placeholder="Email *" value={donorInfo.email} onChange={handleInputChange} required />
                  <input name="phone" type="tel" placeholder="Phone *" value={donorInfo.phone} onChange={handleInputChange} required />
                  <select name="county" value={donorInfo.county} onChange={handleInputChange} required>
                    <option value="">Select County *</option>
                    <option value="nairobi">Nairobi</option>
                    <option value="mombasa">Mombasa</option>
                    <option value="kiambu">Kiambu</option>
                    <option value="nakuru">Nakuru</option>
                    {/* …add all counties… */}
                  </select>
                  <input name="occupation" placeholder="Occupation" value={donorInfo.occupation} onChange={handleInputChange} />
                  <input name="employer" placeholder="Employer" value={donorInfo.employer} onChange={handleInputChange} />
                </div>

                <label className="flex items-center mt-4">
                  <input type="checkbox" name="anonymous" checked={donorInfo.anonymous} onChange={handleInputChange} />
                  <span className="ml-2 text-sm">Make donation anonymous</span>
                </label>
              </div>

              {/* submit */}
              <button
                type="submit"
                disabled={!finalAmount || isProcessing}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
                  finalAmount && !isProcessing
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {isProcessing ? 'Processing…' : `Donate KSh ${parseInt(finalAmount).toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* right column: impact + live supporters */}
          <div className="space-y-8">
            {/* why donate */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Why Support Us</h3>
              <div className="space-y-4 text-sm">
                {[['Grassroots Campaign', Users], ['Transparent Leadership', Shield], ['Real Impact', TrendingUp]].map(([txt, Icon]) => (
                  <div key={txt} className="flex items-start">
                    <Icon className="text-green-600 mr-3 mt-0.5" size={20} />
                    <div><div className="font-semibold">{txt}</div><p className="text-gray-600">Your contribution directly benefits Kenyans.</p></div>
                  </div>
                ))}
              </div>
            </div>

            {/* live recent supporters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4">Recent Supporters</h3>
              <div className="space-y-3">
                {recentSupporters.length === 0 ? (
                  <p className="text-gray-500 text-sm">No donations yet.</p>
                ) : (
                  recentSupporters.map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-semibold">{d.anonymous ? 'Anonymous' : d.name}</div>
                        <div className="text-xs text-gray-500">{d.county || 'Kenya'}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">KSh {Number(d.amount).toLocaleString()}</div>
                        <div className="text-xs text-gray-500">{d.createdAt || 'now'}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* security notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-sm text-blue-800">
              <CheckCircle className="inline mr-2" size={20} />
              All donations comply with Kenya's campaign finance laws. Receipts issued.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;