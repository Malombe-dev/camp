// client/src/components/cards/TestimonialCard.jsx
import { Quote, Star, MapPin, Briefcase } from 'lucide-react';

const TestimonialCard = ({ testimonial, featured = false }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
      featured ? 'ring-2 ring-blue-500 transform scale-105' : ''
    }`}>
      {featured && (
        <div className="bg-blue-500 text-white text-center py-2">
          <span className="text-sm font-medium">FEATURED TESTIMONIAL</span>
        </div>
      )}
      
      <div className="p-6">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="h-8 w-8 text-blue-500 opacity-50" />
        </div>

        {/* Testimonial Content */}
        <blockquote className="text-gray-700 mb-6 leading-relaxed italic">
          "{testimonial.content}"
        </blockquote>

        {/* Rating */}
        {testimonial.rating && (
          <div className="flex items-center mb-4">
            <div className="flex space-x-1 mr-2">
              {renderStars(testimonial.rating)}
            </div>
            <span className="text-sm text-gray-600">
              ({testimonial.rating}/5)
            </span>
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mr-4">
              {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </div>
          )}
          
          <div className="flex-1">
            <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
            
            {testimonial.role && (
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Briefcase className="h-3 w-3 mr-1" />
                <span>{testimonial.role}</span>
              </div>
            )}
            
            {testimonial.location && (
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{testimonial.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Categories/Tags */}
        {testimonial.category && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {testimonial.category}
            </span>
          </div>
        )}

        {/* Verification Badge */}
        {testimonial.verified && (
          <div className="mt-2">
            <span className="inline-flex items-center text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              Verified Supporter
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialCard;