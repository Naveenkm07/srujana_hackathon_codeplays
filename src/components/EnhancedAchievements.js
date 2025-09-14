import React, { useState, useEffect } from 'react';
import {
  FaTrophy, FaMedal, FaStar, FaFire, FaLightbulb, FaRocket, FaGem, FaCrown,
  FaCode, FaBug, FaHeart, FaBolt, FaShieldAlt, FaMagic, FaBookOpen, FaGraduationCap,
  FaLock, FaCheck, FaClock, FaCalendarAlt, FaChartLine, FaGamepad, FaMountain,
  FaUserGraduate, FaAward, FaComments, FaHandsHelping, FaLaptopCode, FaBrain,
  FaEye, FaKeyboard, FaMousePointer, FaWifi, FaDatabase, FaServer, FaCogs,
  FaPalette, FaMusic, FaVideo, FaCamera, FaPuzzlePiece, FaDice, FaChess
} from 'react-icons/fa';
import './EnhancedAchievements.css';

const EnhancedAchievements = ({ currentUser, playerStats }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showParticles, setShowParticles] = useState(false);
  const [recentlyEarned, setRecentlyEarned] = useState([]);

  // Achievement Tiers with unique colors and effects
  const tiers = {
    bronze: { name: 'Bronze', color: '#CD7F32', minPoints: 0, glow: '#FFB366' },
    silver: { name: 'Silver', color: '#C0C0C0', minPoints: 100, glow: '#E6E6E6' },
    gold: { name: 'Gold', color: '#FFD700', minPoints: 250, glow: '#FFED4E' },
    platinum: { name: 'Platinum', color: '#E5E4E2', minPoints: 500, glow: '#F0F0F0' },
    diamond: { name: 'Diamond', color: '#B9F2FF', minPoints: 1000, glow: '#E0F7FF' },
    legendary: { name: 'Legendary', color: '#FF6B35', minPoints: 2000, glow: '#FF8C69' }
  };

  // Categories for organization
  const categories = [
    { id: 'all', name: 'All Achievements', icon: <FaTrophy /> },
    { id: 'learning', name: 'Learning', icon: <FaBookOpen /> },
    { id: 'coding', name: 'Coding Skills', icon: <FaCode /> },
    { id: 'games', name: 'Gaming', icon: <FaGamepad /> },
    { id: 'social', name: 'Social', icon: <FaComments /> },
    { id: 'time', name: 'Time & Consistency', icon: <FaClock /> },
    { id: 'mastery', name: 'Mastery', icon: <FaCrown /> },
    { id: 'special', name: 'Special Events', icon: <FaMagic /> }
  ];

  // Comprehensive achievement system with 35+ unique achievements
  const achievements = [
    // Learning Category
    {
      id: 'first_steps',
      name: 'First Steps',
      description: 'Complete your first coding lesson',
      icon: <FaGraduationCap />,
      category: 'learning',
      tier: 'bronze',
      points: 25,
      progress: currentUser?.totalQuestions > 0 ? 100 : 0,
      requirement: 'Complete 1 lesson',
      rarity: 'common'
    },
    {
      id: 'knowledge_seeker',
      name: 'Knowledge Seeker',
      description: 'Complete 10 different topics',
      icon: <FaLightbulb />,
      category: 'learning',
      tier: 'silver',
      points: 100,
      progress: Math.min((currentUser?.topicsCompleted || 0) * 10, 100),
      requirement: 'Complete 10 topics',
      rarity: 'uncommon'
    },
    {
      id: 'master_student',
      name: 'Master Student',
      description: 'Achieve perfect scores on 5 consecutive tests',
      icon: <FaCrown />,
      category: 'learning',
      tier: 'gold',
      points: 300,
      progress: Math.min((currentUser?.perfectStreaks || 0) * 20, 100),
      requirement: '5 perfect scores in a row',
      rarity: 'rare'
    },

    // Coding Skills Category
    {
      id: 'hello_world',
      name: 'Hello World',
      description: 'Write your first program',
      icon: <FaCode />,
      category: 'coding',
      tier: 'bronze',
      points: 50,
      progress: currentUser?.programsWritten > 0 ? 100 : 0,
      requirement: 'Write 1 program',
      rarity: 'common'
    },
    {
      id: 'bug_hunter',
      name: 'Bug Hunter',
      description: 'Debug 25 coding problems successfully',
      icon: <FaBug />,
      category: 'coding',
      tier: 'silver',
      points: 150,
      progress: Math.min((currentUser?.bugsFixed || 0) * 4, 100),
      requirement: 'Debug 25 problems',
      rarity: 'uncommon'
    },
    {
      id: 'algorithm_wizard',
      name: 'Algorithm Wizard',
      description: 'Master advanced data structures and algorithms',
      icon: <FaMagic />,
      category: 'coding',
      tier: 'platinum',
      points: 750,
      progress: Math.min((currentUser?.algorithmsCompleted || 0) * 5, 100),
      requirement: 'Complete 20 algorithm challenges',
      rarity: 'epic'
    },
    {
      id: 'code_artist',
      name: 'Code Artist',
      description: 'Write exceptionally clean and beautiful code',
      icon: <FaPalette />,
      category: 'coding',
      tier: 'gold',
      points: 400,
      progress: Math.min((currentUser?.cleanCodeScore || 0), 100),
      requirement: 'Maintain 90%+ code quality',
      rarity: 'rare'
    },

    // Gaming Category
    {
      id: 'game_enthusiast',
      name: 'Game Enthusiast',
      description: 'Play 5 different coding games',
      icon: <FaGamepad />,
      category: 'games',
      tier: 'bronze',
      points: 75,
      progress: Math.min((currentUser?.gamesPlayed || 0) * 20, 100),
      requirement: 'Play 5 games',
      rarity: 'common'
    },
    {
      id: 'puzzle_master',
      name: 'Puzzle Master',
      description: 'Solve 100 coding puzzles',
      icon: <FaPuzzlePiece />,
      category: 'games',
      tier: 'gold',
      points: 350,
      progress: Math.min((currentUser?.puzzlesSolved || 0), 100),
      requirement: 'Solve 100 puzzles',
      rarity: 'rare'
    },
    {
      id: 'speed_demon',
      name: 'Speed Demon',
      description: 'Complete challenges in record time',
      icon: <FaBolt />,
      category: 'games',
      tier: 'silver',
      points: 200,
      progress: Math.min((currentUser?.fastCompletions || 0) * 10, 100),
      requirement: 'Complete 10 speed challenges',
      rarity: 'uncommon'
    },
    {
      id: 'rpg_hero',
      name: 'RPG Hero',
      description: 'Reach level 10 in Coding RPG',
      icon: <FaCrown />,
      category: 'games',
      tier: 'gold',
      points: 500,
      progress: Math.min((currentUser?.rpgLevel || 0) * 10, 100),
      requirement: 'Reach RPG level 10',
      rarity: 'rare'
    },

    // Time & Consistency Category
    {
      id: 'early_bird',
      name: 'Early Bird',
      description: 'Study before 8 AM for 7 consecutive days',
      icon: <FaClock />,
      category: 'time',
      tier: 'silver',
      points: 125,
      progress: Math.min((currentUser?.earlyStudyDays || 0) * 14.3, 100),
      requirement: 'Study early 7 days straight',
      rarity: 'uncommon'
    },
    {
      id: 'night_owl',
      name: 'Night Owl',
      description: 'Code after 10 PM for 5 consecutive days',
      icon: <FaMountain />,
      category: 'time',
      tier: 'bronze',
      points: 100,
      progress: Math.min((currentUser?.lateStudyDays || 0) * 20, 100),
      requirement: 'Study late 5 days straight',
      rarity: 'common'
    },
    {
      id: 'consistency_king',
      name: 'Consistency King',
      description: 'Study every day for 30 days',
      icon: <FaCalendarAlt />,
      category: 'time',
      tier: 'platinum',
      points: 800,
      progress: Math.min((currentUser?.studyStreak || 0) * 3.33, 100),
      requirement: '30-day study streak',
      rarity: 'epic'
    },
    {
      id: 'marathon_coder',
      name: 'Marathon Coder',
      description: 'Code for 8+ hours in a single day',
      icon: <FaRocket />,
      category: 'time',
      tier: 'gold',
      points: 300,
      progress: Math.min((currentUser?.maxDailyHours || 0) * 12.5, 100),
      requirement: 'Code 8+ hours in one day',
      rarity: 'rare'
    },

    // Social Category
    {
      id: 'helpful_mentor',
      name: 'Helpful Mentor',
      description: 'Help 10 other students with their code',
      icon: <FaHandsHelping />,
      category: 'social',
      tier: 'gold',
      points: 400,
      progress: Math.min((currentUser?.studentsHelped || 0) * 10, 100),
      requirement: 'Help 10 students',
      rarity: 'rare'
    },
    {
      id: 'team_player',
      name: 'Team Player',
      description: 'Complete 3 group projects',
      icon: <FaComments />,
      category: 'social',
      tier: 'silver',
      points: 200,
      progress: Math.min((currentUser?.groupProjects || 0) * 33.3, 100),
      requirement: 'Complete 3 group projects',
      rarity: 'uncommon'
    },

    // Mastery Category
    {
      id: 'perfectionist',
      name: 'Perfectionist',
      description: 'Achieve 100% accuracy on 20 tests',
      icon: <FaGem />,
      category: 'mastery',
      tier: 'platinum',
      points: 600,
      progress: Math.min((currentUser?.perfectTests || 0) * 5, 100),
      requirement: '100% on 20 tests',
      rarity: 'epic'
    },
    {
      id: 'javascript_ninja',
      name: 'JavaScript Ninja',
      description: 'Master all JavaScript concepts',
      icon: <FaUserGraduate />,
      category: 'mastery',
      tier: 'gold',
      points: 500,
      progress: Math.min((currentUser?.jsConceptsMastered || 0) * 2, 100),
      requirement: 'Master 50 JS concepts',
      rarity: 'rare'
    },
    {
      id: 'python_sage',
      name: 'Python Sage',
      description: 'Become a Python expert',
      icon: <FaShieldAlt />,
      category: 'mastery',
      tier: 'gold',
      points: 500,
      progress: Math.min((currentUser?.pythonLevel || 0) * 20, 100),
      requirement: 'Reach Python level 5',
      rarity: 'rare'
    },

    // Special Events Category
    {
      id: 'beta_tester',
      name: 'Beta Tester',
      description: 'Try new features before official release',
      icon: <FaRocket />,
      category: 'special',
      tier: 'diamond',
      points: 1000,
      progress: currentUser?.betaTester ? 100 : 0,
      requirement: 'Join beta testing program',
      rarity: 'legendary'
    },
    {
      id: 'anniversary_celebration',
      name: 'Anniversary Celebration',
      description: 'Active during platform anniversary',
      icon: <FaAward />,
      category: 'special',
      tier: 'gold',
      points: 250,
      progress: currentUser?.anniversaryParticipant ? 100 : 0,
      requirement: 'Participate in anniversary event',
      rarity: 'rare'
    },

    // Additional unique achievements
    {
      id: 'keyboard_warrior',
      name: 'Keyboard Warrior',
      description: 'Type 10,000 lines of code',
      icon: <FaKeyboard />,
      category: 'coding',
      tier: 'silver',
      points: 175,
      progress: Math.min((currentUser?.linesOfCode || 0) / 100, 100),
      requirement: 'Type 10,000 lines of code',
      rarity: 'uncommon'
    },
    {
      id: 'database_architect',
      name: 'Database Architect',
      description: 'Design and implement complex databases',
      icon: <FaDatabase />,
      category: 'coding',
      tier: 'platinum',
      points: 700,
      progress: Math.min((currentUser?.databaseProjects || 0) * 25, 100),
      requirement: 'Complete 4 database projects',
      rarity: 'epic'
    },
    {
      id: 'ui_designer',
      name: 'UI Designer',
      description: 'Create beautiful user interfaces',
      icon: <FaPalette />,
      category: 'coding',
      tier: 'gold',
      points: 350,
      progress: Math.min((currentUser?.uiProjects || 0) * 20, 100),
      requirement: 'Design 5 UI projects',
      rarity: 'rare'
    },
    {
      id: 'api_master',
      name: 'API Master',
      description: 'Successfully integrate 15 different APIs',
      icon: <FaServer />,
      category: 'coding',
      tier: 'gold',
      points: 400,
      progress: Math.min((currentUser?.apisIntegrated || 0) * 6.67, 100),
      requirement: 'Integrate 15 APIs',
      rarity: 'rare'
    },
    {
      id: 'security_expert',
      name: 'Security Expert',
      description: 'Master cybersecurity best practices',
      icon: <FaShieldAlt />,
      category: 'mastery',
      tier: 'platinum',
      points: 650,
      progress: Math.min((currentUser?.securityLevel || 0) * 25, 100),
      requirement: 'Complete security certification',
      rarity: 'epic'
    },
    {
      id: 'creative_coder',
      name: 'Creative Coder',
      description: 'Combine art and programming',
      icon: <FaMusic />,
      category: 'special',
      tier: 'gold',
      points: 300,
      progress: Math.min((currentUser?.creativeProjects || 0) * 33.3, 100),
      requirement: 'Complete 3 creative coding projects',
      rarity: 'rare'
    },
    {
      id: 'mobile_developer',
      name: 'Mobile Developer',
      description: 'Build mobile applications',
      icon: <FaWifi />,
      category: 'coding',
      tier: 'gold',
      points: 450,
      progress: Math.min((currentUser?.mobileApps || 0) * 50, 100),
      requirement: 'Build 2 mobile apps',
      rarity: 'rare'
    },
    {
      id: 'documentation_hero',
      name: 'Documentation Hero',
      description: 'Write comprehensive project documentation',
      icon: <FaBookOpen />,
      category: 'coding',
      tier: 'silver',
      points: 150,
      progress: Math.min((currentUser?.documentedProjects || 0) * 20, 100),
      requirement: 'Document 5 projects thoroughly',
      rarity: 'uncommon'
    },
    {
      id: 'test_champion',
      name: 'Test Champion',
      description: 'Write comprehensive unit tests',
      icon: <FaCheck />,
      category: 'coding',
      tier: 'gold',
      points: 350,
      progress: Math.min((currentUser?.testsWritten || 0) / 10, 100),
      requirement: 'Write 1000+ unit tests',
      rarity: 'rare'
    },
    {
      id: 'optimization_guru',
      name: 'Optimization Guru',
      description: 'Improve code performance significantly',
      icon: <FaChartLine />,
      category: 'mastery',
      tier: 'platinum',
      points: 750,
      progress: Math.min((currentUser?.optimizationScore || 0), 100),
      requirement: 'Achieve 95%+ optimization score',
      rarity: 'epic'
    },
    {
      id: 'ai_explorer',
      name: 'AI Explorer',
      description: 'Experiment with artificial intelligence',
      icon: <FaBrain />,
      category: 'special',
      tier: 'diamond',
      points: 900,
      progress: Math.min((currentUser?.aiProjects || 0) * 50, 100),
      requirement: 'Complete 2 AI projects',
      rarity: 'legendary'
    },
    {
      id: 'blockchain_pioneer',
      name: 'Blockchain Pioneer',
      description: 'Explore blockchain technology',
      icon: <FaCogs />,
      category: 'special',
      tier: 'diamond',
      points: 1200,
      progress: Math.min((currentUser?.blockchainProjects || 0) * 100, 100),
      requirement: 'Build blockchain application',
      rarity: 'legendary'
    }
  ];

  // Filter achievements based on category, tier, and search
  const getFilteredAchievements = () => {
    return achievements.filter(achievement => {
      const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
      const matchesTier = selectedTier === 'all' || achievement.tier === selectedTier;
      const matchesSearch = achievement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesTier && matchesSearch;
    });
  };

  // Get achievement tier info
  const getTierInfo = (tierName) => tiers[tierName] || tiers.bronze;

  // Check if achievement is earned
  const isEarned = (achievement) => achievement.progress >= 100;

  // Get rarity color
  const getRarityColor = (rarity) => {
    const rarityColors = {
      common: '#95a5a6',
      uncommon: '#27ae60',
      rare: '#3498db',
      epic: '#9b59b6',
      legendary: '#e74c3c'
    };
    return rarityColors[rarity] || rarityColors.common;
  };

  // Statistics
  const earnedCount = achievements.filter(isEarned).length;
  const totalPoints = achievements.filter(isEarned).reduce((sum, ach) => sum + ach.points, 0);
  const completionPercentage = Math.round((earnedCount / achievements.length) * 100);

  return (
    <div className="enhanced-achievements">
      <div className="achievements-header">
        <div className="header-content">
          <h2>🏆 Achievements & Milestones</h2>
          <div className="achievement-stats">
            <div className="stat-card">
              <div className="stat-number">{earnedCount}</div>
              <div className="stat-label">Earned</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{achievements.length}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{totalPoints}</div>
              <div className="stat-label">Points</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{completionPercentage}%</div>
              <div className="stat-label">Complete</div>
            </div>
          </div>
        </div>
        
        <div className="progress-ring">
          <svg className="progress-ring-svg" width="120" height="120">
            <circle
              className="progress-ring-circle-bg"
              cx="60"
              cy="60"
              r="54"
            />
            <circle
              className="progress-ring-circle"
              cx="60"
              cy="60"
              r="54"
              style={{
                strokeDashoffset: `${339.29 - (339.29 * completionPercentage) / 100}px`
              }}
            />
          </svg>
          <div className="progress-text">
            <span className="progress-percentage">{completionPercentage}%</span>
            <span className="progress-label">Complete</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-tabs">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.icon}
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="tier-filters">
            <button
              className={`tier-filter ${selectedTier === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTier('all')}
            >
              All Tiers
            </button>
            {Object.entries(tiers).map(([key, tier]) => (
              <button
                key={key}
                className={`tier-filter ${selectedTier === key ? 'active' : ''}`}
                onClick={() => setSelectedTier(key)}
                style={{ 
                  '--tier-color': tier.color,
                  '--tier-glow': tier.glow
                }}
              >
                {tier.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="achievements-grid">
        {getFilteredAchievements().map(achievement => {
          const tierInfo = getTierInfo(achievement.tier);
          const earned = isEarned(achievement);
          
          return (
            <div
              key={achievement.id}
              className={`achievement-card ${earned ? 'earned' : 'locked'} tier-${achievement.tier}`}
              style={{
                '--tier-color': tierInfo.color,
                '--tier-glow': tierInfo.glow,
                '--rarity-color': getRarityColor(achievement.rarity)
              }}
            >
              <div className="achievement-tier-badge">
                {tierInfo.name}
              </div>
              
              <div className="achievement-rarity-indicator">
                <div 
                  className="rarity-dot" 
                  style={{ backgroundColor: getRarityColor(achievement.rarity) }}
                ></div>
                <span className="rarity-text">{achievement.rarity}</span>
              </div>

              <div className="achievement-icon-container">
                <div className="achievement-icon">
                  {achievement.icon}
                </div>
                {earned && <div className="earned-checkmark"><FaCheck /></div>}
              </div>

              <div className="achievement-content">
                <h3 className="achievement-name">{achievement.name}</h3>
                <p className="achievement-description">{achievement.description}</p>
                <div className="achievement-requirement">{achievement.requirement}</div>

                <div className="achievement-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{achievement.progress}%</span>
                </div>

                <div className="achievement-footer">
                  <div className="achievement-points">
                    <FaGem className="points-icon" />
                    {achievement.points} pts
                  </div>
                  {earned && (
                    <div className="earned-date">
                      Earned {new Date().toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>

              {earned && (
                <div className="achievement-glow"></div>
              )}
            </div>
          );
        })}
      </div>

      {showParticles && (
        <div className="celebration-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedAchievements;
