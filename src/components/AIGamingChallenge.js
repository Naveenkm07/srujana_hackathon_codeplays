import React, { useState, useEffect, useCallback } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaRedo, 
  FaTrophy, 
  FaClock, 
  FaCode,
  FaBrain,
  FaLightbulb,
  FaRocket,
  FaFire,
  FaBullseye,
  FaChartLine,
  FaStar
} from 'react-icons/fa';
import './AIGamingChallenge.css';

const AI_CHALLENGES = [
  {
    id: 1,
    type: 'algorithm',
    difficulty: 'easy',
    title: 'Two Sum Problem',
    description: 'Find two numbers in an array that add up to a target sum.',
    problem: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

Example:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: nums[0] + nums[1] = 2 + 7 = 9`,
    hints: [
      'Use a hash map to store numbers and their indices',
      'For each number, check if target - number exists in the map',
      'Return the indices when you find a match'
    ],
    timeLimit: 900, // 15 minutes
    points: 100
  },
  {
    id: 2,
    type: 'data-structure',
    difficulty: 'medium',
    title: 'Binary Tree Traversal',
    description: 'Implement in-order traversal of a binary tree.',
    problem: `Given the root of a binary tree, return the inorder traversal of its nodes' values.

Example:
Input: root = [1,null,2,3]
Output: [1,3,2]

Tree structure:
   1
    \\
     2
    /
   3`,
    hints: [
      'In-order: Left, Root, Right',
      'Use recursion for elegant solution',
      'Can also implement iteratively with a stack'
    ],
    timeLimit: 1200, // 20 minutes
    points: 200
  },
  {
    id: 3,
    type: 'dynamic-programming',
    difficulty: 'hard',
    title: 'Fibonacci Optimization',
    description: 'Calculate the nth Fibonacci number efficiently.',
    problem: `The Fibonacci numbers form a sequence where each number is the sum of the two preceding ones.

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2) for n > 1

Calculate F(n) for large values of n efficiently.

Example:
Input: n = 10
Output: 55`,
    hints: [
      'Naive recursion has exponential time complexity',
      'Use memoization to avoid redundant calculations',
      'Bottom-up approach with O(1) space is optimal'
    ],
    timeLimit: 1800, // 30 minutes
    points: 300
  },
  {
    id: 4,
    type: 'string-manipulation',
    difficulty: 'easy',
    title: 'Palindrome Check',
    description: 'Determine if a string is a palindrome.',
    problem: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

Example:
Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.`,
    hints: [
      'Convert to lowercase and remove non-alphanumeric',
      'Use two pointers from start and end',
      'Compare characters moving towards center'
    ],
    timeLimit: 600, // 10 minutes
    points: 80
  },
  {
    id: 5,
    type: 'graph',
    difficulty: 'hard',
    title: 'Shortest Path Algorithm',
    description: 'Find the shortest path between two nodes in a weighted graph.',
    problem: `Given a weighted graph and two nodes, find the shortest path between them.

Graph representation: adjacency list with weights
Example:
graph = {
  'A': [('B', 4), ('C', 2)],
  'B': [('C', 1), ('D', 5)],
  'C': [('D', 8), ('E', 10)],
  'D': [('E', 2)],
  'E': []
}

Find shortest path from 'A' to 'E'`,
    hints: [
      'Dijkstra\'s algorithm for shortest path',
      'Use a priority queue (min-heap)',
      'Keep track of distances and previous nodes'
    ],
    timeLimit: 2400, // 40 minutes
    points: 500
  }
];

const DIFFICULTY_CONFIG = {
  easy: { color: '#27ae60', icon: '🟢', multiplier: 1 },
  medium: { color: '#f39c12', icon: '🟡', multiplier: 1.5 },
  hard: { color: '#e74c3c', icon: '🔴', multiplier: 2 }
};

