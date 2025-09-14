import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../App';
import LearningModules from './student/LearningModules';
import LoadingSpinner from './LoadingSpinner';
import { LearningService } from '../services/supabaseClient';
import SubjectProgress from './charts/SubjectProgress';
import ActivityChart from './charts/ActivityChart';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { AnalyticsService, UserBehaviorTracker } from '../utils/analytics';
import { FaBook, FaChartLine, FaTrophy, FaChartBar, FaUser, FaCog, FaCalendarAlt, FaBullseye, FaChevronLeft, FaChevronRight, FaTimes, FaGamepad, FaCode, FaPlay, FaRedo, FaLightbulb, FaFire, FaSave, FaCheckCircle, FaRobot, FaPuzzlePiece } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';
import Introduction from './cmodules/Introduction';
import Variables from './cmodules/Variables';
import DataTypes from './cmodules/DataTypes';
import Operators from './cmodules/Operators';
import ConditionalStatements from './cmodules/ConditionalStatements';
import Loops from './cmodules/Loops';
import BasicInputOutput from './cmodules/BasicInputOutput';
import HeaderFiles from './cmodules/HeaderFiles';
import Keywords from './cmodules/Keywords';
import Identifiers from './cmodules/Identifiers';
// Java Components
import JavaIntroduction from './cmodules/JavaIntroduction';
import JavaVariables from './cmodules/JavaVariables';
import JavaDataTypes from './cmodules/JavaDataTypes';
import JavaOperators from './cmodules/JavaOperators';
import JavaConditionalStatements from './cmodules/JavaConditionalStatements';
import JavaLoops from './cmodules/JavaLoops';
import JavaArrays from './cmodules/JavaArrays';
import JavaStrings from './cmodules/JavaStrings';
import JavaMethods from './cmodules/JavaMethods';
// Python Components
import PythonIntroduction from './cmodules/PythonIntroduction';
import PythonVariables from './cmodules/PythonVariables';
import PythonDataTypes from './cmodules/PythonDataTypes';
import PythonOperators from './cmodules/PythonOperators';
import PythonConditionalStatements from './cmodules/PythonConditionalStatements';
import PythonLoops from './cmodules/PythonLoops';
import PythonLists from './cmodules/PythonLists';
import PythonStrings from './cmodules/PythonStrings';
import PythonFunctions from './cmodules/PythonFunctions';
import AiChartTab from '../features/ai-chart';
import EnhancedGamesSection from './EnhancedGamesSection';
import LearningResources from './LearningResources';
import EnhancedAchievements from './EnhancedAchievements';
import EnhancedLearning from './EnhancedLearning';

// Constants
const DASHBOARD_SECTIONS = {
  OVERVIEW: 'overview',
  LEARNING: 'learning',
  RESOURCES: 'resources',
  ACHIEVEMENTS: 'achievements',
  CHALLENGES: 'challenges',
  CMODULES: 'cmodules',
  AI_CHARTS: 'ai-charts',
  GAMES: 'games',
  PROFILE: 'profile'
};

function StudentDashboard() {
  const { 
    currentUser, 
    appData, 
    setCurrentLesson,
    setShowLessonModal,
    handleLogout 
  } = useAppContext();
  const [activeSection, setActiveSection] = useState(DASHBOARD_SECTIONS.OVERVIEW);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useLocalStorage('user_recommendations', []);

  const generateRecommendations = useCallback((progressData) => {
    const newRecommendations = [];
    
    // Analyze progress and suggest next steps
    Object.entries(progressData || {}).forEach(([subject, progress]) => {
      if (progress < 50) {
        newRecommendations.push({
          type: 'continue',
          title: `Continue with ${subject}`,
          description: `You're ${progress}% through. Keep going to unlock advanced topics!`,
          priority: 'medium'
        });
      }
    });

    if (newRecommendations.length === 0) {
      newRecommendations.push({
        type: 'explore',
        title: 'Explore New Subjects',
        description: 'You\'re doing great! Ready to explore new learning areas?',
        priority: 'low'
      });
    }

    setRecommendations(newRecommendations);
  }, [setRecommendations]);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load subjects with fallback
      const { data: subjectsData, error: subjectsError } = await LearningService.getSubjects();
      if (subjectsError) {
        console.error('Error loading subjects:', subjectsError);
        setSubjects(appData.subjects || []);
      } else {
        setSubjects(subjectsData || []);
      }

      // Load user progress with fallback
      let progressData;
      if (currentUser.id) {
        const { data: userProgressData, error: progressError } = await LearningService.getUserProgress(currentUser.id);
        if (progressError) {
          console.error('Error loading progress:', progressError);
          progressData = currentUser.progress || {};
        } else {
          progressData = userProgressData || {};
        }
      } else {
        progressData = currentUser.progress || {};
      }
      
      setUserProgress(progressData);
      generateRecommendations(progressData);
      
      if (currentUser.id) {
        AnalyticsService.getLearningAnalytics(currentUser.id);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setError('Failed to load dashboard data. Using cached information.');
      
      // Fallback to app data
      const fallbackProgress = currentUser.progress || {};
      setSubjects(appData.subjects || []);
      setUserProgress(fallbackProgress);
      generateRecommendations(fallbackProgress);
    } finally {
      setLoading(false);
    }
  }, [appData.subjects, currentUser, generateRecommendations]);

  useEffect(() => {
    if (!currentUser) return;
    
    // Auto-redirect if not logged in or wrong role
    if (!currentUser || currentUser.role !== 'student') {
      handleLogout();
      return;
    }

    // Track page view
    UserBehaviorTracker.trackPageView('student_dashboard');
    AnalyticsService.trackUserEngagement('dashboard_visit', { userId: currentUser.id });

    loadDashboardData();
  }, [currentUser?.id, currentUser?.role]); // Remove unstable dependencies

  const handleNavigation = (section) => {
    UserBehaviorTracker.trackButtonClick('navigation', { section });
    setActiveSection(section);
  };

  if (!currentUser) return null;
  if (loading) return <LoadingSpinner message="Loading your dashboard..." />;
  if (error) {
    return (
      <div className="error-container">
        <h2>Dashboard Error</h2>
        <p>{error}</p>
        <button onClick={loadDashboardData} className="btn-primary">
          Retry Loading
        </button>
      </div>
    );
  }

  const handleStartLesson = (lesson, subject) => {
    // Track lesson start event
    AnalyticsService.trackEvent('lesson_started', {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      subjectId: subject.id,
      subjectName: subject.name,
      userId: currentUser?.id
    });

    // Track user behavior
    UserBehaviorTracker.trackButtonClick('start_lesson', { 
      lesson: lesson.title, 
      subject: subject.name 
    });

    setCurrentLesson({ lesson, subject });
    setShowLessonModal(true);
  };

  return (
    <div id="student-dashboard" className="page active">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🎓 Smart Tutor</h2>
        </div>
        <div className="nav-menu">
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.OVERVIEW ? 'active' : ''}`}
            onClick={() => handleNavigation(DASHBOARD_SECTIONS.OVERVIEW)}
          >
            <FaChartBar /> Overview
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.LEARNING ? 'active' : ''}`}
            onClick={() => handleNavigation(DASHBOARD_SECTIONS.LEARNING)}
          >
            <FaBook /> Learning
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.RESOURCES ? 'active' : ''}`}
            onClick={() => handleNavigation(DASHBOARD_SECTIONS.RESOURCES)}
          >
            <FaChartLine /> Resources
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.ACHIEVEMENTS ? 'active' : ''}`}
            onClick={() => setActiveSection(DASHBOARD_SECTIONS.ACHIEVEMENTS)}
          >
            <FaTrophy className="nav-icon" />
            Achievements
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.CHALLENGES ? 'active' : ''}`}
            onClick={() => setActiveSection(DASHBOARD_SECTIONS.CHALLENGES)}
          >
            <FaGamepad className="nav-icon" />
            Challenges
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.CMODULES ? 'active' : ''}`}
            onClick={() => setActiveSection(DASHBOARD_SECTIONS.CMODULES)}
          >
            <FaCode className="nav-icon" />
            C-Modules
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.AI_CHARTS ? 'active' : ''}`}
            onClick={() => setActiveSection(DASHBOARD_SECTIONS.AI_CHARTS)}
          >
            <FaRobot className="nav-icon" />
            AI Charts
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.GAMES ? 'active' : ''}`}
            onClick={() => setActiveSection(DASHBOARD_SECTIONS.GAMES)}
          >
            <FaPuzzlePiece className="nav-icon" />
            Games
          </button>
          <button 
            className={`nav-item ${activeSection === DASHBOARD_SECTIONS.PROFILE ? 'active' : ''}`}
            onClick={() => handleNavigation(DASHBOARD_SECTIONS.PROFILE)}
          >
            <FaUser /> Profile
          </button>
        </div>
        <div className="nav-user">
          <ThemeToggle className="nav-theme-toggle" />
          <span>{currentUser.name}</span>
          <button className="btn btn--secondary btn--sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Overview Section */}
        {activeSection === DASHBOARD_SECTIONS.OVERVIEW && (
          <OverviewSection 
            currentUser={currentUser}
            recommendations={recommendations}
          />
        )}

        {/* Learning Section */}
        {activeSection === DASHBOARD_SECTIONS.LEARNING && (
          <EnhancedLearning 
            currentUser={currentUser} 
            onProgress={handleProgress}
          />
        )}

        {/* Resources Section */}
        {activeSection === DASHBOARD_SECTIONS.RESOURCES && (
          <LearningResources currentUser={currentUser} />
        )}

        {/* Achievements Section */}
        {activeSection === DASHBOARD_SECTIONS.ACHIEVEMENTS && (
          <EnhancedAchievements currentUser={currentUser} playerStats={currentUser} />
        )}

        {/* Challenges Section */}
        {activeSection === DASHBOARD_SECTIONS.CHALLENGES && (
          <ChallengesSection currentUser={currentUser} />
        )}

        {/* C-Modules Section */}
        {activeSection === DASHBOARD_SECTIONS.CMODULES && (
          <CModulesSection currentUser={currentUser} />
        )}

        {/* AI Charts Section */}
        {activeSection === DASHBOARD_SECTIONS.AI_CHARTS && (
          <AiChartTab />
        )}

        {/* Games Section */}
        {activeSection === DASHBOARD_SECTIONS.GAMES && <EnhancedGamesSection currentUser={currentUser} />}

        {/* Profile Section */}
        {activeSection === DASHBOARD_SECTIONS.PROFILE && (
          <ProfileSection currentUser={currentUser} userProgress={userProgress} subjects={subjects} />
        )}
      </div>
    </div>
  );
};

