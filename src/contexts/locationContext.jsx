import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useKenyaLocations, useCurrentLocation } from '../hooks/useLocation';

// Initial state
const initialState = {
  // Selected locations
  selectedCounty: '',
  selectedConstituency: '',
  selectedWard: '',
  
  // Location data
  counties: [],
  constituencies: [],
  wards: [],
  
  // Loading states
  loadingCounties: false,
  loadingConstituencies: false,
  loadingWards: false,
  
  // Current location
  currentLocation: null,
  locationPermission: 'prompt',
  
  // Search and filters
  searchTerm: '',
  locationFilters: {
    showNearby: false,
    radius: 10, // kilometers
    sortByDistance: false
  },
  
  // Cache for location data
  locationCache: {},
  
  // Errors
  locationError: null
};

// Action types
const actionTypes = {
  SET_SELECTED_COUNTY: 'SET_SELECTED_COUNTY',
  SET_SELECTED_CONSTITUENCY: 'SET_SELECTED_CONSTITUENCY',
  SET_SELECTED_WARD: 'SET_SELECTED_WARD',
  SET_COUNTIES: 'SET_COUNTIES',
  SET_CONSTITUENCIES: 'SET_CONSTITUENCIES',
  SET_WARDS: 'SET_WARDS',
  SET_LOADING_COUNTIES: 'SET_LOADING_COUNTIES',
  SET_LOADING_CONSTITUENCIES: 'SET_LOADING_CONSTITUENCIES',
  SET_LOADING_WARDS: 'SET_LOADING_WARDS',
  SET_CURRENT_LOCATION: 'SET_CURRENT_LOCATION',
  SET_LOCATION_PERMISSION: 'SET_LOCATION_PERMISSION',
  SET_SEARCH_TERM: 'SET_SEARCH_TERM',
  SET_LOCATION_FILTERS: 'SET_LOCATION_FILTERS',
  SET_LOCATION_CACHE: 'SET_LOCATION_CACHE',
  SET_LOCATION_ERROR: 'SET_LOCATION_ERROR',
  CLEAR_SELECTIONS: 'CLEAR_SELECTIONS',
  RESET_LOCATION_STATE: 'RESET_LOCATION_STATE'
};

// Reducer function
const locationReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_COUNTY:
      return {
        ...state,
        selectedCounty: action.payload,
        selectedConstituency: '', // Reset constituency when county changes
        selectedWard: '' // Reset ward when county changes
      };

    case actionTypes.SET_SELECTED_CONSTITUENCY:
      return {
        ...state,
        selectedConstituency: action.payload,
        selectedWard: '' // Reset ward when constituency changes
      };

    case actionTypes.SET_SELECTED_WARD:
      return {
        ...state,
        selectedWard: action.payload
      };

    case actionTypes.SET_COUNTIES:
      return {
        ...state,
        counties: action.payload
      };

    case actionTypes.SET_CONSTITUENCIES:
      return {
        ...state,
        constituencies: action.payload
      };

    case actionTypes.SET_WARDS:
      return {
        ...state,
        wards: action.payload
      };

    case actionTypes.SET_LOADING_COUNTIES:
      return {
        ...state,
        loadingCounties: action.payload
      };

    case actionTypes.SET_LOADING_CONSTITUENCIES:
      return {
        ...state,
        loadingConstituencies: action.payload
      };

    case actionTypes.SET_LOADING_WARDS:
      return {
        ...state,
        loadingWards: action.payload
      };

    case actionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload
      };

    case actionTypes.SET_LOCATION_PERMISSION:
      return {
        ...state,
        locationPermission: action.payload
      };

    case actionTypes.SET_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };

    case actionTypes.SET_LOCATION_FILTERS:
      return {
        ...state,
        locationFilters: {
          ...state.locationFilters,
          ...action.payload
        }
      };

    case actionTypes.SET_LOCATION_CACHE:
      return {
        ...state,
        locationCache: {
          ...state.locationCache,
          [action.payload.key]: {
            data: action.payload.data,
            timestamp: Date.now()
          }
        }
      };

    case actionTypes.SET_LOCATION_ERROR:
      return {
        ...state,
        locationError: action.payload
      };

    case actionTypes.CLEAR_SELECTIONS:
      return {
        ...state,
        selectedCounty: '',
        selectedConstituency: '',
        selectedWard: '',
        constituencies: [],
        wards: []
      };

    case actionTypes.RESET_LOCATION_STATE:
      return {
        ...initialState,
        counties: state.counties, // Keep counties loaded
        currentLocation: state.currentLocation, // Keep current location
        locationPermission: state.locationPermission
      };

    default:
      return state;
  }
};

