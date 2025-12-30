import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Image, 
  Users, 
  TrendingUp, 
  Calendar,
  BarChart3,
  LogOut,
  Settings,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalPress: 0,
    totalGallery: 0,
    totalMedia: 0,
    totalViews: 0,
    pressViews: 0,
    galleryViews: 0,
    mediaViews: 0,
    engagement: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api' || 'https://server-mern-zc6l.onrender.com';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch press stats - CORRECTED ENDPOINT
      let pressViews = 0;
      let totalPress = 0;
      try {
        const pressStatsRes = await fetch(`${API_BASE_URL}/press/stats`, {
          headers: getAuthHeaders()
        });
        
        if (pressStatsRes.ok) {
          const pressStatsData = await pressStatsRes.json();
          console.log('Press stats:', pressStatsData);
          
          if (pressStatsData.success && pressStatsData.data) {
            totalPress = pressStatsData.data.overview?.total || 0;
            
            // Calculate total press views from topViewed
            if (pressStatsData.data.topViewed && pressStatsData.data.topViewed.length > 0) {
              pressViews = pressStatsData.data.topViewed.reduce((sum, item) => sum + (item.views || 0), 0);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching press stats:', err);
      }

      // Fetch all press to get accurate view count
      try {
        const pressRes = await fetch(`${API_BASE_URL}/press?published=true&limit=1000`, {
          headers: getAuthHeaders()
        });
        
        if (pressRes.ok) {
          const pressData = await pressRes.json();
          if (pressData.success && pressData.data) {
            // If we got the data, use it to calculate views
            pressViews = pressData.data.reduce((sum, item) => sum + (item.views || 0), 0);
            
            // Store latest press for recent activity
            if (pressData.data.length > 0) {
              const sortedPress = [...pressData.data].sort((a, b) => 
                new Date(b.createdAt || b.publishDate) - new Date(a.createdAt || a.publishDate)
              );
              const latestPress = sortedPress[0];
              
              recentActivity.push({
                type: 'press',
                title: 'New press release published',
                subtitle: latestPress.title || 'Latest article',
                time: formatTimeAgo(latestPress.createdAt || latestPress.publishDate || new Date()),
                views: latestPress.views || 0
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching all press:', err);
      }

      // Fetch gallery data with limit to get all items
      let galleryViews = 0;
      let totalGallery = 0;
      try {
        const galleryRes = await fetch(`${API_BASE_URL}/gallery?limit=1000`, {
          headers: getAuthHeaders()
        });
        
        if (galleryRes.ok) {
          const galleryData = await galleryRes.json();
          console.log('Gallery data:', galleryData);
          
          if (galleryData.success && galleryData.data) {
            totalGallery = galleryData.data.length;
            // Calculate total gallery views
            galleryViews = galleryData.data.reduce((sum, item) => sum + (item.views || 0), 0);
            
            console.log(`Gallery: ${totalGallery} items, ${galleryViews} total views`);
            
            // Store latest gallery for recent activity
            if (galleryData.data.length > 0) {
              const sortedGallery = [...galleryData.data].sort((a, b) => 
                new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
              );
              const latestGallery = sortedGallery[0];
              
              recentActivity.push({
                type: 'gallery',
                title: 'Gallery updated',
                subtitle: latestGallery.title || 'New photos added',
                time: formatTimeAgo(latestGallery.createdAt || latestGallery.date || new Date()),
                views: latestGallery.views || 0
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      }

      // Fetch media stats (optional - might not exist)
      let mediaViews = 0;
      let totalMedia = 0;
      try {
        const mediaStatsRes = await fetch(`${API_BASE_URL}/media/stats/analytics`, {
          headers: getAuthHeaders()
        });
        
        if (mediaStatsRes.ok) {
          const mediaStats = await mediaStatsRes.json();
          console.log('Media stats:', mediaStats);
          
          if (mediaStats.success && mediaStats.data) {
            mediaViews = mediaStats.data.overall?.totalViews || 0;
            totalMedia = mediaStats.data.overall?.totalMedia || 0;
          }
        }
      } catch (err) {
        console.log('Media stats not available (this is optional)');
      }

      // Calculate total views across all content
      const totalViews = pressViews + galleryViews + mediaViews;

      // Calculate engagement rate (average views per content item)
      const totalContent = totalPress + totalGallery + totalMedia;
      const engagement = totalContent > 0 
        ? Math.round((totalViews / totalContent) * 100) / 100
        : 0;

      console.log('Final stats:', {
        totalPress,
        totalGallery,
        totalMedia,
        pressViews,
        galleryViews,
        mediaViews,
        totalViews,
        engagement
      });

      setStats({
        totalPress,
        totalGallery,
        totalMedia,
        totalViews,
        pressViews,
        galleryViews,
        mediaViews,
        engagement
      });

      // Sort recent activity by most recent
      const activities = [...recentActivity].sort((a, b) => {
        const timeA = parseTimeAgo(a.time);
        const timeB = parseTimeAgo(b.time);
        return timeA - timeB;
      });

      setRecentActivity(activities.slice(0, 5));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
      setLoading(false);
    }
  };

  const parseTimeAgo = (timeStr) => {
    const match = timeStr.match(/(\d+)\s+(minute|hour|day)/);
    if (!match) return 0;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    if (unit === 'minute') return value;
    if (unit === 'hour') return value * 60;
    if (unit === 'day') return value * 60 * 24;
    return 0;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    return past.toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getUserInfo = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  };

  const user = getUserInfo();

  const adminModules = [
    {
      title: 'Press Management',
      description: 'Manage press releases, articles, and news updates',
      icon: FileText,
      path: '/admin/press',
      color: 'blue',
      stats: { label: 'Articles', value: stats.totalPress, subLabel: `${formatNumber(stats.pressViews)} views` }
    },
    {
      title: 'Gallery Management',
      description: 'Manage campaign moments, photos, and media',
      icon: Image,
      path: '/admin/gallery',
      color: 'purple',
      stats: { label: 'Items', value: stats.totalGallery, subLabel: `${formatNumber(stats.galleryViews)} views` }
    },
    {
      title: 'Analytics',
      description: 'View engagement metrics and statistics',
      icon: BarChart3,
      path: '/admin/analytics',
      color: 'green',
      stats: { label: 'Total Views', value: formatNumber(stats.totalViews) }
    },
    {
      title: 'Settings',
      description: 'Configure platform settings and preferences',
      icon: Settings,
      path: '/admin/settings',
      color: 'gray',
      stats: { label: 'Config', value: '✓' }
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      gray: 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700'
    };
    return colors[color] || colors.blue;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, <span className="font-semibold">{user?.name || 'Admin'}</span>
                <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  {user?.role || 'admin'}
                </span>
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={fetchDashboardData}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh data"
              >
                <RefreshCw size={18} />
                <span className="text-sm font-medium">Refresh</span>
              </button>
              <Link
                to="/"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="text-red-600" size={20} />
            <div className="flex-1">
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <button
              onClick={fetchDashboardData}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Retry
            </button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Press</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPress}</p>
                <p className="text-xs text-gray-500 mt-1">{formatNumber(stats.pressViews)} views</p>
              </div>
              <FileText className="text-blue-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Gallery Items</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalGallery}</p>
                <p className="text-xs text-gray-500 mt-1">{formatNumber(stats.galleryViews)} views</p>
              </div>
              <Image className="text-purple-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{formatNumber(stats.totalViews)}</p>
                <p className="text-xs text-gray-500 mt-1">Across all content</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg. Views</p>
                <p className="text-3xl font-bold text-gray-900">{stats.engagement.toFixed(1)}</p>
                <p className="text-xs text-gray-500 mt-1">Per content item</p>
              </div>
              <Users className="text-orange-500" size={32} />
            </div>
          </div>
        </div>

        {/* Admin Modules */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Management Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link
                  key={index}
                  to={module.path}
                  className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getColorClasses(module.color)}`} />
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${getColorClasses(module.color)} bg-opacity-10`}>
                        <Icon className="text-gray-700" size={28} />
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">{module.stats.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{module.stats.value}</p>
                        {module.stats.subLabel && (
                          <p className="text-xs text-gray-500 mt-1">{module.stats.subLabel}</p>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {module.description}
                    </p>
                    
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:translate-x-2 transition-transform">
                      Manage <span className="ml-2">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <span className="text-sm text-gray-500">{recentActivity.length} recent items</span>
          </div>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'press' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    {activity.type === 'press' ? (
                      <FileText className="text-blue-600" size={20} />
                    ) : (
                      <Image className="text-purple-600" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">
                      {activity.subtitle} • {activity.time}
                      {activity.views > 0 && ` • ${activity.views} views`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;