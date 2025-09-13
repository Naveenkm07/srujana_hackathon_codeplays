import React from 'react';

const Achievements = ({ badges, earnedBadges }) => {
  const earnedBadgesList = badges.filter(badge => earnedBadges.includes(badge.id));
  const availableBadgesList = badges.filter(badge => !earnedBadges.includes(badge.id));

  return (
    <div className="achievements-container">
      <div className="earned-badges">
        <h3>Earned Badges</h3>
        <div className="badges-grid">
          {earnedBadgesList.map(badge => (
            <div key={badge.id} className="badge-card earned">
              <div className="badge-icon">{badge.icon}</div>
              <h4 className="badge-name">{badge.name}</h4>
              <p className="badge-description">{badge.description}</p>
              <div className="badge-points">{badge.points} points</div>
            </div>
          ))}
        </div>
      </div>
      <div className="available-badges">
        <h3>Available Badges</h3>
        <div className="badges-grid">
          {availableBadgesList.map(badge => (
            <div key={badge.id} className="badge-card locked">
              <div className="badge-icon">{badge.icon}</div>
              <h4 className="badge-name">{badge.name}</h4>
              <p className="badge-description">{badge.description}</p>
              <div className="badge-points">{badge.points} points</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
