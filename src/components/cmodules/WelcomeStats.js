import React from 'react';
import { useAuth } from './AuthContext';
import './WelcomeStats.css';

function WelcomeStats() {
  const { user } = useAuth();
  
  const calculateDaysJoined = () => {
    if (!user?.joinDate) return 0;
    const joinDate = new Date(user.joinDate);
    const today = new Date();
    const diffTime = Math.abs(today - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="welcome-stats">
      <div className="stats-header">
        <h3 className="stats-title">Your Learning Journey</h3>
        <p className="stats-subtitle">Track your progress in C++ programming</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <span className="stat-number">{calculateDaysJoined()}</span>
            <span className="stat-label">Days Learning</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <span className="stat-number">9</span>
            <span className="stat-label">Topics Available</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <span className="stat-number">0</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <span className="stat-number">1</span>
            <span className="stat-label">Streak Days</span>
          </div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-title">Overall Progress</span>
          <span className="progress-percentage">0%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '0%' }}></div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeStats;
