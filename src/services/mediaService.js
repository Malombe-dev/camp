import { apiRequest, endpoints, uploadFile } from './api';

export const mediaService = {
  // Get all media items
  getAll: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${endpoints.media}?${queryString}` : endpoints.media;
      const response = await apiRequest.get(url);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch media items'
      );
    }
  },

  // Get media by event
  getByEvent: async (eventId) => {
    try {
      const response = await apiRequest.get(endpoints.mediaByEvent(eventId));
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch media for event'
      );
    }
  },

  // Get media by ID
  getById: async (id) => {
    try {
      const response = await apiRequest.get(`${endpoints.media}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch media item'
      );
    }
  },

  // Upload new media (admin only)
  upload: async (mediaData, files, onProgress) => {
    try {
      const formData = new FormData();
      
      // Add metadata
      Object.keys(mediaData).forEach(key => {
        if (Array.isArray(mediaData[key])) {
          mediaData[key].forEach(item => formData.append(key, item));
        } else {
          formData.append(key, mediaData[key]);
        }
      });
      
      // Add files
      files.forEach(file => {
        formData.append('media', file);
      });
      
      const response = await uploadFile(endpoints.media, formData, onProgress);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to upload media'
      );
    }
  },

  // Update media item (admin only)
  update: async (id, updateData) => {
    try {
      const response = await apiRequest.put(`${endpoints.media}/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to update media item'
      );
    }
  },

  // Delete media item (admin only)
  delete: async (id) => {
    try {
      const response = await apiRequest.delete(`${endpoints.media}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to delete media item'
      );
    }
  },

  // Get media by type (photos, videos)
  getByType: async (type, params = {}) => {
    try {
      const allParams = { type, ...params };
      const queryString = new URLSearchParams(allParams).toString();
      const response = await apiRequest.get(`${endpoints.media}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || `Failed to fetch ${type} media`
      );
    }
  },

  // Get featured media
  getFeatured: async (limit = 10) => {
    try {
      const response = await apiRequest.get(`${endpoints.media}/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch featured media'
      );
    }
  },

  // Get recent media
  getRecent: async (limit = 20) => {
    try {
      const response = await apiRequest.get(`${endpoints.media}/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch recent media'
      );
    }
  },

  // Search media
  search: async (searchTerm, filters = {}) => {
    try {
      const params = { search: searchTerm, ...filters };
      const queryString = new URLSearchParams(params).toString();
      const response = await apiRequest.get(`${endpoints.media}/search?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to search media'
      );
    }
  },

  // Get media by tags
  getByTags: async (tags, params = {}) => {
    try {
      const allParams = { tags: tags.join(','), ...params };
      const queryString = new URLSearchParams(allParams).toString();
      const response = await apiRequest.get(`${endpoints.media}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch media by tags'
      );
    }
  },

  // Get media statistics (admin only)
  getStats: async () => {
    try {
      const response = await apiRequest.get(`${endpoints.media}/stats`);
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to fetch media statistics'
      );
    }
  },

  // Generate thumbnail
  generateThumbnail: async (mediaId, size = 'medium') => {
    try {
      const response = await apiRequest.post(`${endpoints.media}/${mediaId}/thumbnail`, { size });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 'Failed to generate thumbnail'
      );
    }
  },

  // Validate media upload data
  validateUploadData: (mediaData, files) => {
    const errors = {};

    if (!files || files.length === 0) {
      errors.files = 'Please select at least one file to upload';
    } else {
      // Check file types
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
      const invalidFiles = files.filter(file => !allowedTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        errors.files = 'Only JPEG, PNG, WebP images and MP4, WebM videos are allowed';
      }

      // Check file sizes (50MB max for videos, 10MB for images)
      const oversizedFiles = files.filter(file => {
        const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
        return file.size > maxSize;
      });

      if (oversizedFiles.length > 0) {
        errors.files = 'File size too large. Max 50MB for videos, 10MB for images';
      }
    }

    if (!mediaData.title?.trim()) {
      errors.title = 'Title is required';
    }

    if (!mediaData.event) {
      errors.event = 'Event is required';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Format media item for display
  formatForDisplay: (mediaItem) => {
    return {
      ...mediaItem,
      formattedDate: new Date(mediaItem.createdAt).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      isVideo: mediaItem.type === 'video',
      isImage: mediaItem.type === 'image',
      thumbnailUrl: mediaItem.thumbnails?.medium || mediaItem.url,
      aspectRatio: mediaItem.metadata?.width && mediaItem.metadata?.height 
        ? mediaItem.metadata.width / mediaItem.metadata.height 
        : 16/9
    };
  },

  // Get optimized URL for different screen sizes
  getOptimizedUrl: (mediaItem, size = 'medium') => {
    if (mediaItem.type === 'video') {
      return mediaItem.url;
    }

    // Return appropriate thumbnail size
    if (mediaItem.thumbnails) {
      return mediaItem.thumbnails[size] || mediaItem.thumbnails.medium || mediaItem.url;
    }

    return mediaItem.url;
  },

  // Create image gallery data structure
  createGalleryData: (mediaItems) => {
    return mediaItems
      .filter(item => item.type === 'image')
      .map((item, index) => ({
        id: item._id,
        src: item.url,
        thumbnail: item.thumbnails?.small || item.url,
        title: item.title,
        description: item.description,
        alt: item.alt || item.title,
        index
      }));
  }
};