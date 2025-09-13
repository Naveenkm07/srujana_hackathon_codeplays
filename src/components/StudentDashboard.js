import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import ActivityChart from './charts/ActivityChart';
import SubjectProgress from './student/SubjectProgress';
import Achievements from './student/Achievements';
import Resources from './student/Resources';
import LearningModules from './student/LearningModules';
import GamificationStats from './GamificationStats';

const StudentDashboard = () => {
  const { 
    currentUser, 
    handleLogout, 
    appData, 
    setShowQuizModal, 
    setCurrentQuiz,
    completeLesson,
    completeQuiz,
    updateStreak
  } = useAppContext();
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'student') {
      navigate('/');
    } else {
      // Update streak when dashboard loads
      updateStreak();
    }
  }, [currentUser, navigate, updateStreak]);

  if (!currentUser) return null;

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  const startLesson = (lesson, subject) => {
    // Award points for starting a lesson
    completeLesson(subject.name, lesson.title, lesson.difficulty || 'medium');
    
    // Simple quiz for demonstration
    const quiz = {
      questions: [{
        question: `${subject.name} Question: What is the main concept in ${lesson.title}?`,
        options: ['Option A - Basic principles', 'Option B - Advanced theories', 'Option C - Practical applications', 'Option D - Historical context'],
        correct: 0
      }],
      currentIndex: 0,
      subject: subject.name,
      lessonTitle: lesson.title
    };
    setCurrentQuiz(quiz);
    setShowQuizModal(true);
  };


  const recommendations = [
    {
      title: "Continue with Mathematics",
      description: "You're making great progress! Complete the next algebra module."
    },
    {
      title: "Practice Science Lab",
      description: "Try the interactive chemistry experiments to reinforce concepts."
    },
    {
      title: "Weekly Challenge",
      description: "Join this week's spelling challenge to earn bonus points!"
    }
  ];

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
              {/* Enhanced Gamification Stats */}
              <GamificationStats />

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
            <Resources resources={appData.resources} />
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === 'achievements' && (
          <div className="section active">
            <h2>Your Achievements</h2>
            <Achievements 
              badges={appData.badges}
              earnedBadges={currentUser.badges || []}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
