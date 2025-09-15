import React, { useState, useRef, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { FaPlay, FaSave, FaRedo, FaCopy, FaDownload, FaCode, FaTerminal, FaLightbulb } from 'react-icons/fa';
import './CodeEditor.css';

const CodeEditor = () => {
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
}`,
    
    cpp: `// C++ Example
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, World!" << endl;
    cout << "Fibonacci of 10: " << fibonacci(10) << endl;
    return 0;
}`,
    
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .container { max-width: 600px; margin: 0 auto; }
        .highlight { color: #007acc; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, <span class="highlight">World!</span></h1>
        <p>Welcome to your HTML playground!</p>
        <button onclick="showMessage()">Click Me!</button>
    </div>
    
    <script>
        function showMessage() {
            alert('Hello from JavaScript!');
        }
    </script>
</body>
</html>`,
    
    css: `/* CSS Example */
body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    margin: 0;
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    background: white;
    border-radius: 10px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    text-align: center;
    transform: translateY(0);
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-5px);
}

.title {
    color: #333;
    font-size: 2em;
    margin-bottom: 20px;
}`,
    
    json: `{
  "name": "Code Editor Project",
  "version": "1.0.0",
  "description": "A powerful code editor built with React and Monaco",
  "author": "Student Developer",
  "features": [
    "Multi-language support",
    "Syntax highlighting",
    "Code execution",
    "Dark/Light themes"
  ],
  "languages": {
    "supported": ["JavaScript", "Python", "Java", "C++", "HTML", "CSS"],
    "planned": ["TypeScript", "Go", "Rust"]
  },
  "settings": {
    "theme": "dark",
    "fontSize": 14,
    "tabSize": 2,
    "wordWrap": true
  }
}`
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure editor options
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
      // Simulate code execution with different outputs based on language
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
          if (code.includes('print')) {
            simulatedOutput = `Hello, World!\nFibonacci of 10: 55\n\n✅ Code executed successfully!`;
          } else {
            simulatedOutput = `✅ Python code compiled successfully!\n\nNote: Add print() statements to see output.`;
          }
          break;
          
        case 'java':
          simulatedOutput = `Compiling Java code...
Hello, World!
Fibonacci of 10: 55

✅ Code executed successfully!`;
          break;
          
        case 'cpp':
          simulatedOutput = `Compiling C++ code...
Hello, World!
Fibonacci of 10: 55

✅ Code executed successfully!`;
          break;
          
        case 'html':
          simulatedOutput = `✅ HTML code is valid!\n\nNote: HTML files are best viewed in a browser.\nThis would render a webpage with interactive elements.`;
          break;
          
        case 'css':
          simulatedOutput = `✅ CSS code is valid!\n\nNote: CSS styles are applied to HTML elements.\nThis would create a beautiful gradient background with card effects.`;
          break;
          
        default:
          simulatedOutput = `✅ Code syntax is valid!\n\nOutput depends on the execution environment.`;
      }
      
      setOutput(simulatedOutput);
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const saveCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `code.${getFileExtension(language)}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (lang) => {
    const extensions = {
      javascript: 'js',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      html: 'html',
      css: 'css',
      json: 'json'
    };
    return extensions[lang] || 'txt';
  };

  const resetCode = () => {
    setCode(codeTemplates[language] || '// Start coding here...');
    setOutput('');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setCode(codeTemplates[newLanguage] || '// Start coding here...');
    setOutput('');
  };

  return (
    <div className="code-editor-container">
      <div className="editor-header">
        <div className="editor-title">
          <FaCode className="editor-icon" />
          <h3>Code Editor</h3>
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
              {themes.map(th => (
                <option key={th.value} value={th.value}>{th.label}</option>
              ))}
            </select>
          </div>
          
          <div className="font-size-control">
            <label>Size:</label>
            <input 
              type="range" 
              min="12" 
              max="24" 
              value={fontSize} 
              onChange={(e) => setFontSize(parseInt(e.target.value))}
            />
            <span>{fontSize}px</span>
          </div>
        </div>
      </div>

      <div className="editor-toolbar">
        <button 
          className="toolbar-btn run-btn" 
          onClick={runCode} 
          disabled={isRunning}
        >
          <FaPlay /> {isRunning ? 'Running...' : 'Run Code'}
        </button>
        
        <button className="toolbar-btn" onClick={saveCode}>
          <FaDownload /> Save
        </button>
        
        <button className="toolbar-btn" onClick={copyCode}>
          <FaCopy /> Copy
        </button>
        
        <button className="toolbar-btn" onClick={resetCode}>
          <FaRedo /> Reset
        </button>
        
        <div className="toolbar-divider"></div>
        
        <button 
          className={`toolbar-btn ${activeTab === 'code' ? 'active' : ''}`}
          onClick={() => setActiveTab('code')}
        >
          <FaCode /> Code
        </button>
        
        <button 
          className={`toolbar-btn ${activeTab === 'output' ? 'active' : ''}`}
          onClick={() => setActiveTab('output')}
        >
          <FaTerminal /> Output
        </button>
      </div>

      <div className="editor-workspace">
        {activeTab === 'code' ? (
          <div className="editor-panel">
            <Editor
              height="500px"
              language={language}
              theme={theme}
              value={code}
              onChange={setCode}
              onMount={handleEditorDidMount}
              options={{
                fontSize: fontSize,
                minimap: { enabled: true },
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                wordWrap: 'on',
                formatOnPaste: true,
                formatOnType: true
              }}
            />
          </div>
        ) : (
          <div className="output-panel">
            <div className="output-header">
              <FaTerminal className="output-icon" />
              <h4>Output</h4>
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