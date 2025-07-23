// client/src/components/cards/MomentCard.jsx
import { useState } from 'react';
import { Heart, Share2, MapPin, Calendar, Users, Play } from 'lucide-react';

const MomentCard = ({ moment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(moment.likes || 0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: moment.title,
          text: moment.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Media Container */}
      <div className="relative overflow-hidden aspect-square">
        {moment.type === 'video' ? (
          <div className="relative">
            <img
              src={moment.thumbnail || moment.media}
              alt={moment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <Play className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>
        ) : (
          <img
            src={moment.media}
            alt={moment.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        
        {/* Overlay Info */}
        <div className="absolute top-4 left-4">
          <span className="bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs font-medium">
            {moment.category || 'Campaign'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
          {moment.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {moment.description}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            {moment.date && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(moment.date)}</span>
              </div>
            )}
            
            {moment.location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{moment.location}</span>
              </div>
            )}
          </div>
          
          {moment.attendees && (
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>{moment.attendees}</span>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 text-sm transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>

          {moment.tags && moment.tags.length > 0 && (
            <div className="flex items-center space-x-1">
              {moment.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
              {moment.tags.length > 2 && (
                <span className="text-gray-400 text-xs">+{moment.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MomentCard;