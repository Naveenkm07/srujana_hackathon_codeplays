import React, { useState, useEffect } from 'react';
import { FaCode, FaBug, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaChartBar, FaDownload, FaPlay } from 'react-icons/fa';
import './CodeAnalysisEngine.css';

const CodeAnalysisEngine = ({ currentUser, onAnalysisComplete }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const supportedLanguages = {
    javascript: { name: 'JavaScript', icon: '⚡', extensions: ['.js', '.jsx'] },
    python: { name: 'Python', icon: '🐍', extensions: ['.py'] },
    java: { name: 'Java', icon: '☕', extensions: ['.java'] },
    cpp: { name: 'C++', icon: '🔧', extensions: ['.cpp', '.hpp'] },
    html: { name: 'HTML', icon: '🌐', extensions: ['.html'] },
    css: { name: 'CSS', icon: '🎨', extensions: ['.css'] }
  };

  const codeExamples = {
    javascript: `// JavaScript Example - Find duplicates in array
function findDuplicates(arr) {
  let duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 1]));`,

    python: `# Python Example - Calculate factorial
def factorial(n):
    if n < 0:
        return "Invalid input"
    elif n == 0:
        return 1
    else:
        result = 1
        for i in range(1, n + 1):
            result = result * i
        return result

print(factorial(5))`,

    java: `// Java Example - Palindrome checker
public class PalindromeChecker {
    public static boolean isPalindrome(String str) {
        str = str.toLowerCase().replaceAll("[^a-z0-9]", "");
        int left = 0;
        int right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
    
    public static void main(String[] args) {
        System.out.println(isPalindrome("A man a plan a canal Panama"));
    }
}`,

    cpp: `// C++ Example - Binary search
#include <iostream>
#include <vector>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

int main() {
    vector<int> arr = {1, 3, 5, 7, 9, 11};
    cout << binarySearch(arr, 7) << endl;
    return 0;
}`
  };

  useEffect(() => {
    if (code === '') {
      setCode(codeExamples[language] || '// Start coding here...');
    }
  }, [language]);

  const analyzeCode = async () => {
    if (!code.trim()) return;

    setIsAnalyzing(true);
    
    try {
      const analysis = await performCodeAnalysis(code, language);
      setAnalysisResults(analysis);
      
      // Add to history
      const historyEntry = {
        id: Date.now(),
        code: code.substring(0, 100) + (code.length > 100 ? '...' : ''),
        language,
        timestamp: new Date(),
        score: analysis.overallScore,
        issues: analysis.issues.length
      };
      
      setAnalysisHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(analysis);
      }
      
    } catch (error) {
      console.error('Code analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const performCodeAnalysis = async (code, language) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const issues = [];
    const suggestions = [];
    let complexity = 'Low';
    let maintainability = 85;
    let performance = 90;
    let security = 95;

    // Basic code analysis patterns
    const lines = code.split('\n');
    const codeLines = lines.filter(line => line.trim() && !line.trim().startsWith('//') && !line.trim().startsWith('#'));
    
    // Check for common issues
    if (language === 'javascript') {
      if (code.includes('var ')) {
        issues.push({
          type: 'warning',
          line: lines.findIndex(line => line.includes('var ')) + 1,
          message: 'Consider using let or const instead of var',
          severity: 'medium'
        });
      }
      
      if (code.includes('== ')) {
        issues.push({
          type: 'warning',
          line: lines.findIndex(line => line.includes('== ')) + 1,
          message: 'Use strict equality (===) instead of loose equality (==)',
          severity: 'medium'
        });
      }
      
      if (!code.includes('console.log') && codeLines.length > 10) {
        suggestions.push('Consider adding logging for debugging purposes');
      }
      
      // Complexity analysis
      const nestedLoops = (code.match(/for.*{[\s\S]*?for/g) || []).length;
      if (nestedLoops > 0) {
        complexity = nestedLoops > 2 ? 'High' : 'Medium';
        performance -= nestedLoops * 15;
      }
    }
    
    if (language === 'python') {
      if (!code.includes('def ') && codeLines.length > 5) {
        suggestions.push('Consider breaking code into functions for better modularity');
      }
      
      if (code.includes('print(') && !code.includes('if __name__')) {
        suggestions.push('Consider using if __name__ == "__main__": for script execution');
      }
    }
    
    // Check for long functions
    const functionMatches = code.match(/(function\s+\w+|def\s+\w+|\w+\s*\([^)]*\)\s*{)/g) || [];
    functionMatches.forEach((match, index) => {
      const functionStart = code.indexOf(match);
      const functionLines = code.substring(functionStart).split('\n').slice(0, 20);
      if (functionLines.length > 15) {
        issues.push({
          type: 'info',
          line: code.substring(0, functionStart).split('\n').length,
          message: 'Function is quite long. Consider breaking it into smaller functions.',
          severity: 'low'
        });
        maintainability -= 10;
      }
    });
    
    // Check for comments
    const commentLines = lines.filter(line => 
      line.trim().startsWith('//') || 
      line.trim().startsWith('#') || 
      line.trim().startsWith('/*')
    );
    
    if (commentLines.length === 0 && codeLines.length > 10) {
      issues.push({
        type: 'info',
        line: 1,
        message: 'Consider adding comments to explain complex logic',
        severity: 'low'
      });
      maintainability -= 5;
    }

    // Generate suggestions based on language
    if (suggestions.length === 0) {
      suggestions.push('Code structure looks good! Consider adding unit tests.');
      suggestions.push('Think about error handling for edge cases.');
    }

    const overallScore = Math.round((maintainability + performance + security) / 3);

    return {
      overallScore,
      codeMetrics: {
        linesOfCode: codeLines.length,
        complexity,
        maintainability,
        performance,
        security,
        commentRatio: Math.round((commentLines.length / lines.length) * 100)
      },
      issues,
      suggestions,
      language,
      analyzedAt: new Date(),
      recommendations: generateRecommendations(overallScore, issues, language)
    };
  };

  const generateRecommendations = (score, issues, language) => {
    const recommendations = [];
    
    if (score < 70) {
      recommendations.push('Focus on improving code structure and readability');
      recommendations.push('Consider refactoring complex functions');
    } else if (score < 85) {
      recommendations.push('Good foundation! Add more error handling');
      recommendations.push('Consider performance optimizations');
    } else {
      recommendations.push('Excellent code quality!');
      recommendations.push('Consider adding comprehensive unit tests');
    }
    
    if (issues.length > 3) {
      recommendations.push('Address the identified issues to improve code quality');
    }
    
    // Language-specific recommendations
    const languageRecommendations = {
      javascript: ['Use modern ES6+ features', 'Consider using TypeScript for larger projects'],
      python: ['Follow PEP 8 style guidelines', 'Use virtual environments'],
      java: ['Follow Java naming conventions', 'Consider using design patterns'],
      cpp: ['Use RAII principles', 'Consider smart pointers for memory management']
    };
    
    if (languageRecommendations[language]) {
      recommendations.push(...languageRecommendations[language]);
    }
    
    return recommendations.slice(0, 4);
  };

  const downloadAnalysisReport = () => {
    if (!analysisResults) return;
    
    const report = `
Code Analysis Report
===================
Date: ${analysisResults.analyzedAt.toLocaleString()}
Language: ${analysisResults.language}
Overall Score: ${analysisResults.overallScore}/100

Code Metrics:
- Lines of Code: ${analysisResults.codeMetrics.linesOfCode}
- Complexity: ${analysisResults.codeMetrics.complexity}
- Maintainability: ${analysisResults.codeMetrics.maintainability}/100
- Performance: ${analysisResults.codeMetrics.performance}/100
- Security: ${analysisResults.codeMetrics.security}/100
- Comment Ratio: ${analysisResults.codeMetrics.commentRatio}%

Issues Found (${analysisResults.issues.length}):
${analysisResults.issues.map(issue => 
  `- Line ${issue.line}: ${issue.message} (${issue.severity})`
).join('\n')}

Suggestions:
${analysisResults.suggestions.map(suggestion => `- ${suggestion}`).join('\n')}

Recommendations:
${analysisResults.recommendations.map(rec => `- ${rec}`).join('\n')}
    `;
    
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code-analysis-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return '#28a745';
    if (score >= 70) return '#ffc107';
    return '#dc3545';
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <FaBug className="severity-icon high" />;
      case 'medium': return <FaExclamationTriangle className="severity-icon medium" />;
      case 'low': return <FaLightbulb className="severity-icon low" />;
      default: return <FaCheckCircle className="severity-icon info" />;
    }
  };

  return (
    <div className="code-analysis-engine">
      <div className="analysis-header">
        <div className="header-title">
          <FaCode className="header-icon" />
          <h2>Code Analysis Engine</h2>
        </div>
        <div className="language-selector">
          <label>Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            {Object.entries(supportedLanguages).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.icon} {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="analysis-workspace">
        <div className="code-input-section">
          <div className="input-header">
            <h3>Code Input</h3>
            <div className="input-actions">
              <button 
                onClick={() => setCode(codeExamples[language] || '')}
                className="example-btn"
              >
                Load Example
              </button>
              <button 
                onClick={analyzeCode}
                disabled={!code.trim() || isAnalyzing}
                className="analyze-btn"
              >
                {isAnalyzing ? (
                  <>Analyzing... <div className="spinner" /></>
                ) : (
                  <><FaPlay /> Analyze Code</>
                )}
              </button>
            </div>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={`Paste your ${supportedLanguages[language].name} code here...`}
            className="code-textarea"
            rows="20"
          />
        </div>

        <div className="analysis-results-section">
          {analysisResults ? (
            <div className="results-container">
              <div className="results-header">
                <h3>Analysis Results</h3>
                <button onClick={downloadAnalysisReport} className="download-btn">
                  <FaDownload /> Download Report
                </button>
              </div>

              <div className="score-overview">
                <div className="overall-score">
                  <div 
                    className="score-circle"
                    style={{ borderColor: getScoreColor(analysisResults.overallScore) }}
                  >
                    <span 
                      className="score-value"
                      style={{ color: getScoreColor(analysisResults.overallScore) }}
                    >
                      {analysisResults.overallScore}
                    </span>
                    <span className="score-label">Overall</span>
                  </div>
                </div>

                <div className="metrics-grid">
                  <div className="metric">
                    <span className="metric-label">Maintainability</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ 
                          width: `${analysisResults.codeMetrics.maintainability}%`,
                          backgroundColor: getScoreColor(analysisResults.codeMetrics.maintainability)
                        }}
                      />
                    </div>
                    <span className="metric-value">{analysisResults.codeMetrics.maintainability}%</span>
                  </div>
                  
                  <div className="metric">
                    <span className="metric-label">Performance</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ 
                          width: `${analysisResults.codeMetrics.performance}%`,
                          backgroundColor: getScoreColor(analysisResults.codeMetrics.performance)
                        }}
                      />
                    </div>
                    <span className="metric-value">{analysisResults.codeMetrics.performance}%</span>
                  </div>
                  
                  <div className="metric">
                    <span className="metric-label">Security</span>
                    <div className="metric-bar">
                      <div 
                        className="metric-fill"
                        style={{ 
                          width: `${analysisResults.codeMetrics.security}%`,
                          backgroundColor: getScoreColor(analysisResults.codeMetrics.security)
                        }}
                      />
                    </div>
                    <span className="metric-value">{analysisResults.codeMetrics.security}%</span>
                  </div>
                </div>
              </div>

              <div className="analysis-details">
                <div className="details-section">
                  <h4>Issues Found ({analysisResults.issues.length})</h4>
                  {analysisResults.issues.length > 0 ? (
                    <div className="issues-list">
                      {analysisResults.issues.map((issue, index) => (
                        <div key={index} className={`issue-item ${issue.severity}`}>
                          {getSeverityIcon(issue.severity)}
                          <div className="issue-content">
                            <span className="issue-message">{issue.message}</span>
                            <span className="issue-location">Line {issue.line}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-issues">
                      <FaCheckCircle className="success-icon" />
                      <span>No issues found! Great job!</span>
                    </div>
                  )}
                </div>

                <div className="details-section">
                  <h4>Suggestions</h4>
                  <ul className="suggestions-list">
                    {analysisResults.suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>

                <div className="details-section">
                  <h4>Recommendations</h4>
                  <ul className="recommendations-list">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-results">
              <FaChartBar className="no-results-icon" />
              <h3>Ready to Analyze</h3>
              <p>Paste your code and click "Analyze Code" to get detailed insights about code quality, performance, and best practices.</p>
            </div>
          )}
        </div>
      </div>

      {analysisHistory.length > 0 && (
        <div className="analysis-history">
          <h4>Recent Analyses</h4>
          <div className="history-list">
            {analysisHistory.map((entry) => (
              <div key={entry.id} className="history-item">
                <div className="history-info">
                  <span className="history-language">
                    {supportedLanguages[entry.language].icon} {supportedLanguages[entry.language].name}
                  </span>
                  <span className="history-code">{entry.code}</span>
                  <span className="history-timestamp">{entry.timestamp.toLocaleString()}</span>
                </div>
                <div className="history-stats">
                  <span className={`history-score ${entry.score >= 85 ? 'good' : entry.score >= 70 ? 'average' : 'poor'}`}>
                    {entry.score}
                  </span>
                  <span className="history-issues">{entry.issues} issues</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeAnalysisEngine;