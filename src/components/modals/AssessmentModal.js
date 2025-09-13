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
    if (percentage >= 80) return 'Advanced';
    if (percentage >= 60) return 'Intermediate';
    return 'Beginner';
  };

  if (showResults) {
    const percentage = Math.round((assessment.score / assessment.questions.length) * 100);
    const level = getLevel(percentage);
    
    return (
      <div className="modal">
        <div className="modal-overlay"></div>
        <div className="modal-content">
          <div className="modal-header">
            <h2>Diagnostic Assessment</h2>
            <p>This quick assessment will help us personalize your learning path</p>
          </div>
          <div className="modal-body">
            <div id="assessment-results">
              <h3>Assessment Complete! 🎉</h3>
              <div className="assessment-result">
                <h4>Your Level: {level}</h4>
                <p>Score: {percentage}% ({assessment.score}/{assessment.questions.length} correct)</p>
                <p>Based on your performance, we've created a personalized learning path for you!</p>
              </div>
              <button className="btn btn--primary" onClick={startLearning}>
                Start Learning
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
