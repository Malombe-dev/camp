import { apiRequest, endpoints } from './api';

export const contactService = {
  // Submit contact form
  submit: async (contactData) => {
    try {
      const response = await apiRequest.post(endpoints.contact, contactData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to submit contact form'
      );
    }
  },

  // Get all contact messages (admin only)
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${endpoints.contact}?${queryString}` : endpoints.contact;
      const response = await apiRequest.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch contact messages'
      );
    }
  },

  // Get contact message by ID (admin only)
  getById: async (id) => {
    try {
      const response = await apiRequest.get(`${endpoints.contact}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch contact message'
      );
    }
  },

  // Mark message as read (admin only)
  markAsRead: async (id) => {
    try {
      const response = await apiRequest.patch(`${endpoints.contact}/${id}/read`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to mark message as read'
      );
    }
  },

  // Reply to contact message (admin only)
  reply: async (id, replyData) => {
    try {
      const response = await apiRequest.post(`${endpoints.contact}/${id}/reply`, replyData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to send reply'
      );
    }
  },

  // Delete contact message (admin only)
  delete: async (id) => {
    try {
      const response = await apiRequest.delete(`${endpoints.contact}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete contact message'
      );
    }
  },

  // Get unread messages count (admin only)
  getUnreadCount: async () => {
    try {
      const response = await apiRequest.get(`${endpoints.contact}/unread/count`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch unread count'
      );
    }
  },

  // Search contact messages (admin only)
  search: async (searchTerm, filters = {}) => {
    try {
      const params = { search: searchTerm, ...filters };
      const queryString = new URLSearchParams(params).toString();
      const response = await apiRequest.get(`${endpoints.contact}/search?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to search contact messages'
      );
    }
  },

  // Get messages by category (admin only)
  getByCategory: async (category, params = {}) => {
    try {
      const allParams = { category, ...params };
      const queryString = new URLSearchParams(allParams).toString();
      const response = await apiRequest.get(`${endpoints.contact}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch messages by category'
      );
    }
  },

  // Get contact statistics (admin only)
  getStats: async () => {
    try {
      const response = await apiRequest.get(`${endpoints.contact}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch contact statistics'
      );
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (emailData) => {
    try {
      const response = await apiRequest.post(endpoints.newsletter, emailData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to subscribe to newsletter'
      );
    }
  },

  // Unsubscribe from newsletter
  unsubscribeNewsletter: async (email, token) => {
    try {
      const response = await apiRequest.post(`${endpoints.newsletter}/unsubscribe`, { email, token });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to unsubscribe from newsletter'
      );
    }
  },

  // Validate contact form data
  validateContactData: (contactData) => {
    const errors = {};

    // Name validation
    if (!contactData.name?.trim()) {
      errors.name = 'Name is required';
    } else if (contactData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (!contactData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, must be valid)
    if (contactData.phone && contactData.phone.trim()) {
      const phoneRegex = /^(\+254|0)[17]\d{8}$/;
      if (!phoneRegex.test(contactData.phone.replace(/\s/g, ''))) {
        errors.phone = 'Please enter a valid Kenyan phone number';
      }
    }

    // Subject validation
    if (!contactData.subject?.trim()) {
      errors.subject = 'Subject is required';
    } else if (contactData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    }

    // Message validation
    if (!contactData.message?.trim()) {
      errors.message = 'Message is required';
    } else if (contactData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    } else if (contactData.message.trim().length > 2000) {
      errors.message = 'Message must be less than 2000 characters';
    }

    // Category validation
    if (!contactData.category) {
      errors.category = 'Please select a category';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Validate newsletter subscription data
  validateNewsletterData: (emailData) => {
    const errors = {};

    if (!emailData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(emailData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Optional name validation
    if (emailData.name && emailData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Format contact data for submission
  formatForSubmission: (contactData) => {
    return {
      name: contactData.name.trim(),
      email: contactData.email.trim().toLowerCase(),
      phone: contactData.phone ? contactData.phone.replace(/\s/g, '') : '',
      subject: contactData.subject.trim(),
      message: contactData.message.trim(),
      category: contactData.category,
      county: contactData.county || '',
      constituency: contactData.constituency || '',
      priority: contactData.priority || 'normal',
      source: 'website'
    };
  },

  // Get contact categories
  getCategories: () => [
    { value: 'general', label: 'General Inquiry' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'media', label: 'Media & Press' },
    { value: 'policy', label: 'Policy Questions' },
    { value: 'events', label: 'Events & Appearances' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'partnership', label: 'Partnership Opportunities' },
    { value: 'complaint', label: 'Complaint' },
    { value: 'other', label: 'Other' }
  ],

  // Get priority levels
  getPriorityLevels: () => [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'normal', label: 'Normal', color: 'blue' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'urgent', label: 'Urgent', color: 'red' }
  ]
};