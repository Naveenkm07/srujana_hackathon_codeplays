import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import './UserDashboard.css';

function UserDashboard({ onGetStarted, onPythonStarted, onJavaStarted }) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const handleGetStarted = () => {
    onGetStarted();
  };

  const handlePythonStarted = () => {
    onPythonStarted();
  };

  const handleJavaStarted = () => {
    onJavaStarted();
  };

  const handleLogout = () => {
    logout();
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Profile Button - Top Right Corner */}
        <div className="profile-section" ref={profileRef}>
          <button 
            className="profile-button" 
            onClick={toggleProfileMenu}
            title={`${user?.name || 'Student'} - Click to view profile`}
          >
            <div className="profile-avatar">
              <span className="avatar-text">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
            <span className="profile-arrow">{showProfileMenu ? '▲' : '▼'}</span>
          </button>

          {showProfileMenu && (
            <div className="profile-menu">
              <div className="profile-menu-header">
                <h3 className="menu-title">My Profile</h3>
                <p className="menu-subtitle">Manage your account and course progress</p>
              </div>
              
              <div className="profile-menu-content">
                <div className="course-info">
                  <h4 className="course-title">C++ Programming Course</h4>
                  <div className="course-stats">
                    <div className="course-stat">
                      <span className="stat-label">Enrolled</span>
                      <span className="stat-value">{new Date(user?.joinDate).toLocaleDateString()}</span>
                    </div>
                    <div className="course-stat">
                      <span className="stat-label">Progress</span>
                      <span className="stat-value">0% Complete</span>
                    </div>
                    <div className="course-stat">
                      <span className="stat-label">Topics</span>
                      <span className="stat-value">9 Available</span>
                    </div>
                  </div>
                </div>

                <div className="menu-actions">
                  <button className="menu-action-button">
                    <span className="action-icon">⚙️</span>
                    Settings
                  </button>
                  <button className="menu-action-button">
                    <span className="action-icon">📊</span>
                    Progress
                  </button>
                  <button className="menu-action-button">
                    <span className="action-icon">🏆</span>
                    Achievements
                  </button>
                  <button className="menu-action-button logout-button" onClick={handleLogout}>
                    <span className="action-icon">🚪</span>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Welcome Header */}
        <div className="welcome-header">
          <div className="welcome-icon">🎉</div>
          <h1 className="welcome-title">Welcome to CodePlayz Platform!</h1>
          <p className="welcome-subtitle">
            Hi <strong>{user?.name || 'Student'}</strong>, you're all set to start your journey!
          </p>
        </div>

        {/* Programming Language Modules */}
        <div className="modules-grid">
          {/* C++ Module */}
          <div className="module-block cpp-module">
            <div className="module-header">
              <div className="module-icon">📚</div>
              <div className="module-info">
                <h2 className="module-title">C++ MODULE</h2>
                <p className="module-description">
                  Master the fundamentals of C++ programming with our comprehensive learning modules
                </p>
              </div>
            </div>

            <div className="module-features">
              <div className="feature-item">
                <span className="feature-icon">💻</span>
                <span className="feature-text">Interactive Examples</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">9 Core Topics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span className="feature-text">Hands-on Practice</span>
              </div>
            </div>

            <div className="module-actions">
              <button className="get-started-button cpp-button" onClick={handleGetStarted}>
                <span className="button-icon">🚀</span>
                Get Started
              </button>
            </div>
          </div>

          {/* Python Module */}
          <div className="module-block python-module">
            <div className="module-header">
              <div className="module-icon">🐍</div>
              <div className="module-info">
                <h2 className="module-title">PYTHON MODULE</h2>
                <p className="module-description">
                  Learn Python programming from basics to advanced concepts with interactive tutorials
                </p>
              </div>
            </div>

            <div className="module-features">
              <div className="feature-item">
                <span className="feature-icon">📖</span>
                <span className="feature-text">Easy to Learn</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">9 Core Topics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span className="feature-text">Versatile Applications</span>
              </div>
            </div>

            <div className="module-actions">
              <button className="get-started-button python-button" onClick={handlePythonStarted}>
                <span className="button-icon">🐍</span>
                Get Started
              </button>
            </div>
          </div>

          {/* Java Module */}
          <div className="module-block java-module">
            <div className="module-header">
              <div className="module-icon">☕</div>
              <div className="module-info">
                <h2 className="module-title">JAVA MODULE</h2>
                <p className="module-description">
                  Master Java programming for enterprise applications and Android development
                </p>
              </div>
            </div>

            <div className="module-features">
              <div className="feature-item">
                <span className="feature-icon">🌐</span>
                <span className="feature-text">Platform Independent</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">9 Core Topics</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span className="feature-text">Enterprise Ready</span>
              </div>
            </div>

            <div className="module-actions">
              <button className="get-started-button java-button" onClick={handleJavaStarted}>
                <span className="button-icon">☕</span>
                Get Started
              </button>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">🎓</div>
            <h3 className="card-title">Beginner Friendly</h3>
            <p className="card-description">
              Start from the basics and build your way up to advanced concepts
            </p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">⚡</div>
            <h3 className="card-title">Fast Learning</h3>
            <p className="card-description">
              Learn at your own pace with interactive examples and exercises
            </p>
          </div>
          
          <div className="info-card">
            <div className="card-icon">🏆</div>
            <h3 className="card-title">Achievement System</h3>
            <p className="card-description">
              Track your progress and unlock achievements as you learn
            </p>
          </div>
        </div>

        {/* User Progress */}
        <div className="progress-section">
          <h3 className="progress-title">Your Learning Journey</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '0%' }}></div>
          </div>
          <p className="progress-text">
            Complete your first topic to start tracking progress!
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
