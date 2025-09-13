import React from 'react';
import { UserBehaviorTracker } from '../utils/analytics';

const RecommendationCard = ({ recommendation, onAction }) => {
  const handleClick = () => {
    UserBehaviorTracker.trackButtonClick('recommendation_click', {
      type: recommendation.type,
      subject: recommendation.subject
    });
    
    if (onAction) {
      onAction(recommendation);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'continue': return '📚';
      case 'challenge': return '🏆';
      case 'streak': return '🔥';
      case 'new': return '✨';
      default: return '💡';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#4ecdc4';
      case 'low': return '#45b7d1';
      default: return '#6c757d';
    }
  };

  return (
    <div 
      className="recommendation-card"
      onClick={handleClick}
      style={{ borderLeft: `4px solid ${getPriorityColor(recommendation.priority)}` }}
    >
      <div className="recommendation-header">
        <span className="recommendation-icon">{getIcon(recommendation.type)}</span>
        <div className="recommendation-priority">
          <span className={`priority-badge ${recommendation.priority}`}>
            {recommendation.priority}
          </span>
        </div>
      </div>
      
      <div className="recommendation-content">
        <h3>{recommendation.title}</h3>
        <p>{recommendation.description}</p>
      </div>
      
      <div className="recommendation-action">
        <button className="btn btn--small btn--primary">
          {recommendation.type === 'continue' ? 'Continue Learning' : 'Get Started'}
        </button>
      </div>

      <style jsx>{`
        .recommendation-card {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .recommendation-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .recommendation-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .recommendation-icon {
          font-size: 1.5em;
        }

        .priority-badge {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .priority-badge.high {
          background: #ffe6e6;
          color: #d32f2f;
        }

        .priority-badge.medium {
          background: #e6f7ff;
          color: #1976d2;
        }

        .priority-badge.low {
          background: #f0f8e6;
          color: #388e3c;
        }

        .recommendation-content h3 {
          margin-bottom: 8px;
          color: #333;
          font-size: 1.1em;
        }

        .recommendation-content p {
          color: #666;
          line-height: 1.4;
          margin-bottom: 16px;
        }

        .btn--small {
          padding: 8px 16px;
          font-size: 14px;
        }

        .recommendation-action {
          text-align: right;
        }
      `}</style>
    </div>
  );
};

export default RecommendationCard;
