import React, { useState } from 'react';
import { useAppContext } from '../../App';

const QuizModal = ({ quiz, onClose }) => {
  const { currentUser, completeQuiz } = useAppContext();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[quiz.currentIndex || 0];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    // Calculate score
    const isCorrect = selectedAnswer === currentQuestion.correct;
    const newScore = isCorrect ? 1 : 0;
    setScore(newScore);
    setQuizCompleted(true);
    
    // Award points using gamification system
    completeQuiz(newScore, 1, quiz.subject || 'General');
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
          {!quizCompleted ? (
            <>
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
                  Submit Answer
                </button>
              </div>
            </>
          ) : (
            <div className="quiz-results">
              <div className="result-icon">
                {score === 1 ? '🎉' : '😊'}
              </div>
              <h3>{score === 1 ? 'Correct!' : 'Good try!'}</h3>
              <p>You scored {score}/1 on this quiz!</p>
              <p className="points-earned">
                +{score === 1 ? '80' : '30'} points earned!
              </p>
              <div className="correct-answer">
                <strong>Correct Answer:</strong> {currentQuestion?.options[currentQuestion?.correct]}
              </div>
              <button 
                className="btn btn--primary" 
                onClick={onClose}
                style={{ marginTop: '20px' }}
              >
                Continue Learning! 🚀
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
