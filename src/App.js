import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import ProfileModal from './components/modals/ProfileModal';
import AssessmentModal from './components/modals/AssessmentModal';
import QuizModal from './components/modals/QuizModal';
import { appData } from './data/appData';
import './styles/gamification.css';

// Context for global state management
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpData, setLevelUpData] = useState(null);
  const navigate = useNavigate();

  // Initialize app - check for existing user session
  useEffect(() => {
    const savedUser = localStorage.getItem('smartTutorUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        if (user.role === 'student') {
          navigate('/student');
        } else {
          navigate('/teacher');
        }
      } catch (e) {
        localStorage.removeItem('smartTutorUser');
        navigate('/');
      }
    }
  }, [navigate]);

  const handleRoleSelection = (role) => {
    setCurrentUser({ role });
    setShowProfileModal(true);
  };

  const handleProfileSetup = (profileData) => {
    const updatedUser = { ...currentUser, ...profileData };
    
    if (updatedUser.role === 'student') {
      // Initialize student data with gamification
      updatedUser.totalPoints = 120;
      updatedUser.experience = 120;
      updatedUser.level = 1;
      updatedUser.badges = [1];
      updatedUser.progress = {};
      updatedUser.currentStreak = 3;
      updatedUser.lastActiveDate = new Date().toDateString();
      updatedUser.weeklyActivity = [2, 3, 1, 4, 2, 3, 2];
      
      // Initialize progress for all subjects
      appData.subjects.forEach(subject => {
        updatedUser.progress[subject.name] = Math.floor(Math.random() * 40) + 10;
      });
    }
    
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
    setShowProfileModal(false);
    
    if (updatedUser.role === 'student') {
      startDiagnosticAssessment();
    } else {
      navigate('/teacher');
    }
  };

  const startDiagnosticAssessment = () => {
    const assessment = {
      questions: [...appData.diagnosticQuestions],
      currentQuestionIndex: 0,
      answers: [],
      score: 0
    };
    setCurrentAssessment(assessment);
    setShowAssessmentModal(true);
  };

  const completeAssessment = (score, percentage) => {
    let level = 'Beginner';
    if (percentage >= 80) level = 'Advanced';
    else if (percentage >= 60) level = 'Intermediate';
    
    const updatedUser = {
      ...currentUser,
      level,
      assessmentScore: percentage
    };
    
    // Update progress based on assessment
    appData.subjects.forEach(subject => {
      const baseProgress = updatedUser.progress[subject.name] || 20;
      const bonus = Math.floor(percentage / 4);
      updatedUser.progress[subject.name] = Math.min(95, baseProgress + bonus);
    });
    
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
  };

  const startLearning = () => {
    setShowAssessmentModal(false);
    navigate('/student');
  };

  const handleLogout = () => {
    localStorage.removeItem('smartTutorUser');
    setCurrentUser(null);
    navigate('/');
  };

  // 🎮 GAMIFICATION FUNCTIONS
  
  // Calculate level based on experience points
  const calculateLevel = (experience) => {
    return Math.floor(experience / 1000) + 1;
  };

  // Calculate experience needed for next level
  const getExperienceForNextLevel = (currentLevel) => {
    return currentLevel * 1000;
  };

  // Add points and experience, check for level up
  const addPoints = (points, reason = '') => {
    if (!currentUser) return;

    const oldLevel = calculateLevel(currentUser.experience || 0);
    const newExperience = (currentUser.experience || 0) + points;
    const newLevel = calculateLevel(newExperience);
    const leveledUp = newLevel > oldLevel;

    const updatedUser = {
      ...currentUser,
      experience: newExperience,
      totalPoints: (currentUser.totalPoints || 0) + points,
      level: newLevel
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));

    // Show level up animation if leveled up
    if (leveledUp) {
      setLevelUpData({
        oldLevel,
        newLevel,
        pointsGained: points,
        reason
      });
      setShowLevelUpModal(true);
    }

    return {
      leveledUp,
      oldLevel,
      newLevel,
      pointsGained: points,
      totalPoints: updatedUser.totalPoints
    };
  };

  // Award points for completing lessons
  const completeLesson = (subject, lessonTitle, difficulty = 'medium') => {
    const pointValues = {
      easy: 25,
      medium: 50,
      hard: 100
    };

    const points = pointValues[difficulty] || 50;
    const result = addPoints(points, `Completed lesson: ${lessonTitle}`);

    // Update subject progress
    const updatedUser = { ...currentUser };
    if (!updatedUser.progress) updatedUser.progress = {};
    if (!updatedUser.progress[subject]) updatedUser.progress[subject] = 0;
    
    updatedUser.progress[subject] = Math.min(100, updatedUser.progress[subject] + 10);
    
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));

    return result;
  };

  // Award points for quiz completion
  const completeQuiz = (score, totalQuestions, subject) => {
    const basePoints = 30;
    const bonusPoints = Math.floor((score / totalQuestions) * 50);
    const totalPoints = basePoints + bonusPoints;

    const result = addPoints(totalPoints, `Quiz completed: ${score}/${totalQuestions} correct`);

    // Check for perfect score badge
    if (score === totalQuestions) {
      addPoints(50, 'Perfect Score Bonus!');
    }

    return result;
  };

  // Award points for daily login streak
  const updateStreak = () => {
    if (!currentUser) return;

    const today = new Date().toDateString();
    const lastActiveDate = currentUser.lastActiveDate ? new Date(currentUser.lastActiveDate).toDateString() : null;
    
    let newStreak = currentUser.currentStreak || 0;
    
    if (lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastActiveDate === yesterday.toDateString()) {
        newStreak += 1;
      } else if (lastActiveDate !== today) {
        newStreak = 1;
      }
      
      // Award streak bonus points
      if (newStreak > 1) {
        const streakBonus = Math.min(newStreak * 5, 50); // Max 50 points per day
        addPoints(streakBonus, `${newStreak} day streak!`);
      }
    }

    const updatedUser = {
      ...currentUser,
      currentStreak: newStreak,
      lastActiveDate: today
    };

    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));

    return newStreak;
  };

  // Close level up modal
  const closeLevelUpModal = () => {
    setShowLevelUpModal(false);
    setLevelUpData(null);
  };

  const contextValue = {
    currentUser,
    setCurrentUser,
    appData,
    handleRoleSelection,
    handleProfileSetup,
    startDiagnosticAssessment,
    completeAssessment,
    startLearning,
    handleLogout,
    showQuizModal,
    setShowQuizModal,
    currentQuiz,
    setCurrentQuiz,
    // 🎮 Gamification functions
    addPoints,
    completeLesson,
    completeQuiz,
    updateStreak,
    calculateLevel,
    getExperienceForNextLevel,
    showLevelUpModal,
    levelUpData,
    closeLevelUpModal
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
        </Routes>
        
        {showProfileModal && (
          <ProfileModal onClose={() => setShowProfileModal(false)} />
        )}
        
        {showAssessmentModal && currentAssessment && (
          <AssessmentModal 
            assessment={currentAssessment}
            setAssessment={setCurrentAssessment}
            onClose={() => setShowAssessmentModal(false)}
          />
        )}
        
        {showQuizModal && currentQuiz && (
          <QuizModal 
            quiz={currentQuiz}
            onClose={() => setShowQuizModal(false)}
          />
        )}

        {/* 🎮 Level Up Modal */}
        {showLevelUpModal && levelUpData && (
          <div className="level-up-modal-overlay">
            <div className="level-up-modal">
              <div className="level-up-content">
                <div className="level-up-icon">🎉</div>
                <h2>LEVEL UP!</h2>
                <div className="level-display">
                  <span className="old-level">Level {levelUpData.oldLevel}</span>
                  <span className="arrow">→</span>
                  <span className="new-level">Level {levelUpData.newLevel}</span>
                </div>
                <p className="points-earned">+{levelUpData.pointsGained} points earned!</p>
                <p className="reason">{levelUpData.reason}</p>
                <button 
                  className="close-level-up-btn"
                  onClick={closeLevelUpModal}
                >
                  Awesome! 🚀
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
