import React from 'react';
import { useAuth } from './AuthContext';
import WelcomeStats from './WelcomeStats';
import './JavaInfo.css';

function JavaInfo({ onLinkClick, onBackToDashboard }) {
  const { user, logout } = useAuth();
  return (
    <div className="java-info-container">
      <div className="java-info-content">
        <div className="java-header">
          <div className="header-top">
            <div className="header-left">
              <button 
                className="back-to-dashboard-button" 
                onClick={onBackToDashboard}
                title="Back to Dashboard"
              >
                <span className="back-icon">←</span>
                Dashboard
              </button>
              <h1 className="java-title">Java Programming Language</h1>
            </div>
            <div className="user-info">
              <div className="user-details">
                <span className="user-name">Welcome, {user?.name || 'Student'}!</span>
                <span className="user-email">{user?.email}</span>
              </div>
              <button className="logout-button" onClick={logout}>
                <span className="logout-icon">🚪</span>
                Logout
              </button>
            </div>
          </div>
        </div>
        
        <WelcomeStats />
        
        <div className="intro-section">
          <div className="intro-content">
            <span className="section-icon">☕</span>
            <p className="intro-text">
              Java is a powerful, object-oriented programming language that's platform-independent and widely used 
              for enterprise applications, Android development, web services, and large-scale systems.
            </p>
          </div>
        </div>

        <div className="why-learn-section">
          <div className="section-header">
            <h2 className="section-title">Why Learn Java?</h2>
          </div>
          <p className="section-subtitle">
            Java is one of the most popular and versatile programming languages in the world:
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Platform Independent</h3>
              <p className="feature-desc">Write once, run anywhere (WORA)</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Android Development</h3>
              <p className="feature-desc">Primary language for Android apps</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h3 className="feature-title">Enterprise Ready</h3>
              <p className="feature-desc">Used in large-scale business applications</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-desc">Built-in security features and memory management</p>
            </div>
          </div>
        </div>

        <div className="java-url">
          <button 
            onClick={() => onLinkClick('java-packages')}
            className="url-link"
          >
            Java Packages
          </button>
        </div>

        <div className="java-basics-section">
          <h2 className="basics-title">Java Basics</h2>
          <div className="basics-links">
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-introduction')}
            >
              Introduction
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-variables')}
            >
              Variables
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-datatypes')}
            >
              Data Types
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-operators')}
            >
              Operators
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-strings')}
            >
              Strings
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-arrays')}
            >
              Arrays
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-loops')}
            >
              Loops
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-methods')}
            >
              Methods
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('java-conditionals')}
            >
              Conditional Statements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JavaInfo;