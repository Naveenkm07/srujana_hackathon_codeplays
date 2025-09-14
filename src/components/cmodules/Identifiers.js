import React from 'react';
import './Identifiers.css';

function Identifiers({ onBackClick }) {
  return (
    <div className="identifiers-container">
      <div className="identifiers-content">
        <div className="page-header">
          <h1 className="page-title">C++ Identifiers</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="intro-section">
            <h2 className="section-title">What are Identifiers?</h2>
            <p className="concept-text">
              Identifiers are names you give to variables, functions, and other elements in your C++ program. 
              Think of them as labels on boxes - they help you identify and use different parts of your code.
            </p>
          </div>

          <div className="intro-section">
            <h2 className="section-title">Rules for Identifiers</h2>
            <div className="rules-grid">
              <div className="rule-card valid-rule">
                <div className="rule-icon">✅</div>
                <h3>Start with letter or underscore</h3>
                <p>myVariable, _count, age</p>
              </div>
              <div className="rule-card valid-rule">
                <div className="rule-icon">✅</div>
                <h3>Use letters, digits, underscores</h3>
                <p>student1, total_score, MAX_SIZE</p>
              </div>
              <div className="rule-card invalid-rule">
                <div className="rule-icon">❌</div>
                <h3>Cannot start with digits</h3>
                <p>2ndPlace, 3D_model</p>
              </div>
              <div className="rule-card invalid-rule">
                <div className="rule-icon">❌</div>
                <h3>Cannot use keywords</h3>
                <p>int, if, while, class</p>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Interactive Example
            </h2>
            <p className="code-description">
              Let's see identifiers in action:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    // These are all identifiers:
    int age = 18;           // 'age' is an identifier
    string name = "John";   // 'name' is an identifier
    double height = 5.9;    // 'height' is an identifier
    
    cout << "Name: " << name << endl;
    cout << "Age: " << age << endl;
    cout << "Height: " << height << " feet" << endl;
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>In this example:</strong></p>
              <ul>
                <li>🎯 <code>age</code> - stores a person's age</li>
                <li>🎯 <code>name</code> - stores a person's name</li>
                <li>🎯 <code>height</code> - stores a person's height</li>
                <li>💡 All these names are identifiers that we chose!</li>
              </ul>
            </div>
          </div>

          <div className="intro-section">
            <h2 className="section-title">Practice Challenge</h2>
            <div className="challenge-section">
              <p className="challenge-text">
                Can you identify which of these are valid identifiers?
              </p>
              <div className="quiz-grid">
                <div className="quiz-item">
                  <code>myVariable</code>
                  <span className="quiz-answer correct">✅ Valid</span>
                </div>
                <div className="quiz-item">
                  <code>2ndPlace</code>
                  <span className="quiz-answer incorrect">❌ Invalid</span>
                </div>
                <div className="quiz-item">
                  <code>_count</code>
                  <span className="quiz-answer correct">✅ Valid</span>
                </div>
                <div className="quiz-item">
                  <code>int</code>
                  <span className="quiz-answer incorrect">❌ Invalid</span>
                </div>
                <div className="quiz-item">
                  <code>student1</code>
                  <span className="quiz-answer correct">✅ Valid</span>
                </div>
                <div className="quiz-item">
                  <code>total$</code>
                  <span className="quiz-answer incorrect">❌ Invalid</span>
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
              Create identifiers for a program that stores information about a car:
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Think about what information a car might have (color, model, year, etc.)
            </div>
            <div className="example-solution">
              <strong>Example identifiers:</strong>
              <div className="code-block">
                <pre className="code">
{`string carColor = "Red";
string carModel = "Toyota";
int carYear = 2020;
double carPrice = 25000.50;`}
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

export default Identifiers;
