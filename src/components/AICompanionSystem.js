import React, { useState, useEffect } from 'react';
import { 
  FaRobot, FaHeart, FaBrain, FaComments, FaGift, 
  FaMagic, FaStar, FaLightbulb, FaFire, FaShield
} from 'react-icons/fa';
import './AICompanionSystem.css';

const AICompanionSystem = ({ currentUser, onXPGained }) => {
  const [companion, setCompanion] = useState({
    id: 'codex',
    name: 'Codex',
    type: 'sage',
    level: 1,
    experience: 0,
    personality: 'helpful',
    mood: 'happy',
    energy: 100,
    intelligence: 50,
    loyalty: 80,
    skills: ['debugging', 'optimization', 'teaching'],
    conversations: [],
    appearance: {
      color: '#00ffff',
      form: 'orb',
      effects: ['glow', 'particles']
    }
  });

  const [conversation, setConversation] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCompanion, setSelectedCompanion] = useState('codex');
  const [companionActions, setCompanionActions] = useState([]);

  const companionTypes = [
    {
      id: 'codex',
      name: 'Codex',
      type: 'Sage',
      description: 'Wise AI that helps with complex coding problems',
      color: '#00ffff',
      specialties: ['debugging', 'architecture', 'best practices'],
      personality: 'wise and patient',
      unlockLevel: 1
    },
    {
      id: 'spark',
      name: 'Spark',
      type: 'Creator',
      description: 'Energetic AI that loves building creative projects',
      color: '#ff6b6b',
      specialties: ['creativity', 'UI/UX', 'innovation'],
      personality: 'energetic and creative',
      unlockLevel: 3
    },
    {
      id: 'cipher',
      name: 'Cipher',
      type: 'Guardian',
      description: 'Security-focused AI that protects your code',
      color: '#9b59b6',
      specialties: ['security', 'encryption', 'testing'],
      personality: 'cautious and protective',
      unlockLevel: 5
    },
    {
      id: 'nova',
      name: 'Nova',
      type: 'Explorer',
      description: 'Adventurous AI that discovers new technologies',
      color: '#f39c12',
      specialties: ['research', 'trending tech', 'experimentation'],
      personality: 'curious and adventurous',
      unlockLevel: 7
    }
  ];

  const companionMoods = {
    happy: { emoji: '😊', color: '#2ecc71', effect: '+10% XP bonus' },
    excited: { emoji: '🤩', color: '#f39c12', effect: '+15% Learning speed' },
    focused: { emoji: '🤔', color: '#3498db', effect: '+20% Problem solving' },
    protective: { emoji: '🛡️', color: '#9b59b6', effect: '+25% Bug detection' },
    creative: { emoji: '✨', color: '#e74c3c', effect: '+30% Innovation boost' }
  };

  const companionDialogues = {
    greeting: [
      "Hello! I'm ready to help you code today! 🚀",
      "Welcome back, coder! What challenge shall we tackle?",
      "I've been analyzing the latest coding trends. Want to learn something new?",
      "Your coding skills are improving! I'm proud of your progress.",
      "Ready to debug some complex problems together?"
    ],
    encouragement: [
      "You're doing great! Keep pushing forward! 💪",
      "Every error is a learning opportunity!",
      "I believe in your coding abilities!",
      "That's a clever solution! Well done!",
      "You're becoming a better programmer every day!"
    ],
    tips: [
      "💡 Tip: Always comment your complex functions for future reference!",
      "🔍 Remember to test edge cases in your code!",
      "⚡ Consider using async/await for better performance!",
      "🎯 Break complex problems into smaller, manageable pieces!",
      "🔒 Don't forget to validate user input for security!"
    ]
  };

  useEffect(() => {
    initializeCompanion();
    startIdleInteractions();
  }, []);

  const initializeCompanion = () => {
    const savedCompanion = localStorage.getItem(`companion_${currentUser?.id}`);
    if (savedCompanion) {
      setCompanion(JSON.parse(savedCompanion));
    } else {
      greetUser();
    }
  };

  const startIdleInteractions = () => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        generateIdleAction();
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  };

  const generateIdleAction = () => {
    const actions = [
      { type: 'tip', message: getRandomTip() },
      { type: 'encouragement', message: getRandomEncouragement() },
      { type: 'mood_change', newMood: getRandomMood() },
      { type: 'skill_practice', skill: companion.skills[Math.floor(Math.random() * companion.skills.length)] }
    ];

    const action = actions[Math.floor(Math.random() * actions.length)];
    setCompanionActions(prev => [...prev.slice(-4), action]);

    if (action.type === 'tip' || action.type === 'encouragement') {
      addMessage('companion', action.message);
    }
  };

  const greetUser = () => {
    const greeting = companionDialogues.greeting[Math.floor(Math.random() * companionDialogues.greeting.length)];
    addMessage('companion', greeting);
  };

  const getRandomTip = () => {
    return companionDialogues.tips[Math.floor(Math.random() * companionDialogues.tips.length)];
  };

  const getRandomEncouragement = () => {
    return companionDialogues.encouragement[Math.floor(Math.random() * companionDialogues.encouragement.length)];
  };

  const getRandomMood = () => {
    const moods = Object.keys(companionMoods);
    return moods[Math.floor(Math.random() * moods.length)];
  };

  const addMessage = (sender, text, type = 'text') => {
    const message = {
      id: Date.now(),
      sender,
      text,
      type,
      timestamp: new Date()
    };
    setConversation(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    addMessage('user', inputMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateCompanionResponse(inputMessage);
      addMessage('companion', response);
      setIsTyping(false);
      
      // Update companion experience
      gainCompanionExperience(5);
    }, 1000 + Math.random() * 2000);
  };

  const generateCompanionResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('help') || message.includes('stuck')) {
      return "I'm here to help! Can you describe the specific problem you're facing? I'll analyze it and suggest the best approach. 🤝";
    }
    
    if (message.includes('error') || message.includes('bug')) {
      return "Bugs are just features in disguise! 🐛 Let's debug this together. Can you share the error message? I'll help you trace through the logic step by step.";
    }
    
    if (message.includes('learn') || message.includes('tutorial')) {
      return "Learning never stops in programming! 📚 I can recommend personalized tutorials based on your current skill level. What topic interests you most?";
    }
    
    if (message.includes('thanks') || message.includes('thank you')) {
      return "You're welcome! It's my pleasure to help you grow as a programmer. Together, we'll master any coding challenge! ✨";
    }
    
    // Default responses based on companion personality
    const responses = [
      "That's an interesting point! Let me think about the best way to approach this... 🤔",
      "I love your curiosity! Programming is all about exploring and experimenting. 🚀",
      "Based on my analysis, I think we should consider multiple approaches to solve this. 💡",
      "Your coding journey is unique! I'm here to adapt to your learning style. 🎯"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const gainCompanionExperience = (amount) => {
    setCompanion(prev => {
      const newExp = prev.experience + amount;
      const newLevel = Math.floor(newExp / 100) + 1;
      
      if (newLevel > prev.level) {
        addMessage('system', `🎉 ${prev.name} leveled up to Level ${newLevel}!`, 'levelup');
        onXPGained?.(newLevel * 50);
      }
      
      return {
        ...prev,
        experience: newExp,
        level: newLevel
      };
    });
  };

  const feedCompanion = () => {
    if (companion.energy >= 100) return;
    
    setCompanion(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 20),
      mood: 'happy',
      loyalty: Math.min(100, prev.loyalty + 5)
    }));
    
    addMessage('companion', "Thank you for the energy boost! I feel much better now! ⚡");
    onXPGained?.(10);
  };

  const trainCompanion = (skill) => {
    if (companion.energy < 20) {
      addMessage('companion', "I'm too tired to train right now. Could you help me restore my energy? 😴");
      return;
    }
    
    setCompanion(prev => ({
      ...prev,
      energy: prev.energy - 20,
      intelligence: Math.min(100, prev.intelligence + 3)
    }));
    
    addMessage('companion', `Training complete! I'm getting better at ${skill}! 🎓`);
    onXPGained?.(25);
  };

  const switchCompanion = (companionId) => {
    const newCompanionType = companionTypes.find(c => c.id === companionId);
    if (!newCompanionType) return;
    
    setCompanion(prev => ({
      ...prev,
      id: companionId,
      name: newCompanionType.name,
      type: newCompanionType.type,
      appearance: {
        ...prev.appearance,
        color: newCompanionType.color
      },
      skills: newCompanionType.specialties
    }));
    
    setSelectedCompanion(companionId);
    addMessage('companion', `Hello! I'm ${newCompanionType.name}, your new ${newCompanionType.type} companion! ${newCompanionType.description} Let's code together! 🤖`);
  };

  return (
    <div className="ai-companion-system">
      <div className="companion-header">
        <h2>🤖 AI Coding Companions</h2>
        <p>Your personal AI assistants for coding mastery</p>
      </div>

      <div className="companion-main">
        {/* Companion Selection */}
        <div className="companion-selection">
          <h3>Choose Your Companion</h3>
          <div className="companions-grid">
            {companionTypes.map(comp => (
              <button
                key={comp.id}
                className={`companion-option ${selectedCompanion === comp.id ? 'selected' : ''} ${currentUser?.level < comp.unlockLevel ? 'locked' : ''}`}
                onClick={() => switchCompanion(comp.id)}
                disabled={currentUser?.level < comp.unlockLevel}
                style={{ borderColor: comp.color }}
              >
                <div className="companion-avatar" style={{ backgroundColor: comp.color }}>
                  <FaRobot />
                </div>
                <div className="companion-info">
                  <h4>{comp.name}</h4>
                  <span className="companion-type">{comp.type}</span>
                  <p>{comp.description}</p>
                  {currentUser?.level < comp.unlockLevel && (
                    <div className="unlock-requirement">
                      Unlock at Level {comp.unlockLevel}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Companion Display */}
        <div className="active-companion">
          <div className="companion-display">
            <div className="companion-visual">
              <div 
                className="companion-orb"
                style={{ 
                  backgroundColor: companion.appearance.color,
                  boxShadow: `0 0 30px ${companion.appearance.color}40`
                }}
              >
                <FaRobot />
                <div className="companion-effects">
                  {Array.from({length: 8}, (_, i) => (
                    <div 
                      key={i} 
                      className="particle" 
                      style={{
                        '--delay': `${i * 0.5}s`,
                        '--color': companion.appearance.color
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mood-indicator">
                <span>{companionMoods[companion.mood]?.emoji}</span>
                <span>{companion.mood}</span>
              </div>
            </div>

            <div className="companion-stats">
              <h4>{companion.name} - Level {companion.level}</h4>
              <div className="stat-bars">
                <div className="stat-bar">
                  <label>Energy</label>
                  <div className="bar">
                    <div 
                      className="fill energy" 
                      style={{ width: `${companion.energy}%` }}
                    />
                  </div>
                  <span>{companion.energy}%</span>
                </div>
                <div className="stat-bar">
                  <label>Intelligence</label>
                  <div className="bar">
                    <div 
                      className="fill intelligence" 
                      style={{ width: `${companion.intelligence}%` }}
                    />
                  </div>
                  <span>{companion.intelligence}%</span>
                </div>
                <div className="stat-bar">
                  <label>Loyalty</label>
                  <div className="bar">
                    <div 
                      className="fill loyalty" 
                      style={{ width: `${companion.loyalty}%` }}
                    />
                  </div>
                  <span>{companion.loyalty}%</span>
                </div>
                <div className="stat-bar">
                  <label>Experience</label>
                  <div className="bar">
                    <div 
                      className="fill experience" 
                      style={{ width: `${(companion.experience % 100)}%` }}
                    />
                  </div>
                  <span>{companion.experience % 100}/100</span>
                </div>
              </div>
            </div>
          </div>

          {/* Companion Actions */}
          <div className="companion-actions">
            <button 
              className="action-btn feed-btn"
              onClick={feedCompanion}
              disabled={companion.energy >= 100}
            >
              <FaHeart /> Feed Energy
            </button>
            <button 
              className="action-btn train-btn"
              onClick={() => trainCompanion('intelligence')}
              disabled={companion.energy < 20}
            >
              <FaBrain /> Train Intelligence
            </button>
            <button className="action-btn gift-btn">
              <FaGift /> Give Gift
            </button>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="companion-chat">
          <div className="chat-header">
            <FaComments /> Chat with {companion.name}
          </div>
          <div className="chat-messages">
            {conversation.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender} ${message.type}`}
              >
                {message.sender === 'companion' && (
                  <div className="message-avatar">
                    <FaRobot style={{ color: companion.appearance.color }} />
                  </div>
                )}
                <div className="message-content">
                  <span className="message-text">{message.text}</span>
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message companion typing">
                <div className="message-avatar">
                  <FaRobot style={{ color: companion.appearance.color }} />
                </div>
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask your companion anything..."
            />
            <button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AICompanionSystem;
