import React from 'react';
import './ConditionalStatements.css';

function ConditionalStatements({ onBackClick }) {
  return (
    <div className="conditional-container">
      <div className="conditional-content">
        <div className="page-header">
          <h1 className="page-title">C++ Conditional Statements</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="conditional-section">
            <h2 className="section-title">
              <span className="section-icon">🤔</span>
              What are Conditional Statements?
            </h2>
            <p className="section-description">
              Conditional statements help your program make decisions! They let you run different code 
              based on whether something is true or false. Think of it like choosing what to wear - 
              if it's raining, you wear a raincoat; if it's sunny, you wear sunglasses. Programs use 
              conditionals to react to different situations.
            </p>
          </div>

          <div className="types-section">
            <h2 className="section-title">
              <span className="section-icon">📚</span>
              Types of Conditionals
            </h2>
            <div className="types-grid">
              <div className="type-card">
                <div className="type-icon">❓</div>
                <h3 className="type-title">if Statement</h3>
                <p className="type-desc">Execute code if condition is true</p>
                <div className="type-syntax">
                  <code>if (condition) &#123; ... &#125;</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Single condition</span>
                  <span className="feature-tag">True/false check</span>
                  <span className="feature-tag">Basic decision</span>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">🔄</div>
                <h3 className="type-title">if-else Statement</h3>
                <p className="type-desc">Choose between two options</p>
                <div className="type-syntax">
                  <code>if (condition) &#123; ... &#125; else &#123; ... &#125;</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Two paths</span>
                  <span className="feature-tag">Either/or choice</span>
                  <span className="feature-tag">Complete decision</span>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">🌳</div>
                <h3 className="type-title">if-else if-else</h3>
                <p className="type-desc">Handle multiple conditions</p>
                <div className="type-syntax">
                  <code>if (condition1) &#123; ... &#125; else if (condition2) &#123; ... &#125; else &#123; ... &#125;</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Multiple checks</span>
                  <span className="feature-tag">Priority order</span>
                  <span className="feature-tag">Complex decisions</span>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">🔀</div>
                <h3 className="type-title">switch Statement</h3>
                <p className="type-desc">Choose from many options</p>
                <div className="type-syntax">
                  <code>switch (variable) &#123; case value1: ... break; &#125;</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Multiple cases</span>
                  <span className="feature-tag">Value matching</span>
                  <span className="feature-tag">Menu systems</span>
                </div>
              </div>
            </div>
          </div>

          <div className="examples-section">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              Conditional Examples
            </h2>
            <div className="examples-grid">
              <div className="example-card">
                <h3 className="example-title">if Statement - Age Check</h3>
                <div className="example-code">
                  <pre className="code">
{`int age = 18;
if (age >= 18) {
    cout << "You are an adult!" << endl;
}`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> "You are an adult!" (if age is 18 or more)
                </div>
              </div>

              <div className="example-card">
                <h3 className="example-title">if-else - Pass/Fail</h3>
                <div className="example-code">
                  <pre className="code">
{`int grade = 85;
if (grade >= 60) {
    cout << "You passed!" << endl;
} else {
    cout << "You failed!" << endl;
}`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> "You passed!" or "You failed!" based on grade
                </div>
              </div>

              <div className="example-card">
                <h3 className="example-title">if-else if - Grade Letter</h3>
                <div className="example-code">
                  <pre className="code">
{`int score = 87;
if (score >= 90) {
    cout << "A" << endl;
} else if (score >= 80) {
    cout << "B" << endl;
} else if (score >= 70) {
    cout << "C" << endl;
} else {
    cout << "F" << endl;
}`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> "B" (based on score range)
                </div>
              </div>

              <div className="example-card">
                <h3 className="example-title">switch - Day of Week</h3>
                <div className="example-code">
                  <pre className="code">
{`int day = 3;
switch (day) {
    case 1: cout << "Monday"; break;
    case 2: cout << "Tuesday"; break;
    case 3: cout << "Wednesday"; break;
    default: cout << "Invalid day";
}`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> "Wednesday"
                </div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Complete Conditional Program
            </h2>
            <p className="code-description">
              Let's see how different conditional statements work together in a real program:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    int age, grade;
    char choice;
    
    cout << "Enter your age: ";
    cin >> age;
    
    // if statement - age check
    if (age >= 18) {
        cout << "You are eligible to vote!" << endl;
    }
    
    cout << "Enter your grade (0-100): ";
    cin >> grade;
    
    // if-else if-else - grade classification
    if (grade >= 90) {
        cout << "Excellent! Grade: A" << endl;
    } else if (grade >= 80) {
        cout << "Good! Grade: B" << endl;
    } else if (grade >= 70) {
        cout << "Average. Grade: C" << endl;
    } else if (grade >= 60) {
        cout << "Below average. Grade: D" << endl;
    } else {
        cout << "Failed. Grade: F" << endl;
    }
    
    // switch statement - menu choice
    cout << "Choose an option (a/b/c): ";
    cin >> choice;
    
    switch (choice) {
        case 'a':
            cout << "You chose option A" << endl;
            break;
        case 'b':
            cout << "You chose option B" << endl;
            break;
        case 'c':
            cout << "You chose option C" << endl;
            break;
        default:
            cout << "Invalid choice!" << endl;
    }
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this program demonstrates:</strong></p>
              <ul>
                <li>🎯 <code>if (age >= 18)</code> - Simple condition check</li>
                <li>🎯 <code>if-else if-else</code> - Multiple grade ranges with priority</li>
                <li>🎯 <code>switch (choice)</code> - Menu selection with cases</li>
                <li>🎯 <code>break;</code> - Exit switch statement after case</li>
                <li>🎯 <code>default:</code> - Handle unexpected values</li>
              </ul>
            </div>
          </div>

          <div className="tips-section">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              Conditional Tips & Tricks
            </h2>
            <div className="tips-list">
              <div className="tip-item">
                <div className="tip-icon">⚠️</div>
                <div className="tip-content">
                  <strong>Always use braces &#123;&#125;</strong> - Even for single statements, braces make code clearer and prevent bugs
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🔢</div>
                <div className="tip-content">
                  <strong>Order matters in if-else if</strong> - Put the most specific conditions first, general ones last
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🔀</div>
                <div className="tip-content">
                  <strong>Don't forget break in switch</strong> - Without break, execution "falls through" to the next case
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🎯</div>
                <div className="tip-content">
                  <strong>Use meaningful conditions</strong> - Write conditions that clearly express what you're checking
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
              Create a program that asks for a temperature and tells the user what to wear based on the weather.
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Use if-else if statements to check temperature ranges and suggest appropriate clothing
            </div>
            <div className="example-solution">
              <strong>Expected output for different temperatures:</strong>
              <div className="code-block">
                <pre className="code">
{`Temperature: 35°C
Output: "It's hot! Wear light clothes and sunscreen."

Temperature: 20°C
Output: "Nice weather! Wear comfortable clothes."

Temperature: 5°C
Output: "It's cold! Wear a jacket and warm clothes."`}
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

export default ConditionalStatements;
