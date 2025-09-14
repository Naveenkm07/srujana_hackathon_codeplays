import React, { useState, useEffect } from 'react';
import { 
  FaPlay, FaLock, FaStar, FaTrophy, FaFire, FaGamepad, 
  FaCode, FaBrain, FaPuzzlePiece, FaRocket, FaLightbulb,
  FaHeart, FaPaw, FaMagic, FaMusic, FaCity, FaDragon,
  FaBuilding, FaClock, FaMedal, FaGem
} from 'react-icons/fa';
import ParticleSystem from './ParticleSystem';
import soundEffects from './SoundEffects';
import CodePetSystem from './CodePetSystem';
import AICodeBattle from './AICodeBattle';
import CodeMusicGenerator from './CodeMusicGenerator';
import CodeCityBuilder from './CodeCityBuilder';
import Advanced3DCodingWorld from './Advanced3DCodingWorld';
import AICompanionSystem from './AICompanionSystem';
import CodingRPGSystem from './CodingRPGSystem';
import './GamesSection.css';

const EnhancedGamesSection = ({ currentUser }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameScores, setGameScores] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [answers, setAnswers] = useState([]);
  const [playerLevel, setPlayerLevel] = useState(3);
  const [playerXP, setPlayerXP] = useState(250);
  const [streak, setStreak] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [particles, setParticles] = useState([]);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [coins, setCoins] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentExplanation, setCurrentExplanation] = useState('');
  const [particleEffect, setParticleEffect] = useState({ active: false, type: 'success' });
  const [achievements, setAchievements] = useState([]);
  const [comboCount, setComboCount] = useState(0);
  const [lastCorrectTime, setLastCorrectTime] = useState(0);

  // XP calculation and level progression
  const getXPForNextLevel = (level) => level * 100;
  const getLevelFromXP = (xp) => Math.floor(xp / 100) + 1;

  // Particle effect triggers
  const triggerParticleEffect = (type, duration = 2000) => {
    setParticleEffect({ active: true, type });
    setTimeout(() => {
      setParticleEffect({ active: false, type });
    }, duration);
  };

  // Achievement system
  const checkAchievements = (newXP, newStreak, correctAnswers) => {
    const newAchievements = [];
    
    if (newStreak >= 5 && !achievements.includes('streak_master')) {
      newAchievements.push({
        id: 'streak_master',
        title: '🔥 Streak Master',
        description: 'Got 5 correct answers in a row!',
        xp: 50
      });
    }
    
    if (correctAnswers >= 10 && !achievements.includes('knowledge_seeker')) {
      newAchievements.push({
        id: 'knowledge_seeker',
        title: '🧠 Knowledge Seeker',
        description: 'Answered 10 questions correctly!',
        xp: 75
      });
    }
    
    if (getLevelFromXP(newXP) >= 5 && !achievements.includes('rising_star')) {
      newAchievements.push({
        id: 'rising_star',
        title: '⭐ Rising Star',
        description: 'Reached Level 5!',
        xp: 100
      });
    }
    
    if (newAchievements.length > 0) {
      setAchievements(prev => [...prev, ...newAchievements]);
      triggerParticleEffect('achievement');
      soundEffects.playAchievement();
    }
  };

  // Enhanced scoring with combos and streaks
  const calculateScore = (baseXP, streak, timeBonus = 0) => {
    let multiplier = 1;
    if (streak >= 3) multiplier += 0.5;
    if (streak >= 5) multiplier += 0.5;
    if (streak >= 10) multiplier += 1;
    
    return Math.floor((baseXP + timeBonus) * multiplier);
  };

  // Interactive coding challenges with visual elements
  const codingChallenges = {
    variables: {
      title: "🎯 Variable Master",
      description: "Learn variables by creating a character profile!",
      level: 1,
      blocks: [
        { id: 'var1', text: 'let name = ', type: 'variable', color: '#3498db' },
        { id: 'var2', text: '"Hero"', type: 'string', color: '#e74c3c' },
        { id: 'var3', text: 'let level = ', type: 'variable', color: '#3498db' },
        { id: 'var4', text: '1', type: 'number', color: '#f39c12' },
        { id: 'var5', text: 'let health = ', type: 'variable', color: '#3498db' },
        { id: 'var6', text: '100', type: 'number', color: '#f39c12' }
      ],
      solution: ['var1', 'var2', 'var3', 'var4', 'var5', 'var6'],
      explanation: "🎉 You've created variables to store your character's data! Variables are like magic containers that hold information.",
      xp: 25
    },
    loops: {
      title: "🔄 Loop Adventure",
      description: "Help the robot collect coins using loops!",
      level: 2,
      blocks: [
        { id: 'for1', text: 'for (let i = 0; ', type: 'loop', color: '#9b59b6' },
        { id: 'for2', text: 'i < 5; ', type: 'condition', color: '#27ae60' },
        { id: 'for3', text: 'i++) {', type: 'loop', color: '#9b59b6' },
        { id: 'action1', text: '  robot.moveForward()', type: 'action', color: '#e67e22' },
        { id: 'action2', text: '  robot.collectCoin()', type: 'action', color: '#e67e22' },
        { id: 'for4', text: '}', type: 'loop', color: '#9b59b6' }
      ],
      solution: ['for1', 'for2', 'for3', 'action1', 'action2', 'for4'],
      explanation: "🤖 Amazing! Your loop made the robot collect 5 coins automatically. Loops save time by repeating actions!",
      xp: 35
    },
    functions: {
      title: "🍕 Function Factory",
      description: "Build a pizza-making function!",
      level: 3,
      blocks: [
        { id: 'func1', text: 'function makePizza(', type: 'function', color: '#e74c3c' },
        { id: 'param1', text: 'toppings', type: 'parameter', color: '#f39c12' },
        { id: 'func2', text: ') {', type: 'function', color: '#e74c3c' },
        { id: 'return1', text: '  return "Pizza with " + ', type: 'return', color: '#27ae60' },
        { id: 'param2', text: 'toppings', type: 'parameter', color: '#f39c12' },
        { id: 'func3', text: '}', type: 'function', color: '#e74c3c' }
      ],
      solution: ['func1', 'param1', 'func2', 'return1', 'param2', 'func3'],
      explanation: "🍕 Excellent! Your function can make any type of pizza. Functions are reusable code recipes!",
      xp: 45
    }
  };

  // Mouse hover effects
  const handleMouseEnter = () => {
    soundEffects.playHover();
  };

  // Quiz questions with visual explanations
  const quizQuestions = [
    {
      question: "🎮 What does this code do?\n\nfor (let i = 0; i < 3; i++) {\n  console.log('Hello!')\n}",
      options: ["Prints Hello once", "Prints Hello 3 times", "Creates an error", "Prints Hello forever"],
      correct: 1,
      explanation: "🔄 The loop runs 3 times (i = 0, 1, 2), printing 'Hello!' each time!",
      xp: 15
    },
    {
      question: "🏠 Which is the correct way to create a variable in JavaScript?",
      options: ["variable name = 'John'", "let name = 'John'", "create name = 'John'", "name := 'John'"],
      correct: 1,
      explanation: "✅ 'let' is the modern way to declare variables in JavaScript!",
      xp: 10
    },
    {
      question: "🔍 What will this function return?\n\nfunction add(a, b) {\n  return a + b\n}\nadd(5, 3)",
      options: ["5", "3", "8", "53"],
      correct: 2,
      explanation: "🧮 The function adds 5 + 3 = 8 and returns the result!",
      xp: 20
    },
    {
      question: "🎯 What's the purpose of comments in code?",
      options: ["To make code slower", "To explain what code does", "To create errors", "To hide code"],
      correct: 1,
      explanation: "💡 Comments help explain your code to others (and future you)!",
      xp: 10
    },
    {
      question: "🚀 Which symbol starts a comment in Python?",
      options: ["//", "/*", "#", "<!--"],
      correct: 2,
      explanation: "🐍 Python uses # for single-line comments!",
      xp: 10
    }
  ];

  // Games available to play - Now with unique innovative features!
  const codeGames = [
    {
      id: 'quiz',
      title: '🧠 Code Quiz Arena',
      description: 'Test your programming knowledge with timed challenges!',
      icon: <FaBrain />,
      difficulty: 'Easy',
      minLevel: 1,
      xpReward: 50,
      color: '#3498db',
      type: 'quiz',
      unlocked: true
    },
    {
      id: 'drag-code',
      title: '🧩 Code Builder',
      description: 'Drag and drop code blocks to create working programs!',
      icon: <FaCode />,
      difficulty: 'Easy',
      minLevel: 1,
      xpReward: 75,
      color: '#9b59b6',
      type: 'drag-code',
      unlocked: true
    },
    {
      id: 'code-pets',
      title: '🐾 Code Pet Evolution',
      description: 'Nurture coding companions that evolve as you learn!',
      icon: <FaDragon />,
      difficulty: 'Unique',
      minLevel: 1,
      xpReward: 0,
      color: '#ff6b6b',
      type: 'code-pets',
      unlocked: true,
      isSpecial: true
    },
    {
      id: 'ai-battle',
      title: '⚔️ AI Code Battle',
      description: 'Epic turn-based battles using coding spells!',
      icon: <FaMagic />,
      difficulty: 'Epic',
      minLevel: 2,
      xpReward: 0,
      color: '#ff4757',
      type: 'ai-battle',
      unlocked: playerLevel >= 2,
      isSpecial: true
    },
    {
      id: 'music-generator',
      title: '🎵 Code Music Studio',
      description: 'Transform your code into beautiful melodies!',
      icon: <FaMusic />,
      difficulty: 'Creative',
      minLevel: 1,
      xpReward: 0,
      color: '#ffa502',
      type: 'music-generator',
      unlocked: true,
      isSpecial: true
    },
    {
      id: 'city-builder',
      title: '🏗️ Code City Builder',
      description: 'Build a thriving metropolis with programming concepts!',
      icon: <FaCity />,
      difficulty: 'Advanced',
      minLevel: 4,
      xpReward: 0,
      color: '#27ae60',
      type: 'city-builder',
      unlocked: playerLevel >= 4,
      isSpecial: true
    },
    {
      id: '3d-world',
      title: '🌌 3D Coding Universe',
      description: 'Immersive 3D world where code becomes reality!',
      icon: <FaRocket />,
      difficulty: 'Epic',
      minLevel: 6,
      xpReward: 0,
      color: '#8e44ad',
      type: '3d-world',
      unlocked: playerLevel >= 6,
      isSpecial: true
    },
    {
      id: 'ai-companion',
      title: '🤖 AI Coding Companion',
      description: 'Your personal AI assistant for coding mastery!',
      icon: <FaBrain />,
      difficulty: 'Legendary',
      minLevel: 3,
      xpReward: 0,
      color: '#e67e22',
      type: 'ai-companion',
      unlocked: playerLevel >= 3,
      isSpecial: true
    },
    {
      id: 'coding-rpg',
      title: '⚔️ Coding RPG Adventure',
      description: 'Epic RPG where you battle bugs and level up your skills!',
      icon: <FaDragon />,
      difficulty: 'Mythic',
      minLevel: 8,
      xpReward: 0,
      color: '#c0392b',
      type: 'coding-rpg',
      unlocked: playerLevel >= 8,
      isSpecial: true
    },
    {
      id: 'robot',
      title: '🤖 Robot Commander',
      description: 'Program a robot to navigate mazes and collect items!',
      icon: <FaRocket />,
      difficulty: 'Medium',
      minLevel: 2,
      xpReward: 80,
      color: '#e74c3c',
      type: 'debug',
      unlocked: playerLevel >= 2
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

  // Initialize coins for robot game
  useEffect(() => {
    if (selectedGame?.type === 'robot') {
      setCoins([
        { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }
      ]);
      setRobotPosition({ x: 0, y: 0 });
    }
  }, [selectedGame]);

  const startGame = (game) => {
    setSelectedGame(game);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(60);
    setStreak(0);
    setComboCount(0);
    setLastCorrectTime(0);
    setShowExplanation(false);
    
    soundEffects.playStart();
    
    // Special games don't need traditional game setup
    if (game.isSpecial) {
      setGameActive(true);
      return;
    }
    
    if (game.type === 'drag-code') {
      const challengeTypes = Object.keys(codingChallenges);
      const randomChallenge = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
      startDragCodeGame(randomChallenge);
    } else {
      setGameActive(true);
    }
  };

  const endGame = () => {
    setGameActive(false);
    const finalScore = score;
    setGameScores(prev => ({
      ...prev,
      [selectedGame.id]: Math.max(prev[selectedGame.id] || 0, finalScore)
    }));
    
    if (selectedGame.xpReward) {
      const bonusXP = streak * 10;
      addXP(selectedGame.xpReward + bonusXP);
    }
    
    soundEffects.playComplete();
    triggerParticleEffect('success', 3000);
  };

  const handleAnswer = (answerIndex) => {
    const question = quizQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    const currentTime = Date.now();
    
    if (isCorrect) {
      const points = question.xp || 10;
      const timeBonus = timeLeft > 30 ? 5 : 0;
      const newStreak = streak + 1;
      
      // Check for combo (answers within 3 seconds)
      if (currentTime - lastCorrectTime < 3000 && lastCorrectTime > 0) {
        setComboCount(prev => prev + 1);
        soundEffects.playCombo(comboCount + 1);
      } else {
        setComboCount(0);
      }
      
      const totalPoints = calculateScore(points, newStreak, timeBonus);
      setScore(score + totalPoints);
      setStreak(newStreak);
      setLastCorrectTime(currentTime);
      
      addXP(totalPoints);
      triggerParticleEffect('success');
      soundEffects.playCorrect();
      
      // Check achievements
      checkAchievements(playerXP + totalPoints, newStreak, answers.filter(a => a.correct).length + 1);
    } else {
      setStreak(0);
      setComboCount(0);
      triggerParticleEffect('explosion');
      soundEffects.playIncorrect();
    }
    
    setAnswers([...answers, { 
      question: currentQuestion, 
      answer: answerIndex, 
      correct: isCorrect,
      explanation: question.explanation
    }]);

    // Show explanation
    setCurrentExplanation(question.explanation);
    setShowExplanation(true);
    
    // Show explanation for 2 seconds before next question
    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        endGame();
      }
    }, 2500);
  };

  const addXP = (amount) => {
    const newXP = playerXP + amount;
    const currentLevel = getLevelFromXP(playerXP);
    const newLevel = getLevelFromXP(newXP);
    
    setPlayerXP(newXP);
    
    if (newLevel > currentLevel) {
      setPlayerLevel(newLevel);
      setShowLevelUp(true);
      triggerParticleEffect('levelup', 3000);
      soundEffects.playLevelUp();
      setTimeout(() => setShowLevelUp(false), 4000);
    }
  };

  const createParticles = (type) => {
    // Particles are now handled by ParticleSystem component
    triggerParticleEffect(type);
  };

  const onDragStart = (e, block) => {
    setDraggedBlock(block);
    e.dataTransfer.effectAllowed = 'move';
    soundEffects.playClick();
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedBlock) {
      const newCodeBlocks = [...codeBlocks];
      newCodeBlocks[targetIndex] = draggedBlock;
      setCodeBlocks(newCodeBlocks);
      setDraggedBlock(null);
      soundEffects.playClick();
    }
  };

  const checkCodeSolution = (challengeType) => {
    const challenge = codingChallenges[challengeType];
    const isCorrect = JSON.stringify(codeBlocks.map(b => b?.id)) === JSON.stringify(challenge.solution);
    
    if (isCorrect) {
      addXP(100);
      createParticles('success');
      setCompletedLevels([...completedLevels, challengeType]);
      setCurrentExplanation(challenge.explanation);
      setShowExplanation(true);
      setTimeout(() => setShowExplanation(false), 3000);
      
      if (challengeType === 'loops') {
        simulateRobotMovement();
      }
    } else {
      createParticles('fail');
      alert('🤔 Not quite right! Try rearranging the blocks.');
    }
  };

  const simulateRobotMovement = () => {
    let pos = { x: 0, y: 0 };
    let collectedCoins = [];
    
    const moveSequence = [
      { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }
    ];
    
    moveSequence.forEach((newPos, index) => {
      setTimeout(() => {
        setRobotPosition(newPos);
        collectedCoins.push(newPos);
        setCoins(prev => prev.filter(coin => coin.x !== newPos.x || coin.y !== newPos.y));
      }, (index + 1) * 500);
    });
  };

  const startDragCodeGame = (challengeType) => {
    const challenge = codingChallenges[challengeType];
    setSelectedGame({ ...challenge, type: 'drag-code', challengeType });
    setCodeBlocks(new Array(challenge.solution.length).fill(null));
    setGameActive(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#27ae60';
      case 'Medium': return '#f39c12';
      case 'Hard': return '#e74c3c';
      default: return '#95a5a6';
    }
  };

  const getXPProgress = () => {
    const xpForNextLevel = playerLevel * 100;
    return (playerXP / xpForNextLevel) * 100;
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameActive(false);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(60);
    setCodeBlocks([]);
    setShowExplanation(false);
  };

  // Special Games UI
  if (selectedGame?.type === 'code-pets' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <CodePetSystem 
          playerXP={playerXP} 
          onXPSpent={(amount) => setPlayerXP(prev => prev - amount)}
        />
      </div>
    );
  }

  if (selectedGame?.type === 'ai-battle' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <AICodeBattle 
          playerLevel={playerLevel} 
          onXPGained={(amount) => setPlayerXP(prev => prev + amount)}
        />
      </div>
    );
  }

  if (selectedGame?.type === 'music-generator' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <CodeMusicGenerator 
          onXPGained={(amount) => setPlayerXP(prev => prev + amount)}
        />
      </div>
    );
  }

  if (selectedGame?.type === 'city-builder' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <CodeCityBuilder 
          playerXP={playerXP}
          onXPSpent={(amount) => setPlayerXP(prev => prev - amount)}
          onXPGained={(amount) => setPlayerXP(prev => prev + amount)}
        />
      </div>
    );
  }

  if (selectedGame?.type === '3d-world' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <Advanced3DCodingWorld 
          currentUser={currentUser}
          onXPGained={(amount) => setPlayerXP(prev => prev + amount)}
        />
      </div>
    );
  }

  if (selectedGame?.type === 'ai-companion' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <AICompanionSystem 
          currentUser={currentUser}
          onXPGained={(amount) => setPlayerXP(prev => prev + amount)}
        />
      </div>
    );
  }

  if (selectedGame?.type === 'coding-rpg' && gameActive) {
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
        </div>
        <CodingRPGSystem 
          currentUser={currentUser}
          onXPGained={(amount) => setPlayerXP(prev => prev + amount)}
        />
      </div>
    );
  }

  // Drag and Drop Game UI
  if (selectedGame?.type === 'drag-code' && gameActive) {
    const challenge = codingChallenges[selectedGame.challengeType];
    
    return (
      <div className="games-section">
        <div className="game-header">
          <button className="back-btn" onClick={resetGame}>
            ← Back to Games
          </button>
          <div className="game-info">
            <h2>{selectedGame.title}</h2>
            <p>{selectedGame.description}</p>
          </div>
        </div>

        <div className="drag-drop-container">
          <div className="code-blocks-palette">
            <h3>📦 Code Blocks</h3>
            <div className="blocks-grid">
              {challenge.blocks.map(block => (
                <div
                  key={block.id}
                  className="code-block"
                  style={{ backgroundColor: block.color }}
                  draggable
                  onDragStart={(e) => onDragStart(e, block)}
                >
                  {block.text}
                </div>
              ))}
            </div>
          </div>

          <div className="code-editor">
            <h3>🎯 Drop blocks here to build your code:</h3>
            <div className="drop-zone">
              {codeBlocks.map((block, index) => (
                <div
                  key={index}
                  className={`drop-slot ${block ? 'filled' : 'empty'}`}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index)}
                  style={{ backgroundColor: block?.color || '#f8f9fa' }}
                >
                  {block ? block.text : `Drop block ${index + 1} here`}
                </div>
              ))}
            </div>
            
            <button 
              className="check-solution-btn"
              onClick={() => checkCodeSolution(selectedGame.challengeType)}
              disabled={codeBlocks.some(block => !block)}
            >
              🚀 Run Code!
            </button>
          </div>

          {selectedGame.challengeType === 'loops' && (
            <div className="robot-world">
              <h3>🤖 Robot World</h3>
              <div className="grid">
                {[...Array(5)].map((_, x) => (
                  <div key={x} className="grid-cell">
                    {robotPosition.x === x && <div className="robot">🤖</div>}
                    {coins.some(coin => coin.x === x) && <div className="coin">🪙</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {showExplanation && (
          <div className="explanation-popup">
            <div className="explanation-content">
              {currentExplanation}
            </div>
          </div>
        )}

        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle ${particle.type}`}
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          />
        ))}
      </div>
    );
  }

  // Quiz Game UI
  if (selectedGame?.type === 'quiz' && gameActive) {
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
                <FaStar /> {score} XP
              </div>
              <div className="stat">
                <FaFire /> {streak} streak
              </div>
              <div className="stat">
                Question {currentQuestion + 1}/{quizQuestions.length}
              </div>
            </div>
          </div>
        </div>

        {!showExplanation ? (
          <div className="quiz-container">
            <div className="question-card">
              <div className="question-header">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>
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
        ) : (
          <div className="explanation-screen">
            <div className="explanation-card">
              <h3>{answers[answers.length - 1]?.correct ? '🎉 Correct!' : '❌ Not quite!'}</h3>
              <p>{currentExplanation}</p>
              {answers[answers.length - 1]?.correct && (
                <div className="xp-gained">
                  +{quizQuestions[currentQuestion].xp} XP
                  {streak > 1 && <span className="streak-bonus">+{streak * 2} Streak Bonus!</span>}
                </div>
              )}
            </div>
          </div>
        )}

        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle ${particle.type}`}
            style={{ left: `${particle.x}%`, top: `${particle.y}%` }}
          />
        ))}

        {showLevelUp && (
          <div className="level-up-popup">
            <div className="level-up-content">
              <h2>🎊 LEVEL UP! 🎊</h2>
              <div className="new-level">Level {playerLevel}</div>
              <p>You're getting stronger! New games unlocked!</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Game Results Screen
  if (selectedGame && !gameActive) {
    return (
      <div className="games-section">
        <div className="game-results">
          <div className="results-card">
            <div className="results-header">
              <FaTrophy className="trophy-icon" />
              <h2>Mission Complete!</h2>
            </div>
            <div className="final-score">
              <span className="score-label">XP Earned</span>
              <span className="score-value">{score} XP</span>
            </div>
            <div className="results-summary">
              <p>You answered {answers.filter(a => a.correct).length} out of {answers.length} questions correctly!</p>
              <p>Streak: {Math.max(...answers.map((_, i) => answers.slice(0, i + 1).reverse().findIndex(a => !a.correct) || i + 1), 0)}</p>
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

  // Main Games Dashboard
  return (
    <div className="games-section">
      <div className="section-header">
        <h2><FaGamepad className="section-icon" /> CodePlay Arena</h2>
        <p>Level up your coding skills through epic adventures!</p>
      </div>

      {/* Player Stats */}
      <div className="player-profile">
        <div className="profile-card">
          <div className="avatar">
            <FaMedal className="avatar-icon" />
          </div>
          <div className="player-info">
            <h3>Level {playerLevel} Coder</h3>
            <div className="xp-bar">
              <div className="xp-fill" style={{ width: `${getXPProgress()}%` }} />
              <span className="xp-text">{playerXP} / {playerLevel * 100} XP</span>
            </div>
          </div>
        </div>
        
        <div className="user-stats">
          <div className="stat-card">
            <FaGem />
            <div>
              <span className="stat-number">{Object.values(gameScores).reduce((a, b) => a + b, 0)}</span>
              <span className="stat-label">Total XP</span>
            </div>
          </div>
          <div className="stat-card">
            <FaTrophy />
            <div>
              <span className="stat-number">{completedLevels.length}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <FaFire />
            <div>
              <span className="stat-number">{Math.max(...Object.values(gameScores), 0)}</span>
              <span className="stat-label">Best Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="games-grid">
        {codeGames.map(game => (
          <div 
            key={game.id} 
            className={`game-card ${!game.unlocked ? 'locked' : ''} ${game.isSpecial ? 'special-game' : ''}`} 
            style={{borderLeft: `4px solid ${game.color}`}}
            onMouseEnter={handleMouseEnter}
          >
            <div className="game-icon" style={{color: game.color}}>
              {game.unlocked ? game.icon : <FaLock />}
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
                {game.isSpecial ? (
                  <span className="special-badge">
                    ✨ UNIQUE
                  </span>
                ) : (
                  <span className="points-badge">
                    <FaStar /> {game.xpReward} XP
                  </span>
                )}
                {!game.unlocked && (
                  <span className="level-requirement">
                    🔒 Level {game.minLevel}
                  </span>
                )}
              </div>
              {gameScores[game.id] && (
                <div className="high-score">
                  Best: {gameScores[game.id]} XP
                </div>
              )}
            </div>
            <button 
              className="play-btn"
              onClick={() => startGame(game)}
              disabled={!game.unlocked}
              style={{backgroundColor: game.unlocked ? game.color : '#95a5a6'}}
            >
              {game.unlocked ? <><FaPlay /> {game.isSpecial ? 'Experience' : 'Play'}</> : <><FaLock /> Locked</>}
            </button>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="achievements-section">
        <h3><FaTrophy /> Achievements</h3>
        <div className="achievements-grid">
          <div className={`achievement ${Object.keys(gameScores).length > 0 || gameActive || selectedGame ? 'unlocked' : ''}`}>
            <FaGamepad />
            <span>First Steps</span>
            <small>Play your first game</small>
          </div>
          <div className={`achievement ${playerLevel >= 2 || playerXP >= 100 ? 'unlocked' : ''}`}>
            <FaMedal />
            <span>Rising Star</span>
            <small>Reach Level 2</small>
          </div>
          <div className={`achievement ${playerXP >= 200 || Object.values(gameScores).reduce((a, b) => a + b, 0) >= 200 ? 'unlocked' : ''}`}>
            <FaStar />
            <span>XP Master</span>
            <small>Earn 200+ XP</small>
          </div>
          <div className={`achievement ${completedLevels.length >= 1 || answers.filter(a => a.correct).length >= 3 ? 'unlocked' : ''}`}>
            <FaTrophy />
            <span>Code Warrior</span>
            <small>Complete 3 challenges</small>
          </div>
          <div className={`achievement ${playerLevel >= 3 || playerXP >= 300 ? 'unlocked' : ''}`}>
            <FaRocket />
            <span>Elite Coder</span>
            <small>Reach Level 3</small>
          </div>
        </div>
      </div>

      {/* Particle System for Visual Effects */}
      <ParticleSystem 
        active={particleEffect.active}
        type={particleEffect.type}
        particleCount={particleEffect.type === 'levelup' ? 100 : 50}
        onComplete={() => setParticleEffect({ active: false, type: 'success' })}
      />

      {/* Level Up Animation */}
      {showLevelUp && (
        <div className="level-up-overlay">
          <div className="level-up-animation">
            <div className="level-up-star">⭐</div>
            <h1 className="level-up-title">LEVEL UP!</h1>
            <div className="level-up-number">Level {playerLevel}</div>
            <p className="level-up-message">New challenges unlocked!</p>
          </div>
        </div>
      )}

      {/* Achievements Notification */}
      {achievements.length > 0 && (
        <div className="achievement-notification">
          {achievements.slice(-1).map(achievement => (
            <div key={achievement.id} className="achievement-popup">
              <div className="achievement-icon">🏆</div>
              <div className="achievement-content">
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
                <span className="achievement-xp">+{achievement.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedGamesSection;
