import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About SafeGuard</h1>
          <p className="subtitle">Empowering Women Through Technology</p>
        </div>

        <section className="about-content">
          <div className="content-card">
            <h2>🛡️ Who We Are</h2>
            <p>
              SafeGuard is a comprehensive women safety platform designed to provide 
              immediate assistance and support in emergency situations. We believe every 
              woman deserves to feel safe and confident wherever she goes.
            </p>
          </div>

          <div className="content-card">
            <h2>🎯 Our Vision</h2>
            <p>
              To create a world where women can move freely without fear, supported by 
              technology that connects them instantly to help when needed. We envision 
              communities where safety is a shared responsibility.
            </p>
          </div>

          <div className="content-card">
            <h2>💡 What We Offer</h2>
            <ul className="features-list">
              <li>
                <strong>Emergency SOS System:</strong> One-tap emergency alerts to 
                contacts and authorities
              </li>
              <li>
                <strong>Safe Route Navigation:</strong> Real-time guidance through 
                safer, well-lit paths
              </li>
              <li>
                <strong>24/7 Helpline Access:</strong> Instant connection to emergency 
                services and support
              </li>
              <li>
                <strong>Location Sharing:</strong> Share your real-time location with 
                trusted contacts
              </li>
              <li>
                <strong>Safety Resources:</strong> Comprehensive guides and tips for 
                personal safety
              </li>
            </ul>
          </div>

          <div className="content-card">
            <h2>🤝 Our Commitment</h2>
            <p>
              We are committed to maintaining the highest standards of privacy and 
              security. Your data is protected, and our services are designed with 
              your safety and dignity in mind. We continuously improve our platform 
              based on user feedback and emerging safety needs.
            </p>
          </div>

          <div className="content-card">
            <h2>🌟 Why Choose SafeGuard</h2>
            <div className="why-grid">
              <div className="why-item">
                <span className="why-icon">⚡</span>
                <h3>Instant Response</h3>
                <p>Emergency help in seconds</p>
              </div>
              <div className="why-item">
                <span className="why-icon">🔒</span>
                <h3>Privacy First</h3>
                <p>Your data stays secure</p>
              </div>
              <div className="why-item">
                <span className="why-icon">📱</span>
                <h3>Easy to Use</h3>
                <p>Simple, intuitive interface</p>
              </div>
              <div className="why-item">
                <span className="why-icon">🌍</span>
                <h3>Always Available</h3>
                <p>24/7 support worldwide</p>
              </div>
            </div>
          </div>

          <div className="content-card cta-card">
            <h2>Join Our Mission</h2>
            <p>
              Together, we can create safer communities. Whether you're using our 
              platform or spreading awareness, you're part of the solution.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
