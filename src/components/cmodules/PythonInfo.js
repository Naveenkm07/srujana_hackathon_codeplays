import React from 'react';
import { useAuth } from './AuthContext';
import WelcomeStats from './WelcomeStats';
import './PythonInfo.css';

function PythonInfo({ onLinkClick, onBackToDashboard }) {
  const { user, logout } = useAuth();
  return (
    <div className="python-info-container">
      <div className="python-info-content">
        <div className="python-header">
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
              <h1 className="python-title">Python Programming Language</h1>
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
            <span className="section-icon">🐍</span>
            <p className="intro-text">
              Python is a powerful, versatile programming language known for its simplicity and readability. 
              It's perfect for beginners and used by professionals worldwide for web development, data science, AI, and more.
            </p>
          </div>
        </div>

        <div className="why-learn-section">
          <div className="section-header">
            <h2 className="section-title">Why Learn Python?</h2>
          </div>
          <p className="section-subtitle">
            Python is one of the most popular and beginner-friendly programming languages:
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📖</div>
              <h3 className="feature-title">Easy to Learn</h3>
              <p className="feature-desc">Simple syntax that reads like English</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Versatile</h3>
              <p className="feature-desc">Web apps, data science, AI, automation, and more</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3 className="feature-title">High Demand</h3>
              <p className="feature-desc">One of the most sought-after skills in tech</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔧</div>
              <h3 className="feature-title">Rich Libraries</h3>
              <p className="feature-desc">Extensive libraries for any project</p>
            </div>
          </div>
        </div>

        <div className="python-url">
          <button 
            onClick={() => onLinkClick('python-libraries')}
            className="url-link"
          >
            Python Libraries
          </button>
        </div>

        <div className="python-basics-section">
          <h2 className="basics-title">Python Basics</h2>
          <div className="basics-links">
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-introduction')}
            >
              Introduction
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-variables')}
            >
              Variables
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-datatypes')}
            >
              Data Types
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-operators')}
            >
              Operators
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-strings')}
            >
              Strings
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-lists')}
            >
              Lists
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-loops')}
            >
              Loops
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-functions')}
            >
              Functions
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('python-conditionals')}
            >
              Conditional Statements
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PythonInfo;