import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  // Mock statistics data
  const stats = [
    { number: '24/7', label: 'Emergency Support' },
    { number: '100+', label: 'Safety Resources' },
    { number: '1000+', label: 'Women Helped' },
    { number: '50+', label: 'Partner Organizations' }
  ];

  const quickAccessCards = [
    {
      icon: '🚨',
      title: 'Emergency SOS',
      description: 'Instant alert to emergency contacts and authorities',
      link: '/sos',
      color: '#ff1744'
    },
    {
      icon: '🗺️',
      title: 'Safe Route',
      description: 'Navigate safely with real-time route guidance',
      link: '/safe-route',
      color: '#2196f3'
    },
    {
      icon: '📞',
      title: 'Helplines',
      description: 'Access emergency helpline numbers instantly',
      link: '/need-help',
      color: '#4caf50'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Your Safety, Our Priority</h1>
            <p className="hero-subtitle">
              Empowering women with instant emergency response, safe navigation, 
              and 24/7 support resources
            </p>
            <div className="hero-buttons">
              <Link to="/sos" className="btn btn-emergency">
                🚨 Emergency SOS
              </Link>
              <Link to="/safe-route" className="btn btn-secondary">
                Find Safe Route
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <div className="container">
          <h2 className="section-title">Our Mission</h2>
          <p className="mission-text">
            SafeGuard is dedicated to creating a safer environment for women everywhere. 
            We provide instant access to emergency services, safe navigation tools, and 
            comprehensive safety resources. Our platform ensures that help is always just 
            one click away, empowering women to move confidently and securely.
          </p>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="quick-access-section">
        <div className="container">
          <h2 className="section-title">Quick Access</h2>
          <div className="cards-grid">
            {quickAccessCards.map((card, index) => (
              <Link 
                key={index} 
                to={card.link} 
                className="access-card"
                style={{ borderTopColor: card.color }}
              >
                <div className="card-icon" style={{ color: card.color }}>
                  {card.icon}
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <span className="card-arrow" style={{ color: card.color }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="tips-section">
        <div className="container">
          <h2 className="section-title">Safety Tips</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">👥</div>
              <h3>Stay Connected</h3>
              <p>Share your location with trusted contacts when traveling</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🌙</div>
              <h3>Plan Ahead</h3>
              <p>Choose well-lit, populated routes especially at night</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📱</div>
              <h3>Keep Phone Ready</h3>
              <p>Ensure your phone is charged and emergency numbers saved</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🚶‍♀️</div>
              <h3>Trust Your Instincts</h3>
              <p>If something feels wrong, seek help immediately</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
