import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentDashboard from './components/StudentDashboard';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import LoadingSpinner from './components/LoadingSpinner';
import ProfileModal from './components/modals/ProfileModal';
import AssessmentModal from './components/modals/AssessmentModal';
import QuizModal from './components/modals/QuizModal';
import LessonModal from './components/LessonModal';
import { ThemeProvider } from './contexts/ThemeContext';
import { appData } from './data/appData';
import './index.css';

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
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  // Initialize app - check for existing user session
  useEffect(() => {
    if (hasNavigated) return; // Prevent multiple navigations
    
    const savedUser = localStorage.getItem('smartTutorUser');
    if (savedUser && !currentUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        
        // Only navigate if we're currently on the landing page or login page
        const currentPath = window.location.pathname;
        if (currentPath === '/' || currentPath === '/login' || currentPath === '/signup') {
          setHasNavigated(true);
          if (user.role === 'student') {
            navigate('/student', { replace: true });
          } else if (user.role === 'admin') {
            navigate('/admin', { replace: true });
          } else {
            navigate('/student', { replace: true });
          }
        }
      } catch (e) {
        localStorage.removeItem('smartTutorUser');
        navigate('/');
      }
    }
  }, [navigate, currentUser, hasNavigated]);

  const handleRoleSelection = (role) => {
    setCurrentUser({ role });
    setShowProfileModal(true);
  };

  const handleProfileSetup = (profileData) => {
    const updatedUser = { ...currentUser, ...profileData };
    
    if (updatedUser.role === 'student') {
      // Initialize student data
      updatedUser.totalPoints = 120;
      updatedUser.badges = [1];
      updatedUser.progress = {};
      updatedUser.currentStreak = 3;
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
    } // else {
      // navigate('/teacher'); // Teacher feature temporarily disabled
    // }
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
    // Determine skill level based on MCQ performance
    let level = 'Beginner';
    let levelDescription = '';
    
    if (percentage >= 85) {
      level = 'Advanced';
      levelDescription = 'Excellent! You have strong programming fundamentals.';
    } else if (percentage >= 65) {
      level = 'Intermediate';
      levelDescription = 'Good job! You have solid basic knowledge.';
    } else if (percentage >= 40) {
      level = 'Beginner';
      levelDescription = 'Great start! We\'ll help you build strong foundations.';
    } else {
      level = 'Beginner';
      levelDescription = 'No worries! Everyone starts somewhere. Let\'s learn together.';
    }
    
    const updatedUser = {
      ...currentUser,
      level,
      levelDescription,
      assessmentScore: percentage,
      assessmentCompleted: true,
      skillLevel: level // Additional field for clarity
    };
    
    // Set initial progress based on determined level
    appData.subjects.forEach(subject => {
      let initialProgress = 0;
      if (level === 'Advanced') {
        initialProgress = Math.floor(Math.random() * 20) + 60; // 60-80%
      } else if (level === 'Intermediate') {
        initialProgress = Math.floor(Math.random() * 20) + 30; // 30-50%
      } else {
        initialProgress = Math.floor(Math.random() * 15) + 5; // 5-20%
      }
      updatedUser.progress[subject.name] = initialProgress;
    });
    
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
  };

  const startLearning = () => {
    setShowAssessmentModal(false);
    navigate('/student');
  };

  const handleLogin = (userData) => {
    const user = {
      ...userData,
      totalPoints: 120,
      badges: [1],
      progress: {},
      currentStreak: 3,
      weeklyActivity: [2, 3, 1, 4, 2, 3, 2],
      level: 'Intermediate',
      assessmentScore: 75
    };
    
    // Initialize progress for all subjects
    appData.subjects.forEach(subject => {
      user.progress[subject.name] = Math.floor(Math.random() * 40) + 30;
    });
    
    setCurrentUser(user);
    localStorage.setItem('smartTutorUser', JSON.stringify(user));
    setHasNavigated(true);
    
    // Navigate immediately without setTimeout
    if (user.role === 'student') {
      navigate('/student', { replace: true });
    } else if (user.role === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/student', { replace: true });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('smartTutorUser');
    setCurrentUser(null);
    setHasNavigated(false);
    navigate('/');
  };

  const handleProfileComplete = (profileData) => {
    const updatedUser = { ...currentUser, ...profileData };
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
    setShowProfileModal(false);
  };

  const handleQuizComplete = (score, answers) => {
    const updatedUser = {
      ...currentUser,
      totalPoints: (currentUser.totalPoints || 0) + score,
      weeklyActivity: [...(currentUser.weeklyActivity || []), 1]
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('smartTutorUser', JSON.stringify(updatedUser));
    setShowQuizModal(false);
    setCurrentQuiz(null);
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
    handleLogin,
    handleLogout,
    showQuizModal,
    setShowQuizModal,
    currentQuiz,
    setCurrentQuiz,
    showLessonModal,
    setShowLessonModal,
    currentLesson,
    setCurrentLesson
  };

  return (
    <ThemeProvider>
      <AppContext.Provider value={contextValue}>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUpPage onSignUp={handleLogin} />} />
            <Route path="/student" element={<StudentDashboard />} />
            {/* <Route path="/teacher" element={<TeacherDashboard />} /> */} {/* Teacher feature temporarily disabled */}
          </Routes>

          {showProfileModal && (
            <ProfileModal 
              onClose={() => setShowProfileModal(false)} 
              onComplete={handleProfileComplete}
              currentUser={currentUser}
            />
          )}

          {showAssessmentModal && currentAssessment && (
            <AssessmentModal 
              assessment={currentAssessment}
              setAssessment={setCurrentAssessment}
              onComplete={completeAssessment}
              onClose={() => setShowAssessmentModal(false)}
            />
          )}

          {showQuizModal && currentQuiz && (
            <QuizModal 
              quiz={currentQuiz}
              onComplete={handleQuizComplete}
              onClose={() => setShowQuizModal(false)}
            />
          )}
          
          {showLessonModal && currentLesson && (
            <LessonModal 
              lesson={currentLesson.lesson}
              subject={currentLesson.subject}
              onClose={() => setShowLessonModal(false)}
            />
          )}
        </div>
      </AppContext.Provider>
    </ThemeProvider>
  );
}

export default App;
