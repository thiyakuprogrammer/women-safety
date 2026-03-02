# 🛡️ SafeGuard - Women Safety & Emergency Response Platform

A comprehensive, fully responsive web application designed to enhance women's safety through emergency response features, safe route navigation, and instant access to helplines.

## ✨ Features

### 🏠 Home Page
- Mission statement and platform overview
- Large, accessible Emergency SOS button
- Safety awareness statistics (mock data)
- Quick access cards to all major features
- Safety tips and guidelines

### 🚨 Emergency SOS System
- One-tap emergency alert activation
- Emergency contact numbers display
- Mock notification system
- Embedded map showing nearest police stations and hospitals
- Real-time alert confirmation

### 🗺️ Safe Route Navigation
- Multiple route options with safety ratings
- Visual map with danger zones highlighted
- High-risk area warnings
- Location sharing simulation
- Travel safety tips
- Route comparison (safest vs fastest)

### 📞 Need Help (Resources & Helplines)
- Comprehensive emergency helpline numbers
- Support resources (domestic violence, mental health, legal aid)
- Safety tips and guidelines
- One-click calling functionality

### ℹ️ About Page
- Platform mission and vision
- Feature overview
- Commitment to privacy and security

## 🎨 Design Features

- **Accessibility First**: High contrast colors, large fonts, clear navigation
- **Mobile Responsive**: Optimized for all screen sizes
- **Clean Modern UI**: Intuitive interface with calm, friendly tone
- **Color Coded Safety**: Visual indicators for safety levels
- **Interactive Elements**: Smooth animations and transitions

## 🛠️ Technology Stack

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- CSS3 (Custom styling)
- Responsive Design

### Backend
- Node.js
- Express.js 4.18.2
- MySQL 2 (Database)
- CORS enabled
- RESTful API

### Database
- MySQL 8.0+
- Connection pooling
- 5 tables for data persistence

## 📁 Project Structure

```
women-safety-platform/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   └── Navbar.css
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── About.js
│   │   │   ├── About.css
│   │   │   ├── NeedHelp.js
│   │   │   ├── NeedHelp.css
│   │   │   ├── SOS.js
│   │   │   ├── SOS.css
│   │   │   ├── SafeRoute.js
│   │   │   └── SafeRoute.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
├── server/                     # Node backend
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL Server (v8.0 or higher)

### Step 1: Clone or Download
```bash
# If using git
git clone <repository-url>
cd women-safety-platform

# Or download and extract the ZIP file
```

### Step 2: Install Dependencies

```bash
# Install all dependencies at once
npm run install-all
```

### Step 3: Database Setup

**Configure MySQL Connection:**

The database configuration is already set in `server/.env`:
```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=12345
DB_NAME=women_safety_db
```

**Initialize Database:**
```bash
cd server
node config/initDatabase.js
```

This will:
- Create the database
- Create all required tables
- Insert sample data

**For detailed database setup, see [DATABASE_SETUP.md](DATABASE_SETUP.md)**

### Step 4: Run the Application

#### Development Mode (Both servers)
```bash
# From root directory
npm run dev
```

#### Or run separately:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# App opens on http://localhost:3000
```

### Step 5: Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## 📦 Production Build

### Build Frontend
```bash
cd client
npm run build
```

This creates an optimized production build in the `client/build` folder.

## 🌐 Deployment

### Deploy to Netlify

1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [Netlify](https://www.netlify.com/)
   - Drag and drop the `client/build` folder
   - Or connect your GitHub repository for automatic deployments

3. **Netlify Configuration:**
   Create `netlify.toml` in the root:
   ```toml
   [build]
     base = "client"
     command = "npm run build"
     publish = "build"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

### Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   cd client
   npm install --save-dev gh-pages
   ```

2. **Add to client/package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/women-safety-platform",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

### Deploy Backend (Optional)

For backend deployment, consider:
- **Heroku**: Easy Node.js deployment
- **Railway**: Modern deployment platform
- **Render**: Free tier available
- **AWS/Azure/GCP**: Cloud platforms

## 🔧 API Endpoints

### Backend API Routes

```
GET  /api/health              - Health check
GET  /api/emergency-services  - Get nearby emergency services (from DB)
GET  /api/helplines           - Get helpline numbers (from DB)
GET  /api/safe-routes         - Get safe route options
POST /api/sos-alert           - Send SOS alert (stores in DB)
POST /api/share-location      - Share location with contacts (stores in DB)
POST /api/report-unsafe       - Report unsafe area (stores in DB)
```

### Database Tables

- `emergency_services` - Nearby emergency service locations
- `helplines` - Emergency helpline numbers
- `sos_alerts` - SOS alert history
- `location_shares` - Location sharing records
- `unsafe_reports` - Reported unsafe areas

## 📱 Features in Detail

### Emergency SOS
- Large, pulsing SOS button for easy access
- Confirmation modal to prevent accidental activation
- Mock alert system showing:
  - Contacts notified
  - Location shared
  - Authorities alerted
  - Recording started

### Safe Route Navigation
- Three route options: Safest, Fastest, Alternative
- Visual map with color-coded routes
- Danger zone markers
- Safety score for each route
- Location sharing with trusted contacts

### Helplines & Resources
- Quick-dial emergency numbers
- Support resources for various situations
- Safety tips and guidelines
- One-click calling functionality

## ♿ Accessibility Features

- High contrast color scheme
- Large, readable fonts (minimum 1rem)
- Keyboard navigation support
- Focus indicators on interactive elements
- ARIA labels for screen readers
- Mobile-first responsive design
- Touch-friendly button sizes

## 🎨 Color Scheme

- **Primary**: #e91e63 (Pink) - Main brand color
- **Emergency**: #ff1744 (Red) - SOS and alerts
- **Success**: #4caf50 (Green) - Safe routes, confirmations
- **Info**: #2196f3 (Blue) - Navigation, information
- **Warning**: #ff9800 (Orange) - Medium risk areas
- **Danger**: #f44336 (Red) - High risk zones

## 🔒 Security & Privacy

- No login system required for immediate access
- Database credentials stored in environment variables
- Connection pooling for better performance
- CORS enabled for development
- Ready for production security enhancements

## 🚧 Future Enhancements

- Real GPS integration
- Actual SMS/notification system
- User authentication (optional)
- Emergency contact management
- Real-time location tracking
- Community reporting system
- Multi-language support
- Offline functionality
- Voice-activated SOS

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions, please open an issue in the repository.

## ⚠️ Important Note

This platform now includes:
- ✅ Real MySQL database integration
- ✅ Data persistence for alerts and reports
- ✅ API endpoints connected to database
- ✅ Sample data pre-loaded

For production use, you should:
- Integrate with real emergency services APIs
- Implement actual SMS/notification systems
- Add proper authentication and data security
- Comply with local emergency service regulations
- Test thoroughly with real users
- Ensure GDPR/privacy compliance
- Use secure database credentials
- Enable SSL for database connections

## 🙏 Acknowledgments

Built with the goal of making the world safer for women everywhere.

---

**Remember: In case of real emergency, always call your local emergency services immediately.**

Emergency Numbers (India):
- National Emergency: 112
- Women Helpline: 1091
- Police: 100
- Ambulance: 102
