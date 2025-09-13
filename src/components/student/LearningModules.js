import React, { useState } from 'react';

const LearningModules = ({ subjects, userProgress, onStartLesson }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const showSubjectModules = (subject) => {
    setSelectedSubject(subject);
  };

  const backToSubjects = () => {
    setSelectedSubject(null);
  };

  if (selectedSubject) {
    const progress = userProgress[selectedSubject.name] || 0;
    
    // Generate sample lessons
    const lessons = [
      { title: 'Introduction & Basics', status: 'completed' },
      { title: 'Core Concepts', status: 'completed' },
      { title: 'Practice Problems', status: 'in-progress' },
      { title: 'Advanced Topics', status: 'locked' },
      { title: 'Final Assessment', status: 'locked' }
    ];

    return (
      <div className="module-container">
        <div className="module-header">
          <button className="btn btn--outline" onClick={backToSubjects}>
            ← Back to Subjects
          </button>
          <div className="module-info">
            <h2>{selectedSubject.name}</h2>
            <p>Explore {selectedSubject.modules} comprehensive modules in {selectedSubject.name}</p>
          </div>
        </div>
        <div className="module-content">
          <div className="module-progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="module-lessons">
            {lessons.map((lesson, index) => (
              <div 
                key={index} 
                className={`lesson-item ${lesson.status !== 'locked' ? 'clickable' : ''}`}
                onClick={() => lesson.status !== 'locked' && onStartLesson(lesson, selectedSubject)}
              >
                <div className="lesson-header">
                  <span className="lesson-title">{lesson.title}</span>
                  <span className={`lesson-status ${lesson.status}`}>
                    {lesson.status.replace('-', ' ')}
                  </span>
                </div>
                <p>Estimated time: {15 + Math.floor(Math.random() * 30)} minutes</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="subjects-grid">
      {subjects.map(subject => {
        const progress = userProgress[subject.name] || 0;
        return (
          <div 
            key={subject.id} 
            className="subject-card"
            onClick={() => showSubjectModules(subject)}
          >
            <div className="subject-header">
              <span className="subject-icon">{subject.icon}</span>
              <div className="subject-info">
                <h3>{subject.name}</h3>
                <div className="subject-meta">{subject.modules} modules • {subject.difficulty}</div>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p>{Math.round(progress)}% Complete</p>
          </div>
        );
      })}
    </div>
  );
};

export default LearningModules;
