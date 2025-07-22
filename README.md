

# 🇰🇪 Campaign Website - MERN Stack

**"Reset. Restore. Rebuild."** - A comprehensive web platform for the 2027 Presidential Campaign in Kenya.

## 🌍 Technology Stack
- **MongoDB** - Database for volunteers, press releases, updates, media
- **Express.js** - Backend API server
- **React.js** - Frontend user interface
- **Node.js** - Runtime environment

## 📁 Complete Project Structure

```
2027-campaign/
│
├── client/                          # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── images/
│   │       ├── logo.png
│   │       ├── hero-bg.jpg
│   │       └── campaign-photos/
│   │
│   └── src/
│       ├── assets/                  # Static assets
│       │   ├── images/
│       │   ├── videos/
│       │   └── documents/
│       │
│       ├── components/              # Reusable components
│       │   ├── common/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── Loader.jsx
│       │   │   ├── Modal.jsx
│       │   │   └── SEO.jsx
│       │   │
│       │   ├── cards/
│       │   │   ├── PressCard.jsx
│       │   │   ├── MomentCard.jsx
│       │   │   ├── TestimonialCard.jsx
│       │   │   └── EventCard.jsx
│       │   │
│       │   ├── forms/
│       │   │   ├── VolunteerForm.jsx
│       │   │   ├── ContactForm.jsx
│       │   │   └── NewsletterSignup.jsx
│       │   │
│       │   └── media/
│       │       ├── YouTubeEmbed.jsx
│       │       ├── ImageGallery.jsx
│       │       └── VideoPlayer.jsx
│       │
│       ├── pages/                   # Main pages
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Press.jsx
│       │   ├── Moments.jsx
│       │   ├── Join.jsx
│       │   ├── Donate.jsx
│       │   ├── Contact.jsx
│       │   ├── Events.jsx
│       │   ├── Policies.jsx
│       │   └── NotFound.jsx
│       │
│       ├── services/                # API calls
│       │   ├── api.js
│       │   ├── volunteerService.js
│       │   ├── pressService.js
│       │   ├── mediaService.js
│       │   └── contactService.js
│       │
│       ├── utils/                   # Helper functions
│       │   ├── formatters.js
│       │   ├── validators.js
│       │   ├── constants.js
│       │   └── locationData.js
│       │
│       ├── hooks/                   # Custom React hooks
│       │   ├── useApi.js
│       │   ├── useForm.js
│       │   └── useLocation.js
│       │
│       ├── context/                 # React Context
│       │   ├── AppContext.jsx
│       │   └── LocationContext.jsx
│       │
│       ├── styles/                  # CSS/SCSS files
│       │   ├── globals.css
│       │   ├── components.css
│       │   └── variables.css
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/                          # Node.js + Express Backend
│   ├── config/
│   │   ├── database.js              # MongoDB connection
│   │   ├── cors.js                  # CORS configuration
│   │   └── cloudinary.js            # Image upload config
│   │
│   ├── controllers/
│   │   ├── volunteerController.js
│   │   ├── pressController.js
│   │   ├── mediaController.js
│   │   ├── contactController.js
│   │   └── eventController.js
│   │
│   ├── models/
│   │   ├── Volunteer.js
│   │   ├── Press.js
│   │   ├── Media.js
│   │   ├── Contact.js
│   │   ├── Event.js
│   │   └── Newsletter.js
│   │
│   ├── routes/
│   │   ├── volunteers.js
│   │   ├── press.js
│   │   ├── media.js
│   │   ├── contact.js
│   │   └── events.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   ├── validation.js
│   │   ├── rateLimiter.js
│   │   └── auth.js
│   │
│   ├── utils/
│   │   ├── emailService.js
│   │   ├── fileUpload.js
│   │   └── helpers.js
│   │
│   └── server.js                    # Main server file
│
├── admin/                           # Admin Panel (Optional)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
├── .env                             # Environment variables
├── .env.example                     # Environment template
├── .gitignore
├── package.json                     # Root package.json with scripts
├── README.md
└── LICENSE

```

## 🚀 Key Features Implementation

### Frontend Pages Structure

#### 1. **Home.jsx** - Landing Page
- Hero section with "Reset. Restore. Rebuild." slogan
- Latest campaign videos and speeches
- Key policy highlights
- Call-to-action buttons (Join, Donate)
- Latest news ticker

#### 2. **About.jsx** - Candidate Profile
- David Maraga biography
- Professional background and achievements
- Vision and mission statements
- Testimonials and endorsements
- Interactive timeline

#### 3. **Press.jsx** - Media Center
- Latest official statements
- Press releases with date/category filters
- Downloadable documents
- Media contacts
- Search functionality

#### 4. **Moments.jsx** - Campaign Gallery
- Kenya Ideas Festival photos
- Campaign event galleries
- Video highlights
- Social media integration
- Interactive photo viewer

#### 5. **Join.jsx** - Volunteer Registration
- Dynamic county → constituency → ward selectors
- Skills and availability forms
- Volunteer opportunities listing
- Integration with location services

#### 6. **Contact.jsx** - Get in Touch
- Campaign headquarters information
- Regional offices
- Contact forms
- Interactive map
- Social media links

### Backend API Structure

#### Models (Mongoose Schemas)
- **Volunteer**: Personal info, location, skills, availability
- **Press**: Title, content, category, date, attachments
- **Media**: Photos, videos, captions, events
- **Contact**: Inquiries, feedback, support requests
- **Event**: Campaign events, locations, dates

#### API Endpoints
```
GET  /api/volunteers      - Get volunteer statistics
POST /api/volunteers      - Register new volunteer
GET  /api/press          - Get press releases
POST /api/press          - Create press release (admin)
GET  /api/media          - Get media gallery
POST /api/media          - Upload media (admin)
GET  /api/locations      - Get Kenya location data
POST /api/contact        - Submit contact form
```

## 🛠️ Setup Instructions

### 1. Initialize Project
```bash
mkdir 2027-campaign
cd 2027-campaign
npm init -y
```

### 2. Frontend Setup (React + Vite)
```bash
cd client
npm create vite@latest . -- --template react
npm install axios react-router-dom
```

### 3. Backend Setup (Node.js + Express)
```bash
cd server
npm init -y
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon
```

### 4. Environment Variables (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/campaign2027

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_jwt_secret_here

# Email Service
EMAIL_SERVICE_API_KEY=your_email_key
EMAIL_FROM=info@campaign2027.ke

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📱 Responsive Design Features

### Mobile-First Components
- Responsive navigation with hamburger menu
- Touch-friendly volunteer forms
- Optimized image galleries for mobile
- Progressive Web App (PWA) capabilities

### Kenya-Specific Features
- County/Constituency/Ward location selectors
- Swahili/English language toggle
- Kenya timezone handling
- Local phone number validation
- M-Pesa integration placeholder

## 🔒 Security Considerations
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Environment variable protection
- Data encryption for sensitive information

## 📊 Analytics Integration
- Google Analytics setup
- Campaign engagement tracking
- Volunteer registration metrics
- Geographic distribution analysis

## 🚀 Deployment Options
- **Frontend**: Vercel, Netlify, or AWS S3
- **Backend**: Heroku, Railway, or AWS EC2
- **Database**: MongoDB Atlas
- **CDN**: Cloudinary for media assets

## 📧 Email Integration
- Welcome emails for new volunteers
- Press release notifications
- Event reminders
- Newsletter subscriptions

This structure provides a solid foundation for building a comprehensive presidential campaign website that can handle volunteer management, media distribution, and public engagement effectively.
