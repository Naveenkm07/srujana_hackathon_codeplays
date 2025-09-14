import React from 'react';
import './PythonIntroduction.css';

function PythonIntroduction({ onBackClick }) {
  return (
    <div className="python-intro-container">
      <div className="python-intro-content">
        <div className="python-intro-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-intro-title">Python Introduction</h1>
        </div>

        <div className="python-intro-section">
          <div className="section-content">
            <span className="section-icon">🐍</span>
            <h2 className="section-title">What is Python?</h2>
            <p className="section-text">
              Python is a high-level, interpreted programming language known for its simplicity and readability. 
              It's like writing in plain English, making it perfect for beginners and professionals alike.
            </p>
          </div>
        </div>

        <div className="python-intro-section">
          <div className="section-content">
            <span className="section-icon">🚀</span>
            <h2 className="section-title">Why Learn Python?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <span className="feature-icon">📖</span>
                <h3 className="feature-title">Easy to Learn</h3>
                <p className="feature-desc">Simple syntax that reads like English</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🌐</span>
                <h3 className="feature-title">Versatile</h3>
                <p className="feature-desc">Web apps, data science, AI, automation</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">💼</span>
                <h3 className="feature-title">High Demand</h3>
                <p className="feature-desc">One of the most sought-after skills</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">📚</span>
                <h3 className="feature-title">Rich Libraries</h3>
                <p className="feature-desc">Extensive library ecosystem</p>
              </div>
            </div>
          </div>
        </div>

        <div className="python-intro-section">
          <div className="section-content">
            <span className="section-icon">💻</span>
            <h2 className="section-title">Your First Python Program</h2>
            <p className="section-text">
              Let's write a simple "Hello, World!" program to get you started:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Python Code</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># This is a comment in Python</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-string">"Hello, World!"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Variables are easy to create</span><br/>
                  name = <span className="code-string">"Python Learner"</span><br/>
                  age = <span className="code-number">25</span><br/>
                  <br/>
                  <span className="code-comment"># Print with variables</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Hi name, you are age years old!"</span>)
                </code>
              </div>
            </div>

            <div className="code-explanation">
              <h3 className="explanation-title">What it does:</h3>
              <ul className="explanation-list">
                <li><strong>Comments:</strong> Lines starting with # are comments (ignored by Python)</li>
                <li><strong>print():</strong> Displays text on the screen</li>
                <li><strong>Variables:</strong> Store data (name, age) without declaring types</li>
                <li><strong>f-strings:</strong> Easy way to insert variables into text</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="python-intro-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Personal Greeting</h3>
                <p className="challenge-desc">
                  Create a program that asks for your name and age, then greets you personally.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use input() to get user input and print() to display the result</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      name = input("What's your name? ")<br/>
                      age = input("How old are you? ")<br/>
                      print(f"Nice to meet you, name! You are age years old.")
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PythonIntroduction;
