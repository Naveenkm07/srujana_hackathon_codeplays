import React, { useState, useEffect, useCallback } from 'react';
import { AnalyticsService } from '../utils/analytics';
import { useAppContext } from '../App';

const AnalyticsDashboard = () => {
  const { currentUser } = useAppContext();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const userAnalytics = AnalyticsService.getLearningAnalytics(currentUser.id || 'demo');
      const generalAnalytics = AnalyticsService.getAnalytics();
      
      setAnalytics({
        user: userAnalytics,
        general: generalAnalytics
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      loadAnalytics();
    }
  }, [currentUser, loadAnalytics]);

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="spinner"></div>
        <p>Loading your learning analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="analytics-error">
        <h3>Unable to load analytics</h3>
        <button onClick={loadAnalytics} className="btn btn--primary">
          Retry
        </button>
      </div>
    );
  }

  const { user, general } = analytics;

  return (
    <div className="analytics-dashboard">
      <div className="analytics-header">
        <h2>📊 Your Learning Analytics</h2>
        <p>Track your progress and discover insights</p>
      </div>

      <div className="analytics-grid">
        {/* Learning Overview */}
        <div className="analytics-card">
          <h3>Learning Overview</h3>
          <div className="stats-grid">
            <div className="stat">
              <div className="stat-number">{user.totalLessons}</div>
              <div className="stat-label">Lessons Started</div>
            </div>
            <div className="stat">
              <div className="stat-number">{user.completedLessons}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat">
              <div className="stat-number">
                {user.totalLessons > 0 ? Math.round((user.completedLessons / user.totalLessons) * 100) : 0}%
              </div>
              <div className="stat-label">Completion Rate</div>
            </div>
          </div>
        </div>

        {/* Subject Progress */}
        <div className="analytics-card">
          <h3>Subject Progress</h3>
          <div className="subject-analytics">
            {Object.entries(user.subjectProgress).map(([subject, progress]) => (
              <div key={subject} className="subject-progress">
                <div className="subject-header">
                  <span className="subject-name">{subject}</span>
                  <span className="progress-numbers">
                    {progress.completed}/{progress.started}
                  </span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${progress.started > 0 ? (progress.completed / progress.started) * 100 : 0}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Insights */}
        <div className="analytics-card">
          <h3>Activity Insights</h3>
          <div className="insights">
            <div className="insight">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <strong>Most Active Subject</strong>
                <p>
                  {Object.entries(user.subjectProgress).length > 0 
                    ? Object.entries(user.subjectProgress).reduce((a, b) => 
                        a[1].started > b[1].started ? a : b
                      )[0]
                    : 'No activity yet'
                  }
                </p>
              </div>
            </div>
            
            <div className="insight">
              <div className="insight-icon">⚡</div>
              <div className="insight-content">
                <strong>Current Streak</strong>
                <p>{currentUser.currentStreak || 0} days</p>
              </div>
            </div>
            
            <div className="insight">
              <div className="insight-icon">🏆</div>
              <div className="insight-content">
                <strong>Total Points</strong>
                <p>{currentUser.totalPoints || 0} XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="analytics-card full-width">
          <h3>Recent Activity</h3>
          <div className="recent-activity">
            {general.recentActivity.length > 0 ? (
              general.recentActivity
                .filter(event => event.event === 'learning_progress')
                .slice(0, 5)
                .map((event, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      {event.properties.action === 'completed' ? '✅' : '▶️'}
                    </div>
                    <div className="activity-content">
                      <strong>{event.properties.action === 'completed' ? 'Completed' : 'Started'}</strong>
                      <span>{event.properties.lesson}</span>
                      <small>in {event.properties.subject}</small>
                    </div>
                    <div className="activity-time">
                      {new Date(event.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))
            ) : (
              <p className="no-activity">No recent activity to show</p>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .analytics-dashboard {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .analytics-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .analytics-header h2 {
          color: #333;
          margin-bottom: 8px;
        }

        .analytics-header p {
          color: #666;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .analytics-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .analytics-card.full-width {
          grid-column: 1 / -1;
        }

        .analytics-card h3 {
          margin-bottom: 20px;
          color: #333;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 2.5em;
          font-weight: bold;
          color: #667eea;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #666;
          font-size: 0.9em;
        }

        .subject-progress {
          margin-bottom: 16px;
        }

        .subject-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .subject-name {
          font-weight: 500;
          color: #333;
        }

        .progress-numbers {
          color: #666;
          font-size: 0.9em;
        }

        .progress-bar {
          height: 8px;
          background: #f1f3f4;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .insights {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .insight {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .insight-icon {
          font-size: 1.5em;
        }

        .insight-content strong {
          display: block;
          color: #333;
          margin-bottom: 4px;
        }

        .insight-content p {
          color: #666;
          margin: 0;
        }

        .recent-activity {
          max-height: 300px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 0;
          border-bottom: 1px solid #f1f3f4;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .activity-icon {
          font-size: 1.2em;
        }

        .activity-content {
          flex: 1;
        }

        .activity-content strong {
          color: #333;
          margin-right: 8px;
        }

        .activity-content span {
          color: #667eea;
          margin-right: 8px;
        }

        .activity-content small {
          color: #666;
        }

        .activity-time {
          color: #999;
          font-size: 0.85em;
        }

        .no-activity {
          text-align: center;
          color: #666;
          padding: 40px 0;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AnalyticsDashboard;
