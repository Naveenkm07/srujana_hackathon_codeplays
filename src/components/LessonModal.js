import React, { useState } from 'react';
import { useAppContext } from '../App';
import { LearningService } from '../services/supabaseClient';

const LessonModal = ({ lesson, subject, onClose }) => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample lesson content steps
  const lessonSteps = [
    {
      type: 'introduction',
      title: `Welcome to ${lesson.title}`,
      content: `In this lesson, you'll learn about ${lesson.title.toLowerCase()} in ${subject.name}. This comprehensive module will help you master key concepts and apply them practically.`
    },
    {
      type: 'content',
      title: 'Key Concepts',
      content: 'Here are the main concepts you need to understand:',
      points: [
        'Fundamental principles and definitions',
        'Real-world applications and examples',
        'Common patterns and problem-solving strategies',
        'Best practices and advanced techniques'
      ]
    },
    {
      type: 'practice',
      title: 'Practice Exercise',
      content: 'Let\'s practice what you\'ve learned with this interactive exercise.',
      question: `Which of the following best describes ${lesson.title}?`,
      options: [
        'A fundamental building block',
        'An advanced concept',
        'A practical application',
        'All of the above'
      ],
      correct: 3
    },
    {
      type: 'summary',
      title: 'Lesson Summary',
      content: `Great job! You've completed the ${lesson.title} lesson. You've learned the key concepts and practiced applying them.`,
      achievements: [
        '+25 XP earned',
        'Lesson completed',
        'Progress updated'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < lessonSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    
    try {
      // Update lesson progress in Supabase
      if (currentUser.id) {
        await LearningService.updateLessonProgress(currentUser.id, lesson.id, 'completed');
      }

      // Update local user progress
      const updatedUser = { ...currentUser };
      if (!updatedUser.progress) updatedUser.progress = {};
      
      // Increase subject progress
      const currentProgress = updatedUser.progress[subject.name] || 0;
      updatedUser.progress[subject.name] = Math.min(100, currentProgress + 10);
      
      // Add points
      updatedUser.totalPoints = (updatedUser.totalPoints || 0) + 25;

      setCurrentUser(updatedUser);
      localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
      
      setCompleted(true);
      
      // Auto-close after showing completion
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      console.error('Error completing lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentStepData = lessonSteps[currentStep];

  if (completed) {
    return (
      <div className="modal-overlay">
        <div className="modal lesson-modal">
          <div className="lesson-completion">
            <div className="completion-icon">🎉</div>
            <h2>Lesson Completed!</h2>
            <p>You've successfully completed {lesson.title}</p>
            <div className="completion-rewards">
              <div className="reward">
                <span className="reward-icon">⭐</span>
                <span>+25 XP</span>
              </div>
              <div className="reward">
                <span className="reward-icon">📚</span>
                <span>Knowledge gained</span>
              </div>
            </div>
            <button className="btn btn--primary" onClick={onClose}>
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal lesson-modal">
        <div className="modal-header">
          <h2>{subject.name} - {lesson.title}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="lesson-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / lessonSteps.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Step {currentStep + 1} of {lessonSteps.length}
          </span>
        </div>

        <div className="lesson-content">
          <h3>{currentStepData.title}</h3>
          
          {currentStepData.type === 'introduction' && (
            <div className="lesson-intro">
              <p>{currentStepData.content}</p>
              <div className="lesson-meta">
                <span>📚 Subject: {subject.name}</span>
                <span>⏱️ Duration: {lesson.duration || 25} minutes</span>
                <span>📊 Difficulty: {subject.difficulty}</span>
              </div>
            </div>
          )}

          {currentStepData.type === 'content' && (
            <div className="lesson-learn">
              <p>{currentStepData.content}</p>
              <ul className="concept-list">
                {currentStepData.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {currentStepData.type === 'practice' && (
            <div className="lesson-practice">
              <p>{currentStepData.content}</p>
              <div className="practice-question">
                <h4>{currentStepData.question}</h4>
                <div className="options">
                  {currentStepData.options.map((option, index) => (
                    <button 
                      key={index}
                      className="option-btn"
                      onClick={() => {/* Handle answer selection */}}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStepData.type === 'summary' && (
            <div className="lesson-summary">
              <p>{currentStepData.content}</p>
              <div className="achievements">
                {currentStepData.achievements.map((achievement, index) => (
                  <div key={index} className="achievement">
                    ✅ {achievement}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lesson-navigation">
          <button 
            className="btn btn--outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          
          <button 
            className="btn btn--primary"
            onClick={handleNext}
            disabled={loading}
          >
            {loading ? 'Saving...' : currentStep === lessonSteps.length - 1 ? 'Complete Lesson' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonModal;
