import React from 'react';
import './Operators.css';

function Operators({ onBackClick }) {
  return (
    <div className="operators-container">
      <div className="operators-content">
        <div className="page-header">
          <h1 className="page-title">C++ Operators</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="operators-section">
            <h2 className="section-title">
              <span className="section-icon">⚡</span>
              What are Operators?
            </h2>
            <p className="section-description">
              Operators are special symbols that perform operations on variables and values. Think of them as 
              tools that help you do math, compare things, and make decisions in your program. They're like 
              the verbs in programming - they "do" something with your data.
            </p>
          </div>

          <div className="categories-section">
            <h2 className="section-title">
              <span className="section-icon">📚</span>
              Types of Operators
            </h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-icon">➕</div>
                <h3 className="category-title">Arithmetic</h3>
                <p className="category-desc">Basic math operations</p>
                <div className="operators-list">
                  <div className="operator-item">
                    <code>+</code>
                    <span className="operator-desc">Addition</span>
                  </div>
                  <div className="operator-item">
                    <code>-</code>
                    <span className="operator-desc">Subtraction</span>
                  </div>
                  <div className="operator-item">
                    <code>*</code>
                    <span className="operator-desc">Multiplication</span>
                  </div>
                  <div className="operator-item">
                    <code>/</code>
                    <span className="operator-desc">Division</span>
                  </div>
                  <div className="operator-item">
                    <code>%</code>
                    <span className="operator-desc">Modulus (remainder)</span>
                  </div>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">🔍</div>
                <h3 className="category-title">Comparison</h3>
                <p className="category-desc">Compare values</p>
                <div className="operators-list">
                  <div className="operator-item">
                    <code>==</code>
                    <span className="operator-desc">Equal to</span>
                  </div>
                  <div className="operator-item">
                    <code>!=</code>
                    <span className="operator-desc">Not equal to</span>
                  </div>
                  <div className="operator-item">
                    <code>&gt;</code>
                    <span className="operator-desc">Greater than</span>
                  </div>
                  <div className="operator-item">
                    <code>&lt;</code>
                    <span className="operator-desc">Less than</span>
                  </div>
                  <div className="operator-item">
                    <code>&gt;=</code>
                    <span className="operator-desc">Greater or equal</span>
                  </div>
                  <div className="operator-item">
                    <code>&lt;=</code>
                    <span className="operator-desc">Less or equal</span>
                  </div>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">🔧</div>
                <h3 className="category-title">Assignment</h3>
                <p className="category-desc">Store values</p>
                <div className="operators-list">
                  <div className="operator-item">
                    <code>=</code>
                    <span className="operator-desc">Assign value</span>
                  </div>
                  <div className="operator-item">
                    <code>+=</code>
                    <span className="operator-desc">Add and assign</span>
                  </div>
                  <div className="operator-item">
                    <code>-=</code>
                    <span className="operator-desc">Subtract and assign</span>
                  </div>
                  <div className="operator-item">
                    <code>*=</code>
                    <span className="operator-desc">Multiply and assign</span>
                  </div>
                  <div className="operator-item">
                    <code>/=</code>
                    <span className="operator-desc">Divide and assign</span>
                  </div>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">🧠</div>
                <h3 className="category-title">Logical</h3>
                <p className="category-desc">Make decisions</p>
                <div className="operators-list">
                  <div className="operator-item">
                    <code>&&</code>
                    <span className="operator-desc">AND (both true)</span>
                  </div>
                  <div className="operator-item">
                    <code>||</code>
                    <span className="operator-desc">OR (either true)</span>
                  </div>
                  <div className="operator-item">
                    <code>!</code>
                    <span className="operator-desc">NOT (reverse)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="precedence-section">
            <h2 className="section-title">
              <span className="section-icon">📊</span>
              Operator Precedence
            </h2>
            <p className="section-description">
              When multiple operators are used together, C++ follows a specific order (precedence). 
              Higher precedence operators are evaluated first.
            </p>
            <div className="precedence-list">
              <div className="precedence-item">
                <div className="precedence-number">1</div>
                <div className="precedence-content">
                  <code>()</code> - Parentheses (highest priority)
                </div>
              </div>
              <div className="precedence-item">
                <div className="precedence-number">2</div>
                <div className="precedence-content">
                  <code>* / %</code> - Multiplication, Division, Modulus
                </div>
              </div>
              <div className="precedence-item">
                <div className="precedence-number">3</div>
                <div className="precedence-content">
                  <code>+ -</code> - Addition, Subtraction
                </div>
              </div>
              <div className="precedence-item">
                <div className="precedence-number">4</div>
                <div className="precedence-content">
                  <code>&lt; &gt; &lt;= &gt;=</code> - Comparison
                </div>
              </div>
              <div className="precedence-item">
                <div className="precedence-number">5</div>
                <div className="precedence-content">
                  <code>== !=</code> - Equality
                </div>
              </div>
              <div className="precedence-item">
                <div className="precedence-number">6</div>
                <div className="precedence-content">
                  <code>&& ||</code> - Logical AND, OR
                </div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Operators in Action
            </h2>
            <p className="code-description">
              Let's see how different operators work together in a C++ program:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    // Arithmetic operators
    int a = 10, b = 3;
    cout << "a = " << a << ", b = " << b << endl;
    cout << "a + b = " << (a + b) << endl;
    cout << "a - b = " << (a - b) << endl;
    cout << "a * b = " << (a * b) << endl;
    cout << "a / b = " << (a / b) << endl;
    cout << "a % b = " << (a % b) << endl;
    
    // Comparison operators
    cout << "a > b: " << (a > b) << endl;
    cout << "a == b: " << (a == b) << endl;
    cout << "a != b: " << (a != b) << endl;
    
    // Assignment operators
    int c = 5;
    c += 3;  // c = c + 3
    cout << "c after += 3: " << c << endl;
    
    // Logical operators
    bool x = true, y = false;
    cout << "x && y: " << (x && y) << endl;
    cout << "x || y: " << (x || y) << endl;
    cout << "!x: " << (!x) << endl;
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this program demonstrates:</strong></p>
              <ul>
                <li>🎯 <code>+ - * / %</code> - Basic arithmetic operations</li>
                <li>🎯 <code>&gt; == !=</code> - Comparison operators return true/false</li>
                <li>🎯 <code>+=</code> - Shortcut for addition and assignment</li>
                <li>🎯 <code>&& || !</code> - Logical operators for decision making</li>
                <li>🎯 <code>()</code> - Parentheses control order of operations</li>
              </ul>
            </div>
          </div>

          <div className="challenge-section">
            <h2 className="challenge-title">
              <span className="challenge-icon">🎯</span>
              Try It Yourself!
            </h2>
            <p className="challenge-description">
              What will be the output of this expression? Think step by step:
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Remember operator precedence - multiplication before addition!
            </div>
            <div className="example-solution">
              <strong>Expression to solve:</strong>
              <div className="code-block">
                <pre className="code">
{`int result = 2 + 3 * 4 - 1;
cout << result;`}
                </pre>
              </div>
            </div>
            <div className="challenge-options">
              <button className="option-btn">13</button>
              <button className="option-btn">19</button>
              <button className="option-btn">15</button>
              <button className="option-btn">11</button>
            </div>
            <button className="challenge-button">Check Answer!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Operators;
