import React from 'react';
import './BasicInputOutput.css';

function BasicInputOutput({ onBackClick }) {
  return (
    <div className="inputoutput-container">
      <div className="inputoutput-content">
        <div className="page-header">
          <h1 className="page-title">C++ Basic Input/Output</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="inputoutput-section">
            <h2 className="section-title">
              <span className="section-icon">💬</span>
              What is Input/Output?
            </h2>
            <p className="section-description">
              Input/Output (I/O) is how your program communicates with the user. Input means getting data 
              FROM the user (like typing on keyboard), and Output means sending data TO the user (like 
              displaying text on screen). It's like having a conversation with your program!
            </p>
          </div>

          <div className="streams-section">
            <h2 className="section-title">
              <span className="section-icon">🌊</span>
              Input/Output Streams
            </h2>
            <div className="streams-grid">
              <div className="stream-card">
                <div className="stream-icon">📤</div>
                <h3 className="stream-title">cout (Output Stream)</h3>
                <p className="stream-desc">Displays data on the screen</p>
                <div className="stream-example">
                  <code>cout &lt;&lt; "Hello World!";</code>
                </div>
                <div className="stream-features">
                  <span className="feature-tag">Display text</span>
                  <span className="feature-tag">Show variables</span>
                  <span className="feature-tag">Format output</span>
                </div>
              </div>

              <div className="stream-card">
                <div className="stream-icon">📥</div>
                <h3 className="stream-title">cin (Input Stream)</h3>
                <p className="stream-desc">Gets data from the user</p>
                <div className="stream-example">
                  <code>cin &gt;&gt; variableName;</code>
                </div>
                <div className="stream-features">
                  <span className="feature-tag">Read text</span>
                  <span className="feature-tag">Get numbers</span>
                  <span className="feature-tag">Store in variables</span>
                </div>
              </div>

              <div className="stream-card">
                <div className="stream-icon">📝</div>
                <h3 className="stream-title">endl (End Line)</h3>
                <p className="stream-desc">Moves to next line</p>
                <div className="stream-example">
                  <code>cout &lt;&lt; "Line 1" &lt;&lt; endl;</code>
                </div>
                <div className="stream-features">
                  <span className="feature-tag">New line</span>
                  <span className="feature-tag">Clear buffer</span>
                  <span className="feature-tag">Better formatting</span>
                </div>
              </div>
            </div>
          </div>

          <div className="examples-section">
            <h2 className="section-title">
              <span className="section-icon">📋</span>
              Common I/O Patterns
            </h2>
            <div className="patterns-grid">
              <div className="pattern-card">
                <h3 className="pattern-title">Simple Output</h3>
                <div className="pattern-code">
                  <code>cout &lt;&lt; "Hello World!";</code>
                </div>
                <div className="pattern-output">
                  <strong>Output:</strong> Hello World!
                </div>
              </div>

              <div className="pattern-card">
                <h3 className="pattern-title">Output with Variables</h3>
                <div className="pattern-code">
                  <code>int age = 25;<br/>cout &lt;&lt; "Age: " &lt;&lt; age;</code>
                </div>
                <div className="pattern-output">
                  <strong>Output:</strong> Age: 25
                </div>
              </div>

              <div className="pattern-card">
                <h3 className="pattern-title">Multiple Outputs</h3>
                <div className="pattern-code">
                  <code>cout &lt;&lt; "Name: " &lt;&lt; name &lt;&lt; endl;</code>
                </div>
                <div className="pattern-output">
                  <strong>Output:</strong> Name: John<br/>(on new line)
                </div>
              </div>

              <div className="pattern-card">
                <h3 className="pattern-title">Simple Input</h3>
                <div className="pattern-code">
                  <code>int number;<br/>cin &gt;&gt; number;</code>
                </div>
                <div className="pattern-output">
                  <strong>Input:</strong> User types a number
                </div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Complete I/O Program
            </h2>
            <p className="code-description">
              Let's see how input and output work together in a real program:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    // Declare variables
    string name;
    int age;
    float height;
    
    // Get input from user
    cout << "Enter your name: ";
    cin >> name;
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Enter your height (in feet): ";
    cin >> height;
    
    // Display the information
    cout << endl << "=== Your Information ===" << endl;
    cout << "Name: " << name << endl;
    cout << "Age: " << age << " years old" << endl;
    cout << "Height: " << height << " feet" << endl;
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this program does:</strong></p>
              <ul>
                <li>🎯 <code>cout &lt;&lt; "Enter your name: ";</code> - Prompts user for input</li>
                <li>🎯 <code>cin &gt;&gt; name;</code> - Reads user input and stores in variable</li>
                <li>🎯 <code>cout &lt;&lt; endl;</code> - Moves to next line for better formatting</li>
                <li>🎯 <code>cout &lt;&lt; "Name: " &lt;&lt; name &lt;&lt; endl;</code> - Displays variable value</li>
                <li>🎯 Multiple inputs and outputs create an interactive program</li>
              </ul>
            </div>
          </div>

          <div className="tips-section">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              Important Tips
            </h2>
            <div className="tips-list">
              <div className="tip-item">
                <div className="tip-icon">⚠️</div>
                <div className="tip-content">
                  <strong>Always include &lt;iostream&gt;</strong> - This header is required for cout and cin
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">📝</div>
                <div className="tip-content">
                  <strong>Use meaningful prompts</strong> - Tell users what to enter: "Enter your age: "
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🔄</div>
                <div className="tip-content">
                  <strong>cin stops at spaces</strong> - For full names, use getline() instead of cin
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">✨</div>
                <div className="tip-content">
                  <strong>Use endl for new lines</strong> - Makes output cleaner and more readable
                </div>
              </div>
            </div>
          </div>

          <div className="challenge-section">
            <h2 className="challenge-title">
              <span className="challenge-icon">🎯</span>
              Try It Yourself!
            </h2>
            <p className="challenge-description">
              Create a program that asks for a student's name, grade, and favorite subject, then displays them nicely formatted.
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> You'll need string variables for name and subject, int for grade, and multiple cout/cin statements
            </div>
            <div className="example-solution">
              <strong>Expected output format:</strong>
              <div className="code-block">
                <pre className="code">
{`=== Student Information ===
Name: Alice
Grade: 95
Favorite Subject: Math`}
                </pre>
              </div>
            </div>
            <button className="challenge-button">Try It Now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInputOutput;
