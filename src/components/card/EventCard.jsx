// client/src/components/cards/EventCard.jsx
import { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Share2, BookOpen, ExternalLink } from 'lucide-react';

const EventCard = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-KE', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (time) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-KE', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventStatus = () => {
    const eventDate = new Date(event.date);
    const today = new Date();
    
    if (eventDate < today) return 'past';
    if (eventDate.toDateString() === today.toDateString()) return 'today';
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'past': return 'bg-gray-100 text-gray-600';
      case 'today': return 'bg-red-100 text-red-600';
      case 'upcoming': return 'bg-green-100 text-green-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  const handleRegistration = () => {
    setIsRegistered(!isRegistered);
    // Here you would typically make an API call
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const status = getEventStatus();

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Event Image */}
      {event.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
              {status.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Event Title & Category */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
              {event.category || 'Campaign Event'}
            </span>
            {event.featured && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                FEATURED
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
        </div>

        {/* Event Details */}
        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span>{event.location}</span>
          </div>
          
          {event.capacity && (
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-500" />
              <span>{event.registered || 0}/{event.capacity} registered</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 leading-relaxed">
          {event.description}
        </p>

        {/* Speakers/Guests */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Featured Speakers:</h4>
            <div className="flex flex-wrap gap-2">
              {event.speakers.map((speaker, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {speaker}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          {status !== 'past' ? (
            <button
              onClick={handleRegistration}
              disabled={event.capacity && event.registered >= event.capacity}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isRegistered
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : event.capacity && event.registered >= event.capacity
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRegistered 
                ? 'Registered ✓' 
                : event.capacity && event.registered >= event.capacity
                ? 'Event Full'
                : 'Register Now'
              }
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500">Event Completed</span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Share2 className="h-4 w-4" />
            </button>
            
            {event.externalLink && (
              <a
                href={event.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Registration Progress Bar */}
        {event.capacity && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min((event.registered / event.capacity) * 100, 100)}%`
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {event.registered || 0} of {event.capacity} spots filled
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;