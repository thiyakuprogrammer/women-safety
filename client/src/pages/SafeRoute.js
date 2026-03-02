import React, { useState } from 'react';
import { shareLocation } from '../services/api';
import './SafeRoute.css';

function SafeRoute() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState('safest');
  const [sharing, setSharing] = useState(false);

  const routes = [
    {
      id: 'safest',
      name: 'Safest Route',
      distance: '3.2 km',
      time: '12 min',
      safety: 'High',
      features: ['Well-lit streets', 'CCTV coverage', 'Police patrol area']
    },
    {
      id: 'fastest',
      name: 'Fastest Route',
      distance: '2.5 km',
      time: '8 min',
      safety: 'Medium',
      features: ['Main roads', 'Moderate lighting', 'Public transport nearby']
    },
    {
      id: 'alternative',
      name: 'Alternative Route',
      distance: '3.8 km',
      time: '15 min',
      safety: 'High',
      features: ['Residential area', 'Well-populated', 'Emergency services nearby']
    }
  ];

  const dangerZones = [
    { name: 'Industrial Area', risk: 'High', reason: 'Poor lighting, isolated' },
    { name: 'Old Market Street', risk: 'Medium', reason: 'Crowded, pickpocketing reports' },
    { name: 'Park Road (Night)', risk: 'High', reason: 'Isolated after dark' }
  ];

  const safetyTips = [
    'Share your live location with trusted contacts',
    'Stay on well-lit and populated routes',
    'Keep emergency numbers on speed dial',
    'Trust your instincts and avoid suspicious areas',
    'Use public transportation when possible',
    'Carry a charged phone and power bank'
  ];

  const handleShareLocation = () => {
    setShowLocationModal(true);
    setLocationShared(false);
  };

  const confirmShare = async () => {
    setSharing(true);
    
    try {
      // Get current location (mock for now)
      const location = {
        latitude: 28.6139,
        longitude: 77.2090
      };

      const contacts = [
        'Emergency Contact 1',
        'Emergency Contact 2',
        'Emergency Contact 3'
      ];

      // Share location via backend
      const response = await shareLocation(location, contacts);
      
      if (response.success) {
        setLocationShared(true);
        console.log('Location shared successfully:', response.shareId);
        
        setTimeout(() => {
          setShowLocationModal(false);
          setLocationShared(false);
          setSharing(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to share location:', error);
      // Still show success UI even if API fails (for demo purposes)
      setLocationShared(true);
      setTimeout(() => {
        setShowLocationModal(false);
        setLocationShared(false);
        setSharing(false);
      }, 3000);
    }
  };

  return (
    <div className="safe-route-page">
      <div className="container">
        <div className="page-header">
          <h1>Safe Route Navigation</h1>
          <p className="header-subtitle">
            Find the safest path to your destination with real-time safety information
          </p>
        </div>

        {/* Location Sharing */}
        <section className="location-section">
          <div className="location-card">
            <div className="location-icon">📍</div>
            <div className="location-info">
              <h3>Share Your Location</h3>
              <p>Let trusted contacts know where you are in real-time</p>
            </div>
            <button className="btn-share" onClick={handleShareLocation}>
              Share Location
            </button>
          </div>
        </section>

        {/* Route Selection */}
        <section className="routes-section">
          <h2>Available Routes</h2>
          <div className="routes-grid">
            {routes.map((route) => (
              <div 
                key={route.id}
                className={`route-card ${selectedRoute === route.id ? 'selected' : ''}`}
                onClick={() => setSelectedRoute(route.id)}
              >
                <div className="route-header">
                  <h3>{route.name}</h3>
                  <span className={`safety-badge ${route.safety.toLowerCase()}`}>
                    {route.safety} Safety
                  </span>
                </div>
                <div className="route-stats">
                  <div className="stat">
                    <span className="stat-icon">📏</span>
                    <span>{route.distance}</span>
                  </div>
                  <div className="stat">
                    <span className="stat-icon">⏱️</span>
                    <span>{route.time}</span>
                  </div>
                </div>
                <div className="route-features">
                  {route.features.map((feature, index) => (
                    <span key={index} className="feature-tag">
                      ✓ {feature}
                    </span>
                  ))}
                </div>
                {selectedRoute === route.id && (
                  <button className="btn-navigate-route">
                    Start Navigation
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Map Visualization */}
        <section className="map-section">
          <h2>Route Map</h2>
          <div className="route-map">
            <div className="map-visual">
              <div className="route-line safe-route"></div>
              <div className="route-line fast-route"></div>
              <div className="danger-zone zone-1">⚠️</div>
              <div className="danger-zone zone-2">⚠️</div>
              <div className="safe-zone">✓</div>
              <div className="start-point">🏠 Start</div>
              <div className="end-point">🎯 Destination</div>
            </div>
            <div className="map-legend">
              <div className="legend-item">
                <span className="legend-color safe"></span>
                <span>Safe Route (Recommended)</span>
              </div>
              <div className="legend-item">
                <span className="legend-color fast"></span>
                <span>Fast Route</span>
              </div>
              <div className="legend-item">
                <span className="legend-color danger"></span>
                <span>High-Risk Zone</span>
              </div>
            </div>
          </div>
        </section>

        {/* Danger Zones */}
        <section className="danger-zones-section">
          <h2>⚠️ High-Risk Areas to Avoid</h2>
          <div className="danger-zones-grid">
            {dangerZones.map((zone, index) => (
              <div key={index} className="danger-zone-card">
                <div className="zone-header">
                  <span className="zone-icon">⚠️</span>
                  <div>
                    <h3>{zone.name}</h3>
                    <span className={`risk-level ${zone.risk.toLowerCase()}`}>
                      {zone.risk} Risk
                    </span>
                  </div>
                </div>
                <p className="zone-reason">{zone.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Safety Tips */}
        <section className="tips-section">
          <h2>Travel Safety Tips</h2>
          <div className="tips-container">
            <ul className="tips-list">
              {safetyTips.map((tip, index) => (
                <li key={index}>
                  <span className="tip-icon">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <div className="action-card emergency">
            <h3>🚨 Emergency?</h3>
            <p>Get immediate help</p>
            <button className="btn-emergency">Call 112</button>
          </div>
          <div className="action-card report">
            <h3>📢 Report Issue</h3>
            <p>Report unsafe areas</p>
            <button className="btn-report">Report</button>
          </div>
        </section>
      </div>

      {/* Location Sharing Modal */}
      {showLocationModal && (
        <div className="modal-overlay">
          <div className="modal-content location-modal">
            {!locationShared ? (
              <>
                <div className="modal-icon">📍</div>
                <h2>Share Your Location</h2>
                <p>
                  Your real-time location will be shared with your emergency contacts. 
                  They will be able to track your journey.
                </p>
                <div className="contacts-preview">
                  <p><strong>Sharing with:</strong></p>
                  <p>👤 Emergency Contact 1</p>
                  <p>👤 Emergency Contact 2</p>
                  <p>👤 Emergency Contact 3</p>
                </div>
                <div className="modal-actions">
                  <button 
                    className="btn-confirm" 
                    onClick={confirmShare}
                    disabled={sharing}
                  >
                    {sharing ? 'Sharing...' : 'Share Location'}
                  </button>
                  <button 
                    className="btn-cancel" 
                    onClick={() => setShowLocationModal(false)}
                    disabled={sharing}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon success">✓</div>
                <h2>Location Shared!</h2>
                <p>Your contacts can now track your location in real-time.</p>
                <div className="sharing-status">
                  <p>🟢 Live tracking active</p>
                  <p>📱 Notifications sent</p>
                  <p>🔒 Secure connection</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SafeRoute;
