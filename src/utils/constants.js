// Campaign Information
export const CAMPAIGN_INFO = {
    name: 'David Maraga 2027',
    slogan: 'Reset. Restore. Rebuild.',
    year: '2027',
    country: 'Kenya',
    candidate: {
      name: 'David Maraga',
      title: 'Presidential Candidate',
      bio: 'Former Chief Justice of Kenya',
    },
    contact: {
      phone: '+254 700 000 000',
      email: 'info@campaign2027.ke',
      address: 'Campaign Headquarters, Nairobi, Kenya',
    },
    social: {
      facebook: 'https://facebook.com/campaign2027',
      twitter: 'https://twitter.com/campaign2027',
      instagram: 'https://instagram.com/campaign2027',
      youtube: 'https://youtube.com/campaign2027',
      tiktok: 'https://tiktok.com/@campaign2027',
      linkedin: 'https://linkedin.com/company/campaign2027'
    }
  };
  
  // API Configuration
  export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
    RATE_LIMIT: {
      REQUESTS_PER_MINUTE: 60,
      REQUESTS_PER_HOUR: 1000
    }
  };
  
  // Navigation Menu Items
  export const NAV_ITEMS = [
    { name: 'Home', path: '/', exact: true },
    { name: 'About', path: '/about' },
    { name: 'Policies', path: '/policies' },
    { name: 'Press', path: '/press' },
    { name: 'Moments', path: '/moments' },
    { name: 'Events', path: '/events' },
    { name: 'Join Us', path: '/join' },
    { name: 'Contact', path: '/contact' }
  ];
  
  // Footer Links
  export const FOOTER_LINKS = {
    campaign: [
      { name: 'About David', path: '/about' },
      { name: 'Our Vision', path: '/policies' },
      { name: 'Join the Movement', path: '/join' },
      { name: 'Volunteer', path: '/join#volunteer' },
      { name: 'Events', path: '/events' }
    ],
    media: [
      { name: 'Press Releases', path: '/press' },
      { name: 'Photo Gallery', path: '/moments' },
      { name: 'Videos', path: '/moments#videos' },
      { name: 'Media Kit', path: '/press#media-kit' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ]
  };
  
  // Volunteer Skills Categories
  export const VOLUNTEER_SKILLS = [
    { value: 'communication', label: 'Communication & Outreach' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'event-planning', label: 'Event Planning' },
    { value: 'fundraising', label: 'Fundraising' },
    { value: 'graphic-design', label: 'Graphic Design' },
    { value: 'photography', label: 'Photography/Videography' },
    { value: 'writing', label: 'Writing & Content Creation' },
    { value: 'social-media', label: 'Social Media Management' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-analysis', label: 'Data Analysis' },
    { value: 'legal', label: 'Legal Support' },
    { value: 'accounting', label: 'Accounting/Finance' },
    { value: 'logistics', label: 'Logistics & Operations' },
    { value: 'translation', label: 'Translation Services' },
    { value: 'research', label: 'Research & Policy' },
    { value: 'youth-outreach', label: 'Youth Outreach' },
    { value: 'community-organizing', label: 'Community Organizing' },
    { value: 'public-speaking', label: 'Public Speaking' },
    { value: 'field-coordination', label: 'Field Coordination' },
    { value: 'other', label: 'Other' }
  ];
  
  // Availability Options
  export const AVAILABILITY_OPTIONS = [
    { value: 'weekdays', label: 'Weekdays (Monday - Friday)' },
    { value: 'weekends', label: 'Weekends (Saturday - Sunday)' },
    { value: 'evenings', label: 'Evenings (6 PM - 9 PM)' },
    { value: 'flexible', label: 'Flexible Schedule' },
    { value: 'events-only', label: 'Events Only' },
    { value: 'campaigns', label: 'Campaign Periods' },
    { value: 'full-time', label: 'Full-time Commitment' }
  ];
  
  // Press Release Categories
  export const PRESS_CATEGORIES = [
    { value: 'announcement', label: 'Announcements' },
    { value: 'policy', label: 'Policy Statements' },
    { value: 'response', label: 'Responses' },
    { value: 'event', label: 'Event Coverage' },
    { value: 'endorsement', label: 'Endorsements' },
    { value: 'media-advisory', label: 'Media Advisories' },
    { value: 'statement', label: 'Official Statements' },
    { value: 'campaign-update', label: 'Campaign Updates' }
  ];
  
  // Media Types
  export const MEDIA_TYPES = [
    { value: 'image', label: 'Images' },
    { value: 'video', label: 'Videos' },
    { value: 'document', label: 'Documents' },
    { value: 'audio', label: 'Audio' }
  ];
  
  // Event Categories
  export const EVENT_CATEGORIES = [
    { value: 'rally', label: 'Campaign Rally' },
    { value: 'town-hall', label: 'Town Hall Meeting' },
    { value: 'fundraiser', label: 'Fundraising Event' },
    { value: 'debate', label: 'Debate' },
    { value: 'interview', label: 'Media Interview' },
    { value: 'community', label: 'Community Event' },
    { value: 'youth', label: 'Youth Event' },
    { value: 'policy', label: 'Policy Forum' },
    { value: 'volunteer', label: 'Volunteer Training' },
    { value: 'other', label: 'Other' }
  ];
  
  // Contact Form Categories
  export const CONTACT_CATEGORIES = [
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
  ];
  
  // Priority Levels
  export const PRIORITY_LEVELS = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'normal', label: 'Normal', color: 'blue' },
    { value: 'high', label: 'High', color: 'orange' },
    { value: 'urgent', label: 'Urgent', color: 'red' }
  ];
  
  // File Upload Limits
  export const UPLOAD_LIMITS = {
    IMAGE: {
      MAX_SIZE: 10 * 1024 * 1024, // 10MB
      ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
      ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.webp']
    },
    VIDEO: {
      MAX_SIZE: 100 * 1024 * 1024, // 100MB
      ALLOWED_TYPES: ['video/mp4', 'video/webm', 'video/quicktime'],
      ALLOWED_EXTENSIONS: ['.mp4', '.webm', '.mov']
    },
    DOCUMENT: {
      MAX_SIZE: 25 * 1024 * 1024, // 25MB
      ALLOWED_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx']
    },
    AUDIO: {
      MAX_SIZE: 50 * 1024 * 1024, // 50MB
      ALLOWED_TYPES: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
      ALLOWED_EXTENSIONS: ['.mp3', '.wav', '.ogg']
    }
  };
  
  // Theme Colors
  export const THEME_COLORS = {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      900: '#0c4a6e'
    },
    secondary: {
      50: '#fefce8',
      100: '#fef3c7',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      900: '#713f12'
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      700: '#15803d'
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      700: '#d97706'
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      700: '#dc2626'
    }
  };
  
  // Animation Durations
  export const ANIMATION_DURATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000
  };
  
  // Breakpoints (matching Tailwind defaults)
  export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };
  
  // Local Storage Keys
  export const STORAGE_KEYS = {
    THEME: 'campaign_theme',
    LANGUAGE: 'campaign_language',
    USER_PREFERENCES: 'campaign_user_preferences',
    FORM_DRAFTS: 'campaign_form_drafts',
    VISITED_PAGES: 'campaign_visited_pages'
  };
  
  // Error Messages
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'The requested resource was not found.',
    RATE_LIMIT: 'Too many requests. Please slow down.',
    FILE_TOO_LARGE: 'File size is too large.',
    INVALID_FILE_TYPE: 'Invalid file type.',
    FORM_INCOMPLETE: 'Please fill in all required fields.',
    EMAIL_INVALID: 'Please enter a valid email address.',
    PHONE_INVALID: 'Please enter a valid phone number.'
  };
  
  // Success Messages
  export const SUCCESS_MESSAGES = {
    FORM_SUBMITTED: 'Form submitted successfully!',
    VOLUNTEER_REGISTERED: 'Thank you for volunteering! We will be in touch soon.',
    CONTACT_SENT: 'Your message has been sent successfully.',
    NEWSLETTER_SUBSCRIBED: 'You have been subscribed to our newsletter.',
    FILE_UPLOADED: 'File uploaded successfully.',
    PROFILE_UPDATED: 'Profile updated successfully.'
  };
  
  // SEO Meta Tags
  export const SEO_DEFAULTS = {
    TITLE_TEMPLATE: '%s | David Maraga 2027',
    DEFAULT_TITLE: 'David Maraga 2027 - Reset. Restore. Rebuild.',
    DEFAULT_DESCRIPTION: 'Join David Maraga\'s 2027 Presidential Campaign. Reset. Restore. Rebuild Kenya together.',
    DEFAULT_KEYWORDS: 'David Maraga, Kenya, President, 2027, Campaign, Reset, Restore, Rebuild, Elections',
    SITE_URL: 'https://campaign2027.ke',
    TWITTER_HANDLE: '@campaign2027',
    FACEBOOK_APP_ID: '123456789'
  };
  
  // Language Options
  export const LANGUAGES = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' }
  ];
  
  // Pagination Defaults
  export const PAGINATION_DEFAULTS = {
    PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100]
  };
  
  // Date Formats
  export const DATE_FORMATS = {
    FULL: 'EEEE, MMMM do, yyyy',
    MEDIUM: 'MMM dd, yyyy',
    SHORT: 'MM/dd/yyyy',
    TIME_12: 'h:mm a',
    TIME_24: 'HH:mm',
    DATETIME: 'MMM dd, yyyy h:mm a'
  };
  
  // Social Media Share URLs
  export const SHARE_URLS = {
    FACEBOOK: 'https://www.facebook.com/sharer/sharer.php?u=',
    TWITTER: 'https://twitter.com/intent/tweet?url=',
    WHATSAPP: 'https://wa.me/?text=',
    TELEGRAM: 'https://t.me/share/url?url=',
    EMAIL: 'mailto:?subject=&body='
  };
  
  // Campaign Timeline Events
  export const CAMPAIGN_TIMELINE = [
    {
      date: '2025-01-01',
      title: 'Campaign Launch',
      description: 'Official launch of the David Maraga 2027 Presidential Campaign'
    },
    {
      date: '2025-06-01',
      title: 'National Tour Begins',
      description: 'Start of nationwide tour to meet Kenyans across all 47 counties'
    },
    {
      date: '2026-01-01',
      title: 'Policy Platform Release',
      description: 'Comprehensive policy platform and manifesto release'
    },
    {
      date: '2026-08-01',
      title: 'Nomination Period',
      description: 'Official nomination for the presidential election'
    },
    {
      date: '2027-08-09',
      title: 'Election Day',
      description: 'Kenya General Elections 2027'
    }
  ];
  
  export default {
    CAMPAIGN_INFO,
    API_CONFIG,
    NAV_ITEMS,
    FOOTER_LINKS,
    VOLUNTEER_SKILLS,
    AVAILABILITY_OPTIONS,
    PRESS_CATEGORIES,
    MEDIA_TYPES,
    EVENT_CATEGORIES,
    CONTACT_CATEGORIES,
    PRIORITY_LEVELS,
    UPLOAD_LIMITS,
    THEME_COLORS,
    ANIMATION_DURATIONS,
    BREAKPOINTS,
    STORAGE_KEYS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    SEO_DEFAULTS,
    LANGUAGES,
    PAGINATION_DEFAULTS,
    DATE_FORMATS,
    SHARE_URLS,
    CAMPAIGN_TIMELINE
  };