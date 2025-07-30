import { apiRequest, endpoints, uploadFile } from './api';

export const pressService = {
  // Get all press releases
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${endpoints.press}?${queryString}` : endpoints.press;
      const response = await apiRequest.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch press releases'
      );
    }
  },

  // Get latest press releases
  getLatest: async (limit = 5) => {
    try {
      const response = await apiRequest.get(`${endpoints.pressLatest}?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch latest press releases'
      );
    }
  },

  // Get press release by ID
  getById: async (id) => {
    try {
      const response = await apiRequest.get(`${endpoints.press}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch press release'
      );
    }
  },

  // Create new press release (admin only)
  create: async (pressData, files = []) => {
    try {
      let response;
      
      if (files.length > 0) {
        const formData = new FormData();
        
        // Add text data
        Object.keys(pressData).forEach(key => {
          if (Array.isArray(pressData[key])) {
            pressData[key].forEach(item => formData.append(key, item));
          } else {
            formData.append(key, pressData[key]);
          }
        });
        
        // Add files
        files.forEach(file => {
          formData.append('attachments', file);
        });
        
        response = await uploadFile(endpoints.press, formData);
      } else {
        response = await apiRequest.post(endpoints.press, pressData);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to create press release'
      );
    }
  },

  // Update press release (admin only)
  update: async (id, pressData, files = []) => {
    try {
      let response;
      
      if (files.length > 0) {
        const formData = new FormData();
        
        // Add text data
        Object.keys(pressData).forEach(key => {
          if (Array.isArray(pressData[key])) {
            pressData[key].forEach(item => formData.append(key, item));
          } else {
            formData.append(key, pressData[key]);
          }
        });
        
        // Add files
        files.forEach(file => {
          formData.append('attachments', file);
        });
        
        response = await uploadFile(`${endpoints.press}/${id}`, formData);
      } else {
        response = await apiRequest.put(`${endpoints.press}/${id}`, pressData);
      }
      
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to update press release'
      );
    }
  },

  // Delete press release (admin only)
  delete: async (id) => {
    try {
      const response = await apiRequest.delete(`${endpoints.press}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete press release'
      );
    }
  },

  // Search press releases
  search: async (searchTerm, filters = {}) => {
    try {
      const params = { search: searchTerm, ...filters };
      const queryString = new URLSearchParams(params).toString();
      const response = await apiRequest.get(`${endpoints.press}/search?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to search press releases'
      );
    }
  },

  // Get press releases by category
  getByCategory: async (category, params = {}) => {
    try {
      const allParams = { category, ...params };
      const queryString = new URLSearchParams(allParams).toString();
      const response = await apiRequest.get(`${endpoints.press}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch press releases by category'
      );
    }
  },

  // Get press releases by date range
  getByDateRange: async (startDate, endDate, params = {}) => {
    try {
      const allParams = { 
        startDate: startDate.toISOString(), 
        endDate: endDate.toISOString(), 
        ...params 
      };
      const queryString = new URLSearchParams(allParams).toString();
      const response = await apiRequest.get(`${endpoints.press}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch press releases by date range'
      );
    }
  },

  // Download attachment
  downloadAttachment: async (pressId, attachmentId) => {
    try {
      const response = await apiRequest.get(
        `${endpoints.press}/${pressId}/attachments/${attachmentId}`,
        { responseType: 'blob' }
      );
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to download attachment'
      );
    }
  },

  // Get press statistics (admin only)
  getStats: async () => {
    try {
      const response = await apiRequest.get(`${endpoints.press}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch press statistics'
      );
    }
  },

  // Validate press release data
  validateData: (pressData) => {
    const errors = {};

    if (!pressData.title?.trim()) {
      errors.title = 'Title is required';
    }

    if (!pressData.content?.trim()) {
      errors.content = 'Content is required';
    } else if (pressData.content.trim().length < 100) {
      errors.content = 'Content must be at least 100 characters long';
    }

    if (!pressData.category) {
      errors.category = 'Category is required';
    }

    if (!pressData.publishDate) {
      errors.publishDate = 'Publish date is required';
    }

    if (pressData.tags && !Array.isArray(pressData.tags)) {
      errors.tags = 'Tags must be an array';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Format press release for display
  formatForDisplay: (pressRelease) => {
    return {
      ...pressRelease,
      formattedDate: new Date(pressRelease.publishDate).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      excerpt: pressRelease.content.length > 200 
        ? pressRelease.content.substring(0, 200) + '...'
        : pressRelease.content,
      readTime: Math.ceil(pressRelease.content.split(' ').length / 200) // Assuming 200 words per minute
    };
  }
};