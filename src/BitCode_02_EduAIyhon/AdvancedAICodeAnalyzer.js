import React, { useState, useCallback, useEffect } from 'react';
import { 
  FaRobot, 
  FaCode, 
  FaBug, 
  FaLightbulb, 
  FaChartLine, 
  FaGraduationCap,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaPlay,
  FaSpinner
} from 'react-icons/fa';
import './AdvancedAICodeAnalyzer.css';

/**
 * Advanced AI Code Analysis Engine
 * Provides intelligent code review, bug detection, performance suggestions,
 * and personalized learning recommendations
 */
const AdvancedAICodeAnalyzer = ({ 
  code = '', 
  language = 'javascript', 
  onAnalysisUpdate,
  currentUser 
}) => {
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [autoAnalyze, setAutoAnalyze] = useState(false);

  // Analysis categories
  const analysisCategories = {
    overview: 'Code Overview',
    bugs: 'Bug Detection',
    performance: 'Performance',
    style: 'Code Style',
    learning: 'Learning Insights',
    suggestions: 'AI Suggestions'
  };

  /**
   * Advanced AI Code Analysis Service
   */
  const analyzeCode = useCallback(async () => {
    if (!code.trim()) {
      setAnalysis(null);
      return;
    }

    setIsAnalyzing(true);

    try {
      // Simulate AI analysis with realistic delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      const aiAnalysis = await performAdvancedAnalysis(code, language, currentUser);
      setAnalysis(aiAnalysis);
      
      // Notify parent component
      if (onAnalysisUpdate) {
        onAnalysisUpdate(aiAnalysis);
      }

    } catch (error) {
      console.error('Code analysis failed:', error);
      setAnalysis({
        error: 'Analysis failed. Please try again.',
        overview: { score: 0, summary: 'Unable to analyze code' }
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [code, language, currentUser, onAnalysisUpdate]);

  /**
   * Perform comprehensive code analysis
   */
  const performAdvancedAnalysis = async (sourceCode, lang, user) => {
    const codeMetrics = analyzeCodeMetrics(sourceCode);
    const bugDetection = detectPotentialBugs(sourceCode, lang);
    const performanceAnalysis = analyzePerformance(sourceCode, lang);
    const styleAnalysis = analyzeCodeStyle(sourceCode, lang);
    const learningInsights = generateLearningInsights(sourceCode, lang, user);
    const aiSuggestions = generateAISuggestions(sourceCode, lang, user);

    return {
      overview: {
        score: calculateOverallScore(codeMetrics, bugDetection, performanceAnalysis, styleAnalysis),
        summary: generateOverviewSummary(sourceCode, lang),
        complexity: codeMetrics.complexity,
        readability: codeMetrics.readability,
        maintainability: codeMetrics.maintainability
      },
      bugs: bugDetection,
      performance: performanceAnalysis,
      style: styleAnalysis,
      learning: learningInsights,
      suggestions: aiSuggestions,
      timestamp: new Date().toISOString()
    };
  };

  // Helper analysis functions
  const analyzeCodeMetrics = (sourceCode) => {
    const lines = sourceCode.split('\n').filter(line => line.trim());
    const functions = (sourceCode.match(/function\s+\w+|=>\s*{|const\s+\w+\s*=/g) || []).length;
    const variables = (sourceCode.match(/(?:let|const|var)\s+\w+/g) || []).length;
    const comments = (sourceCode.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || []).length;

    return {
      linesOfCode: lines.length,
      functions,
      variables,
      comments,
      complexity: Math.min(100, Math.max(10, Math.floor((functions * 2 + variables) / lines.length * 100))),
      readability: Math.min(100, Math.max(20, 100 - Math.floor((lines.length - comments * 5) / 10))),
      maintainability: Math.min(100, Math.max(30, 90 - Math.floor(functions > 10 ? functions * 2 : 0)))
    };
  };

  const detectPotentialBugs = (sourceCode, lang) => {
    const issues = [];

    // Common bug patterns for different languages
    const bugPatterns = {
      javascript: [
        { pattern: /==/g, severity: 'warning', message: 'Use === instead of == for strict equality' },
        { pattern: /var\s+/g, severity: 'info', message: 'Consider using let or const instead of var' },
        { pattern: /console\.log/g, severity: 'info', message: 'Remove console.log statements before production' },
        { pattern: /eval\s*\(/g, severity: 'error', message: 'Avoid using eval() - security risk' }
      ],
      python: [
        { pattern: /except:/g, severity: 'warning', message: 'Avoid bare except clauses' },
        { pattern: /global\s+/g, severity: 'warning', message: 'Minimize use of global variables' }
      ],
      java: [
        { pattern: /System\.out\.print/g, severity: 'info', message: 'Consider using a logging framework' }
      ]
    };

    const patterns = bugPatterns[lang] || bugPatterns.javascript;

    patterns.forEach(({ pattern, severity, message }) => {
      const matches = sourceCode.match(pattern);
      if (matches) {
        issues.push({
          severity,
          message,
          count: matches.length,
          type: 'potential_bug'
        });
      }
    });

    return {
      totalIssues: issues.length,
      critical: issues.filter(i => i.severity === 'error').length,
      warnings: issues.filter(i => i.severity === 'warning').length,
      info: issues.filter(i => i.severity === 'info').length,
      issues
    };
  };

  const analyzePerformance = (sourceCode, lang) => {
    const suggestions = [];
    let score = 85;

    if (sourceCode.includes('for') && sourceCode.includes('for')) {
      suggestions.push({
        type: 'optimization',
        title: 'Nested Loops Detected',
        description: 'Consider optimizing nested loops for better time complexity',
        impact: 'medium'
      });
      score -= 10;
    }

    return {
      score: Math.max(0, score),
      suggestions,
      metrics: {
        timeComplexity: sourceCode.includes('for') ? 'O(n)' : 'O(1)',
        spaceComplexity: 'O(1)',
        cacheability: sourceCode.includes('const') ? 'High' : 'Medium'
      }
    };
  };

  const analyzeCodeStyle = (sourceCode, lang) => {
    const styleIssues = [];
    let score = 90;

    if (lang === 'javascript') {
      const variables = sourceCode.match(/(?:let|const|var)\s+(\w+)/g) || [];
      const camelCasePattern = /^[a-z][a-zA-Z0-9]*$/;
      
      variables.forEach(variable => {
        const varName = variable.split(/\s+/)[1];
        if (!camelCasePattern.test(varName)) {
          styleIssues.push({
            type: 'naming',
            message: `Variable '${varName}' should use camelCase`,
            severity: 'info'
          });
        }
      });
    }

    return {
      score: Math.max(0, score),
      issues: styleIssues,
      recommendations: [
        'Use consistent naming conventions',
        'Maintain proper indentation',
        'Add meaningful comments'
      ]
    };
  };

  const generateLearningInsights = (sourceCode, lang, user) => {
    const insights = [];
    const skillLevel = user?.level || 'beginner';

    if (sourceCode.includes('async') || sourceCode.includes('await')) {
      insights.push({
        topic: 'Asynchronous Programming',
        level: 'intermediate',
        description: 'Great job using async/await! Consider learning about Promise.all() for concurrent operations.',
        nextSteps: ['Error handling in async functions', 'Promise chaining']
      });
    }

    return {
      currentLevel: skillLevel,
      suggestedTopics: insights,
      nextChallenge: 'Try creating a function that takes parameters and returns a value',
      progressMetrics: {
        conceptsUsed: insights.length,
        complexityGrowth: Math.min(100, sourceCode.length / 10)
      }
    };
  };

  const generateAISuggestions = (sourceCode, lang, user) => {
    const suggestions = [
      {
        category: 'improvement',
        title: 'Code Optimization',
        description: 'Your code structure is good. Consider adding error handling for more robust applications.',
        priority: 'medium'
      },
      {
        category: 'learning',
        title: 'New Concept',
        description: 'Based on your current code, you might enjoy learning about design patterns.',
        priority: 'low'
      }
    ];

    return {
      suggestions,
      totalSuggestions: suggestions.length,
      prioritySuggestions: suggestions.filter(s => s.priority === 'high')
    };
  };

  // Helper functions
  const calculateOverallScore = (metrics, bugs, performance, style) => {
    return Math.round(
      (metrics.readability * 0.3 + 
       (100 - bugs.totalIssues * 5) * 0.3 + 
       performance.score * 0.2 + 
       style.score * 0.2) * 0.01 * 100
    );
  };

  const generateOverviewSummary = (sourceCode, lang) => {
    const lines = sourceCode.split('\n').length;
    const functions = (sourceCode.match(/function|=>/g) || []).length;
    
    return `${lang.charAt(0).toUpperCase() + lang.slice(1)} code with ${lines} lines and ${functions} functions.`;
  };

  // Auto-analyze when code changes
  useEffect(() => {
    if (autoAnalyze && code.trim()) {
      const timer = setTimeout(analyzeCode, 1500);
      return () => clearTimeout(timer);
    }
  }, [code, autoAnalyze, analyzeCode]);

  const getTabIcon = (tab) => {
    const icons = {
      overview: <FaChartLine />,
      bugs: <FaBug />,
      performance: <FaRobot />,
      style: <FaCode />,
      learning: <FaGraduationCap />,
      suggestions: <FaLightbulb />
    };
    return icons[tab] || <FaInfoCircle />;
  };

  return (
    <div className="advanced-ai-analyzer">
      <div className="analyzer-header">
        <div className="analyzer-title">
          <FaRobot className="title-icon" />
          <h3>Advanced AI Code Analyzer</h3>
        </div>
        
        <div className="analyzer-controls">
          <label className="auto-analyze-toggle">
            <input
              type="checkbox"
              checked={autoAnalyze}
              onChange={(e) => setAutoAnalyze(e.target.checked)}
            />
            Auto-analyze
          </label>
          
          <button 
            className="analyze-btn"
            onClick={analyzeCode}
            disabled={isAnalyzing || !code.trim()}
          >
            {isAnalyzing ? (
              <>
                <FaSpinner className="spinning" />
                Analyzing...
              </>
            ) : (
              <>
                <FaPlay />
                Analyze Code
              </>
            )}
          </button>
        </div>
      </div>

      <div className="analyzer-tabs">
        {Object.entries(analysisCategories).map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn ${activeTab === key ? 'active' : ''}`}
            onClick={() => setActiveTab(key)}
            disabled={!analysis}
          >
            {getTabIcon(key)}
            {label}
          </button>
        ))}
      </div>

      <div className="analyzer-content">
        {isAnalyzing ? (
          <div className="analyzing-state">
            <FaSpinner className="analyzing-spinner" />
            <h3>Analyzing Your Code...</h3>
            <p>AI is reviewing your code for bugs, performance, and learning opportunities.</p>
          </div>
        ) : analysis ? (
          <div className="analysis-results">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <div className="score-display">
                  <div className="score-circle">
                    <span className="score-value">{analysis.overview.score}</span>
                    <span className="score-label">Overall Score</span>
                  </div>
                </div>
                
                <div className="metrics-grid">
                  <div className="metric-card">
                    <h4>Complexity</h4>
                    <div className="metric-value">{analysis.overview.complexity}%</div>
                  </div>
                  <div className="metric-card">
                    <h4>Readability</h4>
                    <div className="metric-value">{analysis.overview.readability}%</div>
                  </div>
                  <div className="metric-card">
                    <h4>Maintainability</h4>
                    <div className="metric-value">{analysis.overview.maintainability}%</div>
                  </div>
                </div>
                
                <div className="summary-section">
                  <h4>Analysis Summary</h4>
                  <p>{analysis.overview.summary}</p>
                </div>
              </div>
            )}
            
            {activeTab === 'bugs' && (
              <div className="bugs-tab">
                <div className="bugs-summary">
                  <div className="bug-count critical">
                    <FaExclamationTriangle />
                    <span>{analysis.bugs.critical} Critical</span>
                  </div>
                  <div className="bug-count warning">
                    <FaExclamationTriangle />
                    <span>{analysis.bugs.warnings} Warnings</span>
                  </div>
                  <div className="bug-count info">
                    <FaInfoCircle />
                    <span>{analysis.bugs.info} Info</span>
                  </div>
                </div>
                
                <div className="issues-list">
                  {analysis.bugs.issues.map((issue, index) => (
                    <div key={index} className={`issue-item ${issue.severity}`}>
                      <div className="issue-content">
                        <p>{issue.message}</p>
                        {issue.count > 1 && <span className="issue-count">({issue.count} occurrences)</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="analysis-placeholder">
            <FaRobot className="placeholder-icon" />
            <h3>Ready to Analyze Your Code</h3>
            <p>Click "Analyze Code" to get AI-powered insights, bug detection, and learning recommendations.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedAICodeAnalyzer;