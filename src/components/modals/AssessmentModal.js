import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../App';

const AssessmentModal = ({ assessment, setAssessment, onClose }) => {
  const { completeAssessment, startLearning } = useAppContext();
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = assessment?.questions[assessment.currentQuestionIndex];
  const progress = assessment ? ((assessment.currentQuestionIndex + 1) / assessment.questions.length) * 100 : 0;

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    
    const updatedAssessment = { ...assessment };
    updatedAssessment.answers[assessment.currentQuestionIndex] = answerIndex;
    
    if (answerIndex === currentQuestion.correct) {
      updatedAssessment.score++;
    }
    
    setAssessment(updatedAssessment);
  };

  const handleNext = () => {
    const updatedAssessment = { ...assessment };
    updatedAssessment.currentQuestionIndex++;
    
    if (updatedAssessment.currentQuestionIndex >= updatedAssessment.questions.length) {
      // Complete assessment
      const percentage = Math.round((updatedAssessment.score / updatedAssessment.questions.length) * 100);
      completeAssessment(updatedAssessment.score, percentage);
      setShowResults(true);
    } else {
      setAssessment(updatedAssessment);
      setSelectedAnswer(null);
    }
  };

  const getLevel = (percentage) => {
    if (percentage >= 85) return 'Advanced';
    if (percentage >= 65) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelDescription = (percentage) => {
    if (percentage >= 85) {
      return 'Excellent! You have strong programming fundamentals.';
    } else if (percentage >= 65) {
      return 'Good job! You have solid basic knowledge.';
    } else if (percentage >= 40) {
      return 'Great start! We\'ll help you build strong foundations.';
    } else {
      return 'No worries! Everyone starts somewhere. Let\'s learn together.';
    }
  };

  if (showResults) {
    const percentage = Math.round((assessment.score / assessment.questions.length) * 100);
    const level = getLevel(percentage);
    const levelDescription = getLevelDescription(percentage);
    
    return (
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-content">
          <div className="modal-header">
            <h2>🎯 Programming Skills Assessment</h2>
            <p>Your personalized learning path is ready!</p>
          </div>
          <div className="modal-body">
            <div id="assessment-results" className="text-center">
              <div className="level-badge">
                <div className={`level-icon level-${level.toLowerCase()}`}>
                  {level === 'Advanced' ? '🚀' : level === 'Intermediate' ? '⭐' : '🌱'}
                </div>
                <h3>Your Skill Level: <strong>{level}</strong></h3>
              </div>
              
              <div className="score-display">
                <div className="score-circle">
                  <span className="percentage">{percentage}%</span>
                  <span className="score-text">{assessment.score}/{assessment.questions.length} correct</span>
                </div>
              </div>
              
              <div className="level-description">
                <p>{levelDescription}</p>
              </div>
              
              <div className="assessment-summary">
                <h4>What this means:</h4>
                <ul className="level-features">
                  {level === 'Advanced' && (
                    <>
                      <li>✅ Access to advanced programming concepts</li>
                      <li>✅ Complex project-based learning</li>
                      <li>✅ Expert-level challenges</li>
                    </>
                  )}
                  {level === 'Intermediate' && (
                    <>
                      <li>✅ Intermediate programming concepts</li>
                      <li>✅ Hands-on coding exercises</li>
                      <li>✅ Practical project building</li>
                    </>
                  )}
                  {level === 'Beginner' && (
                    <>
                      <li>✅ Step-by-step fundamentals</li>
                      <li>✅ Interactive coding tutorials</li>
                      <li>✅ Supportive learning environment</li>
                    </>
                  )}
                </ul>
              </div>
              
              <button className="btn btn--primary btn--large" onClick={startLearning}>
                🎓 Start My Learning Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Diagnostic Assessment</h2>
          <p>This quick assessment will help us personalize your learning path</p>
        </div>
        <div className="modal-body">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div id="question-container">
            <h3>{currentQuestion?.question}</h3>
            <div className="quiz-options">
              {currentQuestion?.options.map((option, index) => (
                <div 
                  key={index}
                  className={`quiz-option ${selectedAnswer === index ? 'selected' : ''}`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  {option}
                </div>
              ))}
            </div>
            <div className="quiz-actions">
              <button 
                className="btn btn--primary" 
                disabled={selectedAnswer === null}
                onClick={handleNext}
              >
                {assessment.currentQuestionIndex === assessment.questions.length - 1 ? 'Complete' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
