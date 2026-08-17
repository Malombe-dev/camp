import { apiRequest, endpoints } from './api';

export const volunteerService = {
  // Register a new volunteer
  register: async (volunteerData) => {
    try {
      const response = await apiRequest.post(endpoints.volunteers, volunteerData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to register volunteer'
      );
    }
  },

  // Get volunteer statistics
  getStats: async () => {
    try {
      const response = await apiRequest.get(endpoints.volunteerStats);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch volunteer statistics'
      );
    }
  },

  // Get all volunteers (admin only)
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${endpoints.volunteers}?${queryString}` : endpoints.volunteers;
      const response = await apiRequest.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch volunteers'
      );
    }
  },

  // Get volunteer by ID
  getById: async (id) => {
    try {
      const response = await apiRequest.get(`${endpoints.volunteers}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch volunteer'
      );
    }
  },

  // Update volunteer information
  update: async (id, updateData) => {
    try {
      const response = await apiRequest.put(`${endpoints.volunteers}/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to update volunteer'
      );
    }
  },

  // Delete volunteer
  delete: async (id) => {
    try {
      const response = await apiRequest.delete(`${endpoints.volunteers}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete volunteer'
      );
    }
  },

  // Search volunteers by location
  searchByLocation: async (locationFilter) => {
    try {
      const response = await apiRequest.post(`${endpoints.volunteers}/search`, locationFilter);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to search volunteers'
      );
    }
  },

  // Get volunteers by skills
  getBySkills: async (skills) => {
    try {
      const params = { skills: skills.join(',') };
      const queryString = new URLSearchParams(params).toString();
      const response = await apiRequest.get(`${endpoints.volunteers}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch volunteers by skills'
      );
    }
  },

  // Export volunteers data (admin only)
  exportData: async (format = 'csv') => {
    try {
      const response = await apiRequest.get(`${endpoints.volunteers}/export?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to export volunteer data'
      );
    }
  },

  // Validate volunteer data before submission
  validateData: (volunteerData) => {
    const errors = {};

    // Required fields validation
    if (!volunteerData.firstName?.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!volunteerData.lastName?.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!volunteerData.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(volunteerData.email)) {
      errors.email = 'Email format is invalid';
    }

    if (!volunteerData.phone?.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^(\+254|0)[17]\d{8}$/.test(volunteerData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid Kenyan phone number';
    }

    if (!volunteerData.county) {
      errors.county = 'County is required';
    }

    if (!volunteerData.constituency) {
      errors.constituency = 'Constituency is required';
    }

    if (!volunteerData.ward) {
      errors.ward = 'Ward is required';
    }

    if (!volunteerData.skills || volunteerData.skills.length === 0) {
      errors.skills = 'Please select at least one skill';
    }

    if (!volunteerData.availability || volunteerData.availability.length === 0) {
      errors.availability = 'Please select your availability';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};