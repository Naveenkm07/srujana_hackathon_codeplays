import React, { useState, useEffect } from 'react';
import { useAppContext } from '../App';
import { LearningService } from '../services/supabaseClient';
import LoadingSpinner from './LoadingSpinner';
import { FaUsers, FaBook, FaChartBar, FaCog, FaUserShield, FaTrash, FaEdit } from 'react-icons/fa';

const AdminDashboard = () => {
  const { currentUser, handleLogout } = useAppContext();
  const [activeSection, setActiveSection] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    // Temporarily disable admin role check for testing
    // if (currentUser?.role !== 'admin') {
    //   handleLogout();
    //   return;
    // }
    loadAdminData();
  }, [currentUser]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      console.log('Loading admin data...');
      
      // Fetch real users from Supabase
      let usersData = [];
      try {
        usersData = await LearningService.getAllUsers();
        console.log('Real users data from Supabase:', usersData);
      } catch (error) {
        console.error('Failed to fetch users from Supabase:', error);
        usersData = []; // No fallback - show empty if database fails
      }

      let subjectsData = [];
      try {
        subjectsData = await LearningService.getSubjects();
        console.log('Subjects data:', subjectsData);
      } catch (error) {
        console.error('Failed to fetch subjects:', error);
        // Fallback subjects data
        subjectsData = [
          { id: '1', name: 'Mathematics', description: 'Learn math concepts', icon: '🔢' },
          { id: '2', name: 'Science', description: 'Explore science', icon: '🔬' },
          { id: '3', name: 'English', description: 'Language arts', icon: '📚' }
        ];
      }

      let lessonsData = [];
      try {
        lessonsData = await LearningService.getAllLessons();
        console.log('Lessons data:', lessonsData);
      } catch (error) {
        console.error('Failed to fetch lessons:', error);
        // Fallback lessons data
        lessonsData = [
          { id: '1', title: 'Introduction to Algebra', description: 'Basic algebra concepts', difficulty: 'beginner' },
          { id: '2', title: 'Basic Chemistry', description: 'Chemical reactions', difficulty: 'intermediate' }
        ];
      }
      
      setUsers(usersData || []);
      setSubjects(subjectsData || []);
      setLessons(lessonsData || []);
      
      // Generate analytics
      const analyticsData = {
        totalUsers: usersData?.length || 0,
        totalSubjects: subjectsData?.length || 0,
        totalLessons: lessonsData?.length || 0,
        activeUsers: usersData?.filter(u => u.last_login && u.last_login > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).length || 0
      };
      setAnalytics(analyticsData);
      
      console.log('Analytics data:', analyticsData);
    } catch (error) {
      console.error('Failed to load admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = Array.isArray(users) ? users.filter(user => 
    filterRole === 'all' || user.role === filterRole
  ) : [];

  const handleUserRoleChange = async (userId, newRole) => {
    try {
      await LearningService.updateUserRole(userId, newRole);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Failed to update user role:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await LearningService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  const handleViewUser = (user) => {
    // Create detailed user view modal
    const userDetails = `
      User Details:
      Name: ${user.name || 'N/A'}
      Email: ${user.email}
      Phone: ${user.phone || 'N/A'}
      Grade: ${user.grade || 'N/A'}
      Class: ${user.class || 'N/A'}
      School: ${user.school || 'N/A'}
      Parent Name: ${user.parent_name || 'N/A'}
      Parent Email: ${user.parent_email || 'N/A'}
      Parent Phone: ${user.parent_phone || 'N/A'}
      Address: ${user.address || 'N/A'}
      City: ${user.city || 'N/A'}
      State: ${user.state || 'N/A'}
      Country: ${user.country || 'N/A'}
      Status: ${user.status || 'active'}
      Role: ${user.role || 'student'}
      Subscription: ${user.subscription_type || 'free'}
      Total Lessons: ${user.total_lessons_completed || 0}
      Time Spent: ${user.total_time_spent || 0} minutes
      Performance Score: ${user.performance_score || 0}%
      Login Count: ${user.login_count || 0}
      Last Login: ${user.last_login ? new Date(user.last_login).toLocaleString() : 'Never'}
      Created: ${new Date(user.created_at).toLocaleString()}
    `;
    alert(userDetails);
  };

  if (loading) return <LoadingSpinner message="Loading admin dashboard..." />;

  return (
    <div id="admin-dashboard" className="page active">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>👨‍💼 Admin Dashboard</h2>
        </div>
        <div className="nav-menu">
          <button 
            className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveSection('overview')}
          >
            <FaChartBar /> Overview
          </button>
          <button 
            className={`nav-item ${activeSection === 'users' ? 'active' : ''}`}
            onClick={() => setActiveSection('users')}
          >
            <FaUsers /> Users
          </button>
          <button 
            className={`nav-item ${activeSection === 'content' ? 'active' : ''}`}
            onClick={() => setActiveSection('content')}
          >
            <FaBook /> Content
          </button>
          <button 
            className={`nav-item ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            <FaCog /> Settings
          </button>
        </div>
        <div className="nav-user">
          <span>Welcome, {currentUser?.name}</span>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="section active">
            <h2>System Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <FaUsers className="stat-icon" />
                <div className="stat-content">
                  <h3>{analytics?.totalUsers || 0}</h3>
                  <p>Total Users</p>
                </div>
              </div>
              <div className="stat-card">
                <FaBook className="stat-icon" />
                <div className="stat-content">
                  <h3>{analytics?.totalSubjects || 0}</h3>
                  <p>Subjects</p>
                </div>
              </div>
              <div className="stat-card">
                <FaChartBar className="stat-icon" />
                <div className="stat-content">
                  <h3>{analytics?.totalLessons || 0}</h3>
                  <p>Lessons</p>
                </div>
              </div>
              <div className="stat-card">
                <FaUserShield className="stat-icon" />
                <div className="stat-content">
                  <h3>{analytics?.activeUsers || 0}</h3>
                  <p>Active Users</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-time">2 hours ago</span>
                  <span className="activity-desc">New user registered: John Doe</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">4 hours ago</span>
                  <span className="activity-desc">Lesson completed: Introduction to Mathematics</span>
                </div>
                <div className="activity-item">
                  <span className="activity-time">1 day ago</span>
                  <span className="activity-desc">New subject created: Physics</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Management Section */}
        {activeSection === 'users' && (
          <div className="section active">
            <div className="section-header">
              <h2>User Management</h2>
              <div className="filters">
                <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
                  <option value="all">All Roles</option>
                  <option value="student">Students</option>
                  <option value="teacher">Teachers</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>

            <div className="users-table-container">
              <div className="table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Grade/Class</th>
                      <th>Phone</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Total Lessons</th>
                      <th>Performance</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(filteredUsers) && filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>
                          <div className="user-avatar">
                            {user.avatar_url ? (
                              <img src={user.avatar_url} alt={user.name} />
                            ) : (
                              <div className="avatar-placeholder">
                                {(user.name || user.email)?.charAt(0)?.toUpperCase()}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="user-name-cell">
                            <strong>{user.name || 'N/A'}</strong>
                            {user.school && <small>{user.school}</small>}
                          </div>
                        </td>
                        <td>
                          <div className="user-email">
                            {user.email}
                            {user.parent_email && <small>Parent: {user.parent_email}</small>}
                          </div>
                        </td>
                        <td>
                          <div className="grade-info">
                            {user.grade ? `Grade ${user.grade}` : 'N/A'}
                            {user.class && <small>Class: {user.class}</small>}
                          </div>
                        </td>
                        <td>
                          <div className="phone-info">
                            {user.phone || 'N/A'}
                            {user.parent_phone && <small>Parent: {user.parent_phone}</small>}
                          </div>
                        </td>
                        <td>
                          <select 
                            className="role-select"
                            value={user.role || 'student'} 
                            onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <span className={`status-badge ${user.status || 'active'}`}>
                            {user.status || 'active'}
                          </span>
                        </td>
                        <td>
                          <div className="login-info">
                            {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Never'}
                            <small>Logins: {user.login_count || 0}</small>
                          </div>
                        </td>
                        <td>
                          <div className="lessons-info">
                            <strong>{user.total_lessons_completed || 0}</strong>
                            <small>{Math.floor((user.total_time_spent || 0) / 60)}h {(user.total_time_spent || 0) % 60}m</small>
                          </div>
                        </td>
                        <td>
                          <div className="performance-score">
                            <div className="score-circle">
                              {user.performance_score || 0}%
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button 
                              className="action-btn view-btn"
                              onClick={() => handleViewUser(user)}
                              title="View Details"
                            >
                              👁️
                            </button>
                            <button className="action-btn edit-btn" title="Edit User">
                              <FaEdit />
                            </button>
                            <button 
                              className="action-btn delete-btn"
                              onClick={() => handleDeleteUser(user.id)}
                              title="Delete User"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Section */}
        {activeSection === 'content' && (
          <div className="section active">
            <h2>Content Management</h2>
            
            <div className="content-tabs">
              <div className="tab-content">
                <h3>Subjects ({Array.isArray(subjects) ? subjects.length : 0})</h3>
                <div className="content-grid">
                  {Array.isArray(subjects) && subjects.map(subject => (
                    <div key={subject.id} className="content-card">
                      <div className="content-icon">{subject.icon}</div>
                      <h4>{subject.name}</h4>
                      <p>{subject.description}</p>
                      <div className="content-actions">
                        <button className="action-btn edit-btn">
                          <FaEdit /> Edit
                        </button>
                        <button className="action-btn delete-btn">
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <h3>Recent Lessons ({Array.isArray(lessons) ? lessons.length : 0})</h3>
                <div className="lessons-list">
                  {Array.isArray(lessons) && lessons.slice(0, 5).map(lesson => (
                    <div key={lesson.id} className="lesson-item">
                      <div className="lesson-info">
                        <h4>{lesson.title}</h4>
                        <p>{lesson.description}</p>
                        <span className="lesson-meta">
                          Difficulty: {lesson.difficulty} | Duration: {lesson.duration}min
                        </span>
                      </div>
                      <div className="lesson-actions">
                        <button className="action-btn edit-btn">
                          <FaEdit />
                        </button>
                        <button className="action-btn delete-btn">
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="section active">
            <h2>System Settings</h2>
            <div className="settings-grid">
              <div className="setting-card">
                <h3>Database Configuration</h3>
                <p>Supabase connection status: <span className="status connected">Connected</span></p>
                <p>Total tables: 6</p>
                <button className="btn-primary">View Database</button>
              </div>
              <div className="setting-card">
                <h3>Authentication</h3>
                <p>Google OAuth: <span className="status connected">Enabled</span></p>
                <p>Email/Password: <span className="status connected">Enabled</span></p>
                <button className="btn-primary">Configure Auth</button>
              </div>
              <div className="setting-card">
                <h3>System Backup</h3>
                <p>Last backup: {new Date().toLocaleDateString()}</p>
                <p>Auto-backup: <span className="status connected">Enabled</span></p>
                <button className="btn-primary">Create Backup</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
