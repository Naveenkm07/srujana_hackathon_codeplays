import React from 'react';

const QuizCard = ({ quiz, onStart, completed = false }) => {
  return (
    <div className={`quiz-card ${completed ? 'completed' : ''}`}>
      <div className="quiz-header">
        <h4>{quiz.title}</h4>
        <span className="quiz-difficulty">{quiz.difficulty}</span>
      </div>
      <p className="quiz-description">{quiz.description}</p>
      <div className="quiz-stats">
        <span>Questions: {quiz.questions}</span>
        <span>Time: {quiz.timeLimit} min</span>
      </div>
      <button 
        className={`quiz-start-btn ${completed ? 'completed' : ''}`}
        onClick={() => onStart(quiz)}
        disabled={completed}
      >
        {completed ? '✓ Completed' : 'Start Quiz'}
      </button>
    </div>
  );
};

export default QuizCard;
