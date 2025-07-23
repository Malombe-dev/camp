// client/src/components/cards/PressCard.jsx
import { useState } from 'react';
import { Calendar, Download, Share2, Eye, FileText } from 'lucide-react';

const PressCard = ({ press }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: press.title,
          text: press.excerpt,
          url: window.location.href + '#' + press._id
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href + '#' + press._id);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'official-statement': 'bg-blue-100 text-blue-800',
      'press-release': 'bg-green-100 text-green-800',
      'policy-announcement': 'bg-purple-100 text-purple-800',
      'event-update': 'bg-orange-100 text-orange-800',
      'media-response': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(press.category)}`}>
            {press.category.replace('-', ' ').toUpperCase()}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(press.createdAt)}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
          {press.title}
        </h3>

        <p className="text-gray-600 mb-4 leading-relaxed">
          {isExpanded ? press.content : press.excerpt}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
            </button>
            
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 text-sm"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
          </div>

          {press.attachments && press.attachments.length > 0 && (
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">
                {press.attachments.length} attachment(s)
              </span>
            </div>
          )}
        </div>

        {/* Attachments */}
        {isExpanded && press.attachments && press.attachments.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Attachments:</h4>
            <div className="space-y-2">
              {press.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  download
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <Download className="h-4 w-4" />
                  <span>{attachment.name}</span>
                  <span className="text-gray-500">({attachment.size})</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {press.featured && (
        <div className="bg-yellow-50 px-6 py-2 border-t">
          <span className="text-yellow-800 text-xs font-medium">FEATURED RELEASE</span>
        </div>
      )}
    </div>
  );
};

export default PressCard;