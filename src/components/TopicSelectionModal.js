import React, { useState } from 'react';
import './TopicSelectionModal.css';

const PROGRAMMING_LANGUAGES = [
  {
    id: 'cpp',
    name: 'C++',
    icon: '⚡',
    description: 'System programming and competitive coding'
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    description: 'Enterprise applications and Android development'
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    description: 'Data science, AI, and web development'
  }
];

const PROFICIENCY_LEVELS = [
  {
    id: 'basic',
    name: 'Basic',
    icon: '🌱',
    description: 'New to programming or this language',
    color: '#4CAF50'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: '🚀',
    description: 'Comfortable with fundamentals',
    color: '#FF9800'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: '⭐',
    description: 'Expert level understanding',
    color: '#E91E63'
  }
];

const TopicSelectionModal = ({ isOpen, onClose, onComplete, userEmail }) => {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedTopic || !selectedLevel) return;
    
    setIsSubmitting(true);
    
    try {
      // Save user preferences
      const preferences = {
        topic: selectedTopic,
        level: selectedLevel,
        timestamp: new Date().toISOString()
      };
      
      // Call the completion callback with selected preferences
      onComplete(preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content topic-selection-modal">
        <div className="modal-header">
          <h2>Choose Your Learning Path</h2>
          <p>Select a programming language and your current proficiency level to get personalized questions.</p>
        </div>

        <div className="selection-section">
          <h3>Programming Language</h3>
          <div className="options-grid">
            {PROGRAMMING_LANGUAGES.map(lang => (
              <div 
                key={lang.id}
                className={`option-card ${selectedTopic === lang.id ? 'selected' : ''}`}
                onClick={() => setSelectedTopic(lang.id)}
              >
                <div className="option-icon">{lang.icon}</div>
                <div className="option-name">{lang.name}</div>
                <div className="option-description">{lang.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="selection-section">
          <h3>Proficiency Level</h3>
          <div className="options-grid">
            {PROFICIENCY_LEVELS.map(level => (
              <div 
                key={level.id}
                className={`option-card ${selectedLevel === level.id ? 'selected' : ''}`}
                onClick={() => setSelectedLevel(level.id)}
                style={{ '--level-color': level.color }}
              >
                <div className="option-icon">{level.icon}</div>
                <div className="option-name">{level.name}</div>
                <div className="option-description">{level.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button 
            className="btn-secondary" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            className="btn-primary" 
            onClick={handleSubmit}
            disabled={!selectedTopic || !selectedLevel || isSubmitting}
          >
            {isSubmitting ? 'Setting up...' : 'Start Learning'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopicSelectionModal;
