import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import LearningModules from './student/LearningModules';
import AnalyticsDashboard from './AnalyticsDashboard';
import RecommendationCard from './RecommendationCard';
import LoadingSpinner from './LoadingSpinner';
import { LearningService } from '../services/supabaseClient';
import ProgressChart from './charts/ProgressChart';
import SubjectProgress from './charts/SubjectProgress';
import ActivityChart from './charts/ActivityChart';
import QuizCard from './student/QuizCard';
import { useLocalStorage, useDebounceLocalStorage } from '../hooks/useLocalStorage';
import { AnalyticsService, PerformanceMonitor, UserBehaviorTracker } from '../utils/analytics';
import { FaUser, FaBook, FaChart, FaCog } from 'react-icons/fa';
// Removed unused imports

function StudentDashboard() {
  const { 
    currentUser, 
    appData, 
    setCurrentQuiz, 
    setShowQuizModal, 
    setCurrentLesson,
    setShowLessonModal,
    handleLogout 
  } = useAppContext();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [activeView, setActiveView] = useState('dashboard');
  const [subjects, setSubjects] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useLocalStorage('user_recommendations', []);
  const [analytics, setAnalytics] = useState(null);

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
  }, [currentUser, handleLogout]);

  const loadDashboardData = async () => {
    setLoading(true);
    
    try {
      // Load subjects
      const { data: subjectsData, error: subjectsError } = await LearningService.getSubjects();
      if (subjectsError) {
        console.error('Error loading subjects:', subjectsError);
        // Fallback to app data
        setSubjects(appData.subjects);
      } else {
        setSubjects(subjectsData);
      }

      // Load user progress
      if (currentUser.id) {
        const { data: progressData, error: progressError } = await LearningService.getUserProgress(currentUser.id);
        if (progressError) {
          console.error('Error loading progress:', progressError);
          // Fallback to current user progress
          setUserProgress(currentUser.progress || {});
        } else {
          setUserProgress(progressData);
        }
      } else {
        setUserProgress(currentUser.progress || {});
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Fallback to app data
      setSubjects(appData.subjects);
      setUserProgress(currentUser.progress || {});
      // Generate AI recommendations
      generateRecommendations();
      
      // Load analytics
      if (currentUser.id) {
        const userAnalytics = AnalyticsService.getLearningAnalytics(currentUser.id);
        setAnalytics(userAnalytics);
      }
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = () => {
    const newRecommendations = [];
    
    // Analyze progress and suggest next steps
    Object.entries(userProgress).forEach(([subject, progress]) => {
      if (progress < 50) {
        newRecommendations.push({
          type: 'continue',
          title: `Continue with ${subject}`,
          description: `You're ${progress}% through. Keep going to unlock advanced topics!`,
          priority: 'high',
          subject
        });
      } else if (progress >= 80) {
        newRecommendations.push({
          type: 'challenge',
          title: `Take ${subject} Quiz`,
          description: 'Test your knowledge with an advanced quiz.',
          priority: 'medium',
          subject
        });
      }
    });

    // Add streak motivation
    if (currentUser.currentStreak >= 3) {
      newRecommendations.push({
        type: 'streak',
        title: 'Keep Your Streak!',
        description: `You're on a ${currentUser.currentStreak}-day streak! Study today to keep it going.`,
        priority: 'high'
      });
    }

    setRecommendations(newRecommendations.slice(0, 3));
  };

  if (!currentUser) return null;

  const handleNavigation = (section) => {
    UserBehaviorTracker.trackButtonClick('navigation', { section });
    setActiveSection(section);
  };

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
    setShowQuizModal(true);
  };

  const startLesson = handleStartLesson;

  return (
    <div id="student-dashboard" className="page active">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🎓 Smart Tutor</h2>
        </div>
        <div className="nav-menu">
          <button 
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => handleNavigation('overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-item ${activeSection === 'learning' ? 'active' : ''}`}
            onClick={() => handleNavigation('learning')}
          >
            Learning
          </button>
          <button 
            className={`nav-item ${activeSection === 'resources' ? 'active' : ''}`}
            onClick={() => handleNavigation('resources')}
          >
            Resources
          </button>
          <button 
            className={`nav-item ${activeSection === 'achievements' ? 'active' : ''}`}
            onClick={() => handleNavigation('achievements')}
          >
            Achievements
          </button>
        </div>
        <div className="nav-user">
          <span>{currentUser.name}</span>
          <button className="btn btn--secondary btn--sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="section active">
            <div className="dashboard-grid">
              <div className="stats-card">
                <div className="stat">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3>{currentUser.totalPoints || 0}</h3>
                    <p>Total Points</p>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-content">
                    <h3>{(currentUser.badges || []).length}</h3>
                    <p>Badges Earned</p>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-content">
                    <h3>{currentUser.currentStreak || 0}</h3>
                    <p>Day Streak</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card__body">
                  <h3>Subject Progress</h3>
                  <SubjectProgress progress={currentUser.progress || {}} />
                </div>
              </div>

              <div className="card">
                <div className="card__body">
                  <h3>Weekly Activity</h3>
                  <div className="chart-container" style={{ position: 'relative', height: '200px' }}>
                    <ActivityChart data={currentUser.weeklyActivity || [0, 0, 0, 0, 0, 0, 0]} />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card__body">
                  <h3>Recommended Next</h3>
                  <div>
                    {recommendations.map((rec, index) => (
                      <div key={index} className="recommendation-item">
                        <div className="recommendation-title">{rec.title}</div>
                        <div className="recommendation-description">{rec.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Section */}
        {activeSection === 'learning' && (
          <div className="section active">
            <h2>Learning Modules</h2>
            <LearningModules 
              subjects={appData.subjects}
              userProgress={currentUser.progress || {}}
              onStartLesson={startLesson}
            />
          </div>
        )}

        {/* Resources Section */}
        {activeSection === 'resources' && (
          <div className="section active">
            <h2>Learning Resources</h2>
            <div className="resources-placeholder">
              <h3>📚 Learning Resources</h3>
              <p>Additional learning materials and resources coming soon...</p>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === 'achievements' && (
          <div className="section active">
            <h2>Your Achievements</h2>
            <div className="achievements-placeholder">
              <h3>🏆 Achievements</h3>
              <p>Your badges and accomplishments will appear here...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
