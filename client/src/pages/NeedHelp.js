import React, { useState, useEffect } from 'react';
import { getHelplines } from '../services/api';
import './NeedHelp.css';

function NeedHelp() {
  const [helplines, setHelplines] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch helplines from backend
  useEffect(() => {
    const fetchHelplines = async () => {
      try {
        const response = await getHelplines();
        if (response.success) {
          // Group helplines by category
          const emergencyNumbers = response.data.map(helpline => ({
            name: helpline.name,
            number: helpline.number,
            icon: getIconForCategory(helpline.category),
            description: helpline.description || getCategoryDescription(helpline.category)
          }));
          setHelplines(emergencyNumbers);
        }
      } catch (error) {
        console.error('Failed to fetch helplines:', error);
        // Fallback to default data
        setHelplines([
          { name: 'National Emergency', number: '112', icon: '🚨', description: 'All emergencies' },
          { name: 'Women Helpline', number: '1091', icon: '👩', description: '24/7 women support' },
          { name: 'Police', number: '100', icon: '👮', description: 'Police assistance' },
          { name: 'Ambulance', number: '102', icon: '🚑', description: 'Medical emergency' },
          { name: 'Fire Service', number: '101', icon: '🚒', description: 'Fire emergency' },
          { name: 'Child Helpline', number: '1098', icon: '👶', description: 'Child protection' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchHelplines();
  }, []);

  const getIconForCategory = (category) => {
    const icons = {
      emergency: '🚨',
      women: '👩',
      police: '👮',
      medical: '🚑',
      fire: '🚒',
      child: '👶'
    };
    return icons[category] || '📞';
  };

  const getCategoryDescription = (category) => {
    const descriptions = {
      emergency: 'All emergencies',
      women: '24/7 women support',
      police: 'Police assistance',
      medical: 'Medical emergency',
      fire: 'Fire emergency',
      child: 'Child protection'
    };
    return descriptions[category] || 'Emergency support';
  };

  const supportResources = [
    {
      title: 'Domestic Violence Support',
      description: 'Confidential support for domestic abuse survivors',
      contact: '1800-123-4567',
      icon: '🏠'
    },
    {
      title: 'Mental Health Helpline',
      description: '24/7 counseling and mental health support',
      contact: '1800-891-4416',
      icon: '🧠'
    },
    {
      title: 'Legal Aid Services',
      description: 'Free legal consultation and support',
      contact: '1800-345-6789',
      icon: '⚖️'
    },
    {
      title: 'Sexual Assault Helpline',
      description: 'Confidential support for assault survivors',
      contact: '1800-234-5678',
      icon: '🆘'
    }
  ];

  const safetyTips = [
    'Always inform someone you trust about your whereabouts',
    'Keep your phone charged and emergency numbers saved',
    'Trust your instincts - if something feels wrong, seek help',
    'Use well-lit and populated routes, especially at night',
    'Keep important documents and emergency cash accessible',
    'Learn basic self-defense techniques',
    'Be aware of your surroundings at all times',
    'Have a safety plan and practice it regularly'
  ];

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="need-help">
      <div className="container">
        <div className="page-header">
          <h1>Need Help?</h1>
          <p className="header-subtitle">
            You're not alone. Help is available 24/7. Reach out anytime.
          </p>
        </div>

        {/* Emergency Numbers */}
        <section className="section">
          <h2 className="section-title">Emergency Helplines</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading helplines...</p>
            </div>
          ) : (
            <div className="helplines-grid">
              {helplines.map((helpline, index) => (
                <div key={index} className="helpline-card">
                  <div className="helpline-icon">{helpline.icon}</div>
                  <h3>{helpline.name}</h3>
                  <p className="helpline-desc">{helpline.description}</p>
                  <button 
                    className="helpline-number"
                    onClick={() => handleCall(helpline.number)}
                    aria-label={`Call ${helpline.name} at ${helpline.number}`}
                  >
                    📞 {helpline.number}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Support Resources */}
        <section className="section">
          <h2 className="section-title">Support Resources</h2>
          <div className="resources-grid">
            {supportResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-icon">{resource.icon}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => handleCall(resource.contact)}
                >
                  Call {resource.contact}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section className="section">
          <h2 className="section-title">Safety Tips & Guidelines</h2>
          <div className="tips-container">
            <ul className="safety-tips-list">
              {safetyTips.map((tip, index) => (
                <li key={index}>
                  <span className="tip-bullet">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Important Notice */}
        <section className="notice-section">
          <div className="notice-card">
            <h3>⚠️ In Case of Immediate Danger</h3>
            <p>
              If you are in immediate danger, call emergency services (112) right away. 
              Your safety is the top priority. Don't hesitate to seek help.
            </p>
            <button 
              className="btn btn-emergency"
              onClick={() => handleCall('112')}
            >
              🚨 Call Emergency Services
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default NeedHelp;
