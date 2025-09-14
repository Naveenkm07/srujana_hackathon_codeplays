import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const LandingPage = () => {
  const { handleRoleSelection } = useAppContext();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: '🎯',
      title: 'Personalized Learning',
      description: 'AI-powered adaptive pathways that adjust to your unique learning style and pace'
    },
    {
      icon: '📊',
      title: 'Real-time Analytics',
      description: 'Track progress with detailed insights and performance metrics'
    },
    {
      icon: '🏆',
      title: 'Gamified Experience',
      description: 'Earn badges, compete with peers, and unlock achievements as you learn'
    },
    {
      icon: '💡',
      title: 'Smart Recommendations',
      description: 'Get personalized content suggestions based on your learning patterns'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Students' },
    { number: '95%', label: 'Success Rate' },
    { number: '500+', label: 'Learning Modules' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className={`landing-page ${isVisible ? 'visible' : ''}`}>
      {/* Animated Background */}
      <div className="bg-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
        <div 
          className="mouse-gradient"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(33, 128, 141, 0.1), transparent 40%)`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">🎓</span>
            <span className="brand-text">Smart Tutor</span>
          </div>
          <div className="nav-actions">
            <button className="btn btn--secondary btn--sm" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="btn btn--primary btn--sm" onClick={() => navigate('/admin')}>
              Admin
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-text">✨ Next-Gen Learning Platform</span>
            </div>
            <h1 className="hero-title">
              Transform Your
              <span className="gradient-text"> Learning Journey</span>
              <br />with AI-Powered Education
            </h1>
            <p className="hero-description">
              Experience personalized, adaptive learning that evolves with you. 
              Join thousands of students achieving their goals with our intelligent tutoring system.
            </p>
            <div className="hero-actions">
              <button 
                className="btn btn--primary btn--lg hero-cta"
                onClick={() => handleRoleSelection('student')}
              >
                <span>Start Learning Today</span>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="btn btn--outline btn--lg" onClick={() => navigate('/login')}>
                Sign In
              </button>
            </div>
            <div className="hero-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="floating-card card-1">
              <div className="card-content">
                <div className="progress-ring">
                  <svg className="progress-svg" viewBox="0 0 36 36">
                    <path
                      className="progress-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="progress-bar"
                      strokeDasharray="75, 100"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="progress-text">75%</div>
                </div>
                <span>Progress</span>
              </div>
            </div>
            <div className="floating-card card-2">
              <div className="card-content">
                <div className="achievement-icon">🏆</div>
                <span>Achievement Unlocked!</span>
              </div>
            </div>
            <div className="floating-card card-3">
              <div className="card-content">
                <div className="chart-mini">
                  <div className="bar" style={{height: '60%'}}></div>
                  <div className="bar" style={{height: '80%'}}></div>
                  <div className="bar" style={{height: '40%'}}></div>
                  <div className="bar" style={{height: '90%'}}></div>
                </div>
                <span>Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Smart Tutor?</h2>
            <p className="section-description">
              Our platform combines cutting-edge AI with proven pedagogical methods
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <span>{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Transform Your Learning?</h2>
            <p className="cta-description">
              Join thousands of students who have already improved their grades and learning outcomes
            </p>
            <button 
              className="btn btn--primary btn--lg cta-button"
              onClick={() => handleRoleSelection('student')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="brand-icon">🎓</span>
              <span className="brand-text">Smart Tutor</span>
            </div>
            <p className="footer-text">
              Empowering learners through intelligent, personalized education technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
