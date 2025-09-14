import React, { useState, useEffect } from 'react';
import { FaBuilding, FaRoad, FaTree, FaIndustry, FaHome, FaSchool, FaShoppingCart, FaHospital } from 'react-icons/fa';
import soundEffects from './SoundEffects';

const CodeCityBuilder = ({ playerXP, onXPSpent, onXPGained }) => {
  const [cityGrid, setCityGrid] = useState(() => 
    Array(8).fill().map(() => Array(8).fill({ type: 'empty', level: 0 }))
  );
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [cityStats, setCityStats] = useState({
    population: 0,
    happiness: 50,
    income: 0,
    codeQuality: 0,
    innovation: 0
  });
  const [cityResources, setCityResources] = useState({
    functions: 0,
    classes: 0,
    algorithms: 0,
    databases: 0
  });
  const [activeMission, setActiveMission] = useState(null);

  // Building types with code-related themes
  const buildingTypes = {
    residential: {
      name: 'Variable Villa',
      emoji: '🏠',
      icon: <FaHome />,
      cost: { xp: 50, functions: 2 },
      effects: { population: 4, happiness: 5 },
      description: 'Houses for your code variables to live',
      codeExample: 'let residents = 4;'
    },
    commercial: {
      name: 'Function Factory',
      emoji: '🏢',
      icon: <FaBuilding />,
      cost: { xp: 75, classes: 1 },
      effects: { income: 10, functions: 3 },
      description: 'Produces functions for your city',
      codeExample: 'function produce() { return "income"; }'
    },
    industrial: {
      name: 'Algorithm Assembly',
      emoji: '🏭',
      icon: <FaIndustry />,
      cost: { xp: 100, algorithms: 1 },
      effects: { codeQuality: 15, algorithms: 2 },
      description: 'Optimizes code performance citywide',
      codeExample: 'for(let i=0; i<efficiency; i++) optimize();'
    },
    education: {
      name: 'Class Academy',
      emoji: '🏫',
      icon: <FaSchool />,
      cost: { xp: 120, functions: 5 },
      effects: { innovation: 20, classes: 3 },
      description: 'Teaches OOP principles to citizens',
      codeExample: 'class Academy extends Education {}'
    },
    utility: {
      name: 'Database Drive',
      emoji: '🛣️',
      icon: <FaRoad />,
      cost: { xp: 30 },
      effects: { connectivity: 5 },
      description: 'Connects buildings with data flow',
      codeExample: 'SELECT * FROM connections;'
    },
    park: {
      name: 'Recursion Park',
      emoji: '🌳',
      icon: <FaTree />,
      cost: { xp: 40 },
      effects: { happiness: 10, innovation: 5 },
      description: 'A peaceful place for recursive thinking',
      codeExample: 'function grow(tree) { return grow(tree + 1); }'
    },
    special: {
      name: 'AI Research Lab',
      emoji: '🔬',
      icon: <FaHospital />,
      cost: { xp: 200, classes: 3, algorithms: 3 },
      effects: { innovation: 50, codeQuality: 30 },
      description: 'Breakthrough AI research facility',
      codeExample: 'const ai = new NeuralNetwork();'
    }
  };

  // City missions - challenges that give rewards
  const cityMissions = [
    {
      id: 'housing_crisis',
      title: '🏠 Housing Crisis',
      description: 'Build 5 Variable Villas to house the growing developer population',
      target: { type: 'residential', count: 5 },
      reward: { xp: 100, functions: 10 },
      unlockLevel: 1
    },
    {
      id: 'innovation_hub',
      title: '💡 Innovation Hub',
      description: 'Create an innovation district with 3 Class Academies',
      target: { type: 'education', count: 3 },
      reward: { xp: 200, classes: 15 },
      unlockLevel: 2
    },
    {
      id: 'code_optimization',
      title: '⚡ Code Optimization',
      description: 'Build Algorithm Assemblies to boost city-wide code quality to 100+',
      target: { stat: 'codeQuality', value: 100 },
      reward: { xp: 300, algorithms: 20 },
      unlockLevel: 3
    }
  ];

  const placeBuilding = (row, col, buildingType) => {
    const building = buildingTypes[buildingType];
    if (!building) return;

    // Check if player can afford the building
    if (playerXP < building.cost.xp) return;
    
    for (const [resource, amount] of Object.entries(building.cost)) {
      if (resource !== 'xp' && cityResources[resource] < amount) return;
    }

    // Check if cell is empty
    if (cityGrid[row][col].type !== 'empty') return;

    // Place the building
    const newGrid = [...cityGrid];
    newGrid[row][col] = { type: buildingType, level: 1, age: 0 };
    setCityGrid(newGrid);

    // Deduct costs
    onXPSpent(building.cost.xp);
    setCityResources(prev => {
      const newResources = { ...prev };
      for (const [resource, amount] of Object.entries(building.cost)) {
        if (resource !== 'xp') {
          newResources[resource] -= amount;
        }
      }
      return newResources;
    });

    soundEffects.playCorrect();
    setSelectedBuilding(null);
  };

  const upgradeBuilding = (row, col) => {
    const cell = cityGrid[row][col];
    if (cell.type === 'empty' || cell.level >= 3) return;

    const building = buildingTypes[cell.type];
    const upgradeCost = building.cost.xp * cell.level;

    if (playerXP < upgradeCost) return;

    const newGrid = [...cityGrid];
    newGrid[row][col] = { ...cell, level: cell.level + 1 };
    setCityGrid(newGrid);

    onXPSpent(upgradeCost);
    soundEffects.playLevelUp();
  };

  // Calculate city stats based on buildings
  useEffect(() => {
    let newStats = { population: 0, happiness: 50, income: 0, codeQuality: 0, innovation: 0 };
    let newResources = { functions: 0, classes: 0, algorithms: 0, databases: 0 };

    cityGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.type !== 'empty') {
          const building = buildingTypes[cell.type];
          const multiplier = cell.level;

          // Apply building effects
          for (const [stat, value] of Object.entries(building.effects)) {
            if (newStats.hasOwnProperty(stat)) {
              newStats[stat] += value * multiplier;
            } else if (newResources.hasOwnProperty(stat)) {
              newResources[stat] += value * multiplier;
            }
          }
        }
      });
    });

    setCityStats(newStats);
    setCityResources(prev => ({
      functions: prev.functions + newResources.functions,
      classes: prev.classes + newResources.classes,
      algorithms: prev.algorithms + newResources.algorithms,
      databases: prev.databases + newResources.databases
    }));

    // Check mission completion
    if (activeMission) {
      checkMissionCompletion(activeMission);
    }
  }, [cityGrid]);

  const checkMissionCompletion = (mission) => {
    if (mission.target.type) {
      // Count buildings of specific type
      const count = cityGrid.flat().filter(cell => cell.type === mission.target.type).length;
      if (count >= mission.target.count) {
        completeMission(mission);
      }
    } else if (mission.target.stat) {
      // Check stat value
      if (cityStats[mission.target.stat] >= mission.target.value) {
        completeMission(mission);
      }
    }
  };

  const completeMission = (mission) => {
    onXPGained(mission.reward.xp);
    setCityResources(prev => ({
      ...prev,
      ...mission.reward
    }));
    setActiveMission(null);
    soundEffects.playAchievement();
  };

  const startMission = (mission) => {
    setActiveMission(mission);
    soundEffects.playStart();
  };

  const getCellClass = (cell) => {
    if (cell.type === 'empty') return 'city-cell empty';
    return `city-cell building ${cell.type} level-${cell.level}`;
  };

  const getBuildingDisplay = (cell) => {
    if (cell.type === 'empty') return '⬜';
    const building = buildingTypes[cell.type];
    const levelIndicator = '★'.repeat(cell.level);
    return (
      <div className="building-display">
        <span className="building-emoji">{building.emoji}</span>
        <span className="building-level">{levelIndicator}</span>
      </div>
    );
  };

  return (
    <div className="code-city-builder">
      <div className="city-header">
        <h3>🏙️ Code City Builder</h3>
        <p>Build a thriving programming metropolis! Each building represents code concepts.</p>
      </div>

      <div className="city-dashboard">
        {/* City Stats */}
        <div className="city-stats">
          <div className="stat-card">
            <span>👥 Population</span>
            <strong>{cityStats.population}</strong>
          </div>
          <div className="stat-card">
            <span>😊 Happiness</span>
            <strong>{cityStats.happiness}%</strong>
          </div>
          <div className="stat-card">
            <span>💰 Income</span>
            <strong>{cityStats.income}/turn</strong>
          </div>
          <div className="stat-card">
            <span>⚡ Code Quality</span>
            <strong>{cityStats.codeQuality}</strong>
          </div>
          <div className="stat-card">
            <span>💡 Innovation</span>
            <strong>{cityStats.innovation}</strong>
          </div>
        </div>

        {/* Resources */}
        <div className="city-resources">
          <h4>📦 Resources</h4>
          <div className="resources-grid">
            <div className="resource">⚙️ Functions: {cityResources.functions}</div>
            <div className="resource">🏛️ Classes: {cityResources.classes}</div>
            <div className="resource">🧮 Algorithms: {cityResources.algorithms}</div>
            <div className="resource">🗄️ Databases: {cityResources.databases}</div>
          </div>
        </div>
      </div>

      <div className="city-workspace">
        {/* Building Palette */}
        <div className="building-palette">
          <h4>🏗️ Buildings</h4>
          {Object.entries(buildingTypes).map(([key, building]) => (
            <div 
              key={key}
              className={`building-option ${selectedBuilding === key ? 'selected' : ''}`}
              onClick={() => setSelectedBuilding(key)}
            >
              <span className="building-emoji">{building.emoji}</span>
              <div className="building-info">
                <strong>{building.name}</strong>
                <div className="building-cost">
                  💎 {building.cost.xp} XP
                  {Object.entries(building.cost).filter(([k]) => k !== 'xp').map(([resource, amount]) => (
                    <span key={resource}> | {resource}: {amount}</span>
                  ))}
                </div>
                <small>{building.description}</small>
              </div>
            </div>
          ))}
        </div>

        {/* City Grid */}
        <div className="city-grid-container">
          <div className="city-grid">
            {cityGrid.map((row, rowIndex) => (
              <div key={rowIndex} className="city-row">
                {row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={getCellClass(cell)}
                    onClick={() => {
                      if (selectedBuilding && cell.type === 'empty') {
                        placeBuilding(rowIndex, colIndex, selectedBuilding);
                      } else if (cell.type !== 'empty') {
                        upgradeBuilding(rowIndex, colIndex);
                      }
                    }}
                    title={cell.type !== 'empty' ? 
                      `${buildingTypes[cell.type].name} (Level ${cell.level}) - Click to upgrade` : 
                      'Empty lot - Select a building to place'
                    }
                  >
                    {getBuildingDisplay(cell)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Missions */}
      <div className="city-missions">
        <h4>🎯 City Missions</h4>
        <div className="missions-grid">
          {cityMissions.map(mission => (
            <div key={mission.id} className="mission-card">
              <h5>{mission.title}</h5>
              <p>{mission.description}</p>
              <div className="mission-reward">
                Reward: {mission.reward.xp} XP
                {Object.entries(mission.reward).filter(([k]) => k !== 'xp').map(([resource, amount]) => (
                  <span key={resource}> + {amount} {resource}</span>
                ))}
              </div>
              <button 
                onClick={() => startMission(mission)}
                disabled={activeMission?.id === mission.id}
                className="mission-btn"
              >
                {activeMission?.id === mission.id ? '🎯 Active' : '🚀 Start Mission'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active Mission Status */}
      {activeMission && (
        <div className="active-mission">
          <h4>🎯 Active Mission: {activeMission.title}</h4>
          <p>{activeMission.description}</p>
          <div className="mission-progress">
            {activeMission.target.type && (
              <div>Progress: {cityGrid.flat().filter(cell => cell.type === activeMission.target.type).length}/{activeMission.target.count}</div>
            )}
            {activeMission.target.stat && (
              <div>Progress: {cityStats[activeMission.target.stat]}/{activeMission.target.value}</div>
            )}
          </div>
        </div>
      )}

      {/* Code Examples */}
      {selectedBuilding && (
        <div className="building-code-example">
          <h4>💻 Code Example: {buildingTypes[selectedBuilding].name}</h4>
          <pre className="code-block">
            <code>{buildingTypes[selectedBuilding].codeExample}</code>
          </pre>
          <p>{buildingTypes[selectedBuilding].description}</p>
        </div>
      )}
    </div>
  );
};

export default CodeCityBuilder;
