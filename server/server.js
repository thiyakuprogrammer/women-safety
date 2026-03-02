const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { promisePool, testConnection } = require('./config/database');
const initializeDatabase = require('./config/initDatabase');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database on startup
(async () => {
  try {
    await initializeDatabase();
    await testConnection();
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
  }
})();

// Mock safe routes (can be moved to database later)
const safeRoutes = [
  {
    id: 'safest',
    name: 'Safest Route',
    distance: '3.2 km',
    duration: '12 min',
    safetyScore: 95,
    features: ['Well-lit streets', 'CCTV coverage', 'Police patrol area']
  },
  {
    id: 'fastest',
    name: 'Fastest Route',
    distance: '2.5 km',
    duration: '8 min',
    safetyScore: 75,
    features: ['Main roads', 'Moderate lighting', 'Public transport nearby']
  },
  {
    id: 'alternative',
    name: 'Alternative Route',
    distance: '3.8 km',
    duration: '15 min',
    safetyScore: 90,
    features: ['Residential area', 'Well-populated', 'Emergency services nearby']
  }
];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get emergency services from database
app.get('/api/emergency-services', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT id, name, type, phone, latitude, longitude, distance, available FROM emergency_services WHERE available = true'
    );
    
    // Format data to match frontend expectations
    const services = rows.map(row => ({
      id: row.id,
      name: row.name,
      type: row.type,
      phone: row.phone,
      location: { lat: parseFloat(row.latitude), lng: parseFloat(row.longitude) },
      distance: row.distance,
      available: row.available
    }));
    
    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    console.error('Error fetching emergency services:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch emergency services'
    });
  }
});

// Get helpline numbers from database
app.get('/api/helplines', async (req, res) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT id, name, number, category, description FROM helplines ORDER BY category'
    );
    
    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    console.error('Error fetching helplines:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch helplines'
    });
  }
});

// Get safe routes
app.get('/api/safe-routes', (req, res) => {
  res.json({
    success: true,
    data: safeRoutes
  });
});

// Send SOS alert and store in database
app.post('/api/sos-alert', async (req, res) => {
  const { location, message } = req.body;
  const alertId = `SOS-${Date.now()}`;
  
  try {
    // Store alert in database
    await promisePool.query(
      'INSERT INTO sos_alerts (alert_id, latitude, longitude, message, status) VALUES (?, ?, ?, ?, ?)',
      [alertId, location?.latitude || null, location?.longitude || null, message || 'Emergency SOS', 'active']
    );
    
    console.log('SOS Alert stored:', { alertId, location, message });
    
    // In a real application, this would also:
    // 1. Send SMS to emergency contacts
    // 2. Notify authorities
    // 3. Trigger location tracking
    
    res.json({
      success: true,
      message: 'SOS alert sent successfully',
      alertId: alertId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error storing SOS alert:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send SOS alert'
    });
  }
});

// Share location and store in database
app.post('/api/share-location', async (req, res) => {
  const { location, contacts } = req.body;
  const shareId = `LOC-${Date.now()}`;
  
  try {
    // Store location share in database
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    await promisePool.query(
      'INSERT INTO location_shares (share_id, latitude, longitude, contacts, active, expires_at) VALUES (?, ?, ?, ?, ?, ?)',
      [shareId, location?.latitude || null, location?.longitude || null, JSON.stringify(contacts || []), true, expiresAt]
    );
    
    console.log('Location shared:', { shareId, location, contacts });
    
    // In a real application, this would also:
    // 1. Send notifications to contacts
    // 2. Enable real-time tracking
    
    res.json({
      success: true,
      message: 'Location shared successfully',
      shareId: shareId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error sharing location:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to share location'
    });
  }
});

// Report unsafe area and store in database
app.post('/api/report-unsafe', async (req, res) => {
  const { location, description, riskLevel } = req.body;
  const reportId = `REP-${Date.now()}`;
  
  try {
    // Store report in database
    await promisePool.query(
      'INSERT INTO unsafe_reports (report_id, latitude, longitude, description, risk_level, status) VALUES (?, ?, ?, ?, ?, ?)',
      [reportId, location?.latitude || null, location?.longitude || null, description || '', riskLevel || 'medium', 'pending']
    );
    
    console.log('Unsafe area reported:', { reportId, location, description, riskLevel });
    
    res.json({
      success: true,
      message: 'Report submitted successfully',
      reportId: reportId,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error reporting unsafe area:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit report'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
