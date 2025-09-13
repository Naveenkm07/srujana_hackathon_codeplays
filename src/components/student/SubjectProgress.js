import React from 'react';

const SubjectProgress = ({ progress }) => {
  return (
    <div>
      {Object.keys(progress).map(subject => {
        const progressValue = progress[subject];
        return (
          <div key={subject} className="subject-progress-item">
            <div className="subject-progress-header">
              <span className="subject-name">{subject}</span>
              <span className="progress-percentage">{Math.round(progressValue)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressValue}%` }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SubjectProgress;
