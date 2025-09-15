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
    
    // General code quality checks
    const longLines = lines.filter(line => line.length > 120);
    if (longLines.length > 0) {
      issues.push({
        type: 'suggestion',
        line: lines.indexOf(longLines[0]) + 1,
        message: 'Consider breaking long lines for better readability',
        severity: 'low'
      });
    }

    // Calculate overall score
    const baseScore = 100;
    const issueDeduction = issues.length * 5;
    const overallScore = Math.max(baseScore - issueDeduction, 0);

    return {
      overallScore,
      metrics: {
        linesOfCode: codeLines.length,
        complexity,
        maintainability,
        performance,
        security
      },
      issues,
      suggestions
    };
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 50) return 'score-fair';
    return 'score-poor';
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <FaBug className="issue-critical" />;
      case 'medium': return <FaExclamationTriangle className="issue-warning" />;
      case 'low': return <FaLightbulb className="issue-suggestion" />;
      default: return <FaCheckCircle />;
    }
  };

  return (
    <div className="code-analysis-engine">
      <div className="analysis-header">
        <h1><FaCode /> Code Analysis Engine</h1>
        <p>Analyze your code for quality, performance, and best practices</p>
      </div>

      <div className="analysis-controls">
        <div className="language-selector">
          <label>Programming Language:</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.entries(supportedLanguages).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.icon} {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className="analyze-button" 
          onClick={analyzeCode}
          disabled={isAnalyzing || !code.trim()}
        >
          {isAnalyzing ? <FaPlay className="spinning" /> : <FaChartBar />}
          {isAnalyzing ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </div>

      <div className="code-input-section">
        <h3>Code Input</h3>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your ${supportedLanguages[language].name} code here...`}
          className="code-textarea"
        />
      </div>

      {isAnalyzing && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Analyzing your code...</p>
        </div>
      )}

      {analysisResults && !isAnalyzing && (
        <>
          <div className="results-section">
            <div className="metrics-card">
              <h3><FaChartBar /> Code Metrics</h3>
              <div className="metric-item">
                <span className="metric-label">Overall Score</span>
                <span className="metric-value">{analysisResults.overallScore}/100</span>
                <div className="score-bar">
                  <div 
                    className={`score-fill ${getScoreColor(analysisResults.overallScore)}`}
                    style={{ width: `${analysisResults.overallScore}%` }}
                  />
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Lines of Code</span>
                <span className="metric-value">{analysisResults.metrics.linesOfCode}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Complexity</span>
                <span className="metric-value">{analysisResults.metrics.complexity}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Maintainability</span>
                <span className="metric-value">{analysisResults.metrics.maintainability}%</span>
                <div className="score-bar">
                  <div 
                    className={`score-fill ${getScoreColor(analysisResults.metrics.maintainability)}`}
                    style={{ width: `${analysisResults.metrics.maintainability}%` }}
                  />
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Performance</span>
                <span className="metric-value">{analysisResults.metrics.performance}%</span>
                <div className="score-bar">
                  <div 
                    className={`score-fill ${getScoreColor(analysisResults.metrics.performance)}`}
                    style={{ width: `${analysisResults.metrics.performance}%` }}
                  />
                </div>
              </div>
              <div className="metric-item">
                <span className="metric-label">Security</span>
                <span className="metric-value">{analysisResults.metrics.security}%</span>
                <div className="score-bar">
                  <div 
                    className={`score-fill ${getScoreColor(analysisResults.metrics.security)}`}
                    style={{ width: `${analysisResults.metrics.security}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="issues-card">
              <h3><FaBug /> Issues Found ({analysisResults.issues.length})</h3>
              <div className="issues-list">
                {analysisResults.issues.length > 0 ? (
                  analysisResults.issues.map((issue, index) => (
                    <div key={index} className={`issue-item issue-${issue.severity}`}>
                      <div className="issue-header">
                        <span className="issue-type">
                          {getSeverityIcon(issue.severity)}
                          {issue.type.toUpperCase()}
                        </span>
                        <span className="issue-line">Line {issue.line}</span>
                      </div>
                      <div className="issue-message">{issue.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="no-issues">
                    <FaCheckCircle className="success-icon" />
                    <p>Great! No issues found in your code.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {analysisResults.suggestions.length > 0 && (
            <div className="recommendations-section">
              <h3><FaLightbulb /> Recommendations</h3>
              {analysisResults.suggestions.map((suggestion, index) => (
                <div key={index} className="recommendation-item">
                  <div className="recommendation-title">Improvement Suggestion</div>
                  <div className="recommendation-description">{suggestion}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {!analysisResults && !isAnalyzing && (
        <div className="no-results">
          <FaCode className="placeholder-icon" />
          <p>Enter your code above and click "Analyze Code" to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CodeAnalysisEngine;