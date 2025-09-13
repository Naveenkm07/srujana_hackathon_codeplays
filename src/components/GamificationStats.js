import React from 'react';
import { useAppContext } from '../App';
import '../styles/gamification.css';

const GamificationStats = () => {
  const { 
    currentUser, 
    calculateLevel, 
    getExperienceForNextLevel 
  } = useAppContext();

  if (!currentUser || currentUser.role !== 'student') {
    return null;
  }

  const currentLevel = calculateLevel(currentUser.experience || 0);
  const currentExp = currentUser.experience || 0;
  const expForNextLevel = getExperienceForNextLevel(currentLevel);
  const expProgress = (currentExp % 1000) / 10; // Progress within current level

  return (
    <div className="gamification-stats-container">
      <h3>🎮 Your Progress</h3>
      
      <div className="gamification-stats">
        {/* Level Display */}
        <div className="stat-card level-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value">Level {currentLevel}</div>
            <div className="stat-label">Current Level</div>
          </div>
        </div>

        {/* Points Display */}
        <div className="stat-card points-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{currentUser.totalPoints || 0}</div>
            <div className="stat-label">Total Points</div>
          </div>
        </div>

        {/* Streak Display */}
        <div className="stat-card streak-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{currentUser.currentStreak || 0}</div>
            <div className="stat-label">Day Streak</div>
          </div>
        </div>

        {/* Badges Display */}
        <div className="stat-card badges-card">
          <div className="stat-icon">🎖️</div>
          <div className="stat-content">
            <div className="stat-value">{(currentUser.badges || []).length}</div>
            <div className="stat-label">Badges Earned</div>
          </div>
        </div>
      </div>

      {/* Experience Bar */}
      <div className="experience-bar">
        <div className="level">Level {currentLevel}</div>
        <div className="bar">
          <div 
            className="fill" 
            style={{ width: `${expProgress}%` }}
          ></div>
        </div>
        <div className="exp-text">
          {currentExp % 1000}/1000 XP to Level {currentLevel + 1}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h4>🎯 Quick Actions</h4>
        <div className="action-buttons">
          <button 
            className="action-btn"
            onClick={() => {
              // This would trigger a lesson completion
              console.log('Complete a lesson to earn points!');
            }}
          >
            📚 Complete Lesson (+50 XP)
          </button>
          <button 
            className="action-btn"
            onClick={() => {
              // This would trigger a quiz
              console.log('Take a quiz to earn points!');
            }}
          >
            🎯 Take Quiz (+30 XP)
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamificationStats;
