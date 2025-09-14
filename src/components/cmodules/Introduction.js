import React, { useState } from 'react';
import './Introduction.css';

function Introduction({ onBackClick }) {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`);
  const [showEditor, setShowEditor] = useState(true);
  const [output, setOutput] = useState('');

  const runCode = () => {
    // Simulate code execution for demo purposes
    if (code.includes('cout <<')) {
      const match = code.match(/cout\s*<<\s*"([^"]*)"[^;]*;/);
      if (match) {
        setOutput(match[1]);
      } else {
        setOutput('Hello, World!');
      }
    } else {
      setOutput('Error: cout statement not found');
    }
  };

  return (
    <div className="introduction-container">
      <div className="introduction-content">
        <div className="page-header">
          <h1 className="page-title">C++ Introduction</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="intro-section">
            <h2 className="section-title">What is C++?</h2>
            <p className="concept-text">
              C++ is a powerful programming language that helps you create computer programs. 
              Think of it like a recipe book that tells the computer exactly what to do, step by step.
            </p>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Your First C++ Program
            </h2>
            <p className="code-description">
              Let's write our first program and see how C++ works:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!";
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this does:</strong></p>
              <ul>
                <li>📖 <code>#include &lt;iostream&gt;</code> - Tells C++ we want to print text</li>
                <li>🎯 <code>int main()</code> - This is where our program starts</li>
                <li>💬 <code>cout &lt;&lt; "Hello, World!"</code> - Prints "Hello, World!" on screen</li>
                <li>✅ <code>return 0;</code> - Tells the computer "everything worked fine!"</li>
              </ul>
            </div>
          </div>

          <div className="try-section">
            <h2 className="try-title">
              <span className="try-icon">🚀</span>
              Try It Yourself!
            </h2>
            <p className="try-description">
              Can you modify the program to print your name instead of "Hello, World!"?
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Replace "Hello, World!" with your name in quotes
            </div>
            <div className="example-solution">
              <strong>Example:</strong>
              <div className="code-block">
                <pre className="code">
{`cout << "My name is John!";`}
                </pre>
              </div>
            </div>
            <button className="try-button" onClick={() => setShowEditor(!showEditor)}>
              {showEditor ? 'Hide Editor' : 'Try It Now!'}
            </button>
            
            {showEditor && (
              <div className="code-editor-section">
                <div className="editor-container">
                  <h4>Edit Your Code:</h4>
                  <textarea
                    className="code-editor"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="8"
                    cols="50"
                  />
                  <div className="editor-controls">
                    <button className="run-button" onClick={runCode}>
                      ▶ Run Code
                    </button>
                  </div>
                </div>
                
                <div className="output-container">
                  <h4>Output:</h4>
                  <div className="output-display">
                    {output || 'Click "Run Code" to see output'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
