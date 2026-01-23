// client/src/components/cards/MomentCard.jsx
import { useState } from 'react';
import { Heart, Share2, MapPin, Calendar, Users, Play, Link2, Check } from 'lucide-react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const MomentCard = ({ moment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(moment.likes || 0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const momentUrl = `${window.location.origin}/moments/${moment.id || moment._id}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(momentUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.log('Error copying link:', err);
    }
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(momentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareTwitter = () => {
    const text = `${moment.title} - ${moment.description}`;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(momentUrl)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareInstagram = () => {
    // Instagram doesn't support direct web sharing, so we'll copy the link
    handleCopyLink();
    alert('Link copied! Open Instagram and paste it in your post or story.');
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
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

          <div className="relative">
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>

            {/* Share Menu Dropdown */}
            {showShareMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 z-10 min-w-[200px]">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Link copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-4 w-4" />
                      <span>Copy link</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleShareFacebook}
                  className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                >
                  <Facebook className="h-4 w-4 text-blue-600" />
                  <span>Share on Facebook</span>
                </button>
                
                <button
                  onClick={handleShareTwitter}
                  className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                >
                  <Twitter className="h-4 w-4 text-sky-500" />
                  <span>Share on X (Twitter)</span>
                </button>
                
                <button
                  onClick={handleShareInstagram}
                  className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-100 rounded text-sm text-gray-700 transition-colors"
                >
                  <Instagram className="h-4 w-4 text-pink-600" />
                  <span>Share on Instagram</span>
                </button>
              </div>
            )}
          </div>

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

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default MomentCard;