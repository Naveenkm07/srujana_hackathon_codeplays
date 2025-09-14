import React, { useState, useEffect } from 'react';
import { 
  FaBook, FaVideo, FaClipboardCheck, FaChartLine, 
  FaDownload, FaPlay, FaExternalLinkAlt, FaSearch,
  FaStar, FaClock, FaUser, FaCalendar, FaCode,
  FaPython, FaJsSquare, FaJava, FaReact, FaNodeJs
} from 'react-icons/fa';
import './LearningResources.css';

const LearningResources = ({ currentUser }) => {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [videoTutorials, setVideoTutorials] = useState([]);
  const [practiceTests, setPracticeTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [analytics, setAnalytics] = useState({
    totalStudyTime: 0,
    completedMaterials: 0,
    testScores: [],
    weeklyProgress: [0, 0, 0, 0, 0, 0, 0]
  });

  // Free API integrations
  useEffect(() => {
    fetchLearningResources();
    loadUserAnalytics();
  }, []);

  const fetchLearningResources = async () => {
    try {
      setLoading(true);
      
      // Fetch programming tutorials from GitHub API
      const githubResponse = await fetch('https://api.github.com/search/repositories?q=programming+tutorial+language:markdown&sort=stars&order=desc&per_page=20');
      const githubData = await githubResponse.json();
      
      // Fetch coding videos from a free API (using placeholder data for now)
      const videoData = await fetchVideoTutorials();
      
      // Generate practice tests based on popular programming topics
      const testData = generatePracticeTests();
      
      setStudyMaterials(formatStudyMaterials(githubData.items || []));
      setVideoTutorials(videoData);
      setPracticeTests(testData);
      
    } catch (error) {
      console.error('Error fetching learning resources:', error);
      // Fallback to mock data
      setStudyMaterials(getMockStudyMaterials());
      setVideoTutorials(getMockVideoTutorials());
      setPracticeTests(getMockPracticeTests());
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoTutorials = async () => {
    // Using mock data for video tutorials since YouTube API requires key
    return getMockVideoTutorials();
  };

  const formatStudyMaterials = (repos) => {
    return repos.slice(0, 12).map(repo => ({
      id: repo.id,
      title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      description: repo.description || 'Programming tutorial and study material',
      url: repo.html_url,
      language: repo.language || 'Multiple',
      stars: repo.stargazers_count,
      lastUpdated: new Date(repo.updated_at).toLocaleDateString(),
      difficulty: repo.stargazers_count > 1000 ? 'Advanced' : repo.stargazers_count > 100 ? 'Intermediate' : 'Beginner',
      category: getLanguageCategory(repo.language),
      downloadUrl: `${repo.html_url}/archive/refs/heads/main.zip`
    }));
  };

  const getLanguageCategory = (language) => {
    const langMap = {
      'JavaScript': 'javascript',
      'Python': 'python',
      'Java': 'java',
      'C++': 'cpp',
      'C': 'c',
      'React': 'react',
      'Node.js': 'nodejs'
    };
    return langMap[language] || 'general';
  };

  const generatePracticeTests = () => {
    const topics = [
      { name: 'JavaScript Fundamentals', questions: 25, difficulty: 'Beginner', category: 'javascript' },
      { name: 'Python Data Structures', questions: 30, difficulty: 'Intermediate', category: 'python' },
      { name: 'Java OOP Concepts', questions: 20, difficulty: 'Intermediate', category: 'java' },
      { name: 'React Hooks & State', questions: 15, difficulty: 'Advanced', category: 'react' },
      { name: 'Algorithms & Complexity', questions: 35, difficulty: 'Advanced', category: 'general' },
      { name: 'Database SQL Queries', questions: 25, difficulty: 'Intermediate', category: 'database' }
    ];

    return topics.map((topic, index) => ({
      id: index + 1,
      ...topic,
      timeLimit: topic.questions * 2, // 2 minutes per question
      attempts: Math.floor(Math.random() * 5),
      bestScore: Math.floor(Math.random() * 100),
      icon: getTopicIcon(topic.category)
    }));
  };

  const getTopicIcon = (category) => {
    const iconMap = {
      'javascript': <FaJsSquare />,
      'python': <FaPython />,
      'java': <FaJava />,
      'react': <FaReact />,
      'nodejs': <FaNodeJs />,
      'general': <FaCode />
    };
    return iconMap[category] || <FaCode />;
  };

  const loadUserAnalytics = () => {
    // Simulate loading user analytics
    const savedAnalytics = localStorage.getItem(`learningAnalytics_${currentUser?.id}`);
    if (savedAnalytics) {
      setAnalytics(JSON.parse(savedAnalytics));
    } else {
      // Generate initial analytics
      setAnalytics({
        totalStudyTime: Math.floor(Math.random() * 100),
        completedMaterials: Math.floor(Math.random() * 20),
        testScores: Array.from({length: 10}, () => Math.floor(Math.random() * 100)),
        weeklyProgress: Array.from({length: 7}, () => Math.floor(Math.random() * 8))
      });
    }
  };

  const getMockStudyMaterials = () => [
    {
      id: 1,
      title: 'JavaScript Complete Guide',
      description: 'Comprehensive JavaScript tutorial from basics to advanced',
      language: 'JavaScript',
      difficulty: 'Intermediate',
      category: 'javascript',
      stars: 1250,
      lastUpdated: '2024-01-15',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
      downloadUrl: '#'
    },
    {
      id: 2,
      title: 'Python for Beginners',
      description: 'Step-by-step Python programming tutorial',
      language: 'Python',
      difficulty: 'Beginner',
      category: 'python',
      stars: 890,
      lastUpdated: '2024-01-10',
      url: 'https://docs.python.org/3/tutorial/',
      downloadUrl: '#'
    },
    // Add more mock materials...
  ];

  const getMockVideoTutorials = () => [
    {
      id: 1,
      title: 'JavaScript Crash Course',
      duration: '2:30:45',
      instructor: 'Code Academy',
      difficulty: 'Beginner',
      category: 'javascript',
      thumbnail: 'https://via.placeholder.com/300x200?text=JS+Tutorial',
      url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c',
      views: '1.2M',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Python Full Course',
      duration: '4:26:52',
      instructor: 'Programming Hub',
      difficulty: 'Intermediate',
      category: 'python',
      thumbnail: 'https://via.placeholder.com/300x200?text=Python+Course',
      url: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
      views: '2.1M',
      rating: 4.9
    }
    // Add more mock videos...
  ];

  const getMockPracticeTests = () => [
    {
      id: 1,
      name: 'JavaScript Basics',
      questions: 20,
      difficulty: 'Beginner',
      category: 'javascript',
      timeLimit: 40,
      attempts: 3,
      bestScore: 85,
      icon: <FaJsSquare />
    }
    // Add more mock tests...
  ];

  const filteredMaterials = studyMaterials.filter(material => 
    (selectedCategory === 'all' || material.category === selectedCategory) &&
    (material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     material.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredVideos = videoTutorials.filter(video =>
    (selectedCategory === 'all' || video.category === selectedCategory) &&
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTests = practiceTests.filter(test =>
    (selectedCategory === 'all' || test.category === selectedCategory) &&
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="learning-resources-loading">
        <div className="spinner"></div>
        <p>Loading learning resources...</p>
      </div>
    );
  }

  return (
    <div className="learning-resources">
      <div className="resources-header">
        <h2>📚 Learning Resources</h2>
        <p>Comprehensive study materials, tutorials, and practice tests</p>
      </div>

      {/* Search and Filter */}
      <div className="resources-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-filter"
        >
          <option value="all">All Categories</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="react">React</option>
          <option value="general">General</option>
        </select>
      </div>

      {/* Performance Analytics */}
      <div className="analytics-overview">
        <h3><FaChartLine /> Your Learning Analytics</h3>
        <div className="analytics-grid">
          <div className="analytics-card">
            <FaClock />
            <div>
              <span className="metric-value">{analytics.totalStudyTime}h</span>
              <span className="metric-label">Study Time</span>
            </div>
          </div>
          <div className="analytics-card">
            <FaBook />
            <div>
              <span className="metric-value">{analytics.completedMaterials}</span>
              <span className="metric-label">Completed</span>
            </div>
          </div>
          <div className="analytics-card">
            <FaClipboardCheck />
            <div>
              <span className="metric-value">
                {analytics.testScores.length > 0 ? 
                  Math.round(analytics.testScores.reduce((a, b) => a + b, 0) / analytics.testScores.length) 
                  : 0}%
              </span>
              <span className="metric-label">Avg Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Study Materials */}
      <section className="resource-section">
        <h3><FaBook /> Study Materials</h3>
        <div className="resources-grid">
          {filteredMaterials.map(material => (
            <div key={material.id} className="resource-card study-material">
              <div className="card-header">
                <div className="language-badge" data-language={material.category}>
                  {material.language}
                </div>
                <div className="difficulty-badge" data-difficulty={material.difficulty.toLowerCase()}>
                  {material.difficulty}
                </div>
              </div>
              <h4>{material.title}</h4>
              <p>{material.description}</p>
              <div className="card-meta">
                <span><FaStar /> {material.stars}</span>
                <span><FaCalendar /> {material.lastUpdated}</span>
              </div>
              <div className="card-actions">
                <a href={material.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FaExternalLinkAlt /> View
                </a>
                <a href={material.downloadUrl} className="btn-secondary">
                  <FaDownload /> Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="resource-section">
        <h3><FaVideo /> Video Tutorials</h3>
        <div className="resources-grid video-grid">
          {filteredVideos.map(video => (
            <div key={video.id} className="resource-card video-tutorial">
              <div className="video-thumbnail">
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-overlay">
                  <FaPlay />
                </div>
                <div className="duration-badge">{video.duration}</div>
              </div>
              <div className="video-content">
                <h4>{video.title}</h4>
                <div className="video-meta">
                  <span><FaUser /> {video.instructor}</span>
                  <span><FaStar /> {video.rating}</span>
                  <span>{video.views} views</span>
                </div>
                <div className="difficulty-badge" data-difficulty={video.difficulty.toLowerCase()}>
                  {video.difficulty}
                </div>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <FaPlay /> Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practice Tests */}
      <section className="resource-section">
        <h3><FaClipboardCheck /> Practice Tests</h3>
        <div className="resources-grid">
          {filteredTests.map(test => (
            <div key={test.id} className="resource-card practice-test">
              <div className="test-icon">
                {test.icon}
              </div>
              <h4>{test.name}</h4>
              <div className="test-details">
                <span><FaClipboardCheck /> {test.questions} Questions</span>
                <span><FaClock /> {test.timeLimit} mins</span>
                <span>Attempts: {test.attempts}</span>
                {test.bestScore > 0 && <span>Best: {test.bestScore}%</span>}
              </div>
              <div className="difficulty-badge" data-difficulty={test.difficulty.toLowerCase()}>
                {test.difficulty}
              </div>
              <button className="btn-primary test-btn">
                Start Test
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LearningResources;
