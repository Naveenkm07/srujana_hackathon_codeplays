import React, { useState, useEffect, useRef } from 'react';
import { 
  FaCube, FaRocket, FaGem, FaMagic, FaFire, FaBolt,
  FaEye, FaHandPaper, FaVolumeUp, FaCog, FaExpand
} from 'react-icons/fa';
import './Advanced3DCodingWorld.css';

const Advanced3DCodingWorld = ({ currentUser, onXPGained }) => {
  const canvasRef = useRef(null);
  const [codeWorld, setCodeWorld] = useState({
    blocks: [],
    player: { x: 0, y: 0, z: 0, energy: 100 },
    codeSpells: [],
    environment: 'cyberpunk',
    weather: 'clear'
  });
  const [isVRMode, setIsVRMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState('codeBlock');
  const [activeQuest, setActiveQuest] = useState(null);
  const [worldStats, setWorldStats] = useState({
    blocksPlaced: 0,
    spellsCast: 0,
    questsCompleted: 0,
    timeSpent: 0
  });

  const codeBlocks = [
    { type: 'variable', color: '#3498db', code: 'let x = 10;', energy: 5 },
    { type: 'function', color: '#e74c3c', code: 'function move() {}', energy: 10 },
    { type: 'loop', color: '#f39c12', code: 'for(let i=0; i<10; i++) {}', energy: 15 },
    { type: 'condition', color: '#2ecc71', code: 'if(condition) {}', energy: 8 },
    { type: 'array', color: '#9b59b6', code: 'const arr = [];', energy: 12 },
    { type: 'object', color: '#1abc9c', code: 'const obj = {};', energy: 18 }
  ];

  const environments = [
    { name: 'cyberpunk', theme: 'Neon City', colors: ['#ff0080', '#00ff80', '#8000ff'] },
    { name: 'nature', theme: 'Digital Forest', colors: ['#2ecc71', '#27ae60', '#16a085'] },
    { name: 'space', theme: 'Cosmic Code', colors: ['#3498db', '#2980b9', '#8e44ad'] },
    { name: 'matrix', theme: 'The Matrix', colors: ['#00ff00', '#008000', '#004000'] }
  ];

  const quests = [
    {
      id: 1,
      title: '🏗️ Build the Foundation',
      description: 'Place 10 variable blocks to create a stable foundation',
      target: 10,
      type: 'variable',
      reward: 100,
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: '🔄 Loop Master',
      description: 'Create a complex structure using 5 loop blocks',
      target: 5,
      type: 'loop',
      reward: 250,
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: '🎯 Function Architect',
      description: 'Build a functional system with 8 function blocks',
      target: 8,
      type: 'function',
      reward: 350,
      difficulty: 'Advanced'
    }
  ];

  useEffect(() => {
    initializeWorld();
    startActiveQuest();
    const interval = setInterval(updateWorldTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      renderWorld();
    }
  }, [codeWorld, isVRMode]);

  const initializeWorld = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Initialize with some starter blocks
    setCodeWorld(prev => ({
      ...prev,
      blocks: generateStarterBlocks()
    }));
  };

  const generateStarterBlocks = () => {
    const blocks = [];
    for (let i = 0; i < 20; i++) {
      blocks.push({
        id: i,
        type: codeBlocks[Math.floor(Math.random() * codeBlocks.length)].type,
        x: Math.random() * 800,
        y: Math.random() * 600,
        z: Math.random() * 100,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
        energy: Math.floor(Math.random() * 50) + 10
      });
    }
    return blocks;
  };

  const renderWorld = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background gradient based on environment
    const env = environments.find(e => e.name === codeWorld.environment);
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, env.colors[0] + '40');
    gradient.addColorStop(0.5, env.colors[1] + '20');
    gradient.addColorStop(1, env.colors[2] + '40');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Render grid
    renderGrid(ctx, width, height);

    // Render blocks with 3D effect
    codeWorld.blocks.forEach(block => {
      renderCodeBlock(ctx, block);
    });

    // Render player
    renderPlayer(ctx, codeWorld.player);

    // Render particles
    renderParticles(ctx);

    // VR overlay effects
    if (isVRMode) {
      renderVROverlay(ctx, width, height);
    }
  };

  const renderGrid = (ctx, width, height) => {
    const gridSize = 40;
    ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const renderCodeBlock = (ctx, block) => {
    const blockType = codeBlocks.find(b => b.type === block.type);
    if (!blockType) return;

    ctx.save();
    ctx.translate(block.x, block.y);
    ctx.rotate((block.rotation * Math.PI) / 180);
    ctx.scale(block.scale, block.scale);

    // 3D shadow effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(5, 5, 60, 40);

    // Main block
    ctx.fillStyle = blockType.color;
    ctx.fillRect(0, 0, 60, 40);

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, 60, 5);

    // Energy indicator
    const energyWidth = (block.energy / 100) * 60;
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0, 35, energyWidth, 5);

    // Code text
    ctx.fillStyle = 'white';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(blockType.type, 30, 25);

    ctx.restore();
  };

  const renderPlayer = (ctx, player) => {
    ctx.save();
    ctx.translate(player.x + 400, player.y + 300);

    // Player glow
    const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
    glowGradient.addColorStop(0, 'rgba(0, 255, 255, 0.8)');
    glowGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(-30, -30, 60, 60);

    // Player avatar
    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(0, 0, 15, 0, Math.PI * 2);
    ctx.fill();

    // Energy bar
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(-20, -35, 40, 6);
    const energyWidth = (player.energy / 100) * 40;
    ctx.fillStyle = player.energy > 50 ? '#00ff00' : player.energy > 25 ? '#ffff00' : '#ff0000';
    ctx.fillRect(-20, -35, energyWidth, 6);

    ctx.restore();
  };

  const renderParticles = (ctx) => {
    // Floating code particles
    const time = Date.now() * 0.001;
    for (let i = 0; i < 50; i++) {
      const x = (Math.sin(time + i) * 200) + 400;
      const y = (Math.cos(time + i * 0.7) * 150) + 300;
      const alpha = (Math.sin(time + i) + 1) * 0.5;
      
      ctx.fillStyle = `rgba(0, 255, 255, ${alpha * 0.3})`;
      ctx.fillRect(x, y, 2, 2);
    }
  };

  const renderVROverlay = (ctx, width, height) => {
    // VR circular viewport
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.4;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // VR UI elements
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  };

  const placeCodeBlock = (x, y) => {
    const blockType = codeBlocks.find(b => b.type === selectedTool);
    if (!blockType || codeWorld.player.energy < blockType.energy) return;

    const newBlock = {
      id: Date.now(),
      type: selectedTool,
      x: x - 30,
      y: y - 20,
      z: 0,
      rotation: Math.random() * 360,
      scale: 1,
      energy: blockType.energy
    };

    setCodeWorld(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
      player: {
        ...prev.player,
        energy: prev.player.energy - blockType.energy
      }
    }));

    setWorldStats(prev => ({
      ...prev,
      blocksPlaced: prev.blocksPlaced + 1
    }));

    // Check quest progress
    checkQuestProgress(selectedTool);

    // Award XP
    onXPGained?.(blockType.energy);
  };

  const castCodeSpell = () => {
    if (codeWorld.player.energy < 20) return;

    const spell = {
      id: Date.now(),
      x: codeWorld.player.x + 400,
      y: codeWorld.player.y + 300,
      type: 'compile',
      power: 50
    };

    setCodeWorld(prev => ({
      ...prev,
      codeSpells: [...prev.codeSpells, spell],
      player: {
        ...prev.player,
        energy: prev.player.energy - 20
      }
    }));

    setWorldStats(prev => ({
      ...prev,
      spellsCast: prev.spellsCast + 1
    }));

    onXPGained?.(25);

    // Remove spell after animation
    setTimeout(() => {
      setCodeWorld(prev => ({
        ...prev,
        codeSpells: prev.codeSpells.filter(s => s.id !== spell.id)
      }));
    }, 2000);
  };

  const checkQuestProgress = (blockType) => {
    if (!activeQuest) return;

    const blocksOfType = codeWorld.blocks.filter(b => b.type === blockType).length;
    if (activeQuest.type === blockType && blocksOfType >= activeQuest.target) {
      completeQuest();
    }
  };

  const completeQuest = () => {
    if (!activeQuest) return;

    onXPGained?.(activeQuest.reward);
    setWorldStats(prev => ({
      ...prev,
      questsCompleted: prev.questsCompleted + 1
    }));

    // Start next quest
    const nextQuest = quests.find(q => q.id === activeQuest.id + 1);
    setActiveQuest(nextQuest || null);
  };

  const startActiveQuest = () => {
    setActiveQuest(quests[0]);
  };

  const updateWorldTime = () => {
    setWorldStats(prev => ({
      ...prev,
      timeSpent: prev.timeSpent + 1
    }));

    // Regenerate player energy slowly
    setCodeWorld(prev => ({
      ...prev,
      player: {
        ...prev.player,
        energy: Math.min(100, prev.player.energy + 0.5)
      }
    }));
  };

  const changeEnvironment = (envName) => {
    setCodeWorld(prev => ({
      ...prev,
      environment: envName
    }));
  };

  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    placeCodeBlock(x, y);
  };

  return (
    <div className="advanced-3d-world">
      <div className="world-header">
        <h2>🌌 3D Coding Universe</h2>
        <div className="world-controls">
          <button 
            className={`vr-toggle ${isVRMode ? 'active' : ''}`}
            onClick={() => setIsVRMode(!isVRMode)}
          >
            <FaEye /> {isVRMode ? 'Exit VR' : 'VR Mode'}
          </button>
          <button className="fullscreen-btn">
            <FaExpand /> Fullscreen
          </button>
        </div>
      </div>

      <div className="world-main">
        <div className="world-sidebar">
          {/* Tool Palette */}
          <div className="tool-palette">
            <h3>🛠️ Code Tools</h3>
            {codeBlocks.map(block => (
              <button
                key={block.type}
                className={`tool-btn ${selectedTool === block.type ? 'selected' : ''}`}
                onClick={() => setSelectedTool(block.type)}
                style={{ borderColor: block.color }}
              >
                <div className="tool-icon" style={{ backgroundColor: block.color }}></div>
                <span>{block.type}</span>
                <small>{block.energy} ⚡</small>
              </button>
            ))}
          </div>

          {/* Environment Selector */}
          <div className="environment-selector">
            <h3>🌍 Environments</h3>
            {environments.map(env => (
              <button
                key={env.name}
                className={`env-btn ${codeWorld.environment === env.name ? 'active' : ''}`}
                onClick={() => changeEnvironment(env.name)}
              >
                <div className="env-preview" style={{
                  background: `linear-gradient(45deg, ${env.colors.join(', ')})`
                }}></div>
                {env.theme}
              </button>
            ))}
          </div>

          {/* Player Stats */}
          <div className="player-stats">
            <h3>📊 Player Stats</h3>
            <div className="stat-item">
              <FaBolt /> Energy: {Math.round(codeWorld.player.energy)}%
            </div>
            <div className="stat-item">
              <FaCube /> Blocks: {worldStats.blocksPlaced}
            </div>
            <div className="stat-item">
              <FaMagic /> Spells: {worldStats.spellsCast}
            </div>
            <div className="stat-item">
              ⏱️ Time: {Math.floor(worldStats.timeSpent / 60)}m {worldStats.timeSpent % 60}s
            </div>
          </div>
        </div>

        <div className="world-canvas-container">
          <canvas
            ref={canvasRef}
            className={`world-canvas ${isVRMode ? 'vr-mode' : ''}`}
            onClick={handleCanvasClick}
            style={{ cursor: 'crosshair' }}
          />

          {/* Quest Overlay */}
          {activeQuest && (
            <div className="quest-overlay">
              <h4>{activeQuest.title}</h4>
              <p>{activeQuest.description}</p>
              <div className="quest-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{
                      width: `${Math.min(100, (codeWorld.blocks.filter(b => b.type === activeQuest.type).length / activeQuest.target) * 100)}%`
                    }}
                  ></div>
                </div>
                <span>{codeWorld.blocks.filter(b => b.type === activeQuest.type).length}/{activeQuest.target}</span>
              </div>
              <div className="quest-reward">Reward: {activeQuest.reward} XP</div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="spell-btn"
              onClick={castCodeSpell}
              disabled={codeWorld.player.energy < 20}
            >
              <FaMagic /> Cast Spell (20⚡)
            </button>
            <button className="interact-btn">
              <FaHandPaper /> Interact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advanced3DCodingWorld;
