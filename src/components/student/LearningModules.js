import React, { useState, useEffect } from 'react';
import { LearningService } from '../../services/supabaseClient';
import { useAppContext } from '../../App';

const LearningModules = ({ subjects, userProgress, onStartLesson }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAppContext();

  const showSubjectModules = async (subject) => {
    setSelectedSubject(subject);
    setLoading(true);
    
    try {
      const { data, error } = await LearningService.getLessons(subject.id);
      if (error) {
        console.error('Error loading lessons:', error);
      } else {
        setLessons(data);
      }
    } catch (err) {
      console.error('Failed to load lessons:', err);
    } finally {
      setLoading(false);
    }
  };

  const backToSubjects = () => {
    setSelectedSubject(null);
    setLessons([]);
  };

  const handleStartLesson = async (lesson, subject) => {
    if (lesson.status === 'locked') return;
    
    // Update lesson status to in-progress if it was completed
    if (currentUser && lesson.status !== 'in-progress') {
      await LearningService.updateLessonProgress(currentUser.id, lesson.id, 'in-progress');
    }
    
    onStartLesson(lesson, subject);
  };

  if (selectedSubject) {
    const progress = userProgress[selectedSubject.name] || 0;

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
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading lessons...</p>
            </div>
          ) : (
            <div className="module-lessons">
              {lessons.map((lesson, index) => (
                <div 
                  key={lesson.id || index} 
                  className={`lesson-item ${lesson.status !== 'locked' ? 'clickable' : ''}`}
                  onClick={() => lesson.status !== 'locked' && handleStartLesson(lesson, selectedSubject)}
                >
                  <div className="lesson-header">
                    <span className="lesson-title">{lesson.title}</span>
                    <span className={`lesson-status ${lesson.status}`}>
                      {lesson.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p>Estimated time: {lesson.duration || 25} minutes</p>
                </div>
              ))}
            </div>
          )}
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
