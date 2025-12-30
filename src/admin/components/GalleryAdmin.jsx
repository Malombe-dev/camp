import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Star,
  X,
  Search,
  Eye,
  Heart,
  Calendar,
  MapPin,
  Upload,
  Image as ImageIcon,
  Video,
  Camera
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';

const GalleryAdmin = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryCounts, setCategoryCounts] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: '',
    emoji: '📸',
    featured: false,
    published: true,
    photographerName: '',
    photographerCredit: ''
  });

  const [mediaFiles, setMediaFiles] = useState([]); // Array of {file, preview, type}
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUploadIndex, setCurrentUploadIndex] = useState(0);

  const categories = [
    { value: 'campaign', label: 'Campaign Events', emoji: '🎯' },
    { value: 'community', label: 'Community Visits', emoji: '🤝' },
    { value: 'speeches', label: 'Speeches & Rallies', emoji: '🎤' },
    { value: 'meetings', label: 'Meetings', emoji: '💼' }
  ];

  const emojiOptions = ['🏟️', '👥', '🏘️', '💼', '🏥', '🎓', '🌾', '👩‍💼', '🎯', '🤝', '🎤', '📸', '🎉', '🏆', '🌟', '💪'];

  const getAuthToken = () => localStorage?.getItem('token') || 'mock-admin-token';

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMediaType = (file) => {
    if (!file) return null;
    return file.type.startsWith('video/') ? 'video' : 'image';
  };

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/gallery?limit=100`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const { data, categoryCounts } = await res.json();
      setGalleryItems(data || []);
      setFilteredItems(data || []);
      setCategoryCounts(categoryCounts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    // Check if any file is a video
    const hasVideo = files.some(file => file.type.startsWith('video/'));
    
    // If video is selected, only allow one file
    if (hasVideo && files.length > 1) {
      setError('You can only upload one video at a time. For multiple files, please use images only.');
      return;
    }

    // If video exists in current selection and trying to add more
    const currentHasVideo = mediaFiles.some(item => item.type === 'video');
    if (currentHasVideo && files.length > 0) {
      setError('You already have a video. Remove it first to upload other files.');
      return;
    }

    // If adding video to existing images
    if (hasVideo && mediaFiles.length > 0) {
      setError('Remove existing images first to upload a video.');
      return;
    }

    // Validate each file
    const validFiles = [];
    for (const file of files) {
      if (file.size > 100 * 1024 * 1024) {
        setError(`File ${file.name} is too large. Maximum size is 100MB`);
        return;
      }

      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'
      ];

      if (!allowedTypes.includes(file.type)) {
        setError(`File ${file.name} has an invalid type. Please select valid images or videos.`);
        return;
      }

      const type = getMediaType(file);
      const preview = URL.createObjectURL(file);
      
      validFiles.push({ file, preview, type });
    }

    setMediaFiles(prev => [...prev, ...validFiles]);
    setError(null);
  };

  const removeMediaFile = (index) => {
    const fileToRemove = mediaFiles[index];
    if (fileToRemove.preview && fileToRemove.preview.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  };

  const clearAllMediaFiles = () => {
    mediaFiles.forEach(item => {
      if (item.preview && item.preview.startsWith('blob:')) {
        URL.revokeObjectURL(item.preview);
      }
    });
    setMediaFiles([]);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const validate = () => {
    const errs = [];

    if (!formData.title || formData.title.trim().length < 10 || formData.title.trim().length > 200) {
      errs.push('Title must be between 10 and 200 characters');
    }

    if (!formData.description || formData.description.trim().length < 20 || formData.description.trim().length > 1000) {
      errs.push('Description must be between 20 and 1000 characters');
    }

    if (!formData.category) {
      errs.push('Please select a category');
    }

    if (!formData.location || formData.location.trim().length > 100) {
      errs.push('Location is required and cannot exceed 100 characters');
    }

    if (!formData.date) {
      errs.push('Date is required');
    }

    if (modalType === 'create' && mediaFiles.length === 0) {
      errs.push('Please upload at least one image or video');
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errs = validate();
    if (errs.length) {
      setError(errs.join('. '));
      return;
    }
  
    setLoading(true);
    setError(null);
    setUploadProgress(0);
  
    try {
      const formDataToSend = new FormData();
  
      // Add form fields
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location', formData.location.trim());
      formDataToSend.append('date', formData.date);
      formDataToSend.append('emoji', formData.emoji);
      formDataToSend.append('featured', formData.featured.toString());
      formDataToSend.append('published', formData.published.toString());
  
      if (formData.photographerName) {
        formDataToSend.append('photographerName', formData.photographerName.trim());
      }
  
      if (formData.photographerCredit) {
        formDataToSend.append('photographerCredit', formData.photographerCredit.trim());
      }
  
      // Add media files
      if (modalType === 'create') {
        // For create: add all files
        mediaFiles.forEach((mediaItem, index) => {
          if (mediaItem.file) {
            formDataToSend.append('featuredImage', mediaItem.file);
          }
        });
      } else {
        // For edit: add only if new file selected
        if (mediaFiles.length > 0 && mediaFiles[0].file) {
          formDataToSend.append('featuredImage', mediaFiles[0].file);
        }
      }
  
      // Determine URL and method
      const url = modalType === 'edit' && selectedItem
        ? `${API_BASE}/api/gallery/${selectedItem._id}`
        : `${API_BASE}/api/gallery`;
      const method = modalType === 'edit' ? 'PUT' : 'POST';
  
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentComplete);
        }
      });
  
      const response = await new Promise((resolve, reject) => {
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', `Bearer ${getAuthToken()}`);
        
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            try {
              resolve(JSON.parse(xhr.responseText));
            } catch (e) {
              reject(new Error('Invalid JSON response'));
            }
          } else {
            reject(new Error(`Upload failed: ${xhr.statusText} (${xhr.status})`));
          }
        };
        
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(formDataToSend);
      });
  
      const { data } = response;
  
      // Update state
      if (modalType === 'create') {
        setGalleryItems(prev => [data, ...prev]);
      } else {
        setGalleryItems(prev => prev.map(item => 
          item._id === data._id ? data : item
        ));
      }
  
      setShowModal(false);
      resetForm();
      await fetchGallery();
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this gallery item? This action cannot be undone.')) return;

    try {
      const res = await fetch(`${API_BASE}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });

      if (res.ok) {
        setGalleryItems(prev => prev.filter(item => item._id !== id));
        await fetchGallery();
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete item');
    }
  };

  const toggleFeatured = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/gallery/${id}/featured`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const { data } = await res.json();
      setGalleryItems(prev =>
        prev.map(item => (item._id === id ? { ...item, featured: data.featured } : item))
      );
    } catch (error) {
      console.error('Toggle featured error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      date: '',
      emoji: '📸',
      featured: false,
      published: true,
      photographerName: '',
      photographerCredit: ''
    });

    clearAllMediaFiles();
    setSelectedItem(null);
    setError(null);
    setUploadProgress(0);
    setCurrentUploadIndex(0);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setError(null);

    if (type === 'edit' && item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        category: item.category || '',
        location: item.location || '',
        date: item.date ? item.date.split('T')[0] : '',
        emoji: item.image || '📸',
        featured: item.featured || false,
        published: item.published !== undefined ? item.published : true,
        photographerName: item.photographer?.name || '',
        photographerCredit: item.photographer?.credit || ''
      });

      const existingMediaUrl = item.mediaUrl?.url;
      if (existingMediaUrl) {
        const mediaType = item.mediaUrl?.resourceType || 'image';
        setMediaFiles([{
          file: null,
          preview: existingMediaUrl,
          type: mediaType
        }]);
      }
    } else {
      resetForm();
    }

    setShowModal(true);
  };

  useEffect(() => {
    let filtered = galleryItems;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          item.location.toLowerCase().includes(term)
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(item => item.category === filterCategory);
    }

    setFilteredItems(filtered);
  }, [searchTerm, filterCategory, galleryItems]);

  useEffect(() => {
    return () => {
      mediaFiles.forEach(item => {
        if (item.preview && item.preview.startsWith('blob:')) {
          URL.revokeObjectURL(item.preview);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
              <p className="text-gray-600">Manage campaign moments and media</p>
            </div>
            <button
              onClick={() => openModal('create')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Plus size={20} /> Add New Moment
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {categoryCounts && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
              <div className="text-sm font-medium text-gray-600">Total Moments</div>
              <div className="text-3xl font-bold text-blue-600 mt-2">{categoryCounts.all}</div>
            </div>
            {categories.map(cat => (
              <div key={cat.value} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-1">
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-xs">{cat.label}</span>
                </div>
                <div className="text-3xl font-bold text-green-600 mt-2">{categoryCounts[cat.value] || 0}</div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none min-w-[200px]"
            >
              <option value="all">All Categories</option>
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        {loading && !galleryItems.length ? (
          <div className="text-center py-12">
            <div className="inline-block w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading gallery...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Camera size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No moments yet</h3>
            <p className="text-gray-600 mb-6">Start capturing your campaign journey by adding moments to the gallery</p>
            <button
              onClick={() => openModal('create')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg inline-flex items-center gap-2 font-medium"
            >
              <Plus size={20} /> Add First Moment
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 group">
                  {item.mediaUrl?.url ? (
                    item.mediaUrl.resourceType === 'video' ? (
                      <video
                        src={item.mediaUrl.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <img
                        src={item.mediaUrl.url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {item.image}
                    </div>
                  )}
                  
                  {/* Overlay badges */}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {item.featured && (
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <Star size={12} className="fill-current" />
                        Featured
                      </span>
                    )}
                    {item.mediaUrl?.resourceType && (
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-lg ${
                        item.mediaUrl.resourceType === 'video' ? 'bg-purple-600' : 'bg-green-600'
                      }`}>
                        {item.mediaUrl.resourceType === 'video' ? (
                          <><Video size={12} /> Video</>
                        ) : (
                          <><ImageIcon size={12} /> Image</>
                        )}
                      </span>
                    )}
                  </div>

                  {/* Quick actions on hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => openModal('edit', item)}
                      className="bg-white text-blue-600 p-2 rounded-full hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => toggleFeatured(item._id)}
                      className="bg-white text-yellow-600 p-2 rounded-full hover:bg-yellow-50 transition-colors"
                      title="Toggle Featured"
                    >
                      <Star size={18} className={item.featured ? 'fill-current' : ''} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-white text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2 text-gray-900">{item.title}</h3>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} />
                      <span className="truncate max-w-[100px]">{item.location}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {formatDate(item.date)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 pt-3 border-t">
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {item.views || 0} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={12} /> {item.likes || 0} likes
                    </span>
                    <span className={`px-2 py-1 rounded-full font-semibold ${
                      item.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.published ? 'Live' : 'Draft'}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal('edit', item)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center gap-1"
                    >
                      <Edit size={14} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full my-8 shadow-2xl">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center rounded-t-xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === 'create' ? '📸 Add New Moment' : '✏️ Edit Moment'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
                  <p className="font-medium">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Title * (10–200 characters)
                  <span className={`ml-2 text-xs font-normal ${
                    formData.title.length < 10 || formData.title.length > 200 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {formData.title.length}/200
                  </span>
                </label>
                <input
                  type="text"
                  required
                  minLength={10}
                  maxLength={200}
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                  placeholder="e.g., Campaign Launch at Kenya Ideas Festival"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Description * (20–1000 characters)
                  <span className={`ml-2 text-xs font-normal ${
                    formData.description.length < 20 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {formData.description.length}/1000
                  </span>
                </label>
                <textarea
                  required
                  rows={4}
                  minLength={20}
                  maxLength={1000}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none resize-none"
                  placeholder="Describe this moment in detail..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c.value} value={c.value}>{c.emoji} {c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Emoji Icon</label>
                  <select
                    value={formData.emoji}
                    onChange={e => setFormData({ ...formData, emoji: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none text-2xl"
                  >
                    {emojiOptions.map(emoji => (
                      <option key={emoji} value={emoji}>{emoji}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Location *</label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    placeholder="e.g., Nairobi, Kenya"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Photographer Name</label>
                  <input
                    type="text"
                    value={formData.photographerName}
                    onChange={e => setFormData({ ...formData, photographerName: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 focus:border-transparent focus:outline-none"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Media Upload */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  Media Upload {modalType === 'create' && <span className="text-red-500">*</span>}
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    ({mediaFiles.length} file{mediaFiles.length !== 1 ? 's' : ''} selected)
                  </span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="flex-1 cursor-pointer">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 hover:bg-green-50 transition-all">
                        <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {mediaFiles.length === 0 
                            ? 'Click to upload images or video'
                            : mediaFiles[0].type === 'video' 
                            ? 'Video selected - remove to upload different files'
                            : 'Click to add more images'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {mediaFiles.length === 0 || mediaFiles[0].type === 'image'
                            ? 'Multiple images allowed • Max 100MB each'
                            : 'Only 1 video allowed • Max 100MB'}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          JPG, PNG, GIF, MP4, MOV, WebM
                        </p>
                      </div>
                      <input
                        type="file"
                        multiple={mediaFiles.length === 0 || mediaFiles[0].type === 'image'}
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,video/mp4,video/mov,video/avi,video/webm"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={mediaFiles.length > 0 && mediaFiles[0].type === 'video'}
                      />
                    </label>
                  </div>
                  
                  {mediaFiles.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-semibold text-gray-700">
                          Selected Files ({mediaFiles.length})
                        </h4>
                        <button
                          type="button"
                          onClick={clearAllMediaFiles}
                          className="text-sm text-red-600 hover:text-red-700 font-medium"
                        >
                          Clear All
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {mediaFiles.map((item, index) => (
                          <div key={index} className="relative border-2 border-green-500 rounded-lg p-2 bg-gray-50 group">
                            <button
                              type="button"
                              onClick={() => removeMediaFile(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg z-10 opacity-0 group-hover:opacity-100"
                              title="Remove this file"
                            >
                              <X size={14} />
                            </button>
                            
                            {item.type === 'video' ? (
                              <div className="relative">
                                <video 
                                  src={item.preview} 
                                  className="w-full h-32 object-cover rounded bg-black"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded">
                                  <Video size={32} className="text-white" />
                                </div>
                              </div>
                            ) : (
                              <img 
                                src={item.preview} 
                                alt={`Preview ${index + 1}`} 
                                className="w-full h-32 object-cover rounded" 
                              />
                            )}
                            
                            {item.file && (
                              <div className="mt-2 text-center">
                                <p className="text-xs text-gray-700 font-medium truncate">{item.file.name}</p>
                                <p className="text-xs text-gray-500">{(item.file.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            )}
                            
                            <div className="mt-1 text-center">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                item.type === 'video' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {item.type === 'video' ? (
                                  <><Video size={10} /> Video</>
                                ) : (
                                  <><ImageIcon size={10} /> Image</>
                                )}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-blue-900">
                          Uploading file {currentUploadIndex} of {mediaFiles.length}...
                        </span>
                        <span className="font-bold text-blue-900">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {modalType === 'create' && mediaFiles.length > 1 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs text-yellow-800">
                        <strong>Note:</strong> Each image will be created as a separate gallery item with the same title and description. 
                        You can edit them individually after creation.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center gap-6 border-t pt-6">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={e => setFormData({ ...formData, published: e.target.checked })}
                    className="mr-2 rounded w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    <span className="inline-flex items-center gap-1">
                      <Eye size={16} />
                      Published
                    </span>
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                    className="mr-2 rounded w-5 h-5 text-yellow-500 focus:ring-2 focus:ring-yellow-400"
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    <span className="inline-flex items-center gap-1">
                      <Star size={16} />
                      Featured
                    </span>
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="border-t pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium transition-colors shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      {uploadProgress > 0 ? `Uploading ${uploadProgress}%` : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Upload size={18} />
                      {modalType === 'create' ? 'Add Moment' : 'Update Moment'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryAdmin;
                 