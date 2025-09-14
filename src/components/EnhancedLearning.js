import React, { useState, useEffect, useRef } from 'react';
import {
  FaCode, FaRocket, FaBrain, FaChartLine, FaCertificate, FaUsers, FaLightbulb,
  FaPlay, FaPause, FaStop, FaForward, FaBackward, FaExpand, FaCompress,
  FaBookOpen, FaGraduationCap, FaMedal, FaTrophy, FaAward, FaCrown, FaFire,
  FaHeart, FaBolt, FaGem, FaStar, FaEye, FaHandsHelping, FaClipboardCheck,
  FaCalendarAlt, FaMapMarkedAlt, FaRoad, FaFlag, FaUserGraduate, FaIndustry
} from 'react-icons/fa';
import './EnhancedLearning.css';

const EnhancedLearning = ({ currentUser, onProgress }) => {
  const [selectedTrack, setSelectedTrack] = useState('personalized');
  const [activeModule, setActiveModule] = useState(null);
  const [learningMode, setLearningMode] = useState('interactive');
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeOutput, setCodeOutput] = useState('');
  const [currentCode, setCurrentCode] = useState('');
  const [showMentorship, setShowMentorship] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);

  // Advanced Learning Tracks
  const learningTracks = [
    {
      id: 'personalized',
      name: '🎯 AI-Personalized Path',
      description: 'Adaptive learning powered by AI that adjusts to your pace',
      color: '#e74c3c',
      level: 'Dynamic',
      duration: 'Adaptive',
      modules: 15,
      completion: 67,
      features: ['AI Tutor', 'Adaptive Difficulty', 'Real-time Feedback']
    },
    {
      id: 'fullstack',
      name: '🚀 Full-Stack Developer',
      description: 'Complete journey from frontend to backend mastery',
      color: '#3498db',
      level: 'Intermediate to Expert',
      duration: '6-12 months',
      modules: 24,
      completion: 45,
      features: ['Live Projects', 'Industry Mentors', 'Portfolio Building']
    },
    {
      id: 'devops',
      name: '⚙️ DevOps Engineer',
      description: 'Master cloud, containers, and deployment pipelines',
      color: '#f39c12',
      level: 'Advanced',
      duration: '4-8 months',
      modules: 18,
      completion: 23,
      features: ['AWS/Azure Labs', 'Container Orchestration', 'CI/CD Pipelines']
    },
    {
      id: 'ai_ml',
      name: '🤖 AI/ML Specialist',
      description: 'Deep dive into artificial intelligence and machine learning',
      color: '#9b59b6',
      level: 'Expert',
      duration: '8-12 months',
      modules: 28,
      completion: 12,
      features: ['Neural Networks', 'Deep Learning', 'Computer Vision']
    },
    {
      id: 'mobile',
      name: '📱 Mobile App Developer',
      description: 'Build native and cross-platform mobile applications',
      color: '#27ae60',
      level: 'Intermediate',
      duration: '4-6 months',
      modules: 20,
      completion: 78,
      features: ['React Native', 'Flutter', 'Native Development']
    },
    {
      id: 'security',
      name: '🔐 Cybersecurity Expert',
      description: 'Ethical hacking, penetration testing, and security analysis',
      color: '#e67e22',
      level: 'Advanced',
      duration: '6-10 months',
      modules: 22,
      completion: 34,
      features: ['Penetration Testing', 'Ethical Hacking', 'Security Audits']
    }
  ];

  // Interactive Learning Modules
  const interactiveModules = [
    {
      id: 'live_coding',
      name: 'Live Code Editor',
      description: 'Practice coding with real-time feedback',
      icon: <FaCode />,
      type: 'hands-on',
      difficulty: 'Adaptive'
    },
    {
      id: 'ai_tutor',
      name: 'AI Personal Tutor',
      description: 'Get personalized explanations and guidance',
      icon: <FaBrain />,
      type: 'ai-powered',
      difficulty: 'Adaptive'
    },
    {
      id: 'project_lab',
      name: 'Project Laboratory',
      description: 'Build real-world applications step by step',
      icon: <FaRocket />,
      type: 'project-based',
      difficulty: 'Intermediate'
    },
    {
      id: 'peer_review',
      name: 'Peer Code Review',
      description: 'Learn through collaborative code analysis',
      icon: <FaUsers />,
      type: 'collaborative',
      difficulty: 'All Levels'
    }
  ];

  // Professional Certifications
  const certifications = [
    {
      id: 'frontend_cert',
      name: 'Frontend Developer Certification',
      provider: 'Smart Tutor Academy',
      level: 'Professional',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'TypeScript'],
      duration: '3 months',
      projects: 5,
      badge: '🎨',
      progress: 78
    },
    {
      id: 'backend_cert',
      name: 'Backend Engineer Certification',
      provider: 'Smart Tutor Academy',
      level: 'Professional',
      skills: ['Node.js', 'Python', 'Databases', 'APIs', 'Cloud'],
      duration: '4 months',
      projects: 6,
      badge: '⚡',
      progress: 45
    },
    {
      id: 'fullstack_cert',
      name: 'Full-Stack Developer Certification',
      provider: 'Smart Tutor Academy',
      level: 'Expert',
      skills: ['Frontend', 'Backend', 'DevOps', 'Architecture'],
      duration: '6 months',
      projects: 8,
      badge: '🚀',
      progress: 23
    },
    {
      id: 'ai_cert',
      name: 'AI/ML Engineer Certification',
      provider: 'Smart Tutor Academy',
      level: 'Expert',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science'],
      duration: '8 months',
      projects: 10,
      badge: '🤖',
      progress: 12
    }
  ];

  // Career Pathways
  const careerPaths = [
    {
      id: 'startup',
      name: 'Startup Developer',
      description: 'Versatile skills for fast-paced startup environment',
      skills: ['Full-Stack', 'MVP Development', 'Agile', 'Product Thinking'],
      companies: ['Y Combinator', 'Techstars', 'AngelList'],
      salary: '$80k - $150k',
      growth: 'High'
    },
    {
      id: 'enterprise',
      name: 'Enterprise Developer',
      description: 'Large-scale systems and enterprise architecture',
      skills: ['Java/.NET', 'Microservices', 'Cloud', 'Security'],
      companies: ['Google', 'Microsoft', 'IBM', 'Oracle'],
      salary: '$120k - $200k',
      growth: 'Steady'
    },
    {
      id: 'consultant',
      name: 'Technical Consultant',
      description: 'Problem-solving across various technologies',
      skills: ['Multiple Stacks', 'Communication', 'Architecture'],
      companies: ['McKinsey Digital', 'Accenture', 'Deloitte'],
      salary: '$100k - $180k',
      growth: 'Very High'
    }
  ];

  const runCode = () => {
    try {
      // Simulate code execution (in real app, use secure sandboxing)
      const result = eval(currentCode);
      setCodeOutput(`Output: ${result}`);
    } catch (error) {
      setCodeOutput(`Error: ${error.message}`);
    }
  };

  const getSelectedTrack = () => learningTracks.find(track => track.id === selectedTrack);

  return (
    <div className="enhanced-learning">
      {/* Header with Learning Analytics */}
      <div className="learning-header">
        <div className="header-content">
          <h2>🎓 Professional Learning Hub</h2>
          <div className="learning-stats">
            <div className="stat-item">
              <div className="stat-icon"><FaChartLine /></div>
              <div className="stat-info">
                <span className="stat-number">87%</span>
                <span className="stat-label">Learning Velocity</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><FaTrophy /></div>
              <div className="stat-info">
                <span className="stat-number">15</span>
                <span className="stat-label">Skills Mastered</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><FaUsers /></div>
              <div className="stat-info">
                <span className="stat-number">234</span>
                <span className="stat-label">Peers Connected</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon"><FaCertificate /></div>
              <div className="stat-info">
                <span className="stat-number">3</span>
                <span className="stat-label">Certifications</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <button 
            className={`action-btn ${learningMode === 'interactive' ? 'active' : ''}`}
            onClick={() => setLearningMode('interactive')}
          >
            <FaCode /> Interactive
          </button>
          <button 
            className={`action-btn ${learningMode === 'mentorship' ? 'active' : ''}`}
            onClick={() => setLearningMode('mentorship')}
          >
            <FaHandsHelping /> Mentorship
          </button>
          <button 
            className={`action-btn ${learningMode === 'projects' ? 'active' : ''}`}
            onClick={() => setLearningMode('projects')}
          >
            <FaRocket /> Projects
          </button>
        </div>
      </div>

      {/* Learning Tracks Selection */}
      <div className="learning-tracks">
        <h3>🛤️ Choose Your Learning Track</h3>
        <div className="tracks-grid">
          {learningTracks.map(track => (
            <div
              key={track.id}
              className={`track-card ${selectedTrack === track.id ? 'selected' : ''}`}
              onClick={() => setSelectedTrack(track.id)}
              style={{ '--track-color': track.color }}
            >
              <div className="track-header">
                <h4>{track.name}</h4>
                <div className="track-level">{track.level}</div>
              </div>
              <p className="track-description">{track.description}</p>
              
              <div className="track-stats">
                <div className="track-stat">
                  <span className="stat-label">Modules:</span>
                  <span className="stat-value">{track.modules}</span>
                </div>
                <div className="track-stat">
                  <span className="stat-label">Duration:</span>
                  <span className="stat-value">{track.duration}</span>
                </div>
              </div>
              
              <div className="track-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${track.completion}%` }}
                  ></div>
                </div>
                <span className="progress-text">{track.completion}% Complete</span>
              </div>
              
              <div className="track-features">
                {track.features.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Learning Modules */}
      <div className="interactive-modules">
        <h3>🎮 Interactive Learning Experience</h3>
        <div className="modules-grid">
          {interactiveModules.map(module => (
            <div
              key={module.id}
              className="module-card"
              onClick={() => {
                setActiveModule(module);
                if (module.id === 'live_coding') setShowCodeEditor(true);
              }}
            >
              <div className="module-icon">{module.icon}</div>
              <h4>{module.name}</h4>
              <p>{module.description}</p>
              <div className="module-meta">
                <span className="module-type">{module.type}</span>
                <span className="module-difficulty">{module.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Code Editor */}
      {showCodeEditor && (
        <div className="code-editor-modal">
          <div className="code-editor-content">
            <div className="editor-header">
              <h3>💻 Live Code Editor</h3>
              <button onClick={() => setShowCodeEditor(false)}>×</button>
            </div>
            
            <div className="editor-workspace">
              <div className="code-input">
                <textarea
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  placeholder="// Write your code here..."
                  className="code-textarea"
                />
                <div className="editor-controls">
                  <button onClick={runCode} className="run-btn">
                    <FaPlay /> Run Code
                  </button>
                </div>
              </div>
              
              <div className="code-output">
                <h4>Output:</h4>
                <pre className="output-display">{codeOutput}</pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Certifications */}
      <div className="certifications-section">
        <h3>🏆 Professional Certifications</h3>
        <div className="certifications-grid">
          {certifications.map(cert => (
            <div key={cert.id} className="certification-card">
              <div className="cert-badge">{cert.badge}</div>
              <div className="cert-content">
                <h4>{cert.name}</h4>
                <p className="cert-provider">{cert.provider}</p>
                <div className="cert-level">{cert.level}</div>
                
                <div className="cert-skills">
                  {cert.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
                
                <div className="cert-stats">
                  <div className="cert-stat">
                    <span>Duration: {cert.duration}</span>
                  </div>
                  <div className="cert-stat">
                    <span>Projects: {cert.projects}</span>
                  </div>
                </div>
                
                <div className="cert-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${cert.progress}%` }}
                    ></div>
                  </div>
                  <span>{cert.progress}% Complete</span>
                </div>
                
                <button className="cert-btn">
                  {cert.progress > 0 ? 'Continue' : 'Start Certification'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Pathways */}
      <div className="career-pathways">
        <h3>🚀 Career Pathways</h3>
        <div className="pathways-grid">
          {careerPaths.map(path => (
            <div key={path.id} className="pathway-card">
              <h4>{path.name}</h4>
              <p>{path.description}</p>
              
              <div className="pathway-details">
                <div className="pathway-skills">
                  <h5>Key Skills:</h5>
                  {path.skills.map((skill, index) => (
                    <span key={index} className="pathway-skill">{skill}</span>
                  ))}
                </div>
                
                <div className="pathway-companies">
                  <h5>Target Companies:</h5>
                  <div className="companies-list">
                    {path.companies.map((company, index) => (
                      <span key={index} className="company-tag">{company}</span>
                    ))}
                  </div>
                </div>
                
                <div className="pathway-stats">
                  <div className="pathway-stat">
                    <FaIndustry className="stat-icon" />
                    <span>Salary: {path.salary}</span>
                  </div>
                  <div className="pathway-stat">
                    <FaChartLine className="stat-icon" />
                    <span>Growth: {path.growth}</span>
                  </div>
                </div>
              </div>
              
              <button className="pathway-btn">Explore Pathway</button>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Recommendations */}
      <div className="ai-recommendations">
        <h3>🤖 AI-Powered Recommendations</h3>
        <div className="recommendations-container">
          <div className="recommendation-card featured">
            <div className="rec-header">
              <FaBrain className="rec-icon" />
              <div>
                <h4>Personalized Next Step</h4>
                <p>Based on your learning pattern and goals</p>
              </div>
            </div>
            <div className="rec-content">
              <div className="rec-suggestion">
                <strong>Recommended:</strong> Advanced React Patterns
              </div>
              <div className="rec-reason">
                You've mastered React basics and shown interest in component architecture. 
                This module will enhance your skills in higher-order components and render props.
              </div>
              <div className="rec-impact">
                <span className="impact-item">
                  <FaChartLine /> +25% Learning Velocity
                </span>
                <span className="impact-item">
                  <FaTrophy /> New Achievement Unlocked
                </span>
              </div>
            </div>
            <button className="rec-action-btn">Start Learning</button>
          </div>
          
          <div className="quick-recommendations">
            <div className="quick-rec">
              <FaLightbulb className="quick-icon" />
              <span>Practice JavaScript Algorithms (15 min)</span>
            </div>
            <div className="quick-rec">
              <FaCode className="quick-icon" />
              <span>Review Yesterday's Code (10 min)</span>
            </div>
            <div className="quick-rec">
              <FaUsers className="quick-icon" />
              <span>Join Study Group Session (30 min)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Analytics */}
      <div className="progress-analytics">
        <h3>📊 Learning Analytics</h3>
        <div className="analytics-grid">
          <div className="analytics-card">
            <h4>Weekly Progress</h4>
            <div className="progress-chart">
              <div className="chart-bars">
                {[85, 92, 78, 95, 88, 91, 87].map((height, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{ height: `${height}%` }}
                  ></div>
                ))}
              </div>
              <div className="chart-labels">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <span key={day} className="chart-label">{day}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="analytics-card">
            <h4>Skill Distribution</h4>
            <div className="skill-rings">
              <div className="skill-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#3498db" strokeWidth="8" 
                          strokeDasharray={`${75 * 2.83} ${283 - 75 * 2.83}`} transform="rotate(-90 50 50)"/>
                </svg>
                <div className="ring-content">
                  <span className="ring-value">75%</span>
                  <span className="ring-label">Frontend</span>
                </div>
              </div>
              <div className="skill-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e0e0e0" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e74c3c" strokeWidth="8" 
                          strokeDasharray={`${60 * 2.83} ${283 - 60 * 2.83}`} transform="rotate(-90 50 50)"/>
                </svg>
                <div className="ring-content">
                  <span className="ring-value">60%</span>
                  <span className="ring-label">Backend</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLearning;
