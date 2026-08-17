// client/src/components/forms/VolunteerForm.jsx
import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, Clock, Send, Check } from 'lucide-react';
import { locationData } from '../../utils/locationData';

const VolunteerForm = ({ onSubmit }) => {
 

  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      nationalId: ''
    },
    location: {
      county: '',
      constituency: '',
      ward: ''
    },
    skills: {
      categories: [],
      other: ''
    },
    availability: {
      days: [],
      timeSlots: [],
      commitment: ''
    },
    motivation: '',
    experience: '',
    languages: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [constituencies, setConstituencies] = useState([]);
  const [wards, setWards] = useState([]);
  const totalSteps = 4;

  const skillCategories = [
    'Digital Marketing', 'Social Media', 'Event Planning', 'Public Speaking',
    'Graphic Design', 'Writing/Journalism', 'Photography', 'Videography',
    'Community Organizing', 'Fundraising', 'Data Entry', 'Translation',
    'Legal Expertise', 'Accounting/Finance', 'Healthcare', 'Education',
    'Technology/IT', 'Transportation', 'Security', 'Logistics'
  ];

  const availabilityDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const timeSlots = [
    'Early Morning (6am-9am)', 'Morning (9am-12pm)', 'Afternoon (12pm-5pm)', 
    'Evening (5pm-8pm)', 'Night (8pm-11pm)', 'Flexible'
  ];

  const languages = [
    'English', 'Kiswahili', 'Kikuyu', 'Luhya', 'Luo', 'Kamba', 'Kisii',
    'Meru', 'Mijikenda', 'Turkana', 'Maasai', 'Kalenjin'
  ];

  // Handle location changes
  useEffect(() => {
    if (formData.location.county) {
      const county = locationData.find(c => c.name === formData.location.county);
      setConstituencies(county?.constituencies || []);
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, constituency: '', ward: '' }
      }));
    }
  }, [formData.location.county]);

  useEffect(() => {
    if (formData.location.constituency) {
      const county = locationData.find(c => c.name === formData.location.county);
      const constituency = county?.constituencies.find(c => c.name === formData.location.constituency);
      setWards(constituency?.wards || []);
      setFormData(prev => ({
        ...prev,
        location: { ...prev.location, ward: '' }
      }));
    }
  }, [formData.location.constituency]);

  // Handlers
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleNestedChange = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleArrayToggle = (path, value) => {
    setFormData(prev => {
      const keys = path.split('.');
      let newData = JSON.parse(JSON.stringify(prev)); // deep clone
      let current = newData;
  
      // Traverse to the parent of the target array
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
  
      const lastKey = keys[keys.length - 1];
      const arr = current[lastKey];
  
      current[lastKey] = arr.includes(value)
        ? arr.filter(item => item !== value)
        : [...arr, value];
  
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Render helpers
  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="inline w-4 h-4 mr-1" />
            First Name
          </label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleNestedChange('personalInfo.firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <User className="inline w-4 h-4 mr-1" />
            Last Name
          </label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleNestedChange('personalInfo.lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Mail className="inline w-4 h-4 mr-1" />
            Email
          </label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleNestedChange('personalInfo.email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Phone className="inline w-4 h-4 mr-1" />
            Phone
          </label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleNestedChange('personalInfo.phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleNestedChange('personalInfo.dateOfBirth', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">National ID</label>
          <input
            type="text"
            value={formData.personalInfo.nationalId}
            onChange={(e) => handleNestedChange('personalInfo.nationalId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Location Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline w-4 h-4 mr-1" />
            County
          </label>
          <select
            value={formData.location.county}
            onChange={(e) => handleNestedChange('location.county', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select county</option>
            {locationData.map(county => (
              <option key={county.name} value={county.name}>{county.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Constituency</label>
          <select
            value={formData.location.constituency}
            onChange={(e) => handleNestedChange('location.constituency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!constituencies.length}
          >
            <option value="">Select constituency</option>
            {constituencies.map(constituency => (
              <option key={constituency.name} value={constituency.name}>{constituency.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
          <select
            value={formData.location.ward}
            onChange={(e) => handleNestedChange('location.ward', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!wards.length}
          >
            <option value="">Select ward</option>
            {wards.map(ward => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Skills & Availability</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Briefcase className="inline w-4 h-4 mr-1" />
          Skill Categories (select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {skillCategories.map(skill => (
            <label className="flex items-center space-x-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={formData.skills.categories.includes(skill)}
              onChange={() => handleArrayToggle('skills.categories', skill)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
            />
            <span className="text-sm">{skill}</span>
          </label>
          ))}
        </div>
        <input
          type="text"
          placeholder="Other skills (comma separated)"
          value={formData.skills.other}
          onChange={(e) => handleNestedChange('skills.other', e.target.value)}
          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {languages.map(lang => (
            <label key={lang} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.languages.includes(lang)}
                onChange={() => handleArrayToggle('languages', lang)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{lang}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="inline w-4 h-4 mr-1" />
          Available Days
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availabilityDays.map(day => (
            <label key={day} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability.days.includes(day)}
                onChange={() => handleArrayToggle('availability.days', day)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slots</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {timeSlots.map(slot => (
            <label key={slot} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.availability.timeSlots.includes(slot)}
                onChange={() => handleArrayToggle('availability.timeSlots', slot)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">{slot}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Commitment Level</label>
        <select
          value={formData.availability.commitment}
          onChange={(e) => handleNestedChange('availability.commitment', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select commitment level</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Weekends only">Weekends only</option>
          <option value="Evenings only">Evenings only</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Experience & Motivation</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Previous Volunteer Experience
        </label>
        <textarea
          value={formData.experience}
          onChange={(e) => handleNestedChange('experience', e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe any relevant volunteer or work experience..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Why do you want to volunteer?
        </label>
        <textarea
          value={formData.motivation}
          onChange={(e) => handleNestedChange('motivation', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your motivation for volunteering..."
          required
        />
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="mb-6">
        {renderCurrentStep()}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Submit Application
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default VolunteerForm;