// Create context
const LocationContext = createContext();

// Context provider component
export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, initialState);
  
  // Use location hooks
  const {
    counties,
    constituencies,
    wards,
    loading: locationLoading,
    error: locationHookError,
    loadCounties,
    loadConstituencies,
    loadWards,
    getCountyById,
    getConstituencyById,
    getWardById
  } = useKenyaLocations();

  const {
    currentLocation,
    loading: currentLocationLoading,
    error: currentLocationError,
    permissionStatus,
    getCurrentPosition,
    watchPosition,
    stopWatching,
    calculateDistance,
    getDistanceTo
  } = useCurrentLocation();

  // Update state when hook data changes
  useEffect(() => {
    dispatch({ type: actionTypes.SET_COUNTIES, payload: counties });
  }, [counties]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_CONSTITUENCIES, payload: constituencies });
  }, [constituencies]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_WARDS, payload: wards });
  }, [wards]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_CURRENT_LOCATION, payload: currentLocation });
  }, [currentLocation]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOCATION_PERMISSION, payload: permissionStatus });
  }, [permissionStatus]);

  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOADING_COUNTIES, payload: locationLoading });
  }, [locationLoading]);

  useEffect(() => {
    const error = locationHookError || currentLocationError;
    dispatch({ type: actionTypes.SET_LOCATION_ERROR, payload: error });
  }, [locationHookError, currentLocationError]);

  // Action creators
  const actions = {
    // Location selection
    setSelectedCounty: (countyId) => {
      dispatch({ type: actionTypes.SET_SELECTED_COUNTY, payload: countyId });
      if (countyId) {
        dispatch({ type: actionTypes.SET_LOADING_CONSTITUENCIES, payload: true });
        loadConstituencies(countyId).finally(() => {
          dispatch({ type: actionTypes.SET_LOADING_CONSTITUENCIES, payload: false });
        });
      }
    },

    setSelectedConstituency: (constituencyId) => {
      dispatch({ type: actionTypes.SET_SELECTED_CONSTITUENCY, payload: constituencyId });
      if (constituencyId) {
        dispatch({ type: actionTypes.SET_LOADING_WARDS, payload: true });
        loadWards(constituencyId).finally(() => {
          dispatch({ type: actionTypes.SET_LOADING_WARDS, payload: false });
        });
      }
    },

    setSelectedWard: (wardId) => {
      dispatch({ type: actionTypes.SET_SELECTED_WARD, payload: wardId });
    },

    // Clear selections
    clearSelections: () => {
      dispatch({ type: actionTypes.CLEAR_SELECTIONS });
    },

    // Search
    setSearchTerm: (term) => {
      dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: term });
    },

    // Filters
    setLocationFilters: (filters) => {
      dispatch({ type: actionTypes.SET_LOCATION_FILTERS, payload: filters });
    },

    // Current location
    requestCurrentLocation: () => {
      getCurrentPosition();
    },

    startLocationTracking: () => {
      return watchPosition();
    },

    stopLocationTracking: (watchId) => {
      stopWatching(watchId);
    },

    // Cache management
    setCacheData: (key, data) => {
      dispatch({ 
        type: actionTypes.SET_LOCATION_CACHE, 
        payload: { key, data } 
      });
    },

    // Reset
    resetLocationState: () => {
      dispatch({ type: actionTypes.RESET_LOCATION_STATE });
    }
  };

  // Helper functions
  const helpers = {
    // Get location names
    getSelectedLocationNames: () => {
      return {
        county: state.selectedCounty ? getCountyById(state.selectedCounty)?.name : '',
        constituency: state.selectedConstituency ? getConstituencyById(state.selectedConstituency)?.name : '',
        ward: state.selectedWard ? getWardById(state.selectedWard)?.name : ''
      };
    },

    // Get full address string
    getFullAddress: () => {
      const names = helpers.getSelectedLocationNames();
      return [names.ward, names.constituency, names.county]
        .filter(Boolean)
        .join(', ');
    },

    // Filter locations by search term
    getFilteredCounties: () => {
      if (!state.searchTerm) return state.counties;
      return state.counties.filter(county =>
        county.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },

    getFilteredConstituencies: () => {
      if (!state.searchTerm) return state.constituencies;
      return state.constituencies.filter(constituency =>
        constituency.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },

    getFilteredWards: () => {
      if (!state.searchTerm) return state.wards;
      return state.wards.filter(ward =>
        ward.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },

    // Distance calculations
    calculateDistance: (lat1, lon1, lat2, lon2) => {
      return calculateDistance(lat1, lon1, lat2, lon2);
    },

    getDistanceToCurrentLocation: (targetLat, targetLon) => {
      return getDistanceTo(targetLat, targetLon);
    },

    // Sort items by distance from current location
    sortByDistanceFromCurrent: (items, locationKey = 'location') => {
      if (!state.currentLocation) return items;

      return [...items].sort((a, b) => {
        const aLocation = a[locationKey];
        const bLocation = b[locationKey];

        if (!aLocation?.latitude || !aLocation?.longitude) return 1;
        if (!bLocation?.latitude || !bLocation?.longitude) return -1;

        const distanceA = calculateDistance(
          state.currentLocation.latitude,
          state.currentLocation.longitude,
          aLocation.latitude,
          aLocation.longitude
        );

        const distanceB = calculateDistance(
          state.currentLocation.latitude,
          state.currentLocation.longitude,
          bLocation.latitude,
          bLocation.longitude
        );

        return distanceA - distanceB;
      });
    },

    // Filter items by proximity to current location
    filterByProximity: (items, locationKey = 'location', radius = state.locationFilters.radius) => {
      if (!state.currentLocation) return items;

      return items.filter(item => {
        const itemLocation = item[locationKey];
        if (!itemLocation?.latitude || !itemLocation?.longitude) return false;

        const distance = calculateDistance(
          state.currentLocation.latitude,
          state.currentLocation.longitude,
          itemLocation.latitude,
          itemLocation.longitude
        );

        return distance <= radius;
      });
    },

    // Check if location selection is complete
    isLocationComplete: () => {
      return !!(state.selectedCounty && state.selectedConstituency && state.selectedWard);
    },

    // Get selection progress (0-1)
    getSelectionProgress: () => {
      let progress = 0;
      if (state.selectedCounty) progress += 0.33;
      if (state.selectedConstituency) progress += 0.33;
      if (state.selectedWard) progress += 0.34;
      return progress;
    },

    // Check if user has granted location permission
    hasLocationPermission: () => {
      return state.locationPermission === 'granted';
    },

    // Get cached data
    getCachedData: (key) => {
      const cached = state.locationCache[key];
      if (!cached) return null;

      // Check if cache is expired (24 hours)
      const CACHE_DURATION = 24 * 60 * 60 * 1000;
      if (Date.now() - cached.timestamp > CACHE_DURATION) {
        return null;
      }

      return cached.data;
    },

    // Validate coordinates
    isValidCoordinates: (lat, lon) => {
      return (
        typeof lat === 'number' &&
        typeof lon === 'number' &&
        lat >= -90 &&
        lat <= 90 &&
        lon >= -180 &&
        lon <= 180
      );
    }
  };

  const value = {
    ...state,
    ...actions,
    ...helpers,
    dispatch
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the Location context
export const useLocationContext = () => {
  const context = useContext(LocationContext);
  
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  
  return context;
};

// HOC for components that need location context
export const withLocation = (Component) => {
  return function WrappedComponent(props) {
    return (
      <LocationProvider>
        <Component {...props} />
      </LocationProvider>
    );
  };
};

export default LocationContext;