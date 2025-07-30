import { useState, useEffect, useCallback, useRef } from 'react';

// Generic API hook for handling API requests
export const useApi = (apiFunction, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);
  
  const abortControllerRef = useRef(null);
  const {
    immediate = false,
    cacheTime = 5 * 60 * 1000, // 5 minutes default cache
    retryAttempts = 3,
    retryDelay = 1000,
    onSuccess,
    onError
  } = options;

  // Execute API call
  const execute = useCallback(async (...args) => {
    // Abort previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    let attempts = 0;
    
    const attemptRequest = async () => {
      try {
        const result = await apiFunction(...args, {
          signal: abortControllerRef.current.signal
        });
        
        setData(result);
        setLastFetch(Date.now());
        setError(null);
        
        if (onSuccess) {
          onSuccess(result);
        }
        
        return result;
      } catch (err) {
        if (err.name === 'AbortError') {
          return; // Request was cancelled
        }

        attempts++;
        
        if (attempts < retryAttempts) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempts));
          return attemptRequest();
        }
        
        setError(err);
        
        if (onError) {
          onError(err);
        }
        
        throw err;
      } finally {
        setLoading(false);
      }
    };

    return attemptRequest();
  }, [apiFunction, retryAttempts, retryDelay, onSuccess, onError]);

  // Reset state
  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setData(null);
    setLoading(false);
    setError(null);
    setLastFetch(null);
  }, []);

  // Check if data is stale
  const isStale = useCallback(() => {
    if (!lastFetch || !cacheTime) return true;
    return Date.now() - lastFetch > cacheTime;
  }, [lastFetch, cacheTime]);

  // Refetch data
  const refetch = useCallback((...args) => {
    return execute(...args);
  }, [execute]);

  // Execute immediately if requested
  useEffect(() => {
    if (immediate) {
      execute();
    }

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [immediate, execute]);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    refetch,
    isStale: isStale(),
    lastFetch
  };
};

// Hook for handling paginated API requests
export const usePaginatedApi = (apiFunction, options = {}) => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);

  const {
    pageSize = 20,
    resetOnParamsChange = true,
    ...apiOptions
  } = options;

  const { data, loading, error, execute, reset } = useApi(apiFunction, {
    ...apiOptions,
    onSuccess: (result) => {
      if (result) {
        setAllData(resetOnParamsChange ? result.data || [] : 
          prev => [...prev, ...(result.data || [])]);
        setTotalPages(result.totalPages || 0);
        setTotalItems(result.total || 0);
        setHasNextPage(result.hasNextPage || false);
        setHasPrevPage(result.hasPrevPage || false);
      }
      
      if (apiOptions.onSuccess) {
        apiOptions.onSuccess(result);
      }
    }
  });

  const loadPage = useCallback(async (page, params = {}) => {
    setCurrentPage(page);
    return execute({
      page,
      limit: pageSize,
      ...params
    });
  }, [execute, pageSize]);

  const loadNextPage = useCallback((params = {}) => {
    if (hasNextPage) {
      return loadPage(currentPage + 1, params);
    }
  }, [hasNextPage, currentPage, loadPage]);

  const loadPrevPage = useCallback((params = {}) => {
    if (hasPrevPage) {
      return loadPage(currentPage - 1, params);
    }
  }, [hasPrevPage, currentPage, loadPage]);

  const resetPagination = useCallback(() => {
    setAllData([]);
    setCurrentPage(1);
    setTotalPages(0);
    setTotalItems(0);
    setHasNextPage(false);
    setHasPrevPage(false);
    reset();
  }, [reset]);

  return {
    data: allData,
    currentPage,
    totalPages,
    totalItems,
    hasNextPage,
    hasPrevPage,
    loading,
    error,
    loadPage,
    loadNextPage,
    loadPrevPage,
    reset: resetPagination
  };
};

// Hook for handling infinite scroll API requests
export const useInfiniteApi = (apiFunction, options = {}) => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { pageSize = 20, ...apiOptions } = options;

  const { loading, error, execute } = useApi(apiFunction, {
    ...apiOptions,
    onSuccess: (result) => {
      if (result) {
        const newData = result.data || [];
        setAllData(prev => [...prev, ...newData]);
        setHasMore(newData.length === pageSize);
        setCurrentPage(prev => prev + 1);
      }
      
      if (apiOptions.onSuccess) {
        apiOptions.onSuccess(result);
      }
    }
  });

  const loadMore = useCallback((params = {}) => {
    if (!loading && hasMore) {
      return execute({
        page: currentPage,
        limit: pageSize,
        ...params
      });
    }
  }, [execute, loading, hasMore, currentPage, pageSize]);

  const reset = useCallback(() => {
    setAllData([]);
    setCurrentPage(1);
    setHasMore(true);
  }, []);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    loadMore,
    reset
  };
};

// Hook for handling API requests with local caching
export const useCachedApi = (key, apiFunction, options = {}) => {
  const [cache, setCache] = useState(new Map());
  
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutes
    staleTime = 1 * 60 * 1000, // 1 minute
    ...apiOptions
  } = options;

  const getCacheKey = useCallback((args) => {
    return `${key}:${JSON.stringify(args)}`;
  }, [key]);

  const getCachedData = useCallback((cacheKey) => {
    const cached = cache.get(cacheKey);
    if (!cached) return null;

    const now = Date.now();
    const isExpired = now - cached.timestamp > cacheTime;
    const isStale = now - cached.timestamp > staleTime;

    if (isExpired) {
      cache.delete(cacheKey);
      setCache(new Map(cache));
      return null;
    }

    return { ...cached, isStale };
  }, [cache, cacheTime, staleTime]);

  const setCachedData = useCallback((cacheKey, data) => {
    const newCache = new Map(cache);
    newCache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    setCache(newCache);
  }, [cache]);

  const { data, loading, error, execute, reset } = useApi(apiFunction, {
    ...apiOptions,
    onSuccess: (result, ...args) => {
      const cacheKey = getCacheKey(args);
      setCachedData(cacheKey, result);
      
      if (apiOptions.onSuccess) {
        apiOptions.onSuccess(result, ...args);
      }
    }
  });

  const executeWithCache = useCallback(async (...args) => {
    const cacheKey = getCacheKey(args);
    const cached = getCachedData(cacheKey);

    if (cached && !cached.isStale) {
      return cached.data;
    }

    return execute(...args);
  }, [execute, getCacheKey, getCachedData]);

  const clearCache = useCallback((specificKey = null) => {
    if (specificKey) {
      const cacheKey = getCacheKey([specificKey]);
      const newCache = new Map(cache);
      newCache.delete(cacheKey);
      setCache(newCache);
    } else {
      setCache(new Map());
    }
  }, [cache, getCacheKey]);

  return {
    data,
    loading,
    error,
    execute: executeWithCache,
    reset,
    clearCache
  };
};

// Hook for handling multiple API requests
export const useMultipleApi = (apiRequests = []) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const executeAll = useCallback(async () => {
    setLoading(true);
    setErrors([]);
    
    try {
      const promises = apiRequests.map(async (request, index) => {
        try {
          const result = await request();
          return { index, result, error: null };
        } catch (error) {
          return { index, result: null, error };
        }
      });

      const responses = await Promise.all(promises);
      
      const newResults = [];
      const newErrors = [];

      responses.forEach(({ index, result, error }) => {
        newResults[index] = result;
        newErrors[index] = error;
      });

      setResults(newResults);
      setErrors(newErrors);
    } finally {
      setLoading(false);
    }
  }, [apiRequests]);

  return {
    results,
    loading,
    errors,
    executeAll
  };
};