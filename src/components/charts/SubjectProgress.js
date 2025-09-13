import React from 'react';

const SubjectProgress = ({ subjects = [], userProgress = {} }) => {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="subject-progress-container">
        <p>No subjects available yet.</p>
      </div>
    );
  }

  return (
    <div className="subject-progress-container">
      {subjects.map((subject, index) => {
        const progress = userProgress[subject.id] || 0;
        return (
          <div key={subject.id} className="subject-progress-item">
            <div className="subject-info">
              <span className="subject-name">{subject.name}</span>
              <span className="progress-percent">{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectProgress;
