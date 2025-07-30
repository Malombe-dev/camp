// Email validation
export const isValidEmail = (email) => {
    if (!email) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };
  
  export const validateEmail = (email) => {
    if (!email || !email.trim()) {
      return { isValid: false, error: 'Email is required' };
    }
    
    if (!isValidEmail(email)) {
      return { isValid: false, error: 'Please enter a valid email address' };
    }
    
    return { isValid: true, error: null };
  };
  
  // Phone number validation (Kenyan numbers)
  export const isValidKenyanPhone = (phone) => {
    if (!phone) return false;
    
    const cleaned = phone.replace(/\s/g, '');
    const kenyaPhoneRegex = /^(\+254|254|0)?[17]\d{8}$/;
    
    return kenyaPhoneRegex.test(cleaned);
  };
  
  export const validatePhone = (phone, required = true) => {
    if (!phone || !phone.trim()) {
      return required 
        ? { isValid: false, error: 'Phone number is required' }
        : { isValid: true, error: null };
    }
    
    if (!isValidKenyanPhone(phone)) {
      return { isValid: false, error: 'Please enter a valid Kenyan phone number' };
    }
    
    return { isValid: true, error: null };
  };
  
  // Name validation
  export const validateName = (name, fieldName = 'Name', minLength = 2, maxLength = 50) => {
    if (!name || !name.trim()) {
      return { isValid: false, error: `${fieldName} is required` };
    }
    
    const trimmedName = name.trim();
    
    if (trimmedName.length < minLength) {
      return { isValid: false, error: `${fieldName} must be at least ${minLength} characters long` };
    }
    
    if (trimmedName.length > maxLength) {
      return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters long` };
    }
    
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    const nameRegex = /^[a-zA-Z\s\-']+$/;
    if (!nameRegex.test(trimmedName)) {
      return { isValid: false, error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes` };
    }
    
    return { isValid: true, error: null };
  };
  
  // Password validation
  export const validatePassword = (password) => {
    if (!password) {
      return { isValid: false, error: 'Password is required' };
    }
    
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters long' };
    }
    
    if (password.length > 128) {
      return { isValid: false, error: 'Password must be less than 128 characters long' };
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one uppercase letter' };
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one lowercase letter' };
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one number' };
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return { isValid: false, error: 'Password must contain at least one special character' };
    }
    
    return { isValid: true, error: null };
  };
  
  // Confirm password validation
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return { isValid: false, error: 'Please confirm your password' };
    }
    
    if (password !== confirmPassword) {
      return { isValid: false, error: 'Passwords do not match' };
    }
    
    return { isValid: true, error: null };
  };
  
  // URL validation
  export const isValidUrl = (url) => {
    if (!url) return false;
    
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };
  
  export const validateUrl = (url, required = false) => {
    if (!url || !url.trim()) {
      return required 
        ? { isValid: false, error: 'URL is required' }
        : { isValid: true, error: null };
    }
    
    if (!isValidUrl(url)) {
      return { isValid: false, error: 'Please enter a valid URL' };
    }
    
    return { isValid: true, error: null };
  };
  
  // Text validation
  export const validateText = (text, fieldName = 'Field', minLength = 1, maxLength = 1000, required = true) => {
    if (!text || !text.trim()) {
      return required 
        ? { isValid: false, error: `${fieldName} is required` }
        : { isValid: true, error: null };
    }
    
    const trimmedText = text.trim();
    
    if (trimmedText.length < minLength) {
      return { isValid: false, error: `${fieldName} must be at least ${minLength} characters long` };
    }
    
    if (trimmedText.length > maxLength) {
      return { isValid: false, error: `${fieldName} must be less than ${maxLength} characters long` };
    }
    
    return { isValid: true, error: null };
  };
  
  // Date validation
  export const validateDate = (date, fieldName = 'Date', required = true) => {
    if (!date) {
      return required 
        ? { isValid: false, error: `${fieldName} is required` }
        : { isValid: true, error: null };
    }
    
    const dateObj = new Date(date);
    
    if (isNaN(dateObj.getTime())) {
      return { isValid: false, error: `Please enter a valid ${fieldName.toLowerCase()}` };
    }
    
    return { isValid: true, error: null };
  };
  
  // Future date validation
  export const validateFutureDate = (date, fieldName = 'Date') => {
    const dateValidation = validateDate(date, fieldName);
    if (!dateValidation.isValid) return dateValidation;
    
    const dateObj = new Date(date);
    const now = new Date();
    
    if (dateObj <= now) {
      return { isValid: false, error: `${fieldName} must be in the future` };
    }
    
    return { isValid: true, error: null };
  };
  
  // Age validation
  export const validateAge = (birthDate, minAge = 18, maxAge = 120) => {
    const dateValidation = validateDate(birthDate, 'Birth date');
    if (!dateValidation.isValid) return dateValidation;
    
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const age = Math.floor((today - birthDateObj) / (1000 * 60 * 60 * 24 * 365.25));
    
    if (age < minAge) {
      return { isValid: false, error: `You must be at least ${minAge} years old` };
    }
    
    if (age > maxAge) {
      return { isValid: false, error: `Age cannot exceed ${maxAge} years` };
    }
    
    return { isValid: true, error: null };
  };
  
  // File validation
  export const validateFile = (file, options = {}) => {
    const {
      required = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.pdf']
    } = options;
    
    if (!file) {
      return required 
        ? { isValid: false, error: 'File is required' }
        : { isValid: true, error: null };
    }
    
    // Check file size
    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024));
      return { isValid: false, error: `File size must be less than ${maxSizeMB}MB` };
    }
    
    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return { isValid: false, error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}` };
    }
    
    // Check file extension
    if (allowedExtensions.length > 0) {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedExtensions.includes(fileExtension)) {
        return { isValid: false, error: `File extension not allowed. Allowed extensions: ${allowedExtensions.join(', ')}` };
      }
    }
    
    return { isValid: true, error: null };
  };
  
  // Multiple files validation
  export const validateFiles = (files, options = {}) => {
    const { maxFiles = 10 } = options;
    
    if (!files || files.length === 0) {
      return options.required 
        ? { isValid: false, error: 'At least one file is required' }
        : { isValid: true, error: null };
    }
    
    if (files.length > maxFiles) {
      return { isValid: false, error: `Maximum ${maxFiles} files allowed` };
    }
    
    // Validate each file
    for (let i = 0; i < files.length; i++) {
      const fileValidation = validateFile(files[i], options);
      if (!fileValidation.isValid) {
        return { isValid: false, error: `File ${i + 1}: ${fileValidation.error}` };
      }
    }
    
    return { isValid: true, error: null };
  };
  
  // Array validation
  export const validateArray = (array, fieldName = 'Field', minItems = 0, maxItems = 100, required = true) => {
    if (!array || !Array.isArray(array)) {
      return required 
        ? { isValid: false, error: `${fieldName} is required` }
        : { isValid: true, error: null };
    }
    
    if (array.length < minItems) {
      return { isValid: false, error: `${fieldName} must have at least ${minItems} item${minItems !== 1 ? 's' : ''}` };
    }
    
    if (array.length > maxItems) {
      return { isValid: false, error: `${fieldName} can have at most ${maxItems} item${maxItems !== 1 ? 's' : ''}` };
    }
    
    return { isValid: true, error: null };
  };
  
  // Object validation
  export const validateObject = (obj, fieldName = 'Field', required = true) => {
    if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
      return required 
        ? { isValid: false, error: `${fieldName} is required` }
        : { isValid: true, error: null };
    }
    
    return { isValid: true, error: null };
  };
  
  // Custom validation function runner
  export const runValidations = (data, validationRules) => {
    const errors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field];
      const value = data[field];
      
      for (const rule of rules) {
        const result = rule(value);
        if (!result.isValid) {
          errors[field] = result.error;
          isValid = false;
          break; // Stop at first error for this field
        }
      }
    });
    
    return { isValid, errors };
  };
  
  // Common validation rules
  export const validationRules = {
    required: (fieldName = 'Field') => (value) => {
      if (value === null || value === undefined || value === '' || 
          (Array.isArray(value) && value.length === 0)) {
        return { isValid: false, error: `${fieldName} is required` };
      }
      return { isValid: true, error: null };
    },
    
    minLength: (min, fieldName = 'Field') => (value) => {
      if (value && value.length < min) {
        return { isValid: false, error: `${fieldName} must be at least ${min} characters long` };
      }
      return { isValid: true, error: null };
    },
    
    maxLength: (max, fieldName = 'Field') => (value) => {
      if (value && value.length > max) {
        return { isValid: false, error: `${fieldName} must be less than ${max} characters long` };
      }
      return { isValid: true, error: null };
    },
    
    pattern: (regex, message) => (value) => {
      if (value && !regex.test(value)) {
        return { isValid: false, error: message };
      }
      return { isValid: true, error: null };
    }
  };