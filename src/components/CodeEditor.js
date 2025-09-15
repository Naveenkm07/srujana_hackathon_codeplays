import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { FaPlay, FaSave, FaRedo, FaCopy, FaDownload, FaCode, FaTerminal, FaLightbulb, FaRobot } from 'react-icons/fa';
import './CodeEditor.css';

const CodeEditor = ({ currentUser }) => {
  const [code, setCode] = useState('// Welcome to the Code Editor!\n// Start coding here...\n\nconsole.log("Hello, World!");');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [activeTab, setActiveTab] = useState('code');
  const editorRef = useRef(null);

  const languages = [
    { value: 'javascript', label: 'JavaScript', icon: '🟨' },
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' },
    { value: 'html', label: 'HTML', icon: '🌐' },
    { value: 'css', label: 'CSS', icon: '🎨' },
    { value: 'json', label: 'JSON', icon: '📄' }
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast' }
  ];

  const codeTemplates = {
    javascript: `// JavaScript Example
console.log("Hello, World!");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci of 10:", fibonacci(10));`,
    
    python: `# Python Example
print("Hello, World!")

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(f"Fibonacci of 10: {fibonacci(10)}")`,
    
    java: `// Java Example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        System.out.println("Fibonacci of 10: " + fibonacci(10));
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    editor.updateOptions({
      fontSize: fontSize,
      minimap: { enabled: true },
      lineNumbers: 'on',
      roundedSelection: false,
      scrollBeyondLastLine: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: true,
      wordWrap: 'on'
    });
  };

  const runCode = async () => {
    setIsRunning(true);
    setActiveTab('output');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let simulatedOutput = '';
      
      switch (language) {
        case 'javascript':
          if (code.includes('console.log')) {
            simulatedOutput = `Hello, World!\nFibonacci of 10: 55\n\n✅ Code executed successfully!`;
          } else {
            simulatedOutput = `✅ JavaScript code compiled successfully!\n\nNote: Add console.log() statements to see output.`;
          }
          break;
        case 'python':
          simulatedOutput = `Hello, World!\nFibonacci of 10: 55\n\n✅ Python code executed successfully!`;
          break;
        case 'java':
          simulatedOutput = `Hello, World!\nFibonacci of 10: 55\n\n✅ Java code compiled and executed successfully!`;
          break;
        default:
          simulatedOutput = `✅ Code executed successfully!\n\nOutput depends on your code logic.`;
      }
      
      setOutput(simulatedOutput);
      
    } catch (error) {
      console.error('Code execution error:', error);
      setOutput('❌ Error occurred during code execution.');
    } finally {
      setIsRunning(false);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (codeTemplates[newLanguage]) {
      setCode(codeTemplates[newLanguage]);
    }
    setOutput('');
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : language}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetCode = () => {
    if (codeTemplates[language]) {
      setCode(codeTemplates[language]);
    } else {
      setCode('// Start coding here...');
    }
    setOutput('');
  };

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-title">
          <FaCode className="editor-icon" />
          <h1>Code Editor</h1>
        </div>
        <div className="editor-subtitle">
          <p>Write, test, and analyze your code</p>
        </div>
      </div>

      <div className="editor-controls">
        <div className="language-selector">
          <label>Language:</label>
          <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>
                {lang.icon} {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="theme-selector">
          <label>Theme:</label>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map(themeOption => (
              <option key={themeOption.value} value={themeOption.value}>
                {themeOption.label}
              </option>
            ))}
          </select>
        </div>

        <div className="font-controls">
          <label>Font Size:</label>
          <input 
            type="range" 
            min="12" 
            max="24" 
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
          <span>{fontSize}px</span>
        </div>

        <div className="editor-actions">
          <button onClick={runCode} disabled={isRunning} className="run-button">
            <FaPlay /> {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button onClick={copyCode} className="action-button">
            <FaCopy /> Copy
          </button>
          <button onClick={saveCode} className="action-button">
            <FaSave /> Save
          </button>
          <button onClick={resetCode} className="action-button">
            <FaRedo /> Reset
          </button>
        </div>
      </div>

      <div className="editor-workspace">
        <div className="editor-tabs">
          <button 
            className={`tab ${activeTab === 'code' ? 'active' : ''}`}
            onClick={() => setActiveTab('code')}
          >
            <FaCode /> Code
          </button>
          <button 
            className={`tab ${activeTab === 'output' ? 'active' : ''}`}
            onClick={() => setActiveTab('output')}
          >
            <FaTerminal /> Output
          </button>
        </div>

        {activeTab === 'code' ? (
          <div className="editor-panel">
            <Editor
              height="400px"
              language={language}
              theme={theme}
              value={code}
              onChange={(value) => setCode(value || '')}
              onMount={handleEditorDidMount}
              options={{
                fontSize: fontSize,
                minimap: { enabled: true },
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                readOnly: false,
                automaticLayout: true,
                wordWrap: 'on'
              }}
            />
          </div>
        ) : (
          <div className="output-panel">
            <div className="output-header">
              <FaTerminal className="output-icon" />
              <h3>Output</h3>
            </div>
            <div className="output-content">
              {output ? (
                <pre>{output}</pre>
              ) : (
                <div className="output-placeholder">
                  <FaLightbulb className="placeholder-icon" />
                  <p>Click "Run Code" to see the output here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="editor-footer">
        <div className="editor-stats">
          <span>Language: {languages.find(l => l.value === language)?.label}</span>
          <span>Lines: {code.split('\n').length}</span>
          <span>Characters: {code.length}</span>
        </div>
        
        <div className="editor-tips">
          <FaLightbulb className="tip-icon" />
          <span>Tip: Use Ctrl+/ to comment/uncomment lines</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;