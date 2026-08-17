// Date formatting utilities
export const formatDate = (date, options = {}) => {
    if (!date) return '';
    
    const defaultOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    
    return new Date(date).toLocaleDateString('en-KE', defaultOptions);
  };
  
  export const formatDateTime = (date, options = {}) => {
    if (!date) return '';
    
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };
    
    return new Date(date).toLocaleString('en-KE', defaultOptions);
  };
  
  export const formatTime = (date, options = {}) => {
    if (!date) return '';
    
    const defaultOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      ...options
    };
    
    return new Date(date).toLocaleTimeString('en-KE', defaultOptions);
  };
  
  export const getRelativeTime = (date) => {
    if (!date) return '';
    
    const now = new Date();
    const targetDate = new Date(date);
    const diffInSeconds = Math.floor((now - targetDate) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };
  
  // Phone number formatting
  export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Handle Kenyan phone numbers
    if (cleaned.startsWith('254')) {
      // +254 format
      return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
    } else if (cleaned.startsWith('0')) {
      // 0 format
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    
    return phone;
  };
  
  export const normalizePhoneNumber = (phone) => {
    if (!phone) return '';
    
    const cleaned = phone.replace(/\D/g, '');
    
    // Convert to +254 format
    if (cleaned.startsWith('0') && cleaned.length === 10) {
      return `+254${cleaned.slice(1)}`;
    } else if (cleaned.startsWith('254') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    return phone;
  };
  
  // Name formatting
  export const formatName = (firstName, lastName, middleName = '') => {
    const parts = [firstName, middleName, lastName].filter(Boolean);
    return parts.join(' ').trim();
  };
  
  export const getInitials = (name) => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };
  
  // Text formatting
  export const truncateText = (text, maxLength = 100, suffix = '...') => {
    if (!text || text.length <= maxLength) return text || '';
    
    return text.slice(0, maxLength).trim() + suffix;
  };
  
  export const capitalizeFirst = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };
  
  export const capitalizeWords = (text) => {
    if (!text) return '';
    return text
      .split(' ')
      .map(word => capitalizeFirst(word))
      .join(' ');
  };
  
  export const slugify = (text) => {
    if (!text) return '';
    
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };
  
  // Number formatting
  export const formatNumber = (number, locale = 'en-KE') => {
    if (typeof number !== 'number') return number;
    
    return new Intl.NumberFormat(locale).format(number);
  };
  
  export const formatCurrency = (amount, currency = 'KES', locale = 'en-KE') => {
    if (typeof amount !== 'number') return amount;
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };
  
  export const formatPercentage = (value, decimals = 1) => {
    if (typeof value !== 'number') return value;
    
    return `${value.toFixed(decimals)}%`;
  };
  
  // File size formatting
  export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };
  
  // URL formatting
  export const formatUrl = (url) => {
    if (!url) return '';
    
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    
    return url;
  };
  
  export const extractDomain = (url) => {
    if (!url) return '';
    
    try {
      const domain = new URL(formatUrl(url)).hostname;
      return domain.replace('www.', '');
    } catch {
      return url;
    }
  };
  
  // Email formatting
  export const maskEmail = (email) => {
    if (!email || !email.includes('@')) return email;
    
    const [username, domain] = email.split('@');
    const maskedUsername = username.length > 2 
      ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
      : username;
    
    return `${maskedUsername}@${domain}`;
  };
  
  // Address formatting
  export const formatAddress = (address) => {
    if (!address) return '';
    
    const parts = [
      address.street,
      address.city,
      address.county,
      address.postalCode
    ].filter(Boolean);
    
    return parts.join(', ');
  };
  
  // Social media handle formatting
  export const formatHandle = (handle, platform = '') => {
    if (!handle) return '';
    
    // Remove @ if present
    const cleanHandle = handle.startsWith('@') ? handle.slice(1) : handle;
    
    return platform ? `@${cleanHandle}` : cleanHandle;
  };
  
  // Duration formatting
  export const formatDuration = (seconds) => {
    if (!seconds || seconds < 0) return '0:00';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };
  
  // Reading time estimation
  export const estimateReadingTime = (text, wordsPerMinute = 200) => {
    if (!text) return 0;
    
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    
    return readingTime;
  };
  
  export const formatReadingTime = (minutes) => {
    if (!minutes || minutes < 1) return 'Less than 1 min read';
    if (minutes === 1) return '1 min read';
    return `${minutes} min read`;
  };