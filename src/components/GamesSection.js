import React, { useState, useEffect } from 'react';
import { FaPlay, FaTrophy, FaCode, FaBrain, FaGamepad, FaRocket, FaLightbulb, FaStar, FaClock, FaCheck } from 'react-icons/fa';
import './GamesSection.css';

const GamesSection = ({ currentUser }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScores, setGameScores] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState([]);

  // Programming quiz questions
  const quizQuestions = [
    {
      question: "What does 'HTML' stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      correct: 0
    },
    {
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Python", "JavaScript", "Java", "C++"],
      correct: 1
    },
    {
      question: "What symbol is used for comments in Python?",
      options: ["//", "/*", "#", "<!--"],
      correct: 2
    },
    {
      question: "Which data structure follows LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1
    },
    {
      question: "What does CSS stand for?",
      options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      correct: 1
    }
  ];

  const codeGames = [
    {
      id: 'quiz',
      title: 'Programming Quiz',
      description: 'Test your programming knowledge with quick quizzes',
      icon: <FaBrain />,
      difficulty: 'Easy',
      points: 50,
      color: '#3498db',
      type: 'quiz'
    },
    {
      id: 'syntax',
      title: 'Syntax Checker',
      description: 'Find and fix syntax errors in code snippets',
      icon: <FaCode />,
      difficulty: 'Medium',
      points: 75,
      color: '#e67e22',
      type: 'syntax'
    },
    {
      id: 'logic',
      title: 'Logic Puzzle',
      description: 'Solve programming logic challenges',
      icon: <FaLightbulb />,
      difficulty: 'Hard',
      points: 100,
      color: '#e74c3c',
      type: 'logic'
    },
    {
      id: 'speed',
      title: 'Speed Coding',
      description: 'Write code as fast as you can!',
      icon: <FaRocket />,
      difficulty: 'Medium',
      points: 80,
      color: '#27ae60',
      type: 'speed'
    }
  ];

  // Timer effect for games
  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameActive) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [gameActive, timeLeft]);

  const startGame = (game) => {
    setSelectedGame(game);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(60);
    setGameActive(true);
  };

  const endGame = () => {
    setGameActive(false);
    const finalScore = score;
    setGameScores(prev => ({
      ...prev,
      [selectedGame.id]: Math.max(prev[selectedGame.id] || 0, finalScore)
    }));
  };

  const handleAnswer = (answerIndex) => {
    const isCorrect = answerIndex === quizQuestions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setAnswers([...answers, { question: currentQuestion, answer: answerIndex, correct: isCorrect }]);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      endGame();
    }
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameActive(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(60);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#27ae60';
      case 'Medium': return '#f39c12';
      case 'Hard': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  if (selectedGame && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
          <div className="game-info">
            <h2>{selectedGame.title}</h2>
            <div className="game-stats">
              <div className="stat">
                <FaClock /> {timeLeft}s
              </div>
              <div className="stat">
                <FaStar /> {score} points
              </div>
              <div className="stat">
                Question {currentQuestion + 1}/{quizQuestions.length}
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-container">
          <div className="question-card">
            <h3>{quizQuestions[currentQuestion].question}</h3>
            <div className="options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button 
                  key={index}
                  className="option-btn"
                  onClick={() => handleAnswer(index)}
                >
                  {String.fromCharCode(65 + index)}. {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedGame && !gameActive) {
    return (
      <div className="games-section">
        <div className="game-results">
          <div className="results-card">
            <div className="results-header">
              <FaTrophy className="trophy-icon" />
              <h2>Game Complete!</h2>
            </div>
            <div className="final-score">
              <span className="score-label">Final Score</span>
              <span className="score-value">{score} points</span>
            </div>
            <div className="results-summary">
              <p>You answered {answers.filter(a => a.correct).length} out of {answers.length} questions correctly!</p>
              {score > (gameScores[selectedGame.id] || 0) && (
                <p className="new-high-score">🎉 New High Score!</p>
              )}
            </div>
            <div className="results-actions">
              <button className="play-again-btn" onClick={() => startGame(selectedGame)}>
                <FaPlay /> Play Again
              </button>
              <button className="back-btn" onClick={resetGame}>
                Back to Games
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="games-section">
      <div className="section-header">
        <h2><FaGamepad className="section-icon" /> Programming Games</h2>
        <p>Learn programming concepts through fun interactive games!</p>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <FaTrophy />
          <div>
            <span className="stat-number">{Object.values(gameScores).reduce((a, b) => a + b, 0)}</span>
            <span className="stat-label">Total Points</span>
          </div>
        </div>
        <div className="stat-card">
          <FaStar />
          <div>
            <span className="stat-number">{Object.keys(gameScores).length}</span>
            <span className="stat-label">Games Played</span>
          </div>
        </div>
        <div className="stat-card">
          <FaCheck />
          <div>
            <span className="stat-number">{Math.max(...Object.values(gameScores), 0)}</span>
            <span className="stat-label">High Score</span>
          </div>
        </div>
      </div>

      <div className="games-grid">
        {codeGames.map(game => (
          <div key={game.id} className="game-card" style={{borderLeft: `4px solid ${game.color}`}}>
            <div className="game-icon" style={{color: game.color}}>
              {game.icon}
            </div>
            <div className="game-content">
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <div className="game-meta">
                <span 
                  className="difficulty-badge" 
                  style={{backgroundColor: getDifficultyColor(game.difficulty)}}
                >
                  {game.difficulty}
                </span>
                <span className="points-badge">
                  <FaStar /> {game.points} pts
                </span>
              </div>
              {gameScores[game.id] && (
                <div className="high-score">
                  Best: {gameScores[game.id]} points
                </div>
              )}
            </div>
            <button 
              className="play-btn"
              onClick={() => startGame(game)}
              style={{backgroundColor: game.color}}
            >
              <FaPlay /> Play
            </button>
          </div>
        ))}
      </div>

      <div className="achievements-section">
        <h3><FaTrophy /> Achievements</h3>
        <div className="achievements-grid">
          <div className={`achievement ${Object.keys(gameScores).length > 0 ? 'unlocked' : ''}`}>
            <FaGamepad />
            <span>First Game</span>
          </div>
          <div className={`achievement ${Object.values(gameScores).reduce((a, b) => a + b, 0) >= 100 ? 'unlocked' : ''}`}>
            <FaStar />
            <span>Century Club</span>
          </div>
          <div className={`achievement ${Object.keys(gameScores).length >= 3 ? 'unlocked' : ''}`}>
            <FaTrophy />
            <span>Game Master</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesSection;
