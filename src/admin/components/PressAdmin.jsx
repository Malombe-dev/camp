import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Star,
  Upload,
  X,
  Search,
  Filter,
  BarChart3,
  Eye,
  FileImage,
  Video,
  Image
} from 'lucide-react';
import AdminNavbar from './AdminNavbar';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'https://server-mern-zc6l.onrender.com';


const PressAdmin = () => {
  /* ---------- State ---------- */
  const [pressReleases, setPressReleases] = useState([]);
  const [filteredReleases, setFilteredReleases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedPress, setSelectedPress] = useState(null);
  const [stats, setStats] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  /* form fields matching backend schema */
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    type: 'PRESS RELEASE',
    tags: '',
    published: false,
    publishDate: '',
    authorName: '',
    authorTitle: '',
    authorEmail: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    featured: false,
    featuredImage: null,
    attachments: []
  });

  /* single file state */
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'

  /* constants */
  const pressTypes = [
    { value: 'PRESS RELEASE', label: 'Press Release' },
    { value: 'VIDEO', label: 'Video' },
    { value: 'ANNOUNCEMENT', label: 'Announcement' }
  ];
  const categories = [
    'statement',
    'policy',
    'campaign-update',
    'response',
    'announcement',
    'speech',
    'interview',
    'endorsement',
    'rally',
    'debate'
  ];
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'draft', label: 'Draft' },
    { value: 'published', label: 'Published' },
    { value: 'featured', label: 'Featured' }
  ];

  /* helpers */
  const getAuthToken = () => localStorage?.getItem('token') || 'mock-admin-token';
  const formatDate = d =>
    new Date(d).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  // Helper function to determine if URL is a video
  const isVideoUrl = (url) => {
    if (!url) return false;
    const videoExtensions = ['.mp4', '.mov', '.avi', '.webm', '.mkv', '.wmv'];
    const lowerUrl = url.toLowerCase();
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           lowerUrl.includes('video') || 
           url.includes('video/');
  };

  // Helper function to determine media type from file
  const getMediaType = (file) => {
    if (!file) return null;
    return file.type.startsWith('video/') ? 'video' : 'image';
  };

  /* ---------- Fetch ---------- */
  const fetchPress = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/press`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const { data } = await res.json();
      setPressReleases(data);
      setFilteredReleases(data);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/press/stats/analytics`, {
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const { data } = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    fetchPress();
    fetchStats();
  }, []);

  /* ---------- File handling ---------- */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (10MB limit)
      if (file.size > 500 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/mov', 'video/avi', 'video/webm', 'video/quicktime'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image (JPEG, PNG, GIF, WebP) or video (MP4, MOV, AVI, WebM) file');
        return;
      }

      setMediaFile(file);
      setError(null);
      
      // Determine media type
      const type = getMediaType(file);
      setMediaType(type);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setMediaPreview(previewUrl);
      
      console.log('✅ File set in state:', {
        name: file.name,
        type: file.type,
        size: file.size,
        mediaType: type
      });
    } else {
      clearMediaFile();
    }
  };

  const clearMediaFile = () => {
    // Clean up existing preview URL to prevent memory leaks
    if (mediaPreview && mediaPreview.startsWith('blob:')) {
      URL.revokeObjectURL(mediaPreview);
    }
    
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType(null);
    
    // Clear existing media when removing file
    setFormData(prev => ({ ...prev, featuredImage: null, attachments: [] }));
    
    // Clear the input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  /* ---------- Validation ---------- */
  const validate = () => {
    const errs = [];
    
    if (!formData.title || formData.title.trim().length < 10 || formData.title.trim().length > 200) {
      errs.push('Title must be between 10 and 200 characters');
    }
    
    if (!formData.excerpt || formData.excerpt.trim().length < 50 || formData.excerpt.trim().length > 500) {
      errs.push('Excerpt must be between 50 and 500 characters');
    }
    
    if (!formData.content || formData.content.trim().length < 100) {
      errs.push('Content must be at least 100 characters long');
    }
    
    if (!formData.category || !categories.includes(formData.category)) {
      errs.push('Please select a valid category');
    }
    
    if (!formData.authorName || formData.authorName.trim().length < 2 || formData.authorName.trim().length > 100) {
      errs.push('Author name must be between 2 and 100 characters');
    }
    
    if (!formData.authorTitle || formData.authorTitle.trim().length < 2 || formData.authorTitle.trim().length > 100) {
      errs.push('Author title must be between 2 and 100 characters');
    }

    if (formData.authorEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.authorEmail)) {
      errs.push('Please provide a valid author email');
    }
    
    if (formData.seoTitle && formData.seoTitle.trim().length > 60) {
      errs.push('SEO title cannot exceed 60 characters');
    }
  
    return errs;
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async e => {
    e.preventDefault();
    
    console.log('Submit - Media file details:', {
      name: mediaFile?.name,
      type: mediaFile?.type,
      size: mediaFile?.size,
      mediaType: mediaType
    });

    const errs = validate();
    if (errs.length) return setError(errs.join('. '));

    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();

      // Add all form fields
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('excerpt', formData.excerpt.trim());
      formDataToSend.append('content', formData.content.trim());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('published', formData.published.toString());
      formDataToSend.append('featured', formData.featured.toString());

      // Handle tags
      if (formData.tags) {
        const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        formDataToSend.append('tags', JSON.stringify(tagsArray));
      }

      if (formData.publishDate) {
        formDataToSend.append('publishDate', formData.publishDate);
      }

      // Add author fields
      formDataToSend.append('author.name', formData.authorName.trim());
      formDataToSend.append('author.title', formData.authorTitle.trim());
      if (formData.authorEmail) {
        formDataToSend.append('author.email', formData.authorEmail.trim());
      }

      // Add SEO fields
      if (formData.seoTitle || formData.seoDescription || formData.seoKeywords) {
        const seo = {};
        if (formData.seoTitle) seo.title = formData.seoTitle.trim();
        if (formData.seoDescription) seo.description = formData.seoDescription.trim();
        if (formData.seoKeywords) {
          seo.keywords = formData.seoKeywords.split(',').map(k => k.trim()).filter(k => k);
        }
        if (formData.seoTitle) {
          formDataToSend.append('seoTitle', formData.seoTitle.trim());
        }
        if (formData.seoDescription) {
          formDataToSend.append('seoDescription', formData.seoDescription.trim());
        }
        if (formData.seoKeywords) {
          formDataToSend.append('seoKeywords', formData.seoKeywords.trim());
        }
        
      }

      // Add media file - this is the key part for video support
      if (mediaFile) {
        formDataToSend.append('featuredImage', mediaFile);
        
        // Add media type information for backend processing
        formDataToSend.append('mediaType', mediaType);
        
        console.log('Adding media file:', {
          name: mediaFile.name,
          type: mediaFile.type,
          size: mediaFile.size,
          mediaType: mediaType
        });
      }

      // Debug FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formDataToSend.entries()) {
        if (value instanceof File) {
          console.log(key, `File: ${value.name} (${value.type})`);
        } else {
          console.log(key, value);
        }
      }

      const url = modalType === 'create' 
        ? `${API_BASE}/api/press` 
        : `${API_BASE}/api/press/${selectedPress._id}`;
      const method = modalType === 'create' ? 'POST' : 'PUT';

      const controller = new AbortController();
      setTimeout(() => controller.abort(), 5 * 60 * 1000);

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${getAuthToken()}`
          // Don't set Content-Type - let browser set it with boundary for FormData
        },
        body: formDataToSend,
        signal: controller.signal
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.message || `${res.status}: ${res.statusText}`);
      }

      const { data } = await res.json();
      
      if (modalType === 'create') {
        setPressReleases(prev => [data, ...prev]);
      } else {
        setPressReleases(prev => prev.map(p => (p._id === data._id ? data : p)));
      }
      
      setShowModal(false);
      resetForm();
      await fetchStats();
      
    } catch (err) {
      console.error('Submit error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Delete ---------- */
  const handleDelete = async id => {
    if (!window.confirm('Delete this press release?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/press/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      if (res.ok) {
        setPressReleases(prev => prev.filter(p => p._id !== id));
        await fetchStats();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  /* ---------- Toggle featured ---------- */
  const toggleFeatured = async id => {
    try {
      const res = await fetch(`${API_BASE}/api/press/${id}/featured`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${getAuthToken()}` }
      });
      const { data } = await res.json();
      setPressReleases(prev =>
        prev.map(p => (p._id === id ? { ...p, featured: data.featured } : p))
      );
    } catch (error) {
      console.error('Toggle featured error:', error);
    }
  };

  /* ---------- Reset ---------- */
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      category: '',
      type: 'PRESS RELEASE',
      tags: '',
      published: false,
      publishDate: '',
      authorName: '',
      authorTitle: '',
      authorEmail: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      featured: false,
      featuredImage: null,
      attachments: []
    });
    
    clearMediaFile();
    setSelectedPress(null);
    setError(null);
  };

  /* ---------- Modal helpers ---------- */
  const openModal = (type, press = null) => {
    setModalType(type);
    setSelectedPress(press);
    setError(null);
    
    if (type === 'edit' && press) {
      setFormData({
        title: press.title || '',
        content: press.content || '',
        excerpt: press.excerpt || press.summary || '',
        category: press.category || '',
        type: press.type || 'PRESS RELEASE',
        tags: Array.isArray(press.tags) ? press.tags.join(', ') : (press.tags || ''),
        published: press.published || false,
        publishDate: press.publishDate ? press.publishDate.split('T')[0] : '',
        authorName: press.author?.name || '',
        authorTitle: press.author?.title || '',
        authorEmail: press.author?.email || '',
        seoTitle: press.seo?.title || '',
        seoDescription: press.seo?.description || '',
        seoKeywords: Array.isArray(press.seo?.keywords) ? press.seo.keywords.join(', ') : (press.seo?.keywords || ''),
        featured: press.featured || false,
      });
      
      // Load existing media
      const existingMediaUrl = press.featuredImage?.url || press.mediaUrl;
      if (existingMediaUrl) {
        setMediaPreview(existingMediaUrl);
        setMediaType(isVideoUrl(existingMediaUrl) ? 'video' : 'image');
        // Don't set mediaFile for existing media - only for new uploads
      }
    } else {
      resetForm();
    }
    
    setShowModal(true);
  };

  /* ---------- Filtering ---------- */
  useEffect(() => {
    let filtered = pressReleases;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(term) ||
          p.content.toLowerCase().includes(term) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(term))
      );
    }
    if (filterType !== 'all') filtered = filtered.filter(p => p.type === filterType);
    if (filterStatus !== 'all') {
      if (filterStatus === 'featured') {
        filtered = filtered.filter(p => p.featured);
      } else if (filterStatus === 'published') {
        filtered = filtered.filter(p => p.published);
      } else if (filterStatus === 'draft') {
        filtered = filtered.filter(p => !p.published);
      }
    }
    setFilteredReleases(filtered);
  }, [searchTerm, filterType, filterStatus, pressReleases]);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (mediaPreview && mediaPreview.startsWith('blob:')) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, []);

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar/>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Press Release Admin</h1>
              <p className="text-gray-600">Manage press releases, announcements, and media content</p>
            </div>
            <button
              onClick={() => openModal('create')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Plus size={20} /> New Press Release
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: BarChart3, label: 'Total', val: stats.overview?.total || 0, color: 'blue' },
              { icon: Eye, label: 'Published', val: stats.overview?.published || 0, color: 'green' },
              { icon: Edit, label: 'Drafts', val: stats.overview?.drafts || 0, color: 'yellow' },
              { icon: Star, label: 'Featured', val: stats.overview?.featured || 0, color: 'red' }
            ].map(({ icon: Icon, label, val, color }) => (
              <div key={label} className="bg-white rounded-lg shadow p-6 flex items-center">
                <div className={`p-2 bg-${color}-100 rounded-lg`}>
                  <Icon className={`text-${color}-600`} size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-2xl font-bold">{val}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search press releases..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Types</option>
            {pressTypes.map(t => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.map(s => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Media</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Views</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReleases.map(p => {
                const hasMedia = p.featuredImage?.url || p.mediaUrl || (p.attachments && p.attachments.length > 0);
                const mediaUrl = p.featuredImage?.url || p.mediaUrl;
                const isVideo = isVideoUrl(mediaUrl);
                
                return (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium">{p.title}</div>
                          <div className="text-sm text-gray-500">{p.category}</div>
                        </div>
                        {p.featured && <Star className="ml-2 text-yellow-500 fill-current" size={16} />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {p.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        p.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {p.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {hasMedia ? (
                        <div className="flex items-center">
                          {isVideo ? (
                            <Video size={16} className="text-purple-600" />
                          ) : (
                            <Image size={16} className="text-green-600" />
                          )}
                          <span className={`ml-1 text-xs ${isVideo ? 'text-purple-600' : 'text-green-600'}`}>
                            {isVideo ? 'Video' : 'Image'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No media</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{formatDate(p.publishDate || p.createdAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{p.views || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleFeatured(p._id)}
                          className="p-2 rounded-lg hover:bg-yellow-50"
                          title="Toggle featured"
                        >
                          <Star size={16} className={p.featured ? 'text-yellow-500 fill-current' : 'text-gray-400'} />
                        </button>
                        <button
                          onClick={() => openModal('edit', p)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">{modalType === 'create' ? 'Create' : 'Edit'} Press Release</h2>
              <button onClick={() => setShowModal(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title * (10–200)
                    <span className={`ml-2 text-xs ${
                      formData.title.length < 10 || formData.title.length > 200 ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {formData.title.length}/200 characters
                    </span>
                  </label>
                  <input
                    type="text"
                    required
                    minLength={10}
                    maxLength={200}
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 ${
                      formData.title.length < 10 || formData.title.length > 200 ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter press release title..."
                  />
                  {formData.title.length < 10 && formData.title.length > 0 && (
                    <p className="text-xs text-red-500 mt-1">Need at least {10 - formData.title.length} more characters</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Type *</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    {pressTypes.map(t => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    required
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Publish Date</label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={e => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Author Name * (2–100)</label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={formData.authorName}
                    onChange={e => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Author Title * (2–100)</label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={formData.authorTitle}
                    onChange={e => setFormData({ ...formData, authorTitle: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Author Email (optional)</label>
                <input
                  type="email"
                  value={formData.authorEmail}
                  onChange={e => setFormData({ ...formData, authorEmail: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                  placeholder="author@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Excerpt * (50–500) 
                  <span className={`ml-2 text-xs ${
                    formData.excerpt.length < 50 ? 'text-red-500' : 
                    formData.excerpt.length > 500 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {formData.excerpt.length}/500 characters
                  </span>
                </label>
                <textarea
                  required
                  rows={3}
                  minLength={50}
                  maxLength={500}
                  value={formData.excerpt}
                  onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 ${
                    formData.excerpt.length < 50 || formData.excerpt.length > 500 ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Write a brief summary of the press release..."
                />
                {formData.excerpt.length < 50 && (
                  <p className="text-xs text-red-500 mt-1">Need at least {50 - formData.excerpt.length} more characters</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Content * (≥100)
                  <span className={`ml-2 text-xs ${
                    formData.content.length < 100 ? 'text-red-500' : 'text-green-500'
                  }`}>
                    {formData.content.length} characters
                  </span>
                </label>
                <textarea
                  required
                  rows={8}
                  minLength={100}
                  value={formData.content}
                  onChange={e => setFormData({ ...formData, content: e.target.value })}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 ${
                    formData.content.length < 100 ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Write the full content of the press release..."
                />
                {formData.content.length < 100 && (
                  <p className="text-xs text-red-500 mt-1">Need at least {100 - formData.content.length} more characters</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={e => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="comma, separated, tags"
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Media Upload Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Media Upload</h3>
                <div>
                  <label className="block text-sm font-medium mb-2">Image or Video</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp,video/mp4,video/mov,video/avi,video/webm"
                        onChange={handleFileChange}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        Max 10MB
                      </div>
                    </div>
                    
                    {/* Enhanced Preview Section */}
                    {mediaPreview && (
                      <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                              {mediaFile ? 'New File Preview:' : 'Current Media:'}
                            </span>
                            {mediaType && (
                              <div className="flex items-center gap-1">
                                {mediaType === 'video' ? (
                                  <Video size={16} className="text-purple-600" />
                                ) : (
                                  <Image size={16} className="text-green-600" />
                                )}
                                <span className={`text-xs font-medium ${
                                  mediaType === 'video' ? 'text-purple-600' : 'text-green-600'
                                }`}>
                                  {mediaType === 'video' ? 'Video' : 'Image'}
                                </span>
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={clearMediaFile}
                            className="text-red-500 hover:text-red-700"
                            title="Remove media"
                          >
                            <X size={20} />
                          </button>
                        </div>
                        
                        {/* Render based on determined media type */}
                        {mediaType === 'video' ? (
                          <video
                            src={mediaPreview}
                            controls
                            className="max-w-full h-48 rounded-lg bg-black"
                            onError={(e) => {
                              console.error('Video preview error:', e);
                              setError('Error loading video preview');
                            }}
                          >
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={mediaPreview}
                            alt="Media preview"
                            className="max-w-full h-48 object-cover rounded-lg"
                            onError={(e) => {
                              console.error('Image preview error:', e);
                              setError('Error loading image preview');
                            }}
                          />
                        )}
                        
                        {/* File details */}
                        {mediaFile && (
                          <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                            <p><strong>File:</strong> {mediaFile.name}</p>
                            <p><strong>Size:</strong> {(mediaFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p><strong>Type:</strong> {mediaFile.type}</p>
                            <p><strong>Detected as:</strong> {mediaType}</p>
                          </div>
                        )}
                        
                        {!mediaFile && mediaPreview && (
                          <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                            <p><strong>Current URL:</strong> {mediaPreview}</p>
                            <p><strong>Type:</strong> {mediaType}</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-600 bg-blue-50 p-3 rounded">
                      <p><strong>Supported formats:</strong></p>
                      <p><strong>Images:</strong> JPEG, PNG, GIF, WebP</p>
                      <p><strong>Videos:</strong> MP4, MOV, AVI, WebM</p>
                      <p className="mt-1 text-blue-700">
                        <strong>Note:</strong> Videos will be processed and may take longer to upload.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Title</label>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                      placeholder="Leave empty to use main title"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Description</label>
                    <textarea
                      rows={2}
                      value={formData.seoDescription}
                      onChange={e => setFormData({ ...formData, seoDescription: e.target.value })}
                      placeholder="Leave empty to use excerpt"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">SEO Keywords</label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={e => setFormData({ ...formData, seoKeywords: e.target.value })}
                      placeholder="comma, separated, keywords"
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={e => setFormData({ ...formData, published: e.target.checked })}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm font-medium">Published</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                      className="mr-2 rounded"
                    />
                    <span className="text-sm font-medium">Featured</span>
                  </label>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    'Save'
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

export default PressAdmin;