const AIGamingChallenge = () => {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [showHints, setShowHints] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameMode, setGameMode] = useState('practice'); // practice, timed, tournament
  const [streak, setStreak] = useState(0);

  // Handle time up event
  const handleTimeUp = () => {
    setOutput('⏰ Time\'s up! Challenge failed. Try again or move to the next challenge.');
  };

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeRemaining > 0) {
      const interval = setInterval(() => {
        setTimeRemaining(time => {
          console.log('Timer tick:', time); // Debug log
          if (time <= 1) {
            setIsTimerActive(false);
            handleTimeUp();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
      setIntervalId(interval);
      
      return () => {
        clearInterval(interval);
        setIntervalId(null);
      };
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isTimerActive]);

  const startNewChallenge = useCallback(() => {
    console.log('Starting new challenge...', { availableChallenges: AI_CHALLENGES.length }); // Debug log
    
    // Reset all states first
    setIsTimerActive(false);
    setOutput('');
    setShowHints(false);
    setHintsUsed(0);
    
    // Get available challenges
    const availableChallenges = AI_CHALLENGES.filter(
      c => !completedChallenges.includes(c.id)
    );
    const randomChallenge = availableChallenges.length > 0 
      ? availableChallenges[Math.floor(Math.random() * availableChallenges.length)]
      : AI_CHALLENGES[Math.floor(Math.random() * AI_CHALLENGES.length)];
    
    console.log('Selected challenge:', randomChallenge.title); // Debug log
    console.log('Challenge details:', randomChallenge); // Debug log
    
    // Set challenge and related states
    setCurrentChallenge(randomChallenge);
    setTimeRemaining(randomChallenge.timeLimit);
    setUserCode('// Write your solution here\n\n');
    
    return randomChallenge;
  }, [completedChallenges]);

  const toggleTimer = () => {
    console.log('Toggle timer clicked', { currentChallenge, isTimerActive }); // Debug log
    try {
      if (!currentChallenge) {
        console.log('Starting new challenge...'); // Debug log
        const newChallenge = startNewChallenge();
        if (newChallenge) {
          // Force re-render and start timer
          setTimeout(() => {
            console.log('Challenge set, starting timer...'); // Debug log
            setIsTimerActive(true);
          }, 300);
        }
      } else {
        console.log('Toggling timer state'); // Debug log
        setIsTimerActive(!isTimerActive);
      }
    } catch (error) {
      console.error('Error in toggleTimer:', error);
      setOutput('❌ Error with timer. Please try again.');
    }
  };

  const stopChallenge = () => {
    // Clear any active interval first
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setIsTimerActive(false);
    setTimeRemaining(0);
    setCurrentChallenge(null);
    setUserCode('');
    setOutput('');
    setShowHints(false);
    setHintsUsed(0);
  };

  const resetChallenge = () => {
    console.log('Reset challenge clicked', { currentChallenge }); // Debug log
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    if (currentChallenge) {
      setTimeRemaining(currentChallenge.timeLimit);
      setUserCode('// Write your solution here\n\n');
      setOutput('');
      setIsTimerActive(false);
      setShowHints(false);
      setHintsUsed(0);
    } else {
      // If no current challenge, start a new one
      startNewChallenge();
    }
  };

  const submitSolution = () => {
    if (!userCode.trim()) {
      setOutput('❌ Please write some code before submitting!');
      return;
    }

    // Simulate code execution and validation
    const isCorrect = Math.random() > 0.3; // 70% success rate for demo
    const timeBonus = Math.max(0, timeRemaining / currentChallenge.timeLimit);
    const hintPenalty = hintsUsed * 0.1;
    
    if (isCorrect) {
      const finalScore = Math.round(
        currentChallenge.points * 
        DIFFICULTY_CONFIG[currentChallenge.difficulty].multiplier * 
        (1 + timeBonus - hintPenalty)
      );
      
      setScore(prev => prev + finalScore);
      setCompletedChallenges(prev => [...prev, currentChallenge.id]);
      setStreak(prev => prev + 1);
      setOutput(`🎉 Correct! You earned ${finalScore} points!\n\nTime bonus: ${Math.round(timeBonus * 100)}%\nHint penalty: -${Math.round(hintPenalty * 100)}%`);
      setIsTimerActive(false);
    } else {
      setOutput('❌ Incorrect solution. Check your logic and try again!');
      setStreak(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getHint = () => {
    if (currentChallenge && hintsUsed < currentChallenge.hints.length) {
      setShowHints(true);
      setHintsUsed(prev => prev + 1);
    }
  };

  return (
    <div className="ai-gaming-challenge">
      {/* Header */}
      <div className="challenge-header">
        <div className="header-content">
          <h2><FaBrain /> AI Gaming Challenge</h2>
          <p>Test your problem-solving skills with AI-generated challenges</p>
        </div>
        
        <div className="challenge-stats">
          <div className="stat-item">
            <FaTrophy className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{score}</span>
              <span className="stat-label">Points</span>
            </div>
          </div>
          <div className="stat-item">
            <FaFire className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{streak}</span>
              <span className="stat-label">Streak</span>
            </div>
          </div>
          <div className="stat-item">
            <FaBullseye className="stat-icon" />
            <div className="stat-info">
              <span className="stat-value">{completedChallenges.length}</span>
              <span className="stat-label">Solved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Mode Selection */}
      <div className="game-mode-selector">
        <h3>Game Mode</h3>
        <div className="mode-options">
          {['practice', 'timed', 'tournament'].map(mode => (
            <button
              key={mode}
              className={`mode-btn ${gameMode === mode ? 'active' : ''}`}
              onClick={() => setGameMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Timer Controls */}
      <div className="timer-controls">
        <div className="timer-display">
          <FaClock className="timer-icon" />
          <span className="timer-text">
            {currentChallenge ? formatTime(timeRemaining) : '00:00'}
          </span>
          <span className="timer-status">
            {isTimerActive ? 'Running' : 'Stopped'}
          </span>
        </div>
        
        <div className="control-buttons">
          <button 
            className={`control-btn ${isTimerActive ? 'pause' : 'play'}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Play/Pause button clicked');
              toggleTimer();
            }}
          >
            {isTimerActive ? <FaPause /> : <FaPlay />}
            {isTimerActive ? 'Pause' : currentChallenge ? 'Resume' : 'Start'}
          </button>
          
          <button 
            className="control-btn stop"
            onClick={stopChallenge}
          >
            <FaStop />
            Stop
          </button>
          
          <button 
            className="control-btn reset"
            onClick={resetChallenge}
          >
            <FaRedo />
            Reset
          </button>
        </div>
      </div>

      {/* New Challenge Button */}
      <div className="new-challenge-section">
        <button 
          className="new-challenge-btn"
          onClick={(e) => {
            e.preventDefault();
            console.log('New Challenge button clicked');
            try {
              const newChallenge = startNewChallenge();
              console.log('New challenge created:', newChallenge);
            } catch (error) {
              console.error('Error creating new challenge:', error);
              setOutput('❌ Error creating new challenge. Please try again.');
            }
          }}
        >
          <FaRocket />
          Generate New Challenge
        </button>
      </div>

      {/* Challenge Content */}
      {currentChallenge && (
        <div className="challenge-content">
          <div className="challenge-info">
            <div className="challenge-title">
              <h3>{currentChallenge.title}</h3>
              <div className="challenge-meta">
                <span className="difficulty-badge" style={{ 
                  backgroundColor: DIFFICULTY_CONFIG[currentChallenge.difficulty].color 
                }}>
                  {DIFFICULTY_CONFIG[currentChallenge.difficulty].icon} 
                  {currentChallenge.difficulty.toUpperCase()}
                </span>
                <span className="points-badge">
                  <FaStar /> {currentChallenge.points} pts
                </span>
                <span className="type-badge">
                  <FaCode /> {currentChallenge.type}
                </span>
              </div>
            </div>
            
            <div className="challenge-description">
              <p>{currentChallenge.description}</p>
            </div>
            
            <div className="challenge-problem">
              <h4>Problem Statement</h4>
              <pre>{currentChallenge.problem}</pre>
            </div>
            
            {/* Hints Section */}
            <div className="hints-section">
              <button 
                className="hint-btn"
                onClick={getHint}
                disabled={hintsUsed >= currentChallenge.hints.length}
              >
                <FaLightbulb />
                Get Hint ({hintsUsed}/{currentChallenge.hints.length})
              </button>
              
              {showHints && (
                <div className="hints-display">
                  {currentChallenge.hints.slice(0, hintsUsed).map((hint, index) => (
                    <div key={index} className="hint-item">
                      <FaLightbulb className="hint-icon" />
                      <span>{hint}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Code Editor */}
          <div className="code-editor-section">
            <div className="editor-header">
              <h4><FaCode /> Code Editor</h4>
              <div className="editor-actions">
                <button className="submit-btn" onClick={submitSolution}>
                  <FaRocket />
                  Submit Solution
                </button>
              </div>
            </div>
            
            <textarea
              className="code-textarea"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="Write your solution here..."
              spellCheck={false}
            />
            
            {/* Output Display */}
            <div className="output-section">
              <h4>Output</h4>
              <div className="output-display">
                <pre>{output || 'Run your code to see output...'}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Selection */}
      {!currentChallenge && (
        <div className="challenge-selection">
          <h3>Available Challenges</h3>
          <div className="challenges-grid">
            {AI_CHALLENGES.map(challenge => (
              <div 
                key={challenge.id}
                className={`challenge-card ${completedChallenges.includes(challenge.id) ? 'completed' : ''}`}
                onClick={() => {
                  setCurrentChallenge(challenge);
                  setTimeRemaining(challenge.timeLimit);
                  setUserCode('// Write your solution here\n\n');
                  setOutput('');
                }}
              >
                <div className="challenge-card-header">
                  <h4>{challenge.title}</h4>
                  <span className="difficulty-indicator" style={{
                    color: DIFFICULTY_CONFIG[challenge.difficulty].color
                  }}>
                    {DIFFICULTY_CONFIG[challenge.difficulty].icon}
                  </span>
                </div>
                
                <p className="challenge-card-description">
                  {challenge.description}
                </p>
                
                <div className="challenge-card-meta">
                  <span className="challenge-type">{challenge.type}</span>
                  <span className="challenge-points">{challenge.points} pts</span>
                  <span className="challenge-time">{formatTime(challenge.timeLimit)}</span>
                </div>
                
                {completedChallenges.includes(challenge.id) && (
                  <div className="completed-badge">
                    <FaTrophy /> Completed
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Analytics */}
      <div className="performance-analytics">
        <h3><FaChartLine /> Performance Analytics</h3>
        <div className="analytics-grid">
          <div className="analytics-card">
            <div className="analytics-header">
              <h4>Completion Rate</h4>
              <span className="analytics-value">
                {AI_CHALLENGES.length > 0 ? 
                  Math.round((completedChallenges.length / AI_CHALLENGES.length) * 100) : 0}%
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${AI_CHALLENGES.length > 0 ? 
                    (completedChallenges.length / AI_CHALLENGES.length) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
          
          <div className="analytics-card">
            <div className="analytics-header">
              <h4>Average Score</h4>
              <span className="analytics-value">
                {completedChallenges.length > 0 ? 
                  Math.round(score / completedChallenges.length) : 0}
              </span>
            </div>
          </div>
          
          <div className="analytics-card">
            <div className="analytics-header">
              <h4>Best Streak</h4>
              <span className="analytics-value">{streak}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGamingChallenge;
