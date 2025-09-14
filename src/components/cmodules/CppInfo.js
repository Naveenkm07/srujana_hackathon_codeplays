import React from 'react';
import { useAuth } from './AuthContext';
import WelcomeStats from './WelcomeStats';
import './CppInfo.css';

function CppInfo({ onLinkClick, onBackToDashboard }) {
  const { user, logout } = useAuth();
  return (
    <div className="cpp-info-container">
      <div className="cpp-info-content">
        <div className="cpp-header">
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
              <h1 className="cpp-title">C++ Programming Language</h1>
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
            <span className="section-icon">📖</span>
            <p className="intro-text">
              C++ is a programming language that helps you create computer programs. 
              Think of it like a recipe book that tells the computer exactly what to do, step by step.
            </p>
          </div>
        </div>

        <div className="why-learn-section">
          <div className="section-header">
            <h2 className="section-title">Why Learn C++?</h2>
          </div>
          <p className="section-subtitle">
            C++ is often taught as a foundational language to aspiring programmers, but it is much more than that:
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Fast & Powerful</h3>
              <p className="feature-desc">Programs run very quickly and can handle big tasks</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Versatile</h3>
              <p className="feature-desc">Used for games, apps, websites, and even operating systems</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3 className="feature-title">Foundation</h3>
              <p className="feature-desc">Learning C++ makes other programming languages easier</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3 className="feature-title">Career Opportunities</h3>
              <p className="feature-desc">High demand in software engineering, game development, and system programming</p>
            </div>
          </div>
        </div>

        <div className="cpp-url">
          <button 
            onClick={() => onLinkClick('header-files')}
            className="url-link"
          >
            Header in C++
          </button>
        </div>

        <div className="cpp-basics-section">
          <h2 className="basics-title">C++ Basics</h2>
          <div className="basics-links">
            <button 
              className="basic-link"
              onClick={() => onLinkClick('introduction')}
            >
              Introduction
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('identifiers')}
            >
              Identifiers
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('keywords')}
            >
              Keywords
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('variables')}
            >
              Variables
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('datatypes')}
            >
              Data Types
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('operators')}
            >
              Operators
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('input-output')}
            >
              Basic Input / Output
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('conditional-statements')}
            >
              Conditional Statements
            </button>
            <button 
              className="basic-link"
              onClick={() => onLinkClick('loops')}
            >
              Loops
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CppInfo;
