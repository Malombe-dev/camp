import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { STORAGE_KEYS, LANGUAGES } from '../utils/constants';

// Initial state
const initialState = {
  // Theme
  theme: 'light',
  
  // Language
  language: 'en',
  
  // User preferences
  preferences: {
    notifications: true,
    emailUpdates: true,
    smsUpdates: false,
    autoplay: true,
    reducedMotion: false
  },
  
  // Navigation
  sidebarOpen: false,
  
  // Loading states
  globalLoading: false,
  
  // Alerts/Notifications
  alerts: [],
  
  // User session
  user: null,
  isAuthenticated: false,
  
  // Form states
  formDrafts: {},
  
  // Analytics
  visitedPages: [],
  
  // Cache
  cache: {},
  
  // Error handling
  errors: []
};

// Action types
const actionTypes = {
  SET_THEME: 'SET_THEME',
  SET_LANGUAGE: 'SET_LANGUAGE',
  SET_PREFERENCES: 'SET_PREFERENCES',
  TOGGLE_SIDEBAR: 'TOGGLE_SIDEBAR',
  SET_GLOBAL_LOADING: 'SET_GLOBAL_LOADING',
  ADD_ALERT: 'ADD_ALERT',
  REMOVE_ALERT: 'REMOVE_ALERT',
  CLEAR_ALERTS: 'CLEAR_ALERTS',
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SAVE_FORM_DRAFT: 'SAVE_FORM_DRAFT',
  CLEAR_FORM_DRAFT: 'CLEAR_FORM_DRAFT',
  ADD_VISITED_PAGE: 'ADD_VISITED_PAGE',
  SET_CACHE: 'SET_CACHE',
  CLEAR_CACHE: 'CLEAR_CACHE',
  ADD_ERROR: 'ADD_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  HYDRATE_STATE: 'HYDRATE_STATE'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.payload
      };

    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };

    case actionTypes.SET_PREFERENCES:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          ...action.payload
        }
      };

    case actionTypes.TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };

    case actionTypes.SET_GLOBAL_LOADING:
      return {
        ...state,
        globalLoading: action.payload
      };

    case actionTypes.ADD_ALERT:
      return {
        ...state,
        alerts: [...state.alerts, { ...action.payload, id: Date.now() }]
      };

    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload)
      };

    case actionTypes.CLEAR_ALERTS:
      return {
        ...state,
        alerts: []
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload
      };

    case actionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    case actionTypes.SAVE_FORM_DRAFT:
      return {
        ...state,
        formDrafts: {
          ...state.formDrafts,
          [action.payload.formId]: {
            data: action.payload.data,
            timestamp: Date.now()
          }
        }
      };

    case actionTypes.CLEAR_FORM_DRAFT:
      const newFormDrafts = { ...state.formDrafts };
      delete newFormDrafts[action.payload];
      return {
        ...state,
        formDrafts: newFormDrafts
      };

    case actionTypes.ADD_VISITED_PAGE:
      const updatedPages = [
        action.payload,
        ...state.visitedPages.filter(page => page.path !== action.payload.path)
      ].slice(0, 50); // Keep only last 50 pages
      
      return {
        ...state,
        visitedPages: updatedPages
      };

    case actionTypes.SET_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.key]: {
            data: action.payload.data,
            timestamp: Date.now(),
            expires: action.payload.expires
          }
        }
      };

    case actionTypes.CLEAR_CACHE:
      if (action.payload) {
        const newCache = { ...state.cache };
        delete newCache[action.payload];
        return { ...state, cache: newCache };
      }
      return { ...state, cache: {} };

    case actionTypes.ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, { ...action.payload, id: Date.now() }]
      };

    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: []
      };

    case actionTypes.HYDRATE_STATE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
      const savedPreferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      const savedFormDrafts = localStorage.getItem(STORAGE_KEYS.FORM_DRAFTS);
      const savedVisitedPages = localStorage.getItem(STORAGE_KEYS.VISITED_PAGES);

      const hydratedState = {};

      if (savedTheme) {
        hydratedState.theme = savedTheme;
      }

      if (savedLanguage) {
        hydratedState.language = savedLanguage;
      }

      if (savedPreferences) {
        hydratedState.preferences = JSON.parse(savedPreferences);
      }

      if (savedFormDrafts) {
        hydratedState.formDrafts = JSON.parse(savedFormDrafts);
      }

      if (savedVisitedPages) {
        hydratedState.visitedPages = JSON.parse(savedVisitedPages);
      }

      if (Object.keys(hydratedState).length > 0) {
        dispatch({ type: actionTypes.HYDRATE_STATE, payload: hydratedState });
      }
    } catch (error) {
      console.warn('Failed to load state from localStorage:', error);
    }
  }, []);

  // Save state to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [state.theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, state.language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
  }, [state.language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(state.preferences));
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
    }
  }, [state.preferences]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FORM_DRAFTS, JSON.stringify(state.formDrafts));
    } catch (error) {
      console.warn('Failed to save form drafts to localStorage:', error);
    }
  }, [state.formDrafts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITED_PAGES, JSON.stringify(state.visitedPages));
    } catch (error) {
      console.warn('Failed to save visited pages to localStorage:', error);
    }
  }, [state.visitedPages]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Apply language to document
  useEffect(() => {
    document.documentElement.setAttribute('lang', state.language);
  }, [state.language]);

  // Action creators
  const actions = {
    setTheme: (theme) => {
      dispatch({ type: actionTypes.SET_THEME, payload: theme });
    },

    setLanguage: (language) => {
      dispatch({ type: actionTypes.SET_LANGUAGE, payload: language });
    },

    setPreferences: (preferences) => {
      dispatch({ type: actionTypes.SET_PREFERENCES, payload: preferences });
    },

    toggleSidebar: () => {
      dispatch({ type: actionTypes.TOGGLE_SIDEBAR });
    },

    setGlobalLoading: (loading) => {
      dispatch({ type: actionTypes.SET_GLOBAL_LOADING, payload: loading });
    },

    addAlert: (alert) => {
      dispatch({ type: actionTypes.ADD_ALERT, payload: alert });
      
      // Auto remove alert after timeout
      if (alert.timeout !== 0) {
        setTimeout(() => {
          actions.removeAlert(alert.id || Date.now());
        }, alert.timeout || 5000);
      }
    },

    removeAlert: (id) => {
      dispatch({ type: actionTypes.REMOVE_ALERT, payload: id });
    },

    clearAlerts: () => {
      dispatch({ type: actionTypes.CLEAR_ALERTS });
    },

    setUser: (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user });
    },

    logout: () => {
      dispatch({ type: actionTypes.LOGOUT });
      // Clear sensitive data from localStorage
      localStorage.removeItem('authToken');
    },

    saveFormDraft: (formId, data) => {
      dispatch({ 
        type: actionTypes.SAVE_FORM_DRAFT, 
        payload: { formId, data } 
      });
    },

    clearFormDraft: (formId) => {
      dispatch({ type: actionTypes.CLEAR_FORM_DRAFT, payload: formId });
    },

    addVisitedPage: (path, title) => {
      dispatch({ 
        type: actionTypes.ADD_VISITED_PAGE, 
        payload: { path, title, timestamp: Date.now() } 
      });
    },

    setCache: (key, data, expires = null) => {
      dispatch({ 
        type: actionTypes.SET_CACHE, 
        payload: { key, data, expires } 
      });
    },

    clearCache: (key = null) => {
      dispatch({ type: actionTypes.CLEAR_CACHE, payload: key });
    },

    addError: (error) => {
      dispatch({ type: actionTypes.ADD_ERROR, payload: error });
    },

    clearErrors: () => {
      dispatch({ type: actionTypes.CLEAR_ERRORS });
    }
  };

  // Helper functions
  const helpers = {
    // Check if cache is valid
    isCacheValid: (key) => {
      const cached = state.cache[key];
      if (!cached) return false;
      
      if (cached.expires && Date.now() > cached.expires) {
        actions.clearCache(key);
        return false;
      }
      
      return true;
    },

    // Get cached data
    getCachedData: (key) => {
      if (helpers.isCacheValid(key)) {
        return state.cache[key].data;
      }
      return null;
    },

    // Get form draft
    getFormDraft: (formId) => {
      return state.formDrafts[formId]?.data || null;
    },

    // Check if form draft exists
    hasFormDraft: (formId) => {
      return !!state.formDrafts[formId];
    },

    // Get current language data
    getCurrentLanguage: () => {
      return LANGUAGES.find(lang => lang.code === state.language) || LANGUAGES[0];
    },

    // Check if user has visited page
    hasVisitedPage: (path) => {
      return state.visitedPages.some(page => page.path === path);
    },

    // Get recently visited pages
    getRecentPages: (limit = 10) => {
      return state.visitedPages.slice(0, limit);
    }
  };

  const value = {
    ...state,
    ...actions,
    ...helpers,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the App context
export const useApp = () => {
  const context = useContext(AppContext);
  
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  
  return context;
};

// HOC for components that need app context
export const withApp = (Component) => {
  return function WrappedComponent(props) {
    return (
      <AppProvider>
        <Component {...props} />
      </AppProvider>
    );
  };
};

export default AppContext;