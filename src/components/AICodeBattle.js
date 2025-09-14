import React, { useState, useEffect } from 'react';
import { FaSword, FaShield, FaLightning, FaFire, FaSnowflake, FaCrown, FaRobot } from 'react-icons/fa';
import soundEffects from './SoundEffects';

const AICodeBattle = ({ playerLevel, onXPGained }) => {
  const [battleState, setBattleState] = useState('menu'); // menu, battle, victory, defeat
  const [playerHealth, setPlayerHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [currentEnemy, setCurrentEnemy] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [round, setRound] = useState(1);
  const [streak, setStreak] = useState(0);

  // AI Enemies with different personalities and attack patterns
  const enemies = [
    {
      id: 'syntax-demon',
      name: 'Syntax Demon',
      emoji: '👹',
      health: 80,
      level: 1,
      attacks: ['Missing Semicolon', 'Bracket Hell', 'Typo Terror'],
      weakness: 'debugging',
      strength: 'confusion',
      color: '#ff4757'
    },
    {
      id: 'logic-lord',
      name: 'Logic Lord',
      emoji: '🧙‍♂️',
      health: 120,
      level: 2,
      attacks: ['Infinite Loop', 'Boolean Trap', 'Conditional Chaos'],
      weakness: 'algorithm',
      strength: 'logic',
      color: '#3742fa'
    },
    {
      id: 'bug-boss',
      name: 'Bug Boss',
      emoji: '🐛',
      health: 150,
      level: 3,
      attacks: ['Memory Leak', 'Stack Overflow', 'Null Pointer'],
      weakness: 'testing',
      strength: 'stealth',
      color: '#2ed573'
    },
    {
      id: 'complexity-king',
      name: 'Complexity King', 
      emoji: '👑',
      health: 200,
      level: 4,
      attacks: ['O(n²) Curse', 'Recursive Doom', 'Time Limit Exceeded'],
      weakness: 'optimization',
      strength: 'complexity',
      color: '#ff6b00'
    }
  ];

  // Player spells based on coding concepts
  const spells = [
    {
      id: 'debug',
      name: 'Debug Bolt',
      emoji: '🔍',
      damage: [15, 25],
      manaCost: 10,
      type: 'debugging',
      description: 'A focused beam that finds and fixes errors',
      effect: 'Extra damage vs Syntax enemies'
    },
    {
      id: 'refactor',
      name: 'Refactor Ray',
      emoji: '⚡',
      damage: [20, 30],
      manaCost: 15,
      type: 'optimization',
      description: 'Optimizes code and deals massive damage',
      effect: 'Extra damage vs Complexity enemies'
    },
    {
      id: 'unittest',
      name: 'Unit Test Shield',
      emoji: '🛡️',
      damage: [5, 10],
      manaCost: 12,
      type: 'testing',
      description: 'Protects and counters with testing power',
      effect: 'Blocks next attack and reflects damage'
    },
    {
      id: 'algorithm',
      name: 'Algorithm Assault',
      emoji: '🧠',
      damage: [25, 35],
      manaCost: 20,
      type: 'algorithm',
      description: 'A calculated strike using perfect logic',
      effect: 'Extra damage vs Logic enemies'
    },
    {
      id: 'cleanup',
      name: 'Code Cleanup',
      emoji: '✨',
      damage: [10, 15],
      manaCost: 8,
      type: 'maintenance',
      description: 'Cleans up code and heals the caster',
      effect: 'Heals player for 15 HP'
    }
  ];

  const [playerMana, setPlayerMana] = useState(50);
  const [playerShield, setPlayerShield] = useState(0);

  const startBattle = (enemy) => {
    setCurrentEnemy({ ...enemy, health: enemy.health });
    setPlayerHealth(100);
    setPlayerMana(50);
    setPlayerShield(0);
    setEnemyHealth(enemy.health);
    setBattleLog([]);
    setBattleState('battle');
    addToBattleLog(`⚔️ Battle begins! You face the ${enemy.name}!`);
    soundEffects.playStart();
  };

  const addToBattleLog = (message) => {
    setBattleLog(prev => [...prev.slice(-4), message]);
  };

  const castSpell = (spell) => {
    if (playerMana < spell.manaCost) {
      addToBattleLog("❌ Not enough mana!");
      return;
    }

    setPlayerMana(prev => prev - spell.manaCost);
    
    // Calculate damage
    let damage = Math.floor(Math.random() * (spell.damage[1] - spell.damage[0] + 1)) + spell.damage[0];
    
    // Type effectiveness
    if (spell.type === currentEnemy.weakness) {
      damage = Math.floor(damage * 1.5);
      addToBattleLog(`🎯 Super effective!`);
    }
    
    // Special effects
    if (spell.id === 'unittest') {
      setPlayerShield(20);
      addToBattleLog(`🛡️ You cast ${spell.name}! Shield activated!`);
    } else if (spell.id === 'cleanup') {
      setPlayerHealth(prev => Math.min(100, prev + 15));
      addToBattleLog(`✨ You cast ${spell.name}! You heal 15 HP!`);
    } else {
      addToBattleLog(`⚡ You cast ${spell.name} for ${damage} damage!`);
    }
    
    setEnemyHealth(prev => Math.max(0, prev - damage));
    
    // Check if enemy is defeated
    if (enemyHealth - damage <= 0) {
      setTimeout(() => {
        victory();
      }, 1000);
      return;
    }
    
    // Enemy turn
    setTimeout(() => {
      enemyAttack();
    }, 1500);
  };

  const enemyAttack = () => {
    const attack = currentEnemy.attacks[Math.floor(Math.random() * currentEnemy.attacks.length)];
    let damage = Math.floor(Math.random() * 20) + 15;
    
    // Shield protection
    if (playerShield > 0) {
      const blockedDamage = Math.min(damage, playerShield);
      damage -= blockedDamage;
      setPlayerShield(prev => prev - blockedDamage);
      addToBattleLog(`🛡️ Shield blocks ${blockedDamage} damage!`);
      
      if (playerShield - blockedDamage > 0) {
        // Reflect damage
        const reflectDamage = Math.floor(blockedDamage * 0.5);
        setEnemyHealth(prev => Math.max(0, prev - reflectDamage));
        addToBattleLog(`⚡ Shield reflects ${reflectDamage} damage!`);
      }
    }
    
    if (damage > 0) {
      setPlayerHealth(prev => Math.max(0, prev - damage));
      addToBattleLog(`💥 ${currentEnemy.name} uses ${attack} for ${damage} damage!`);
    }
    
    // Check if player is defeated
    if (playerHealth - damage <= 0) {
      setTimeout(() => {
        defeat();
      }, 1000);
      return;
    }
    
    // Restore some mana
    setPlayerMana(prev => Math.min(50, prev + 5));
  };

  const victory = () => {
    setBattleState('victory');
    const xpGained = currentEnemy.level * 25 + (streak * 10);
    setStreak(prev => prev + 1);
    onXPGained(xpGained);
    addToBattleLog(`🎉 Victory! You gained ${xpGained} XP!`);
    soundEffects.playComplete();
  };

  const defeat = () => {
    setBattleState('defeat');
    setStreak(0);
    addToBattleLog(`💀 Defeat! The ${currentEnemy.name} was too powerful...`);
    soundEffects.playError();
  };

  const returnToMenu = () => {
    setBattleState('menu');
    setSelectedSpell(null);
  };

  // Battle UI
  if (battleState === 'battle') {
    return (
      <div className="ai-battle-arena">
        <div className="battle-header">
          <h3>⚔️ AI Code Battle Arena</h3>
          <div className="round-info">Round {round} | Streak: {streak}</div>
        </div>

        <div className="battle-field">
          {/* Player Side */}
          <div className="combatant player-side">
            <div className="combatant-avatar">
              <div className="player-avatar">👨‍💻</div>
              <div className="health-bar">
                <div className="health-fill" style={{ width: `${playerHealth}%` }}></div>
                <span>{playerHealth}/100 HP</span>
              </div>
              <div className="mana-bar">
                <div className="mana-fill" style={{ width: `${(playerMana/50)*100}%` }}></div>
                <span>{playerMana}/50 MP</span>
              </div>
              {playerShield > 0 && (
                <div className="shield-indicator">🛡️ {playerShield}</div>
              )}
            </div>
          </div>

          {/* VS Indicator */}
          <div className="vs-indicator">
            <div className="vs-text">VS</div>
            <div className="battle-effects">⚡💥⚡</div>
          </div>

          {/* Enemy Side */}
          <div className="combatant enemy-side">
            <div className="combatant-avatar">
              <div className="enemy-avatar" style={{ color: currentEnemy.color }}>
                {currentEnemy.emoji}
              </div>
              <div className="health-bar enemy">
                <div className="health-fill" style={{ width: `${(enemyHealth/currentEnemy.health)*100}%` }}></div>
                <span>{enemyHealth}/{currentEnemy.health} HP</span>
              </div>
              <div className="enemy-info">
                <h4>{currentEnemy.name}</h4>
                <p>Lvl {currentEnemy.level}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Battle Log */}
        <div className="battle-log">
          {battleLog.map((message, index) => (
            <div key={index} className="log-message">{message}</div>
          ))}
        </div>

        {/* Spell Selection */}
        <div className="spell-selection">
          <h4>Choose your spell:</h4>
          <div className="spells-grid">
            {spells.map(spell => (
              <button
                key={spell.id}
                className={`spell-button ${playerMana < spell.manaCost ? 'disabled' : ''}`}
                onClick={() => castSpell(spell)}
                disabled={playerMana < spell.manaCost}
                title={spell.description}
              >
                <span className="spell-emoji">{spell.emoji}</span>
                <span className="spell-name">{spell.name}</span>
                <span className="spell-cost">{spell.manaCost} MP</span>
                <span className="spell-damage">{spell.damage[0]}-{spell.damage[1]} DMG</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Victory Screen
  if (battleState === 'victory') {
    return (
      <div className="battle-result victory">
        <div className="result-content">
          <h2>🎉 VICTORY! 🎉</h2>
          <div className="enemy-defeated">
            <span className="defeated-emoji">{currentEnemy.emoji}</span>
            <p>{currentEnemy.name} has been defeated!</p>
          </div>
          <div className="rewards">
            <div className="xp-reward">+{currentEnemy.level * 25 + ((streak-1) * 10)} XP</div>
            {streak > 1 && <div className="streak-bonus">🔥 {streak} Win Streak!</div>}
          </div>
          <div className="victory-actions">
            <button onClick={() => {
              setRound(prev => prev + 1);
              returnToMenu();
            }}>
              🏆 Next Battle
            </button>
            <button onClick={returnToMenu}>
              🏠 Return to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Defeat Screen
  if (battleState === 'defeat') {
    return (
      <div className="battle-result defeat">
        <div className="result-content">
          <h2>💀 DEFEAT 💀</h2>
          <div className="enemy-victorious">
            <span className="victorious-emoji">{currentEnemy.emoji}</span>
            <p>The {currentEnemy.name} proved too powerful...</p>
          </div>
          <div className="defeat-actions">
            <button onClick={() => startBattle(currentEnemy)}>
              ⚔️ Try Again
            </button>
            <button onClick={returnToMenu}>
              🏠 Return to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Menu
  return (
    <div className="ai-battle-menu">
      <div className="battle-title">
        <h3>⚔️ AI Code Battle Arena</h3>
        <p>Challenge AI enemies in epic coding battles!</p>
      </div>

      <div className="player-stats">
        <div className="stat">Current Streak: {streak}</div>
        <div className="stat">Round: {round}</div>
        <div className="stat">Player Level: {playerLevel}</div>
      </div>

      <div className="enemies-grid">
        {enemies.filter(enemy => enemy.level <= Math.max(1, playerLevel - 1) + 2).map(enemy => (
          <div key={enemy.id} className="enemy-card" style={{ borderColor: enemy.color }}>
            <div className="enemy-portrait">
              <span className="enemy-emoji" style={{ color: enemy.color }}>{enemy.emoji}</span>
            </div>
            <div className="enemy-details">
              <h4>{enemy.name}</h4>
              <p>Level {enemy.level}</p>
              <p>❤️ {enemy.health} HP</p>
              <div className="enemy-attacks">
                <strong>Attacks:</strong>
                <ul>
                  {enemy.attacks.map((attack, i) => (
                    <li key={i}>{attack}</li>
                  ))}
                </ul>
              </div>
              <div className="enemy-weakness">
                <strong>Weakness:</strong> {enemy.weakness}
              </div>
            </div>
            <button 
              className="challenge-btn"
              onClick={() => startBattle(enemy)}
              style={{ backgroundColor: enemy.color }}
              disabled={enemy.level > playerLevel + 2}
            >
              {enemy.level > playerLevel + 2 ? '🔒 Locked' : '⚔️ Challenge'}
            </button>
          </div>
        ))}
      </div>

      <div className="battle-guide">
        <h4>🧙‍♂️ Battle Guide</h4>
        <div className="guide-tips">
          <div className="tip">💡 Use type advantages: Debug spells beat Syntax enemies</div>
          <div className="tip">🛡️ Unit Test Shield blocks and reflects damage</div>
          <div className="tip">✨ Code Cleanup heals you while dealing damage</div>
          <div className="tip">🔥 Win streaks give bonus XP rewards</div>
        </div>
      </div>
    </div>
  );
};

export default AICodeBattle;
