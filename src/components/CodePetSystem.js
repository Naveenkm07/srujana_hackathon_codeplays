import React, { useState, useEffect } from 'react';
import { FaHeart, FaAppleAlt, FaGamepad, FaStar, FaFire, FaRocket, FaDragon } from 'react-icons/fa';
import soundEffects from './SoundEffects';

const CodePetSystem = ({ playerXP, onXPSpent }) => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [feedingMode, setFeedingMode] = useState(false);
  const [playingMode, setPlayingMode] = useState(false);

  // Pet evolution stages
  const petStages = {
    egg: { name: 'Code Egg', emoji: '🥚', health: 100, happiness: 50, minXP: 0 },
    baby: { name: 'Byte Buddy', emoji: '🐣', health: 150, happiness: 75, minXP: 50 },
    teen: { name: 'Logic Lizard', emoji: '🦎', health: 200, happiness: 100, minXP: 150 },
    adult: { name: 'Function Fox', emoji: '🦊', health: 300, happiness: 150, minXP: 300 },
    master: { name: 'Algorithm Alchemist', emoji: '🐉', health: 500, happiness: 200, minXP: 600 }
  };

  // Pet personalities and types
  const petTypes = [
    { 
      id: 'python', 
      name: 'Pythonic', 
      color: '#3776ab',
      traits: ['Clean', 'Simple', 'Powerful'],
      specialAbility: 'Data Analysis Boost',
      evolutionBonus: 'Faster XP gain from algorithm challenges'
    },
    { 
      id: 'javascript', 
      name: 'JSmonster', 
      color: '#f7df1e',
      traits: ['Dynamic', 'Flexible', 'Async'],
      specialAbility: 'Web Magic',
      evolutionBonus: 'Extra rewards from web development tasks'
    },
    { 
      id: 'cpp', 
      name: 'C++reature', 
      color: '#00599c',
      traits: ['Fast', 'Powerful', 'Complex'],
      specialAbility: 'Performance Beast',
      evolutionBonus: 'Bonus points for optimization challenges'
    }
  ];

  // Initialize first pet if none exist
  useEffect(() => {
    if (pets.length === 0 && playerXP >= 100) {
      createNewPet();
    }
  }, [playerXP]);

  const createNewPet = () => {
    const randomType = petTypes[Math.floor(Math.random() * petTypes.length)];
    const newPet = {
      id: Date.now(),
      type: randomType,
      stage: 'egg',
      health: 100,
      happiness: 50,
      hunger: 100,
      energy: 100,
      xp: 0,
      totalXPFed: 0,
      birthTime: Date.now(),
      mood: 'neutral',
      skills: {
        debugging: 0,
        algorithm: 0,
        creativity: 0,
        speed: 0
      }
    };
    
    setPets([...pets, newPet]);
    soundEffects.playAchievement();
  };

  const feedPet = (petId, xpAmount) => {
    if (playerXP < xpAmount) return;
    
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        const newTotalXP = pet.totalXPFed + xpAmount;
        const newStage = getEvolutionStage(newTotalXP);
        
        return {
          ...pet,
          hunger: Math.min(100, pet.hunger + (xpAmount / 2)),
          happiness: Math.min(200, pet.happiness + (xpAmount / 3)),
          totalXPFed: newTotalXP,
          stage: newStage,
          mood: 'happy'
        };
      }
      return pet;
    }));
    
    onXPSpent(xpAmount);
    soundEffects.playCorrect();
    
    // Reset mood after a while
    setTimeout(() => {
      setPets(prev => prev.map(pet => 
        pet.id === petId ? { ...pet, mood: 'neutral' } : pet
      ));
    }, 3000);
  };

  const playWithPet = (petId) => {
    setPets(pets.map(pet => {
      if (pet.id === petId) {
        const happinessGain = Math.random() * 20 + 10;
        const skillGain = Math.floor(Math.random() * 3) + 1;
        const randomSkill = Object.keys(pet.skills)[Math.floor(Math.random() * 4)];
        
        return {
          ...pet,
          happiness: Math.min(200, pet.happiness + happinessGain),
          energy: Math.max(0, pet.energy - 15),
          mood: 'playful',
          skills: {
            ...pet.skills,
            [randomSkill]: pet.skills[randomSkill] + skillGain
          }
        };
      }
      return pet;
    }));
    
    soundEffects.playClick();
    setTimeout(() => {
      setPets(prev => prev.map(pet => 
        pet.id === petId ? { ...pet, mood: 'neutral' } : pet
      ));
    }, 4000);
  };

  const getEvolutionStage = (totalXP) => {
    if (totalXP >= 600) return 'master';
    if (totalXP >= 300) return 'adult';
    if (totalXP >= 150) return 'teen';
    if (totalXP >= 50) return 'baby';
    return 'egg';
  };

  const getPetMoodEmoji = (mood) => {
    switch (mood) {
      case 'happy': return '😊';
      case 'playful': return '😄';
      case 'sleepy': return '😴';
      case 'hungry': return '😋';
      case 'excited': return '🤩';
      default: return '😐';
    }
  };

  const getCurrentStageInfo = (pet) => {
    return petStages[pet.stage];
  };

  // Pet aging system
  useEffect(() => {
    const interval = setInterval(() => {
      setPets(prev => prev.map(pet => ({
        ...pet,
        hunger: Math.max(0, pet.hunger - 0.5),
        energy: Math.max(0, pet.energy - 0.3),
        happiness: pet.hunger < 20 ? Math.max(0, pet.happiness - 1) : pet.happiness
      })));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="code-pet-system">
      <div className="pet-header">
        <h3>🐾 Code Pet Evolution Lab</h3>
        <p>Nurture your coding companions and watch them grow!</p>
      </div>

      {pets.length === 0 ? (
        <div className="no-pets">
          <div className="pet-egg-incubator">
            <div className="incubator">
              <div className="egg-placeholder">🥚</div>
              <div className="incubation-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(playerXP / 100 * 100, 100)}%` }}
                  />
                </div>
                <p>{playerXP >= 100 ? 'Ready to hatch!' : `${100 - playerXP} XP needed`}</p>
              </div>
            </div>
            {playerXP >= 100 && (
              <button className="hatch-button" onClick={createNewPet}>
                🐣 Hatch Your First Pet!
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="pets-grid">
          {pets.map(pet => {
            const stageInfo = getCurrentStageInfo(pet);
            const nextStage = Object.keys(petStages)[Object.keys(petStages).indexOf(pet.stage) + 1];
            const nextStageInfo = nextStage ? petStages[nextStage] : null;
            
            return (
              <div 
                key={pet.id} 
                className={`pet-card ${selectedPet?.id === pet.id ? 'selected' : ''}`}
                style={{ borderColor: pet.type.color }}
                onClick={() => setSelectedPet(pet)}
              >
                <div className="pet-visual">
                  <div className="pet-avatar" style={{ backgroundColor: pet.type.color + '20' }}>
                    <span className="pet-emoji">{stageInfo.emoji}</span>
                    <span className="pet-mood">{getPetMoodEmoji(pet.mood)}</span>
                  </div>
                  
                  <div className="pet-info">
                    <h4>{pet.type.name}</h4>
                    <p className="pet-stage">{stageInfo.name}</p>
                  </div>
                </div>

                <div className="pet-stats">
                  <div className="stat-bar">
                    <span>❤️</span>
                    <div className="bar">
                      <div 
                        className="fill health" 
                        style={{ width: `${(pet.health / stageInfo.health) * 100}%` }}
                      />
                    </div>
                    <span>{pet.health}</span>
                  </div>
                  
                  <div className="stat-bar">
                    <span>😊</span>
                    <div className="bar">
                      <div 
                        className="fill happiness" 
                        style={{ width: `${(pet.happiness / stageInfo.happiness) * 100}%` }}
                      />
                    </div>
                    <span>{Math.floor(pet.happiness)}</span>
                  </div>
                  
                  <div className="stat-bar">
                    <span>🍖</span>
                    <div className="bar">
                      <div 
                        className="fill hunger" 
                        style={{ width: `${pet.hunger}%` }}
                      />
                    </div>
                    <span>{Math.floor(pet.hunger)}</span>
                  </div>
                </div>

                <div className="pet-actions">
                  <button 
                    className="feed-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      feedPet(pet.id, 25);
                    }}
                    disabled={playerXP < 25}
                  >
                    🍎 Feed (25 XP)
                  </button>
                  
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      playWithPet(pet.id);
                    }}
                    disabled={pet.energy < 10}
                  >
                    🎮 Play
                  </button>
                </div>

                {nextStageInfo && (
                  <div className="evolution-progress">
                    <div className="evolution-bar">
                      <div 
                        className="evolution-fill" 
                        style={{ 
                          width: `${(pet.totalXPFed / nextStageInfo.minXP) * 100}%`,
                          background: `linear-gradient(90deg, ${pet.type.color}, #ff6b6b)`
                        }}
                      />
                    </div>
                    <p className="evolution-text">
                      Next: {nextStageInfo.name} ({pet.totalXPFed}/{nextStageInfo.minXP} XP)
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {selectedPet && (
        <div className="pet-details">
          <h4>🔍 {selectedPet.type.name} Details</h4>
          <div className="pet-traits">
            <strong>Traits:</strong> {selectedPet.type.traits.join(', ')}
          </div>
          <div className="pet-ability">
            <strong>Special Ability:</strong> {selectedPet.type.specialAbility}
          </div>
          <div className="pet-skills">
            <strong>Skills:</strong>
            <div className="skills-grid">
              {Object.entries(selectedPet.skills).map(([skill, level]) => (
                <div key={skill} className="skill-item">
                  <span>{skill}</span>
                  <div className="skill-stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < Math.floor(level / 20) ? 'filled' : 'empty'} 
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodePetSystem;
