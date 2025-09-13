import React, { useState } from 'react';
import { useAppContext } from '../../App';

const QuizModal = ({ quiz, onClose }) => {
  const { currentUser, setCurrentUser } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const currentQuestion = quiz.questions[quiz.currentIndex || 0];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    // Award points and close quiz for demo
    const updatedUser = {
      ...currentUser,
      totalPoints: (currentUser.totalPoints || 0) + 25
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
    
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Practice Quiz</h2>
          <div className="quiz-progress">
            <span>1/1</span>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div id="quiz-question-container">
            <h3>{currentQuestion?.question}</h3>
            <div id="quiz-options">
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
          </div>
          <div className="quiz-actions">
            <button 
              className="btn btn--primary" 
              disabled={selectedAnswer === null}
              onClick={handleNext}
            >
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
