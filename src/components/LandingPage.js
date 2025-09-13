import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';

const LandingPage = () => {
  const { handleRoleSelection } = useAppContext();
  const navigate = useNavigate();

  return (
    <div id="landing-page" className="page active">
      <div className="container">
        <div className="landing-hero">
          <h1>🎓 Smart Tutor Dashboard</h1>
          <p>Your personalized adaptive learning platform</p>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <button 
              className="btn btn--outline" 
              onClick={() => navigate('/login')}
              style={{ marginRight: '1rem' }}
            >
              Login
            </button>
          </div>
          
          <div className="role-selection">
            <h2>Choose Your Role</h2>
            <div className="role-cards">
              <div className="role-card">
                <div className="role-icon">👨‍🎓</div>
                <h3>Student</h3>
                <p>Access personalized learning paths, track progress, and earn achievements</p>
                <button 
                  className="btn btn--primary" 
                  onClick={() => handleRoleSelection('student')}
                >
                  Continue as Student
                </button>
              </div>
              <div className="role-card">
                <div className="role-icon">👩‍🏫</div>
                <h3>Teacher</h3>
                <p>Monitor student progress, create assessments, and analyze performance</p>
                <button 
                  className="btn btn--primary" 
                  onClick={() => handleRoleSelection('teacher')}
                >
                  Continue as Teacher
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
