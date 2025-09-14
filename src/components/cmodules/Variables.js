import React from 'react';
import './Variables.css';

function Variables({ onBackClick }) {
  return (
    <div className="variables-container">
      <div className="variables-content">
        <div className="page-header">
          <h1 className="page-title">C++ Variables</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="variables-section">
            <h2 className="section-title">
              <span className="section-icon">📦</span>
              What are Variables?
            </h2>
            <p className="section-description">
              Variables are like labeled boxes that store information in your program. Think of them as 
              containers with names where you can put different types of data (numbers, text, etc.) and 
              use them later in your code.
            </p>
          </div>

          <div className="declaration-section">
            <h2 className="section-title">
              <span className="section-icon">✍️</span>
              How to Declare Variables
            </h2>
            <div className="declaration-grid">
              <div className="declaration-card">
                <div className="declaration-icon">🎯</div>
                <h3 className="declaration-title">Step 1: Choose a Type</h3>
                <p className="declaration-desc">Decide what kind of data you want to store</p>
                <div className="example-code">
                  <code>int</code> - for whole numbers
                </div>
              </div>

              <div className="declaration-card">
                <div className="declaration-icon">🏷️</div>
                <h3 className="declaration-title">Step 2: Give it a Name</h3>
                <p className="declaration-desc">Choose a meaningful name for your variable</p>
                <div className="example-code">
                  <code>age</code> - descriptive name
                </div>
              </div>

              <div className="declaration-card">
                <div className="declaration-icon">💾</div>
                <h3 className="declaration-title">Step 3: Store a Value</h3>
                <p className="declaration-desc">Assign the actual data to your variable</p>
                <div className="example-code">
                  <code>age = 25;</code> - store the value
                </div>
              </div>
            </div>
          </div>

          <div className="types-section">
            <h2 className="section-title">
              <span className="section-icon">🔢</span>
              Common Variable Types
            </h2>
            <div className="types-grid">
              <div className="type-card">
                <div className="type-icon">🔢</div>
                <h3 className="type-title">int</h3>
                <p className="type-desc">Whole numbers (1, 2, 3, -5)</p>
                <div className="type-example">
                  <code>int age = 25;</code>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">🔤</div>
                <h3 className="type-title">char</h3>
                <p className="type-desc">Single characters ('A', 'b', '!')</p>
                <div className="type-example">
                  <code>char grade = 'A';</code>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">📊</div>
                <h3 className="type-title">float</h3>
                <p className="type-desc">Decimal numbers (3.14, 2.5)</p>
                <div className="type-example">
                  <code>float price = 19.99;</code>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">✅</div>
                <h3 className="type-title">bool</h3>
                <p className="type-desc">True or false values</p>
                <div className="type-example">
                  <code>bool isStudent = true;</code>
                </div>
              </div>
            </div>
          </div>

          <div className="rules-section">
            <h2 className="rules-title">
              <span className="rules-icon">⚠️</span>
              Variable Rules
            </h2>
            <div className="rules-list">
              <div className="rule-item">
                <div className="rule-number">1</div>
                <div className="rule-text">Always declare the type before the name: <code>int age;</code></div>
              </div>
              <div className="rule-item">
                <div className="rule-number">2</div>
                <div className="rule-text">Variable names must start with a letter or underscore</div>
              </div>
              <div className="rule-item">
                <div className="rule-number">3</div>
                <div className="rule-text">Use meaningful names: <code>studentAge</code> not <code>a</code></div>
              </div>
              <div className="rule-item">
                <div className="rule-number">4</div>
                <div className="rule-text">You can change the value later: <code>age = 26;</code></div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Variables in Action
            </h2>
            <p className="code-description">
              Let's see how to declare and use different types of variables:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    // Declare different types of variables
    int studentAge = 20;
    char studentGrade = 'A';
    float gpa = 3.8;
    bool isGraduated = false;
    
    // Display the values
    cout << "Student Age: " << studentAge << endl;
    cout << "Grade: " << studentGrade << endl;
    cout << "GPA: " << gpa << endl;
    cout << "Graduated: " << isGraduated << endl;
    
    // Change a variable's value
    studentAge = 21;
    cout << "New Age: " << studentAge << endl;
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this program does:</strong></p>
              <ul>
                <li>🎯 <code>int studentAge = 20;</code> - Creates a variable to store age</li>
                <li>🎯 <code>char studentGrade = 'A';</code> - Stores a single character</li>
                <li>🎯 <code>float gpa = 3.8;</code> - Stores a decimal number</li>
                <li>🎯 <code>bool isGraduated = false;</code> - Stores true/false value</li>
                <li>🎯 <code>studentAge = 21;</code> - Changes the value later</li>
              </ul>
            </div>
          </div>

          <div className="challenge-section">
            <h2 className="challenge-title">
              <span className="challenge-icon">🎯</span>
              Try It Yourself!
            </h2>
            <p className="challenge-description">
              Create variables to store information about a book. What variables would you need?
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Think about what information a book has (title, author, pages, price, etc.)
            </div>
            <div className="example-solution">
              <strong>Example solution:</strong>
              <div className="code-block">
                <pre className="code">
{`string bookTitle = "Harry Potter";
string author = "J.K. Rowling";
int pages = 350;
float price = 12.99;
bool isAvailable = true;`}
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

export default Variables;