// Enhanced Home/Overview Section
const OverviewSection = ({ currentUser, recommendations }) => (
  <div className="section active">
    <div className="home-header">
      <div className="welcome-section">
        <h1>Welcome back, {currentUser.name?.split(' ')[0] || 'Coder'}! 👋</h1>
        <p className="welcome-subtitle">Ready to continue your coding journey?</p>
        <div className="skill-level-badge">
          <span className={`level-indicator ${currentUser.level?.toLowerCase()}`}>
            {currentUser.level === 'Advanced' ? '🚀' : currentUser.level === 'Intermediate' ? '⭐' : '🌱'}
            {currentUser.level || 'Beginner'} Developer
          </span>
        </div>
      </div>
      <div className="daily-goal">
        <h3>Today's Goal</h3>
        <div className="goal-progress">
          <div className="goal-circle">
            <span className="goal-percentage">75%</span>
          </div>
          <p>Complete 2 coding challenges</p>
        </div>
      </div>
    </div>
    
    <div className="dashboard-grid-enhanced">
      <QuickStatsCard currentUser={currentUser} />
      <ContinueLearningCard currentUser={currentUser} />
      <AchievementsPreviewCard currentUser={currentUser} />
      <RecentActivityCard currentUser={currentUser} />
      <QuickActionsCard />
      <ProgressOverviewCard currentUser={currentUser} />
    </div>
  </div>
);

// Enhanced Card Components for New Home Layout
const QuickStatsCard = ({ currentUser }) => (
  <div className="enhanced-card stats-overview">
    <div className="card-header">
      <h3>📊 Your Progress</h3>
    </div>
    <div className="stats-grid">
      <div className="stat-item">
        <div className="stat-value">{currentUser.totalPoints || 0}</div>
        <div className="stat-label">XP Points</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{(currentUser.badges || []).length}</div>
        <div className="stat-label">Achievements</div>
      </div>
      <div className="stat-item">
        <div className="stat-value">{currentUser.currentStreak || 0}</div>
        <div className="stat-label">Day Streak</div>
      </div>
    </div>
  </div>
);

const ContinueLearningCard = ({ currentUser }) => {
  const lastSubject = Object.keys(currentUser.progress || {})[0];
  const progress = currentUser.progress?.[lastSubject] || 0;
  
  return (
    <div className="enhanced-card continue-learning">
      <div className="card-header">
        <h3>🚀 Continue Learning</h3>
      </div>
      <div className="learning-content">
        <div className="subject-info">
          <div className="subject-icon">
            {lastSubject === 'Python' ? '🐍' : 
             lastSubject === 'JavaScript' ? '⚡' : 
             lastSubject === 'React' ? '⚛️' : '💻'}
          </div>
          <div className="subject-details">
            <h4>{lastSubject || 'Python'}</h4>
            <p>Lesson: Variables & Data Types</p>
            <div className="progress-bar-mini">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <span className="progress-text">{progress}% complete</span>
          </div>
        </div>
        <button className="continue-btn">Continue</button>
      </div>
    </div>
  );
};

const AchievementsPreviewCard = ({ currentUser }) => (
  <div className="enhanced-card achievements-preview">
    <div className="card-header">
      <h3>🏆 Recent Achievements</h3>
    </div>
    <div className="achievements-list">
      <div className="achievement-item-mini">
        <span className="achievement-icon">🎯</span>
        <div className="achievement-info">
          <div className="achievement-name">First Code</div>
          <div className="achievement-date">2 days ago</div>
        </div>
      </div>
      <div className="achievement-item-mini">
        <span className="achievement-icon">🔥</span>
        <div className="achievement-info">
          <div className="achievement-name">3 Day Streak</div>
          <div className="achievement-date">1 day ago</div>
        </div>
      </div>
      {(currentUser.badges || []).length > 2 && (
        <div className="more-achievements">
          +{(currentUser.badges || []).length - 2} more
        </div>
      )}
    </div>
  </div>
);

const RecentActivityCard = ({ currentUser }) => (
  <div className="enhanced-card recent-activity">
    <div className="card-header">
      <h3>📈 This Week</h3>
    </div>
    <div className="activity-summary">
      <div className="activity-chart-mini">
        {(currentUser.weeklyActivity || [0,0,0,0,0,0,0]).map((value, index) => (
          <div 
            key={index} 
            className="activity-bar" 
            style={{ height: `${Math.max(value * 10, 5)}px` }}
          ></div>
        ))}
      </div>
      <div className="activity-stats">
        <div className="activity-stat">
          <span className="stat-number">
            {(currentUser.weeklyActivity || []).reduce((a, b) => a + b, 0)}
          </span>
          <span className="stat-text">lessons completed</span>
        </div>
      </div>
    </div>
  </div>
);

const QuickActionsCard = () => (
  <div className="enhanced-card quick-actions">
    <div className="card-header">
      <h3>⚡ Quick Actions</h3>
    </div>
    <div className="actions-grid">
      <button className="action-btn">
        <span className="action-icon">📝</span>
        <span className="action-text">Start Quiz</span>
      </button>
      <button className="action-btn">
        <span className="action-icon">💡</span>
        <span className="action-text">Get Hint</span>
      </button>
      <button className="action-btn">
        <span className="action-icon">👥</span>
        <span className="action-text">Join Study Room</span>
      </button>
      <button className="action-btn">
        <span className="action-icon">📚</span>
        <span className="action-text">Browse Resources</span>
      </button>
    </div>
  </div>
);

