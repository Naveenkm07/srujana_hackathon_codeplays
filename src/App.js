import React, { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import AdminDashboard from './components/AdminDashboard';
import ProfileModal from './components/modals/ProfileModal';
import AssessmentModal from './components/modals/AssessmentModal';
import QuizModal from './components/modals/QuizModal';
import LessonModal from './components/LessonModal';
import { appData } from './data/appData';

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
        } else if (user.role === 'admin') {
          navigate('/admin');
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
  };

  const handleLogout = () => {
    localStorage.removeItem('smartTutorUser');
    setCurrentUser(null);
    navigate('/');
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
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUpPage onSignUp={handleLogin} />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
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
        
        {showLessonModal && currentLesson && (
          <LessonModal 
            lesson={currentLesson.lesson}
            subject={currentLesson.subject}
            onClose={() => setShowLessonModal(false)}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
