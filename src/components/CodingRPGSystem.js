import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaBolt, FaHeart, FaShieldAlt, FaMagic, FaFire, FaLeaf, FaSnowflake, 
  FaTrophy, FaCoins, FaGem, FaStar, FaArrowUp, FaArrowDown, FaArrowLeft, 
  FaArrowRight, FaPlay, FaPause, FaStop, FaHome, FaMap, FaUsers, FaBug, 
  FaDragon, FaSkull, FaCrown, FaRocket, FaHatWizard, FaCode, FaBook 
} from 'react-icons/fa';
import './CodingRPGSystem.css';

const CodingRPGSystem = ({ currentUser, onXPGained }) => {
  const [character, setCharacter] = useState({
    class: 'developer',
    level: 1,
    experience: 0,
    health: 100,
    mana: 100,
    stats: {
      strength: 10, // Raw coding power
      intelligence: 10, // Problem solving
      dexterity: 10, // Code speed
      wisdom: 10, // Best practices
      charisma: 10, // Code readability
      constitution: 10 // Debugging endurance
    },
    skills: [],
    inventory: [],
    gold: 100,
    achievements: [],
    currentQuest: null
  });

  const [gameState, setGameState] = useState({
    currentArea: 'tutorial_village',
    inBattle: false,
    enemy: null,
    battleLog: [],
    questProgress: {}
  });

  const characterClasses = [
    {
      id: 'developer',
      name: 'Full Stack Developer',
      description: 'Balanced warrior of both frontend and backend',
      icon: <FaBook />,
      color: '#3498db',
      primaryStat: 'intelligence',
      skills: ['debugging', 'optimization', 'architecture'],
      startingStats: { strength: 12, intelligence: 15, dexterity: 10, wisdom: 13, charisma: 8, constitution: 12 }
    },
    {
      id: 'wizard',
      name: 'Algorithm Wizard',
      description: 'Master of complex algorithms and data structures',
      icon: <FaMagic />,
      color: '#9b59b6',
      primaryStat: 'wisdom',
      skills: ['algorithms', 'dataStructures', 'mathematics'],
      startingStats: { strength: 8, intelligence: 18, dexterity: 7, wisdom: 16, charisma: 10, constitution: 9 }
    },
    {
      id: 'ninja',
      name: 'Code Ninja',
      description: 'Lightning-fast coder with incredible precision',
      icon: <FaCode />,
      color: '#2c3e50',
      primaryStat: 'dexterity',
      skills: ['speedCoding', 'shortcuts', 'efficiency'],
      startingStats: { strength: 14, intelligence: 12, dexterity: 18, wisdom: 10, charisma: 8, constitution: 10 }
    },
    {
      id: 'paladin',
      name: 'Code Guardian',
      description: 'Defender of clean code and best practices',
      icon: <FaShieldAlt />,
      color: '#f39c12',
      primaryStat: 'constitution',
      skills: ['testing', 'security', 'codeReview'],
      startingStats: { strength: 15, intelligence: 11, dexterity: 9, wisdom: 14, charisma: 12, constitution: 16 }
    },
    {
      id: 'bard',
      name: 'Documentation Bard',
      description: 'Master of communication and readable code',
      icon: <FaBook />,
      color: '#e74c3c',
      primaryStat: 'charisma',
      skills: ['documentation', 'communication', 'collaboration'],
      startingStats: { strength: 9, intelligence: 13, dexterity: 11, wisdom: 12, charisma: 18, constitution: 10 }
    }
  ];

  const gameAreas = [
    {
      id: 'tutorial_village',
      name: '🏘️ Tutorial Village',
      description: 'A peaceful place for new developers to learn the basics',
      enemies: ['syntax_error', 'logic_bug'],
      quests: ['first_program', 'hello_world'],
      minLevel: 1
    },
    {
      id: 'algorithm_forest',
      name: '🌲 Algorithm Forest',
      description: 'Dense woods filled with complex problems',
      enemies: ['infinite_loop', 'stack_overflow', 'memory_leak'],
      quests: ['sorting_challenge', 'tree_traversal'],
      minLevel: 3
    },
    {
      id: 'debugging_dungeon',
      name: '🏰 Debugging Dungeon',
      description: 'Dark caverns where bugs hide in the shadows',
      enemies: ['null_pointer', 'race_condition', 'deadlock'],
      quests: ['bug_hunter', 'exception_handler'],
      minLevel: 5
    },
    {
      id: 'framework_citadel',
      name: '🏯 Framework Citadel',
      description: 'Towering spires of modern web frameworks',
      enemies: ['deprecated_method', 'version_conflict', 'breaking_change'],
      quests: ['react_master', 'api_integration'],
      minLevel: 8
    },
    {
      id: 'performance_peaks',
      name: '⛰️ Performance Peaks',
      description: 'Challenging heights where optimization reigns supreme',
      enemies: ['memory_hog', 'cpu_burner', 'slow_query'],
      quests: ['optimization_guru', 'scaling_master'],
      minLevel: 12
    }
  ];

  const enemies = {
    syntax_error: {
      name: 'Syntax Error',
      health: 30,
      attack: 8,
      defense: 2,
      xpReward: 15,
      goldReward: 10,
      description: 'A pesky creature that corrupts your semicolons'
    },
    logic_bug: {
      name: 'Logic Bug',
      health: 45,
      attack: 12,
      defense: 3,
      xpReward: 25,
      goldReward: 15,
      description: 'Sneaky monster that makes your code behave unexpectedly'
    },
    infinite_loop: {
      name: 'Infinite Loop',
      health: 80,
      attack: 15,
      defense: 5,
      xpReward: 50,
      goldReward: 30,
      description: 'Relentless foe that never stops attacking'
    },
    null_pointer: {
      name: 'Null Pointer Exception',
      health: 120,
      attack: 25,
      defense: 8,
      xpReward: 80,
      goldReward: 50,
      description: 'Deadly specter that strikes when you least expect it'
    }
  };

  const quests = {
    first_program: {
      name: 'Your First Program',
      description: 'Write a simple "Hello, World!" program',
      objectives: ['Write your first line of code', 'Compile successfully', 'Run the program'],
      rewards: { xp: 100, gold: 50, item: 'beginners_guide' },
      area: 'tutorial_village'
    },
    bug_hunter: {
      name: 'The Great Bug Hunt',
      description: 'Eliminate 10 bugs from the debugging dungeon',
      objectives: ['Defeat 10 enemies in debugging dungeon'],
      rewards: { xp: 300, gold: 150, item: 'debugger_sword' },
      area: 'debugging_dungeon'
    }
  };

  const skills = {
    debugging: { name: 'Debugging', maxLevel: 10, effect: '+5% damage to bug-type enemies per level' },
    optimization: { name: 'Optimization', maxLevel: 10, effect: '+3% performance bonus per level' },
    algorithms: { name: 'Algorithm Mastery', maxLevel: 10, effect: '+2% intelligence per level' },
    speedCoding: { name: 'Speed Coding', maxLevel: 10, effect: '+5% dexterity per level' },
    testing: { name: 'Testing', maxLevel: 10, effect: '+10% damage reduction per level' }
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem(`rpg_character_${currentUser?.id}`);
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }
  };

  const saveCharacter = (newCharacter) => {
    localStorage.setItem(`rpg_character_${currentUser?.id}`, JSON.stringify(newCharacter));
    setCharacter(newCharacter);
  };

  const createCharacter = (classId) => {
    const selectedClass = characterClasses.find(c => c.id === classId);
    const newCharacter = {
      ...character,
      class: classId,
      stats: selectedClass.startingStats,
      skills: selectedClass.skills.reduce((acc, skill) => {
        acc[skill] = 1;
        return acc;
      }, {})
    };
    saveCharacter(newCharacter);
  };

  const gainExperience = (amount) => {
    const newExp = character.experience + amount;
    const newLevel = Math.floor(newExp / 100) + 1;
    
    if (newLevel > character.level) {
      levelUp(newLevel);
    }
    
    setCharacter(prev => ({
      ...prev,
      experience: newExp,
      level: newLevel
    }));
    
    onXPGained?.(amount);
  };

  const levelUp = (newLevel) => {
    const statPointsGained = 3;
    const selectedClass = characterClasses.find(c => c.id === character.class);
    
    setCharacter(prev => {
      const newStats = { ...prev.stats };
      newStats[selectedClass.primaryStat] += 2;
      
      // Distribute remaining stat point randomly
      const statKeys = Object.keys(newStats);
      const randomStat = statKeys[Math.floor(Math.random() * statKeys.length)];
      newStats[randomStat] += 1;
      
      return {
        ...prev,
        level: newLevel,
        stats: newStats,
        health: 100, // Full heal on level up
        mana: 100
      };
    });
    
    addToBattleLog(`🎉 Level up! You are now level ${newLevel}!`);
  };

  const startBattle = (enemyId) => {
    const enemyData = enemies[enemyId];
    if (!enemyData) return;
    
    setGameState(prev => ({
      ...prev,
      inBattle: true,
      enemy: {
        ...enemyData,
        currentHealth: enemyData.health,
        id: enemyId
      },
      battleLog: [`A wild ${enemyData.name} appears!`]
    }));
  };

  const attack = () => {
    const damage = calculateDamage();
    const newEnemyHealth = Math.max(0, gameState.enemy.currentHealth - damage);
    
    addToBattleLog(`You deal ${damage} damage!`);
    
    if (newEnemyHealth <= 0) {
      // Enemy defeated
      winBattle();
    } else {
      // Enemy counterattacks
      setGameState(prev => ({
        ...prev,
        enemy: { ...prev.enemy, currentHealth: newEnemyHealth }
      }));
      
      setTimeout(() => {
        enemyAttack();
      }, 1000);
    }
  };

  const calculateDamage = () => {
    const baseDamage = character.stats.strength;
    const variance = Math.floor(Math.random() * 10) - 5;
    return Math.max(1, baseDamage + variance);
  };

  const enemyAttack = () => {
    const damage = Math.max(1, gameState.enemy.attack - character.stats.constitution / 2);
    const newHealth = Math.max(0, character.health - damage);
    
    addToBattleLog(`${gameState.enemy.name} deals ${damage} damage!`);
    
    if (newHealth <= 0) {
      // Player defeated
      addToBattleLog('You have been defeated! Respawning...');
      setCharacter(prev => ({ ...prev, health: 50 }));
      endBattle();
    } else {
      setCharacter(prev => ({ ...prev, health: newHealth }));
    }
  };

  const winBattle = () => {
    const { xpReward, goldReward } = gameState.enemy;
    
    addToBattleLog(`Victory! You gained ${xpReward} XP and ${goldReward} gold!`);
    
    gainExperience(xpReward);
    setCharacter(prev => ({
      ...prev,
      gold: prev.gold + goldReward
    }));
    
    setTimeout(() => {
      endBattle();
    }, 2000);
  };

  const endBattle = () => {
    setGameState(prev => ({
      ...prev,
      inBattle: false,
      enemy: null,
      battleLog: []
    }));
  };

  const addToBattleLog = (message) => {
    setGameState(prev => ({
      ...prev,
      battleLog: [...prev.battleLog.slice(-4), message]
    }));
  };

  const changeArea = (areaId) => {
    const area = gameAreas.find(a => a.id === areaId);
    if (!area || character.level < area.minLevel) return;
    
    setGameState(prev => ({
      ...prev,
      currentArea: areaId
    }));
  };

  const getCurrentArea = () => {
    return gameAreas.find(a => a.id === gameState.currentArea);
  };

  const getHealthPercentage = () => {
    return (character.health / 100) * 100;
  };

  const getManaPercentage = () => {
    return (character.mana / 100) * 100;
  };

  const getSelectedClass = () => {
    return characterClasses.find(c => c.id === character.class);
  };

  if (!character.class || character.level === 0) {
    return (
      <div className="coding-rpg-system">
        <div className="character-creation">
          <h2>🎮 Create Your Coding Hero</h2>
          <p>Choose your path in the world of programming</p>
          <div className="class-selection">
            {characterClasses.map(cls => (
              <div key={cls.id} className="class-option" onClick={() => createCharacter(cls.id)}>
                <div className="class-icon" style={{ color: cls.color }}>
                  {cls.icon}
                </div>
                <h3>{cls.name}</h3>
                <p>{cls.description}</p>
                <div className="class-stats">
                  <strong>Primary Stat:</strong> {cls.primaryStat}
                </div>
                <div className="class-skills">
                  <strong>Starting Skills:</strong> {cls.skills.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentArea = getCurrentArea();
  const selectedClass = getSelectedClass();

  return (
    <div className="coding-rpg-system">
      <div className="rpg-header">
        <h2>⚔️ Coding RPG Adventure</h2>
        <div className="character-info">
          <div className="character-avatar" style={{ color: selectedClass.color }}>
            {selectedClass.icon}
          </div>
          <div className="character-details">
            <h3>{selectedClass.name} - Level {character.level}</h3>
            <div className="health-mana-bars">
              <div className="stat-bar health">
                <label>❤️ Health</label>
                <div className="bar">
                  <div className="fill" style={{ width: `${getHealthPercentage()}%` }}></div>
                </div>
                <span>{character.health}/100</span>
              </div>
              <div className="stat-bar mana">
                <label>⚡ Mana</label>
                <div className="bar">
                  <div className="fill" style={{ width: `${getManaPercentage()}%` }}></div>
                </div>
                <span>{character.mana}/100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {gameState.inBattle ? (
        <div className="battle-screen">
          <div className="battle-arena">
            <div className="player-side">
              <div className="character-battle-avatar" style={{ color: selectedClass.color }}>
                {selectedClass.icon}
              </div>
              <div className="character-battle-info">
                <h4>Level {character.level} {selectedClass.name}</h4>
                <div className="battle-health-bar">
                  <div className="fill" style={{ width: `${getHealthPercentage()}%` }}></div>
                </div>
              </div>
            </div>

            <div className="vs-indicator">VS</div>

            <div className="enemy-side">
              <div className="enemy-avatar">
                <FaDragon />
              </div>
              <div className="enemy-info">
                <h4>{gameState.enemy.name}</h4>
                <div className="battle-health-bar enemy">
                  <div 
                    className="fill" 
                    style={{ 
                      width: `${(gameState.enemy.currentHealth / gameState.enemy.health) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="battle-log">
            {gameState.battleLog.map((log, index) => (
              <div key={index} className="log-entry">{log}</div>
            ))}
          </div>

          <div className="battle-actions">
            <button className="battle-btn attack" onClick={attack}>
              <FaRocket /> Attack
            </button>
            <button className="battle-btn defend">
              <FaShieldAlt /> Defend
            </button>
            <button className="battle-btn magic">
              <FaMagic /> Cast Spell
            </button>
            <button className="battle-btn flee" onClick={endBattle}>
              🏃 Flee
            </button>
          </div>
        </div>
      ) : (
        <div className="exploration-screen">
          <div className="current-area">
            <h3>{currentArea.name}</h3>
            <p>{currentArea.description}</p>
          </div>

          <div className="area-navigation">
            <h4>🗺️ Available Areas</h4>
            <div className="areas-grid">
              {gameAreas.map(area => (
                <button
                  key={area.id}
                  className={`area-btn ${gameState.currentArea === area.id ? 'current' : ''} ${character.level < area.minLevel ? 'locked' : ''}`}
                  onClick={() => changeArea(area.id)}
                  disabled={character.level < area.minLevel}
                >
                  <span className="area-name">{area.name}</span>
                  <span className="area-level">Level {area.minLevel}+</span>
                  {character.level < area.minLevel && <span className="locked-indicator">🔒</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="area-actions">
            <h4>⚔️ Battle Enemies</h4>
            <div className="enemies-grid">
              {currentArea.enemies.map(enemyId => {
                const enemy = enemies[enemyId];
                return (
                  <button
                    key={enemyId}
                    className="enemy-btn"
                    onClick={() => startBattle(enemyId)}
                  >
                    <FaDragon />
                    <span>{enemy.name}</span>
                    <span className="enemy-reward">+{enemy.xpReward} XP</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="character-stats">
            <h4>📊 Character Stats</h4>
            <div className="stats-grid">
              {Object.entries(character.stats).map(([stat, value]) => (
                <div key={stat} className="stat-item">
                  <span className="stat-name">{stat}</span>
                  <span className="stat-value">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodingRPGSystem;