const ProgressOverviewCard = ({ currentUser }) => {
  const subjects = Object.entries(currentUser.progress || {});
  const totalProgress = subjects.length > 0 
    ? subjects.reduce((sum, [_, progress]) => sum + progress, 0) / subjects.length 
    : 0;

  return (
    <div className="enhanced-card progress-overview">
      <div className="card-header">
        <h3>📊 Overall Progress</h3>
      </div>
      <div className="overall-progress">
        <div className="progress-circle-large">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#eee" strokeWidth="8"/>
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#4A90E2" 
              strokeWidth="8"
              strokeDasharray={`${totalProgress * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="progress-text-center">
            <span className="progress-percentage">{Math.round(totalProgress)}%</span>
            <span className="progress-label">Complete</span>
          </div>
        </div>
        <div className="subjects-mini">
          {subjects.slice(0, 3).map(([subject, progress]) => (
            <div key={subject} className="subject-mini">
              <span className="subject-name">{subject}</span>
              <div className="progress-bar-tiny">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SubjectProgressCard = ({ currentUser }) => (
  <div className="card">
    <div className="card__body">
      <h3>Subject Progress</h3>
      <SubjectProgress progress={currentUser.progress || {}} />
    </div>
  </div>
);

const WeeklyActivityCard = ({ currentUser }) => (
  <div className="card">
    <div className="card__body">
      <h3>Weekly Activity</h3>
      <div className="chart-container" style={{ position: 'relative', height: '200px' }}>
        <ActivityChart data={currentUser.weeklyActivity || [0, 0, 0, 0, 0, 0, 0]} />
      </div>
    </div>
  </div>
);

const RecommendationsCard = ({ recommendations }) => (
  <div className="card">
    <div className="card__body">
      <h3>Recommended Next</h3>
      <div>
        {recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <RecommendationItem key={index} recommendation={rec} />
          ))
        ) : (
          <p>Complete more lessons to get personalized recommendations!</p>
        )}
      </div>
    </div>
  </div>
);

const RecommendationItem = ({ recommendation }) => (
  <div className="recommendation-item">
    <div className="recommendation-title">{recommendation.title}</div>
    <div className="recommendation-description">{recommendation.description}</div>
  </div>
);

const LearningSection = ({ subjects, userProgress, onStartLesson }) => (
  <div className="section active">
    <h2>Learning Modules</h2>
    <LearningModules 
      subjects={subjects}
      userProgress={userProgress}
      onStartLesson={onStartLesson}
    />
  </div>
);

const ResourcesSection = () => (
  <div className="section active">
    <h2>Learning Resources</h2>
    <div className="resources-grid">
      <ResourceCard 
        icon="📚"
        title="Study Materials"
        description="Access comprehensive study guides and reference materials"
        status="Available"
      />
      <ResourceCard 
        icon="📝"
        title="Practice Tests"
        description="Take practice tests to prepare for assessments"
        status="Coming Soon"
      />
      <ResourceCard 
        icon="🎥"
        title="Video Tutorials"
        description="Watch explanatory videos for complex topics"
        status="Coming Soon"
      />
      <ResourceCard 
        icon="📊"
        title="Performance Analytics"
        description="Detailed analytics of your learning progress"
        status="Available"
      />
    </div>
  </div>
);

const ResourceCard = ({ icon, title, description, status }) => (
  <div className="resource-card">
    <div className="resource-icon">{icon}</div>
    <h4>{title}</h4>
    <p>{description}</p>
    <span className={`status-badge ${status === 'Available' ? 'available' : 'coming-soon'}`}>
      {status}
    </span>
  </div>
);

const AchievementsSection = ({ currentUser }) => (
  <div className="section active">
    <h2>Your Achievements</h2>
    <div className="achievements-grid">
      <AchievementCategory 
        title="Learning Milestones"
        achievements={currentUser.badges || []}
        type="badges"
      />
      <AchievementCategory 
        title="Streak Achievements"
        achievements={getStreakAchievements(currentUser)}
        type="streaks"
      />
      <AchievementCategory 
        title="Performance Awards"
        achievements={getPerformanceAchievements(currentUser)}
        type="performance"
      />
    </div>
  </div>
);

const AchievementCategory = ({ title, achievements, type }) => (
  <div className="achievement-category">
    <h3>{title}</h3>
    <div className="achievement-list">
      {achievements.length > 0 ? (
        achievements.map((achievement, index) => (
          <AchievementItem key={index} achievement={achievement} type={type} />
        ))
      ) : (
        <p>Keep learning to unlock achievements!</p>
      )}
    </div>
  </div>
);

const AchievementItem = ({ achievement, type }) => (
  <div className="achievement-item">
    <div className="achievement-icon">
      {type === 'badges' && '🏅'}
      {type === 'streaks' && '🔥'}
      {type === 'performance' && '⭐'}
    </div>
    <div className="achievement-details">
      <h4>{achievement.title || achievement.name}</h4>
      <p>{achievement.description}</p>
      {achievement.date && (
        <small>Earned on {new Date(achievement.date).toLocaleDateString()}</small>
      )}
    </div>
  </div>
);

// Helper functions for achievements
const getStreakAchievements = (user) => {
  const achievements = [];
  const streak = user.currentStreak || 0;
  
  if (streak >= 3) {
    achievements.push({
      title: '3-Day Streak',
      description: 'Studied for 3 consecutive days',
      date: user.streakStartDate
    });
  }
  
  if (streak >= 7) {
    achievements.push({
      title: 'Week Warrior',
      description: 'Studied for 7 consecutive days',
      date: user.streakStartDate
    });
  }
  
  if (streak >= 30) {
    achievements.push({
      title: 'Monthly Master',
      description: 'Studied for 30 consecutive days',
      date: user.streakStartDate
    });
  }
  
  return achievements;
};

const getPerformanceAchievements = (user) => {
  const achievements = [];
  const totalPoints = user.totalPoints || 0;
  
  if (totalPoints >= 100) {
    achievements.push({
      title: 'First Century',
      description: 'Earned your first 100 points'
    });
  }
  
  if (totalPoints >= 500) {
    achievements.push({
      title: 'Point Collector',
      description: 'Earned 500 points'
    });
  }
  
  if (totalPoints >= 1000) {
    achievements.push({
      title: 'Thousand Club',
      description: 'Earned 1000 points'
    });
  }
  
  return achievements;
};

// Profile Section Component
const ProfileSection = ({ currentUser, userProgress, subjects }) => {
  const [dailyTimeLimit, setDailyTimeLimit] = useState(120);
  const [learningPace, setLearningPace] = useState('Slow & Steady (2-3 problems/day)');
  const [dailyGoal, setDailyGoal] = useState(120);
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  // Calculate progress stats
  const totalProblems = 314;
  const easyCompleted = Object.values(userProgress).reduce((acc, progress) => acc + Math.floor(progress * 0.3), 0);
  const mediumCompleted = Object.values(userProgress).reduce((acc, progress) => acc + Math.floor(progress * 0.4), 0);
  const hardCompleted = Object.values(userProgress).reduce((acc, progress) => acc + Math.floor(progress * 0.3), 0);
  const totalCompleted = easyCompleted + mediumCompleted + hardCompleted;
  
  const easyTotal = 78;
  const mediumTotal = 208;  
  const hardTotal = 88;

  return (
    <div className="section active">
      <div className="profile-container">
        <div className="profile-header-section">
          <h1>Profile Settings</h1>
          <p className="profile-subtitle">Manage your account information and learning preferences</p>
        </div>

        {/* Profile Header Card */}
        <div className="profile-header-card">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-info">
            <h2>{currentUser.name || 'Naveen Kumar km'}</h2>
            <p className="profile-email">{currentUser.email || 'kmnaveenkm85@gmail.com'}</p>
            <div className="difficulty-badges">
              <span className="difficulty-badge easy">
                🟢 Easy: {easyCompleted}/{easyTotal}
              </span>
              <span className="difficulty-badge medium">
                🟡 Medium: {mediumCompleted}/{mediumTotal}
              </span>
              <span className="difficulty-badge hard">
                🔴 Hard: {hardCompleted}/{hardTotal}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-content-grid">
          {/* Account Information */}
          <div className="profile-card account-info-card">
            <div className="card-header-profile">
              <h3><FaCog /> Account Information</h3>
              <p>Update your personal details and preferences</p>
            </div>
            <div className="profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={currentUser.name || 'Naveen Kumar km'} 
                  className="profile-input"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={currentUser.email || 'kmnaveenkm85@gmail.com'} 
                  className="profile-input"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Daily Time Limit (minutes)</label>
                <input 
                  type="number" 
                  value={dailyTimeLimit}
                  onChange={(e) => setDailyTimeLimit(e.target.value)}
                  className="profile-input"
                  min="30"
                  max="480"
                />
                <small>Recommended for consistent progress</small>
              </div>
              <div className="form-group">
                <label>Learning Pace</label>
                <select 
                  value={learningPace}
                  onChange={(e) => setLearningPace(e.target.value)}
                  className="profile-select"
                >
                  <option>Slow & Steady (2-3 problems/day)</option>
                  <option>Moderate (4-6 problems/day)</option>
                  <option>Intensive (7+ problems/day)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Problem Progress */}
          <div className="profile-card progress-card">
            <div className="card-header-profile">
              <h3><FaBullseye /> Problem Progress</h3>
              <div className="expand-icon">⤴</div>
            </div>
            <div className="progress-summary">
              <div className="overall-progress-text">
                <span className="progress-label">Overall Progress</span>
                <span className="progress-value">{totalCompleted}/{totalProblems}</span>
              </div>
              <div className="difficulty-progress-grid">
                <div className="difficulty-progress-item easy">
                  <div className="difficulty-icon">🟢</div>
                  <div className="difficulty-stats">
                    <div className="difficulty-fraction">{easyCompleted}/{easyTotal}</div>
                    <div className="difficulty-percentage">{Math.round((easyCompleted/easyTotal) * 100)}%</div>
                  </div>
                </div>
                <div className="difficulty-progress-item medium">
                  <div className="difficulty-icon">🟡</div>
                  <div className="difficulty-stats">
                    <div className="difficulty-fraction">{mediumCompleted}/{mediumTotal}</div>
                    <div className="difficulty-percentage">{Math.round((mediumCompleted/mediumTotal) * 100)}%</div>
                  </div>
                </div>
                <div className="difficulty-progress-item hard">
                  <div className="difficulty-icon">🔴</div>
                  <div className="difficulty-stats">
                    <div className="difficulty-fraction">{hardCompleted}/{hardTotal}</div>
                    <div className="difficulty-percentage">{Math.round((hardCompleted/hardTotal) * 100)}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="profile-card preferences-card">
            <div className="card-header-profile">
              <h3>Learning Preferences</h3>
            </div>
            <div className="preferences-content">
              <div className="preference-item daily-goal">
                <div className="preference-icon">🎯</div>
                <div className="preference-details">
                  <span className="preference-label">Daily Goal</span>
                  <span className="preference-value">{dailyGoal} minutes</span>
                </div>
                <input 
                  type="range" 
                  min="30" 
                  max="300" 
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="goal-slider"
                />
              </div>
              <div className="preference-item learning-pace">
                <div className="preference-icon">⚡</div>
                <div className="preference-details">
                  <span className="preference-label">Learning Pace</span>
                  <span className="preference-value">Slow</span>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Calendar */}
          <div className="profile-card calendar-card">
            <div className="card-header-profile">
              <h3><FaCalendarAlt /> Smart Calendar</h3>
              <div className="calendar-icon">📋</div>
            </div>
            <div className="calendar-content">
              <p>Schedule your learning sessions and track your progress over time.</p>
              <button className="calendar-btn" onClick={() => setShowCalendarModal(true)}>View Calendar</button>
            </div>
          </div>
        </div>
        
        {/* Smart Calendar Modal */}
        {showCalendarModal && (
          <SmartCalendarModal 
            onClose={() => setShowCalendarModal(false)}
            userProgress={userProgress}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
};

// Smart Calendar Modal Component
const SmartCalendarModal = ({ onClose, userProgress, currentUser }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(14);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Calculate stats (mock data for now)
  const stats = {
    problems: 0,
    activeDays: 0,
    totalTime: '0hr',
    streak: 0
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date().getDate());
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div 
          key={day} 
          className={`calendar-day ${day === selectedDate ? 'selected' : ''}`}
          onClick={() => setSelectedDate(day)}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-modal-header">
          <div className="calendar-modal-title">
            <FaCalendarAlt />
            <h2>Smart Calendar</h2>
          </div>
          <button className="calendar-close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        {/* Stats Cards */}
        <div className="calendar-stats">
          <div className="calendar-stat-card problems">
            <div className="stat-icon">🧩</div>
            <div className="stat-info">
              <span className="stat-label">Problems</span>
              <span className="stat-value">{stats.problems}</span>
            </div>
          </div>
          <div className="calendar-stat-card active-days">
            <div className="stat-icon">📅</div>
            <div className="stat-info">
              <span className="stat-label">Active Days</span>
              <span className="stat-value">{stats.activeDays}</span>
            </div>
          </div>
          <div className="calendar-stat-card total-time">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <span className="stat-label">Total Time</span>
              <span className="stat-value">{stats.totalTime}</span>
            </div>
          </div>
          <div className="calendar-stat-card streak">
            <div className="stat-icon">🔥</div>
            <div className="stat-info">
              <span className="stat-label">Streak</span>
              <span className="stat-value">{stats.streak}</span>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="calendar-navigation">
          <button className="nav-btn" onClick={goToPreviousMonth}>
            <FaChevronLeft />
          </button>
          <div className="month-year">
            <span className="month-name">{monthNames[currentMonth]} {currentYear}</span>
            <button className="today-btn" onClick={goToToday}>Today</button>
          </div>
          <button className="nav-btn" onClick={goToNextMonth}>
            <FaChevronRight />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {/* Days of week header */}
          <div className="calendar-header">
            {daysOfWeek.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="calendar-days">
            {renderCalendarDays()}
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Gaming Challenge Section
const ChallengesSection = ({ currentUser }) => {
  const [selectedCategory, setSelectedCategory] = useState('Arrays');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Easy');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [userCode, setUserCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(105);
  const [solutionProgress, setSolutionProgress] = useState(60);
  const [output, setOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const categories = [
    'Arrays', 
    'Strings', 
    'Linked Lists', 
    'Stacks & Queues',
    'Trees', 
    'Binary Search Trees',
    'Heaps',
    'Graphs', 
    'Dynamic Programming',
    'Greedy Algorithms',
    'Backtracking',
    'Divide & Conquer',
    'Sorting & Searching',
    'Hash Tables',
    'Two Pointers',
    'Sliding Window',
    'Bit Manipulation',
    'Math & Number Theory',
    'Design Patterns',
    'System Design',
    'Recursion',
    'Trie',
    'Union Find',
    'Segment Trees',
    'Binary Search',
    'Game Theory',
    'Matrix',
    'Intervals'
  ];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const languages = [
    { id: 'python', name: 'Python', ext: 'py' },
    { id: 'javascript', name: 'JavaScript', ext: 'js' },
    { id: 'java', name: 'Java', ext: 'java' },
    { id: 'cpp', name: 'C++', ext: 'cpp' },
    { id: 'go', name: 'Go', ext: 'go' },
    { id: 'rust', name: 'Rust', ext: 'rs' }
  ];

  // Problem database organized by category and difficulty
  const problemDatabase = {
    'Arrays': {
      'Easy': {
        id: 'largest-element',
        title: 'Find the Largest Element in an Array',
        description: 'Given an array of integers, find the largest element in the array.',
        constraints: ['1 ≤ n ≤ 10^5', '-10^9 ≤ arr[i] ≤ 10^9'],
        examples: [
          { input: '[1, 5, 2, 8, 3]', output: '8', explanation: 'The largest element in the array is 8.' },
          { input: '[-1, -5, -2, -8, -3]', output: '-1', explanation: 'The largest element in the array is -1.' }
        ],
        tests: [
          { id: 't1', input: '3\n1 2 3\n', output: '3\n', public: true },
          { id: 't2', input: '5\n-1 -5 -2 -8 -3\n', output: '-1\n', public: true },
          { id: 't3', input: '1\n42\n', output: '42\n', public: false }
        ]
      },
      'Medium': {
        id: 'rotate-array',
        title: 'Rotate Array',
        description: 'Given an array, rotate the array to the right by k steps, where k is non-negative.',
        constraints: ['1 ≤ nums.length ≤ 10^5', '-2^31 ≤ nums[i] ≤ 2^31 - 1', '0 ≤ k ≤ 10^5'],
        examples: [
          { input: 'nums = [1,2,3,4,5,6,7], k = 3', output: '[5,6,7,1,2,3,4]', explanation: 'rotate 1 steps to the right: [7,1,2,3,4,5,6], rotate 2 steps to the right: [6,7,1,2,3,4,5], rotate 3 steps to the right: [5,6,7,1,2,3,4]' }
        ],
        tests: [
          { id: 't1', input: '7 3\n1 2 3 4 5 6 7\n', output: '5 6 7 1 2 3 4\n', public: true }
        ]
      }
    },
    'Strings': {
      'Easy': {
        id: 'reverse-string',
        title: 'Reverse String',
        description: 'Write a function that reverses a string. The input string is given as an array of characters.',
        constraints: ['1 ≤ s.length ≤ 10^5', 's[i] is a printable ascii character'],
        examples: [
          { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: 'hello\n', output: 'olleh\n', public: true }
        ]
      }
    },
    'Recursion': {
      'Easy': {
        id: 'factorial',
        title: 'Calculate Factorial',
        description: 'Write a recursive function to calculate the factorial of a given non-negative integer n.',
        constraints: ['0 ≤ n ≤ 12'],
        examples: [
          { input: 'n = 5', output: '120', explanation: '5! = 5 × 4 × 3 × 2 × 1 = 120' },
          { input: 'n = 0', output: '1', explanation: 'By definition, 0! = 1' }
        ],
        tests: [
          { id: 't1', input: '5\n', output: '120\n', public: true },
          { id: 't2', input: '0\n', output: '1\n', public: true },
          { id: 't3', input: '7\n', output: '5040\n', public: false }
        ]
      }
    },
    'Stacks & Queues': {
      'Easy': {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
        constraints: ['1 ≤ s.length ≤ 10^4', 's consists of parentheses only "()[]{}"'],
        examples: [
          { input: 's = "()"', output: 'true', explanation: '' },
          { input: 's = "()[]{}"', output: 'true', explanation: '' },
          { input: 's = "(]"', output: 'false', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '()\n', output: 'true\n', public: true }
        ]
      }
    },
    'Trees': {
      'Easy': {
        id: 'max-depth-tree',
        title: 'Maximum Depth of Binary Tree',
        description: 'Given the root of a binary tree, return its maximum depth.',
        constraints: ['The number of nodes in the tree is in the range [0, 10^4]', '-100 ≤ Node.val ≤ 100'],
        examples: [
          { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '3 9 20 null null 15 7\n', output: '3\n', public: true }
        ]
      }
    },
    'Dynamic Programming': {
      'Easy': {
        id: 'fibonacci',
        title: 'Fibonacci Number',
        description: 'The Fibonacci numbers form a sequence where each number is the sum of the two preceding ones, starting from 0 and 1.',
        constraints: ['0 ≤ n ≤ 30'],
        examples: [
          { input: 'n = 2', output: '1', explanation: 'F(2) = F(1) + F(0) = 1 + 0 = 1' },
          { input: 'n = 3', output: '2', explanation: 'F(3) = F(2) + F(1) = 1 + 1 = 2' }
        ],
        tests: [
          { id: 't1', input: '2\n', output: '1\n', public: true },
          { id: 't2', input: '3\n', output: '2\n', public: true }
        ]
      }
    },
    'Hash Tables': {
      'Easy': {
        id: 'two-sum',
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        constraints: ['2 ≤ nums.length ≤ 10^4', '-10^9 ≤ nums[i] ≤ 10^9', '-10^9 ≤ target ≤ 10^9'],
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
        ],
        tests: [
          { id: 't1', input: '4 9\n2 7 11 15\n', output: '0 1\n', public: true }
        ]
      }
    },
    'Binary Search': {
      'Easy': {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
        constraints: ['1 ≤ nums.length ≤ 10^4', '-10^4 < nums[i], target < 10^4'],
        examples: [
          { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' }
        ],
        tests: [
          { id: 't1', input: '6 9\n-1 0 3 5 9 12\n', output: '4\n', public: true }
        ]
      }
    },
    'Linked Lists': {
      'Easy': {
        id: 'reverse-linked-list',
        title: 'Reverse Linked List',
        description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
        constraints: ['The number of nodes in the list is the range [0, 5000]', '-5000 ≤ Node.val ≤ 5000'],
        examples: [
          { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: 'Reverse the linked list' }
        ],
        tests: [
          { id: 't1', input: '5\n1 2 3 4 5\n', output: '5 4 3 2 1\n', public: true }
        ]
      }
    },
    'Binary Search Trees': {
      'Easy': {
        id: 'validate-bst',
        title: 'Validate Binary Search Tree',
        description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
        constraints: ['The number of nodes in the tree is in the range [1, 10^4]', '-2^31 ≤ Node.val ≤ 2^31 - 1'],
        examples: [
          { input: 'root = [2,1,3]', output: 'true', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '2 1 3\n', output: 'true\n', public: true }
        ]
      }
    },
    'Heaps': {
      'Easy': {
        id: 'kth-largest',
        title: 'Kth Largest Element in Array',
        description: 'Given an integer array nums and an integer k, return the kth largest element in the array.',
        constraints: ['1 ≤ k ≤ nums.length ≤ 10^5', '-10^4 ≤ nums[i] ≤ 10^4'],
        examples: [
          { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5', explanation: 'The 2nd largest element is 5' }
        ],
        tests: [
          { id: 't1', input: '6 2\n3 2 1 5 6 4\n', output: '5\n', public: true }
        ]
      }
    },
    'Graphs': {
      'Easy': {
        id: 'number-of-islands',
        title: 'Number of Islands',
        description: 'Given an m x n 2D binary grid grid which represents a map of "1"s (land) and "0"s (water), return the number of islands.',
        constraints: ['m == grid.length', 'n == grid[i].length', '1 ≤ m, n ≤ 300'],
        examples: [
          { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0\n', output: '1\n', public: true }
        ]
      }
    },
    'Greedy Algorithms': {
      'Easy': {
        id: 'best-time-stock',
        title: 'Best Time to Buy and Sell Stock',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.',
        constraints: ['1 ≤ prices.length ≤ 10^5', '0 ≤ prices[i] ≤ 10^4'],
        examples: [
          { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' }
        ],
        tests: [
          { id: 't1', input: '6\n7 1 5 3 6 4\n', output: '5\n', public: true }
        ]
      }
    },
    'Backtracking': {
      'Easy': {
        id: 'generate-parentheses',
        title: 'Generate Parentheses',
        description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
        constraints: ['1 ≤ n ≤ 8'],
        examples: [
          { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '3\n', output: '((()))\n(()())\n(())()\n()(())\n()()()\n', public: true }
        ]
      }
    },
    'Divide & Conquer': {
      'Easy': {
        id: 'merge-sort',
        title: 'Merge Sort',
        description: 'Implement merge sort algorithm to sort an array of integers.',
        constraints: ['1 ≤ nums.length ≤ 5 * 10^4', '-5 * 10^4 ≤ nums[i] ≤ 5 * 10^4'],
        examples: [
          { input: 'nums = [5,2,3,1]', output: '[1,2,3,5]', explanation: 'After sorting the array is [1,2,3,5]' }
        ],
        tests: [
          { id: 't1', input: '4\n5 2 3 1\n', output: '1 2 3 5\n', public: true }
        ]
      }
    },
    'Sorting & Searching': {
      'Easy': {
        id: 'search-insert',
        title: 'Search Insert Position',
        description: 'Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.',
        constraints: ['1 ≤ nums.length ≤ 10^4', '-10^4 ≤ nums[i] ≤ 10^4', '-10^4 ≤ target ≤ 10^4'],
        examples: [
          { input: 'nums = [1,3,5,6], target = 5', output: '2', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '4 5\n1 3 5 6\n', output: '2\n', public: true }
        ]
      }
    },
    'Two Pointers': {
      'Easy': {
        id: 'valid-palindrome',
        title: 'Valid Palindrome',
        description: 'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.',
        constraints: ['1 ≤ s.length ≤ 2 * 10^5', 's consists only of printable ASCII characters'],
        examples: [
          { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' }
        ],
        tests: [
          { id: 't1', input: 'A man, a plan, a canal: Panama\n', output: 'true\n', public: true }
        ]
      }
    },
    'Sliding Window': {
      'Easy': {
        id: 'max-subarray',
        title: 'Maximum Subarray',
        description: 'Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
        constraints: ['1 ≤ nums.length ≤ 10^5', '-10^4 ≤ nums[i] ≤ 10^4'],
        examples: [
          { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: '[4,-1,2,1] has the largest sum = 6.' }
        ],
        tests: [
          { id: 't1', input: '9\n-2 1 -3 4 -1 2 1 -5 4\n', output: '6\n', public: true }
        ]
      }
    },
    'Bit Manipulation': {
      'Easy': {
        id: 'single-number',
        title: 'Single Number',
        description: 'Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.',
        constraints: ['1 ≤ nums.length ≤ 3 * 10^4', '-3 * 10^4 ≤ nums[i] ≤ 3 * 10^4'],
        examples: [
          { input: 'nums = [2,2,1]', output: '1', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '3\n2 2 1\n', output: '1\n', public: true }
        ]
      }
    },
    'Math & Number Theory': {
      'Easy': {
        id: 'palindrome-number',
        title: 'Palindrome Number',
        description: 'Given an integer x, return true if x is palindrome integer.',
        constraints: ['-2^31 ≤ x ≤ 2^31 - 1'],
        examples: [
          { input: 'x = 121', output: 'true', explanation: '121 reads as 121 from left to right and from right to left.' }
        ],
        tests: [
          { id: 't1', input: '121\n', output: 'true\n', public: true }
        ]
      }
    },
    'Design Patterns': {
      'Easy': {
        id: 'implement-stack',
        title: 'Implement Stack using Queues',
        description: 'Implement a last-in-first-out (LIFO) stack using only two queues.',
        constraints: ['1 ≤ x ≤ 9', 'At most 100 calls will be made to push, pop, top, and empty'],
        examples: [
          { input: 'push(1), push(2), top(), pop(), empty()', output: '[null, null, 2, 2, false]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: 'push 1\npush 2\ntop\npop\nempty\n', output: '2\n2\nfalse\n', public: true }
        ]
      }
    },
    'System Design': {
      'Easy': {
        id: 'design-parking-system',
        title: 'Design Parking System',
        description: 'Design a parking system for a parking lot. The parking lot has three kinds of parking spaces: big, medium, and small, with a fixed number of slots for each size.',
        constraints: ['0 ≤ big, medium, small ≤ 1000', 'carType is 1, 2, or 3', 'At most 1000 calls will be made to addCar'],
        examples: [
          { input: 'ParkingSystem(1, 1, 0), addCar(1), addCar(2), addCar(3), addCar(1)', output: '[null, true, true, false, false]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '1 1 0\naddCar 1\naddCar 2\naddCar 3\naddCar 1\n', output: 'true\ntrue\nfalse\nfalse\n', public: true }
        ]
      }
    },
    'Trie': {
      'Easy': {
        id: 'implement-trie',
        title: 'Implement Trie (Prefix Tree)',
        description: 'A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.',
        constraints: ['1 ≤ word.length, prefix.length ≤ 2000', 'word and prefix consist only of lowercase English letters'],
        examples: [
          { input: 'insert("apple"), search("apple"), search("app"), startsWith("app"), insert("app"), search("app")', output: '[null, true, false, true, null, true]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: 'insert apple\nsearch apple\nsearch app\nstartsWith app\n', output: 'true\nfalse\ntrue\n', public: true }
        ]
      }
    },
    'Union Find': {
      'Easy': {
        id: 'number-provinces',
        title: 'Number of Provinces',
        description: 'There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.',
        constraints: ['1 ≤ n ≤ 200', 'n == isConnected.length', 'n == isConnected[i].length'],
        examples: [
          { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2', explanation: 'There are 2 provinces' }
        ],
        tests: [
          { id: 't1', input: '3\n1 1 0\n1 1 0\n0 0 1\n', output: '2\n', public: true }
        ]
      }
    },
    'Segment Trees': {
      'Easy': {
        id: 'range-sum-query',
        title: 'Range Sum Query - Immutable',
        description: 'Given an integer array nums, handle multiple queries of the following type: Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.',
        constraints: ['1 ≤ nums.length ≤ 10^4', '-10^5 ≤ nums[i] ≤ 10^5', '0 ≤ left ≤ right < nums.length'],
        examples: [
          { input: 'nums = [-2, 0, 3, -5, 2, -1], sumRange(0,2), sumRange(2,5), sumRange(0,5)', output: '[1, -1, -3]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '6\n-2 0 3 -5 2 -1\nsumRange 0 2\nsumRange 2 5\nsumRange 0 5\n', output: '1\n-1\n-3\n', public: true }
        ]
      }
    },
    'Game Theory': {
      'Easy': {
        id: 'nim-game',
        title: 'Nim Game',
        description: 'You are playing the following Nim Game with your friend: Initially, there is a heap of stones on the table. You and your friend will alternate taking turns, and you go first. On each turn, a person must remove 1 to 3 stones.',
        constraints: ['1 ≤ n ≤ 2^31 - 1'],
        examples: [
          { input: 'n = 4', output: 'false', explanation: 'No matter how many stones you remove, your friend can always remove stones such that you face 4 stones again.' }
        ],
        tests: [
          { id: 't1', input: '4\n', output: 'false\n', public: true }
        ]
      }
    },
    'Matrix': {
      'Easy': {
        id: 'transpose-matrix',
        title: 'Transpose Matrix',
        description: 'Given a 2D integer array matrix, return the transpose of matrix.',
        constraints: ['m == matrix.length', 'n == matrix[i].length', '1 ≤ m, n ≤ 1000', '1 ≤ matrix[i][j] ≤ 10^5'],
        examples: [
          { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[1,4,7],[2,5,8],[3,6,9]]', explanation: '' }
        ],
        tests: [
          { id: 't1', input: '3 3\n1 2 3\n4 5 6\n7 8 9\n', output: '1 4 7\n2 5 8\n3 6 9\n', public: true }
        ]
      }
    },
    'Intervals': {
      'Easy': {
        id: 'merge-intervals',
        title: 'Merge Intervals',
        description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
        constraints: ['1 ≤ intervals.length ≤ 10^4', 'intervals[i].length == 2', '0 ≤ starti ≤ endi ≤ 10^4'],
        examples: [
          { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].' }
        ],
        tests: [
          { id: 't1', input: '4\n1 3\n2 6\n8 10\n15 18\n', output: '1 6\n8 10\n15 18\n', public: true }
        ]
      }
    }
  };

  const getDefaultProblem = () => ({
    id: 'default',
    title: 'Select a Category',
    description: 'Please select a category and difficulty level to load a coding challenge.',
    constraints: [],
    examples: [],
    tests: []
  });

  const getProblemByCategory = (category, difficulty) => {
    const categoryProblems = problemDatabase[category];
    if (!categoryProblems) {
      return getDefaultProblem();
    }
    
    const problem = categoryProblems[difficulty];
    if (!problem) {
      // If specific difficulty not available, try to get any available problem from category
      const availableDifficulties = Object.keys(categoryProblems);
      if (availableDifficulties.length > 0) {
        return { ...categoryProblems[availableDifficulties[0]], difficulty };
      }
      return getDefaultProblem();
    }
    
    return { ...problem, difficulty, category };
  };

  // Language templates for different problem types
  const getLanguageTemplate = (language, problemId) => {
    const templates = {
      python: {
        'largest-element': `def find_largest(arr):
    # Write your solution here
    pass

# Read input
n = int(input())
arr = list(map(int, input().split()))
result = find_largest(arr)
print(result)`,
        'reverse-string': `def reverse_string(s):
    # Write your solution here
    pass

# Read input
s = input().strip()
result = reverse_string(s)
print(result)`,
        'factorial': `def factorial(n):
    # Write your solution here
    pass

# Read input
n = int(input())
result = factorial(n)
print(result)`,
        'two-sum': `def two_sum(nums, target):
    # Write your solution here
    pass

# Read input
n, target = map(int, input().split())
nums = list(map(int, input().split()))
result = two_sum(nums, target)
print(*result)`,
        'default': `# Write your solution here
def solve():
    pass

# Read input
# n = int(input())
# arr = list(map(int, input().split()))
# result = solve()
# print(result)`
      },
      javascript: {
        'largest-element': `function findLargest(arr) {
    // Write your solution here
}

// Read input (Node.js)
const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n');
const n = parseInt(input[0]);
const arr = input[1].split(' ').map(Number);
const result = findLargest(arr);
console.log(result);`,
        'default': `function solve() {
    // Write your solution here
}

// Read input (Node.js)
const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n');
// Parse input as needed
// const result = solve();
// console.log(result);`
      },
      java: {
        'largest-element': `import java.util.*;

public class Solution {
    public static int findLargest(int[] arr) {
        // Write your solution here
        return 0;
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        System.out.println(findLargest(arr));
    }
}`,
        'default': `import java.util.*;

public class Solution {
    public static void solve() {
        // Write your solution here
    }
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Read input as needed
        solve();
    }
}`
      },
      cpp: {
        'largest-element': `#include <iostream>
#include <vector>
using namespace std;

int findLargest(vector<int>& arr) {
    // Write your solution here
    return 0;
}

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }
    cout << findLargest(arr) << endl;
    return 0;
}`,
        'default': `#include <iostream>
#include <vector>
using namespace std;

void solve() {
    // Write your solution here
}

int main() {
    // Read input as needed
    solve();
    return 0;
}`
      }
    };
    
    return templates[language]?.[problemId] || templates[language]?.['default'] || '// Write your solution here';
  };

  // Current challenge state
  const [currentChallenge, setCurrentChallenge] = useState(() => 
    getProblemByCategory(selectedCategory, selectedDifficulty)
  );

  // Update challenge when category or difficulty changes
  useEffect(() => {
    const newChallenge = getProblemByCategory(selectedCategory, selectedDifficulty);
    setCurrentChallenge(newChallenge);
  }, [selectedCategory, selectedDifficulty]);

  // Update code template when language or challenge changes
  useEffect(() => {
    const template = getLanguageTemplate(selectedLanguage, currentChallenge?.id || 'default');
    setUserCode(template);
  }, [selectedLanguage, currentChallenge]);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    } else if (!isRunning && timeElapsed !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeElapsed]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveDraft();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [userCode]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startChallenge = () => {
    setIsRunning(true);
    setTimeElapsed(0);
    setHintsUsed(0);
    setOutput('');
    setTestResults([]);
    if (currentChallenge && currentChallenge.templates[selectedLanguage]) {
      setUserCode(currentChallenge.templates[selectedLanguage]);
    }
  };

  const resetChallenge = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setHintsUsed(0);
    setOutput('');
    setTestResults([]);
    if (currentChallenge && currentChallenge.templates[selectedLanguage]) {
      setUserCode(currentChallenge.templates[selectedLanguage]);
    }
  };

  const saveDraft = () => {
    const draft = {
      problemId: currentChallenge?.id,
      language: selectedLanguage,
      code: userCode,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(`draft_${currentChallenge?.id}_${selectedLanguage}`, JSON.stringify(draft));
    setOutput('Draft saved successfully!');
    setTimeout(() => setOutput(''), 3000);
  };

  const runCode = async () => {
    if (!userCode.trim()) {
      setOutput('Error: Please write some code first!');
      return;
    }

    setIsRunning(true);
    setOutput('Running code...\n');

    try {
      // Simulate API call to /api/run
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language: selectedLanguage,
          source_code: userCode,
          stdin: currentChallenge?.tests?.[0]?.input || ''
        })
      });

      if (!response.ok) {
        // Fallback to mock execution for demo
        mockExecution();
        return;
      }

      const result = await response.json();
      displayExecutionResult(result);
    } catch (error) {
      // Mock execution for demo purposes
      mockExecution();
    }
  };

  const mockExecution = () => {
    setTimeout(() => {
      const mockResult = {
        stdout: "3\n",
        stderr: "",
        exit_code: 0,
        time_ms: 45,
        memory_kb: 2048
      };
      displayExecutionResult(mockResult);
    }, 1500);
  };

  const displayExecutionResult = (result) => {
    let output = `Execution completed in ${result.time_ms}ms (Memory: ${result.memory_kb}KB)\n\n`;
    
    if (result.exit_code === 0) {
      output += `✅ Output:\n${result.stdout}`;
      if (result.stderr) {
        output += `\n⚠️ Warnings:\n${result.stderr}`;
      }
    } else {
      output += `❌ Runtime Error (Exit code: ${result.exit_code})\n`;
      if (result.stderr) {
        output += `Error details:\n${result.stderr}`;
      }
    }
    
    setOutput(output);
    setIsRunning(false);
  };

  const submitSolution = async () => {
    if (!userCode.trim()) {
      setOutput('Error: Please write some code first!');
      return;
    }

    setIsSubmitting(true);
    setOutput('Submitting solution...\n');

    try {
      // Simulate API call to /api/submit
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          problem_id: currentChallenge?.id,
          language: selectedLanguage,
          source_code: userCode
        })
      });

      if (!response.ok) {
        // Fallback to mock submission for demo
        mockSubmission();
        return;
      }

      const result = await response.json();
      displaySubmissionResult(result);
    } catch (error) {
      // Mock submission for demo purposes
      mockSubmission();
    }
  };

  const mockSubmission = () => {
    setTimeout(() => {
      const publicTests = currentChallenge?.tests?.filter(t => t.public) || [];
      const hiddenTests = currentChallenge?.tests?.filter(t => !t.public) || [];
      
      const mockResults = [
        ...publicTests.map((test, idx) => ({
          test_id: test.id,
          public: true,
          passed: idx < publicTests.length - 1, // Pass all but last public test
          stdout: idx < publicTests.length - 1 ? test.output : "2\n",
          stderr: "",
          expected: test.output,
          time_ms: 42 + idx * 5
        })),
        ...hiddenTests.map((test, idx) => ({
          test_id: test.id,
          public: false,
          passed: idx < hiddenTests.length / 2, // Pass half of hidden tests
          stdout: "Hidden",
          stderr: "",
          expected: "Hidden",
          time_ms: 38 + idx * 3
        }))
      ];

      const passedTests = mockResults.filter(r => r.passed).length;
      const totalTests = mockResults.length;
      const verdict = passedTests === totalTests ? 'Accepted' : passedTests > totalTests / 2 ? 'Partial' : 'Wrong Answer';

      const submissionResult = {
        verdict,
        results: mockResults,
        score: Math.floor((passedTests / totalTests) * currentChallenge?.points || 0),
        total_time_ms: mockResults.reduce((sum, r) => sum + r.time_ms, 0)
      };

      displaySubmissionResult(submissionResult);
    }, 2000);
  };

  const displaySubmissionResult = (result) => {
    const passedCount = result.results.filter(r => r.passed).length;
    const totalCount = result.results.length;
    
    let output = `📊 Submission Result: ${result.verdict}\n`;
    output += `✅ Passed: ${passedCount}/${totalCount} tests\n`;
    output += `⏱️ Total time: ${result.total_time_ms}ms\n`;
    output += `🎯 Score: ${result.score} points\n\n`;

    // Show public test details
    const publicResults = result.results.filter(r => r.public);
    if (publicResults.length > 0) {
      output += `📋 Public Test Results:\n`;
      publicResults.forEach((test, idx) => {
        const status = test.passed ? '✅' : '❌';
        output += `${status} Test ${idx + 1}: ${test.passed ? 'Passed' : 'Failed'}\n`;
        if (!test.passed) {
          output += `   Expected: ${test.expected.trim()}\n`;
          output += `   Got: ${test.stdout.trim()}\n`;
        }
      });
    }

    // Show hidden test summary
    const hiddenResults = result.results.filter(r => !r.public);
    if (hiddenResults.length > 0) {
      const hiddenPassed = hiddenResults.filter(r => r.passed).length;
      output += `\n🔒 Hidden Tests: ${hiddenPassed}/${hiddenResults.length} passed\n`;
    }

    setOutput(output);
    setTestResults(result.results);
    
    // Add to submissions history
    const newSubmission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      language: selectedLanguage,
      verdict: result.verdict,
      score: result.score,
      runtime: result.total_time_ms,
      code: userCode
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    
    setIsSubmitting(false);
    setIsRunning(false);
  };

  return (
    <div className="section active">
      <div className="challenges-header">
        <div className="challenges-title">
          <FaGamepad className="challenges-icon" />
          <h1>AI Gaming Challenge</h1>
          <p>Test your problem-solving skills with AI-generated challenges</p>
        </div>
      </div>

      <div className="challenges-controls">
        <div className="challenge-selectors">
          <div className="selector-group">
            <label>Challenge Category</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>📚 {category}</option>
              ))}
            </select>
          </div>

          <div className="selector-group">
            <label>Difficulty Level</label>
            <div className="difficulty-buttons">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  className={`difficulty-btn ${selectedDifficulty === difficulty ? 'active' : ''} ${difficulty.toLowerCase()}`}
                  onClick={() => setSelectedDifficulty(difficulty)}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="challenge-actions">
          <button className="new-challenge-btn" onClick={startChallenge}>
            <FaLightbulb /> New Challenge
          </button>
          <button className="start-btn" onClick={startChallenge}>
            <FaPlay /> Start
          </button>
          <button className="reset-btn" onClick={resetChallenge}>
            <FaRedo /> Reset
          </button>
        </div>
      </div>

      <div className="challenges-stats">
        <div className="stat-card time">
          <div className="stat-value">{formatTime(timeElapsed)}</div>
          <div className="stat-label">Time</div>
        </div>
        <div className="stat-card hints">
          <div className="stat-value">{hintsUsed}</div>
          <div className="stat-label">Hints Used</div>
        </div>
        <div className="stat-card score">
          <div className="stat-value">{score}</div>
          <div className="stat-label">Score</div>
        </div>
        <div className="stat-card difficulty-indicator">
          <div className="difficulty-badge easy">Easy</div>
          <div className="stat-label">Difficulty</div>
        </div>
      </div>

      <div className="challenges-content">
        <div className="problem-section">
          <div className="problem-tabs">
            <button className="tab-btn active">📝 Description</button>
            <button className="tab-btn">📝 Editorial</button>
            <button className="tab-btn">💡 Solutions</button>
            <button className="tab-btn">📋 Submissions</button>
          </div>
          <div className="problem-content">
            <h3>Problem Statement:</h3>
            <p>{currentChallenge?.description || 'Please select a category and difficulty to load a problem.'}</p>
            
            {currentChallenge?.constraints && currentChallenge.constraints.length > 0 && (
              <div>
                <h4>Constraints:</h4>
                <ul>
                  {currentChallenge.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {currentChallenge?.examples && currentChallenge.examples.map((example, index) => (
              <div key={index}>
                <h4>Example {index + 1}:</h4>
                <p><strong>Input:</strong> {example.input}</p>
                <p><strong>Output:</strong> {example.output}</p>
                {example.explanation && <p><strong>Explanation:</strong> {example.explanation}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="code-section">
          <div className="code-actions">
            <div className="test-info">
              {currentChallenge && (
                <span className="test-count">
                  {currentChallenge.tests?.filter(t => t.public).length || 0} public tests, 
                  {currentChallenge.tests?.filter(t => !t.public).length || 0} hidden tests
                </span>
              )}
            </div>
            <div className="language-selector">
              <select 
                className="lang-select" 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map((lang) => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>
            <button className="code-btn save" onClick={saveDraft}>
              <FaSave /> Save Draft
            </button>
          </div>

          <div className="code-editor">
            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              className="code-textarea"
              spellCheck={false}
              placeholder="Write your solution here... (Ctrl+Enter to run, Ctrl+S to save)"
            />
          </div>

          <div className="output-section">
            <div className="output-header">
              <span>Output & Results</span>
              {(isRunning || isSubmitting) && <div className="loading-spinner">⏳</div>}
            </div>
            <pre className="output-content">{output || 'Run your code to see output here...'}</pre>
          </div>

          <div className="code-actions">
            <div className="test-info">
              {currentChallenge && (
                <span className="test-count">
                  {currentChallenge.tests?.filter(t => t.public).length || 0} public tests, 
                  {currentChallenge.tests?.filter(t => !t.public).length || 0} hidden tests
                </span>
              )}
            </div>
            <div className="code-buttons">
              <button 
                className="reset-code-btn" 
                onClick={resetChallenge}
                disabled={isRunning || isSubmitting}
              >
                <FaRedo /> Reset
              </button>
              <button 
                className="run-code-btn" 
                onClick={runCode}
                disabled={isRunning || isSubmitting}
              >
                <FaPlay /> {isRunning ? 'Running...' : 'Run'}
              </button>
              <button 
                className="submit-code-btn" 
                onClick={submitSolution}
                disabled={isRunning || isSubmitting}
              >
                <FaFire /> {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="challenge-progress">
        <div className="progress-indicator">
          <FaFire className="progress-icon" />
          <span>Good Progress</span>
        </div>
        <div className="solution-score">
          <span>Solution Score:</span>
          <div className="score-bar">
            <div className="score-fill" style={{width: `${solutionProgress}%`}}></div>
          </div>
          <span>{solutionProgress}/100</span>
        </div>
      </div>
    </div>
  );
};

// C-Modules Section - Integration of friend's repository
const CModulesSection = ({ currentUser }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('cpp');
  const [selectedTopic, setSelectedTopic] = useState('introduction');
  const [showContent, setShowContent] = useState(false);

  const languages = {
    cpp: {
      name: 'C++',
      icon: '⚡',
      topics: [
        { id: 'introduction', name: 'Introduction', description: 'Getting started with C++' },
        { id: 'header-files', name: 'Header Files', description: 'Understanding header files' },
        { id: 'identifiers', name: 'Identifiers', description: 'Variables and identifiers' },
        { id: 'keywords', name: 'Keywords', description: 'Reserved words in C++' },
        { id: 'variables', name: 'Variables', description: 'Variable declaration and usage' },
        { id: 'data-types', name: 'Data Types', description: 'Different data types in C++' },
        { id: 'operators', name: 'Operators', description: 'Arithmetic and logical operators' },
        { id: 'basic-input-output', name: 'Basic I/O', description: 'Input and output operations' },
        { id: 'loops', name: 'Loops', description: 'For, while, and do-while loops' },
        { id: 'conditional-statements', name: 'Conditionals', description: 'If-else statements' }
      ]
    },
    python: {
      name: 'Python',
      icon: '🐍',
      topics: [
        { id: 'pythonintroduction', name: 'Introduction', description: 'Getting started with Python' },
        { id: 'pythonvariables', name: 'Variables', description: 'Variable declaration in Python' },
        { id: 'pythondatatypes', name: 'Data Types', description: 'Python data types' },
        { id: 'pythonoperators', name: 'Operators', description: 'Python operators' },
        { id: 'pythonstrings', name: 'Strings', description: 'String manipulation' },
        { id: 'pythonlists', name: 'Lists', description: 'Working with lists' },
        { id: 'pythonloops', name: 'Loops', description: 'Python loops' },
        { id: 'pythonfunctions', name: 'Functions', description: 'Defining functions' },
        { id: 'pythonconditionalstatements', name: 'Conditionals', description: 'If-else in Python' }
      ]
    },
    java: {
      name: 'Java',
      icon: '☕',
      topics: [
        { id: 'javaintroduction', name: 'Introduction', description: 'Getting started with Java' },
        { id: 'javavariables', name: 'Variables', description: 'Variable declaration in Java' },
        { id: 'javadatatypes', name: 'Data Types', description: 'Java data types' },
        { id: 'javaoperators', name: 'Operators', description: 'Java operators' },
        { id: 'javastrings', name: 'Strings', description: 'String handling in Java' },
        { id: 'javaarrays', name: 'Arrays', description: 'Working with arrays' },
        { id: 'javaloops', name: 'Loops', description: 'Java loops' },
        { id: 'javamethods', name: 'Methods', description: 'Method definitions' },
        { id: 'javaconditionalstatements', name: 'Conditionals', description: 'If-else in Java' }
      ]
    }
  };

  const currentLanguage = languages[selectedLanguage];
  const currentTopic = currentLanguage.topics.find(topic => topic.id === selectedTopic);

  return (
    <div className="section active">
      <div className="section-header">
        <h2>🔧 C-Modules Learning Hub</h2>
        <p>Comprehensive programming tutorials for C++, Python, and Java</p>
      </div>

      {/* Language Selection */}
      <div className="cmodules-nav">
        <div className="language-selector">
          {Object.entries(languages).map(([key, lang]) => (
            <button
              key={key}
              className={`lang-btn ${selectedLanguage === key ? 'active' : ''}`}
              onClick={() => {
                setSelectedLanguage(key);
                setSelectedTopic(lang.topics[0].id);
                setShowContent(true);
              }}
            >
              <span className="lang-icon">{lang.icon}</span>
              <span className="lang-name">{lang.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Topic Selection */}
      <div className="topics-grid">
        <div className="topics-sidebar">
          <h3>{currentLanguage.name} Topics</h3>
          <div className="topics-list">
            {currentLanguage.topics.map((topic) => (
              <button
                key={topic.id}
                className={`topic-item ${selectedTopic === topic.id ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setShowContent(true);
                }}
              >
                <div className="topic-name">{topic.name}</div>
                <div className="topic-desc">{topic.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="topic-content">
          <div className="content-header">
            <h3>{currentTopic?.name}</h3>
            <p>{currentTopic?.description}</p>
            <button 
              className="btn btn--primary"
              onClick={() => setShowContent(true)}
            >
              <FaPlay /> Start Learning
            </button>
          </div>

          {showContent && (
            <div className="learning-content">
              {selectedLanguage === 'cpp' && (
                <>
                  {selectedTopic === 'introduction' && (
                    <Introduction onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'variables' && (
                    <Variables onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'data-types' && (
                    <DataTypes onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'operators' && (
                    <Operators onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'conditional-statements' && (
                    <ConditionalStatements onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'loops' && (
                    <Loops onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'basic-input-output' && (
                    <BasicInputOutput onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'header-files' && (
                    <HeaderFiles onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'keywords' && (
                    <Keywords onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'identifiers' && (
                    <Identifiers onBackClick={() => setShowContent(false)} />
                  )}
                </>
              )}
              
              {selectedLanguage === 'java' && (
                <>
                  {selectedTopic === 'javaintroduction' && (
                    <JavaIntroduction onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javavariables' && (
                    <JavaVariables onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javadatatypes' && (
                    <JavaDataTypes onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javaoperators' && (
                    <JavaOperators onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javaconditionalstatements' && (
                    <JavaConditionalStatements onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javaloops' && (
                    <JavaLoops onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javaarrays' && (
                    <JavaArrays onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javastrings' && (
                    <JavaStrings onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'javamethods' && (
                    <JavaMethods onBackClick={() => setShowContent(false)} />
                  )}
                </>
              )}
              
              {selectedLanguage === 'python' && (
                <>
                  {selectedTopic === 'pythonintroduction' && (
                    <PythonIntroduction onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonvariables' && (
                    <PythonVariables onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythondatatypes' && (
                    <PythonDataTypes onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonoperators' && (
                    <PythonOperators onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonconditionalstatements' && (
                    <PythonConditionalStatements onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonloops' && (
                    <PythonLoops onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonlists' && (
                    <PythonLists onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonstrings' && (
                    <PythonStrings onBackClick={() => setShowContent(false)} />
                  )}
                  {selectedTopic === 'pythonfunctions' && (
                    <PythonFunctions onBackClick={() => setShowContent(false)} />
                  )}
                </>
              )}
              
              {/* Fallback for unimplemented topics */}
              {((selectedLanguage === 'cpp' && !['introduction', 'variables', 'data-types', 'operators', 'conditional-statements', 'loops', 'basic-input-output', 'header-files', 'keywords', 'identifiers'].includes(selectedTopic)) ||
                (selectedLanguage === 'java' && !['javaintroduction', 'javavariables', 'javadatatypes', 'javaoperators', 'javaconditionalstatements', 'javaloops', 'javaarrays', 'javastrings', 'javamethods'].includes(selectedTopic)) ||
                (selectedLanguage === 'python' && !['pythonintroduction', 'pythonvariables', 'pythondatatypes', 'pythonoperators', 'pythonconditionalstatements', 'pythonloops', 'pythonlists', 'pythonstrings', 'pythonfunctions'].includes(selectedTopic)) ||
                (!['cpp', 'java', 'python'].includes(selectedLanguage))) && (
                <div className="content-placeholder">
                  <h3>Content Coming Soon</h3>
                  <p>This tutorial content is being prepared. Please check back later!</p>
                  <div className="features-grid">
                    <div className="feature">
                      <FaLightbulb className="feature-icon" />
                      <span>Step-by-step Examples</span>
                    </div>
                    <div className="feature">
                      <FaCheckCircle className="feature-icon" />
                      <span>Hands-on Exercises</span>
                    </div>
                  </div>
                  <button className="btn btn--secondary" onClick={() => setShowContent(false)}>
                    <FaTimes /> Close Content
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="cmodules-progress">
        <h3>📈 Your Learning Progress</h3>
        <div className="progress-languages">
          {Object.entries(languages).map(([key, lang]) => (
            <div key={key} className="lang-progress">
              <div className="lang-header">
                <span className="lang-icon">{lang.icon}</span>
                <span className="lang-name">{lang.name}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {Math.floor(Math.random() * 6) + 2}/{lang.topics.length} topics completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
