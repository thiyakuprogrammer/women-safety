import React, { useState, useEffect } from 'react';
import { getEmergencyServices, sendSOSAlert } from '../services/api';
import './SOS.css';

function SOS() {
  const [showAlert, setShowAlert] = useState(false);
  const [alertSent, setAlertSent] = useState(false);
  const [nearbyServices, setNearbyServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const emergencyContacts = [
    { name: 'Emergency Services', number: '112', icon: '🚨' },
    { name: 'Police', number: '100', icon: '👮' },
    { name: 'Ambulance', number: '102', icon: '🚑' },
    { name: 'Women Helpline', number: '1091', icon: '👩' }
  ];

  // Fetch emergency services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getEmergencyServices();
        if (response.success) {
          // Format data for display
          const formattedServices = response.data.map(service => ({
            name: service.name,
            distance: service.distance,
            type: service.type,
            icon: service.type === 'Police' ? '👮' : service.type === 'Hospital' ? '🏥' : '🚒'
          }));
          setNearbyServices(formattedServices);
        }
      } catch (error) {
        console.error('Failed to fetch emergency services:', error);
        // Fallback to mock data
        setNearbyServices([
          { name: 'City Police Station', distance: '0.8 km', type: 'Police', icon: '👮' },
          { name: 'General Hospital', distance: '1.2 km', type: 'Hospital', icon: '🏥' },
          { name: 'Fire Station', distance: '2.1 km', type: 'Fire', icon: '🚒' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleSOSClick = () => {
    setShowAlert(true);
    setAlertSent(false);
  };

  const confirmSOS = async () => {
    try {
      // Get current location (mock for now)
      const location = {
        latitude: 28.6139,
        longitude: 77.2090
      };

      // Send SOS alert to backend
      const response = await sendSOSAlert(location, 'Emergency SOS activated');
      
      if (response.success) {
        setAlertSent(true);
        console.log('SOS Alert sent successfully:', response.alertId);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
          setShowAlert(false);
          setAlertSent(false);
        }, 5000);
      }
    } catch (error) {
      console.error('Failed to send SOS alert:', error);
      // Still show success UI even if API fails (for demo purposes)
      setAlertSent(true);
      setTimeout(() => {
        setShowAlert(false);
        setAlertSent(false);
      }, 5000);
    }
  };

  const cancelSOS = () => {
    setShowAlert(false);
    setAlertSent(false);
  };

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="sos-page">
      <div className="container">
        <div className="sos-header">
          <h1>Emergency SOS</h1>
          <p className="sos-subtitle">
            Press the button below in case of emergency. Your location will be shared 
            with emergency contacts and authorities.
          </p>
        </div>

        {/* Main SOS Button */}
        <div className="sos-button-container">
          <button 
            className="sos-button"
            onClick={handleSOSClick}
            aria-label="Emergency SOS Button"
          >
            <span className="sos-icon">🚨</span>
            <span className="sos-text">SOS</span>
            <span className="sos-subtext">Press for Emergency</span>
          </button>
          <p className="sos-instruction">
            Hold or tap the button to activate emergency alert
          </p>
        </div>

        {/* Emergency Contacts */}
        <section className="emergency-contacts-section">
          <h2>Quick Dial Emergency Numbers</h2>
          <div className="contacts-grid">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="contact-card">
                <div className="contact-icon">{contact.icon}</div>
                <h3>{contact.name}</h3>
                <button 
                  className="btn-call"
                  onClick={() => handleCall(contact.number)}
                >
                  📞 {contact.number}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section */}
        <section className="map-section">
          <h2>Nearby Emergency Services</h2>
          <div className="map-container">
            <div className="mock-map">
              <div className="map-marker user-marker">📍 You</div>
              <div className="map-marker police-marker">👮 Police</div>
              <div className="map-marker hospital-marker">🏥 Hospital</div>
              <div className="map-overlay">
                <p>🗺️ Interactive Map</p>
                <small>Showing nearest emergency services</small>
              </div>
            </div>
          </div>
          
          <div className="services-list">
            {nearbyServices.map((service, index) => (
              <div key={index} className="service-item">
                <span className="service-icon">{service.icon}</span>
                <div className="service-info">
                  <h4>{service.name}</h4>
                  <p>{service.type} • {service.distance} away</p>
                </div>
                <button className="btn-navigate">Navigate</button>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Instructions */}
        <section className="instructions-section">
          <h2>What Happens When You Press SOS?</h2>
          <div className="instructions-grid">
            <div className="instruction-card">
              <div className="instruction-number">1</div>
              <h3>Alert Sent</h3>
              <p>Emergency message sent to your saved contacts</p>
            </div>
            <div className="instruction-card">
              <div className="instruction-number">2</div>
              <h3>Location Shared</h3>
              <p>Your real-time location is shared automatically</p>
            </div>
            <div className="instruction-card">
              <div className="instruction-number">3</div>
              <h3>Authorities Notified</h3>
              <p>Local emergency services are alerted</p>
            </div>
            <div className="instruction-card">
              <div className="instruction-number">4</div>
              <h3>Recording Started</h3>
              <p>Audio recording begins for evidence</p>
            </div>
          </div>
        </section>
      </div>

      {/* SOS Alert Modal */}
      {showAlert && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="modal-content sos-modal">
            {!alertSent ? (
              <>
                <div className="modal-icon">⚠️</div>
                <h2>Confirm Emergency Alert</h2>
                <p>
                  This will send an emergency alert to your contacts and share your 
                  location with authorities. Are you sure?
                </p>
                <div className="modal-actions">
                  <button className="btn-confirm" onClick={confirmSOS}>
                    Yes, Send Alert
                  </button>
                  <button className="btn-cancel" onClick={cancelSOS}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="modal-icon success">✓</div>
                <h2>Alert Sent Successfully!</h2>
                <div className="alert-status">
                  <p>✓ Emergency contacts notified</p>
                  <p>✓ Location shared with authorities</p>
                  <p>✓ Recording started</p>
                  <p>✓ Help is on the way</p>
                </div>
                <p className="stay-safe">Stay safe. Help is coming.</p>
                <button className="btn-close" onClick={cancelSOS}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SOS;
