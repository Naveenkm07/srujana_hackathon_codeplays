import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../App';
import ClassPerformanceChart from './charts/ClassPerformanceChart';
import SubjectDistributionChart from './charts/SubjectDistributionChart';
import EngagementChart from './charts/EngagementChart';

const TeacherDashboard = () => {
  const { currentUser, handleLogout, appData } = useAppContext();
  const [activeSection, setActiveSection] = useState('teacher-overview');
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'teacher') {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  return (
    <div id="teacher-dashboard" className="page active">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🎓 Smart Tutor - Teacher</h2>
        </div>
        <div className="nav-menu">
          <button 
            className={`nav-item ${activeSection === 'teacher-overview' ? 'active' : ''}`}
            onClick={() => handleNavigation('teacher-overview')}
          >
            Overview
          </button>
          <button 
            className={`nav-item ${activeSection === 'students' ? 'active' : ''}`}
            onClick={() => handleNavigation('students')}
          >
            Students
          </button>
          <button 
            className={`nav-item ${activeSection === 'analytics' ? 'active' : ''}`}
            onClick={() => handleNavigation('analytics')}
          >
            Analytics
          </button>
          <button 
            className={`nav-item ${activeSection === 'content' ? 'active' : ''}`}
            onClick={() => handleNavigation('content')}
          >
            Content
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
        {/* Teacher Overview */}
        {activeSection === 'teacher-overview' && (
          <div className="section active">
            <div className="teacher-stats">
              <div className="stat-card">
                <h3>24</h3>
                <p>Total Students</p>
              </div>
              <div className="stat-card">
                <h3>78%</h3>
                <p>Average Progress</p>
              </div>
              <div className="stat-card">
                <h3>156</h3>
                <p>Modules Completed</p>
              </div>
              <div className="stat-card">
                <h3>92%</h3>
                <p>Student Engagement</p>
              </div>
            </div>

            <div className="dashboard-grid">
              <div className="card">
                <div className="card__body">
                  <h3>Class Performance Overview</h3>
                  <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
                    <ClassPerformanceChart />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card__body">
                  <h3>Recent Activity</h3>
                  <div>
                    <div className="activity-item">
                      <span className="activity-icon">✅</span>
                      <div className="activity-content">
                        <p><strong>Emma Davis</strong> completed Algebra Basics</p>
                        <small>2 hours ago</small>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">🎯</span>
                      <div className="activity-content">
                        <p><strong>Alex Johnson</strong> earned Quiz Master badge</p>
                        <small>4 hours ago</small>
                      </div>
                    </div>
                    <div className="activity-item">
                      <span className="activity-icon">📚</span>
                      <div className="activity-content">
                        <p><strong>Sam Wilson</strong> started Basic Arithmetic</p>
                        <small>6 hours ago</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Students Section */}
        {activeSection === 'students' && (
          <div className="section active">
            <h2>Student Management</h2>
            <div className="students-grid">
              {appData.sampleStudents.map(student => {
                const avgProgress = Object.values(student.progress).reduce((a, b) => a + b, 0) / Object.values(student.progress).length;
                return (
                  <div key={student.id} className="student-card">
                    <div className="student-header">
                      <span className="student-name">{student.name}</span>
                      <span className="student-level">{student.level}</span>
                    </div>
                    <div className="student-stats">
                      <div className="student-stat">
                        <div className="student-stat-value">{student.totalPoints}</div>
                        <div className="student-stat-label">Points</div>
                      </div>
                      <div className="student-stat">
                        <div className="student-stat-value">{Math.round(avgProgress)}%</div>
                        <div className="student-stat-label">Progress</div>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${avgProgress}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Analytics Section */}
        {activeSection === 'analytics' && (
          <div className="section active">
            <h2>Class Analytics</h2>
            <div className="analytics-grid">
              <div className="card">
                <div className="card__body">
                  <h3>Subject Performance Distribution</h3>
                  <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
                    <SubjectDistributionChart />
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card__body">
                  <h3>Weekly Engagement</h3>
                  <div className="chart-container" style={{ position: 'relative', height: '300px' }}>
                    <EngagementChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Section */}
        {activeSection === 'content' && (
          <div className="section active">
            <h2>Content Management</h2>
            <div className="content-management">
              <div className="card">
                <div className="card__body">
                  <h3>Available Modules</h3>
                  <div>
                    {appData.learningModules.map(module => (
                      <div key={module.id} className="module-item">
                        <h4>{module.title}</h4>
                        <p>{module.description}</p>
                        <div className="module-meta">
                          <span>{module.subject}</span> • 
                          <span>{module.difficulty}</span> • 
                          <span>{module.estimatedTime}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
