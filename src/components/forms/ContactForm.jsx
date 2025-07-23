import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'media', label: 'Media Relations' },
    { value: 'volunteer', label: 'Volunteer Support' },
    { value: 'policy', label: 'Policy Questions' },
    { value: 'events', label: 'Event Information' },
    { value: 'feedback', label: 'Feedback' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields with valid information.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus({ type: 'success', message: 'Thank you for your message! We will get back to you within 24 hours.' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', category: 'general' });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h3>
          <p className="text-gray-600 text-sm">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>

        {submitStatus && (
          <div className={`mb-4 p-3 rounded text-sm ${
            submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+254 700 000 000"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-300"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief subject of your message"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="5"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting && <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-solid"></span>}
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Contact Info */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6 text-sm text-gray-700">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">📍 Campaign Headquarters</h4>
          <p><strong>Address:</strong><br />Integrity Centre, 5th Floor<br />Nairobi, Kenya</p>
          <p className="mt-2"><strong>Phone:</strong><br />+254 700 000 000</p>
          <p className="mt-2"><strong>Email:</strong><br />info@campaign2027.ke</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">🕒 Office Hours</h4>
          <p><strong>Monday - Friday:</strong> 8:00 AM - 6:00 PM</p>
          <p><strong>Saturday:</strong> 9:00 AM - 2:00 PM</p>
          <p><strong>Sunday:</strong> Closed</p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
