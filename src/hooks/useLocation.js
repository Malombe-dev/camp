import { useState, useEffect, useCallback } from 'react';
import { apiRequest, endpoints } from '../services/api';
import { KENYA_LOCATIONS } from '../utils/locationData';

// Hook for managing Kenya location data (Counties, Constituencies, Wards)
export const useKenyaLocations = () => {
  const [counties, setCounties] = useState([]);
  const [constituencies, setConstituencies] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load counties
  const loadCounties = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // First try to get from API
      const response = await apiRequest.get(endpoints.counties);
      setCounties(response.data);
    } catch (err) {
      // Fallback to local data
      setCounties(KENYA_LOCATIONS.counties);
      console.warn('Failed to load counties from API, using local data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load constituencies for a specific county
  const loadConstituencies = useCallback(async (countyId) => {
    if (!countyId) {
      setConstituencies([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // First try to get from API
      const response = await apiRequest.get(endpoints.constituencies(countyId));
      setConstituencies(response.data);
    } catch (err) {
      // Fallback to local data
      const localConstituencies = KENYA_LOCATIONS.constituencies.filter(
        constituency => constituency.countyId === countyId
      );
      setConstituencies(localConstituencies);
      console.warn('Failed to load constituencies from API, using local data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load wards for a specific constituency
  const loadWards = useCallback(async (constituencyId) => {
    if (!constituencyId) {
      setWards([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // First try to get from API
      const response = await apiRequest.get(endpoints.wards(constituencyId));
      setWards(response.data);
    } catch (err) {
      // Fallback to local data
      const localWards = KENYA_LOCATIONS.wards.filter(
        ward => ward.constituencyId === constituencyId
      );
      setWards(localWards);
      console.warn('Failed to load wards from API, using local data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get county by ID
  const getCountyById = useCallback((countyId) => {
    return counties.find(county => county.id === countyId);
  }, [counties]);

  // Get constituency by ID
  const getConstituencyById = useCallback((constituencyId) => {
    return constituencies.find(constituency => constituency.id === constituencyId);
  }, [constituencies]);

  // Get ward by ID
  const getWardById = useCallback((wardId) => {
    return wards.find(ward => ward.id === wardId);
  }, [wards]);

  // Reset all location data
  const resetLocations = useCallback(() => {
    setCounties([]);
    setConstituencies([]);
    setWards([]);
    setError(null);
  }, []);

  // Load counties on mount
  useEffect(() => {
    loadCounties();
  }, [loadCounties]);

  return {
    counties,
    constituencies,
    wards,
    loading,
    error,
    loadCounties,
    loadConstituencies,
    loadWards,
    getCountyById,
    getConstituencyById,
    getWardById,
    resetLocations
  };
};

// Hook for location-based filtering and searching
export const useLocationFilter = () => {
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    counties,
    constituencies,
    wards,
    loading,
    loadConstituencies,
    loadWards,
    getCountyById,
    getConstituencyById,
    getWardById
  } = useKenyaLocations();

  // Handle county selection
  const handleCountyChange = useCallback((countyId) => {
    setSelectedCounty(countyId);
    setSelectedConstituency('');
    setSelectedWard('');
    
    if (countyId) {
      loadConstituencies(countyId);
    }
  }, [loadConstituencies]);

  // Handle constituency selection
  const handleConstituencyChange = useCallback((constituencyId) => {
    setSelectedConstituency(constituencyId);
    setSelectedWard('');
    
    if (constituencyId) {
      loadWards(constituencyId);
    }
  }, [loadWards]);

  // Handle ward selection
  const handleWardChange = useCallback((wardId) => {
    setSelectedWard(wardId);
  }, []);

  // Filter counties by search term
  const filteredCounties = counties.filter(county =>
    county.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter constituencies by search term
  const filteredConstituencies = constituencies.filter(constituency =>
    constituency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter wards by search term
  const filteredWards = wards.filter(ward =>
    ward.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get selected location names
  const selectedLocationNames = {
    county: selectedCounty ? getCountyById(selectedCounty)?.name : '',
    constituency: selectedConstituency ? getConstituencyById(selectedConstituency)?.name : '',
    ward: selectedWard ? getWardById(selectedWard)?.name : ''
  };

  // Clear all selections
  const clearSelections = useCallback(() => {
    setSelectedCounty('');
    setSelectedConstituency('');
    setSelectedWard('');
    setSearchTerm('');
  }, []);

  // Get current filter object
  const currentFilter = {
    county: selectedCounty,
    constituency: selectedConstituency,
    ward: selectedWard,
    searchTerm
  };

  return {
    selectedCounty,
    selectedConstituency,
    selectedWard,
    searchTerm,
    counties: filteredCounties,
    constituencies: filteredConstituencies,
    wards: filteredWards,
    loading,
    selectedLocationNames,
    currentFilter,
    handleCountyChange,
    handleConstituencyChange,
    handleWardChange,
    setSearchTerm,
    clearSelections
  };
};

// Hook for user's current location
export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('prompt');

  // Get user's current position
  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        setPermissionStatus('granted');
        setLoading(false);
      },
      (err) => {
        let errorMessage = 'Failed to get location';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            setPermissionStatus('denied');
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
            break;
        }
        
        setError(errorMessage);
        setLoading(false);
      },
      options
    );
  }, []);

  // Watch user's position for changes
  const watchPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      return null;
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000 // 1 minute
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp
        });
        setPermissionStatus('granted');
        setError(null);
      },
      (err) => {
        let errorMessage = 'Failed to watch location';
        
        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user';
            setPermissionStatus('denied');
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable';
            break;
          case err.TIMEOUT:
            errorMessage = 'Location request timed out';
            break;
          default:
            errorMessage = 'An unknown error occurred';
            break;
        }
        
        setError(errorMessage);
      },
      options
    );

    return watchId;
  }, []);

  // Stop watching position
  const stopWatching = useCallback((watchId) => {
    if (watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  // Calculate distance between two points (Haversine formula)
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in kilometers
  }, []);

  // Get distance to a specific location
  const getDistanceTo = useCallback((targetLat, targetLon) => {
    if (!currentLocation) return null;
    
    return calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      targetLat,
      targetLon
    );
  }, [currentLocation, calculateDistance]);

  return {
    currentLocation,
    loading,
    error,
    permissionStatus,
    getCurrentPosition,
    watchPosition,
    stopWatching,
    calculateDistance,
    getDistanceTo
  };
};

// Hook for location-based search and filtering
export const useLocationSearch = (items = [], locationKey = 'location') => {
  const [searchRadius, setSearchRadius] = useState(10); // kilometers
  const { currentLocation, getCurrentPosition } = useCurrentLocation();

  // Filter items by location proximity
  const filterByLocation = useCallback((searchLat, searchLon, radius = searchRadius) => {
    if (!searchLat || !searchLon) return items;

    return items.filter(item => {
      const itemLocation = item[locationKey];
      if (!itemLocation || !itemLocation.latitude || !itemLocation.longitude) {
        return false;
      }

      const distance = calculateDistance(
        searchLat,
        searchLon,
        itemLocation.latitude,
        itemLocation.longitude
      );

      return distance <= radius;
    });
  }, [items, locationKey, searchRadius]);

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Sort items by distance from current location
  const sortByDistance = useCallback((fromLat, fromLon) => {
    if (!fromLat || !fromLon) return items;

    return [...items].sort((a, b) => {
      const aLocation = a[locationKey];
      const bLocation = b[locationKey];

      if (!aLocation?.latitude || !aLocation?.longitude) return 1;
      if (!bLocation?.latitude || !bLocation?.longitude) return -1;

      const distanceA = calculateDistance(fromLat, fromLon, aLocation.latitude, aLocation.longitude);
      const distanceB = calculateDistance(fromLat, fromLon, bLocation.latitude, bLocation.longitude);

      return distanceA - distanceB;
    });
  }, [items, locationKey, calculateDistance]);

  // Get nearby items using current location
  const getNearbyItems = useCallback(() => {
    if (!currentLocation) return items;

    return filterByLocation(
      currentLocation.latitude,
      currentLocation.longitude,
      searchRadius
    );
  }, [currentLocation, filterByLocation, items, searchRadius]);

  return {
    searchRadius,
    setSearchRadius,
    currentLocation,
    getCurrentPosition,
    filterByLocation,
    sortByDistance,
    getNearbyItems,
    calculateDistance
  };
};