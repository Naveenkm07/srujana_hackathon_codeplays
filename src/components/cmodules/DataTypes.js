import React from 'react';
import './DataTypes.css';

function DataTypes({ onBackClick }) {
  return (
    <div className="datatypes-container">
      <div className="datatypes-content">
        <div className="page-header">
          <h1 className="page-title">C++ Data Types</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="datatypes-section">
            <h2 className="section-title">
              <span className="section-icon">🔢</span>
              What are Data Types?
            </h2>
            <p className="section-description">
              Data types tell C++ what kind of information you want to store and how much space it needs. 
              Think of them as different sized containers - some for small numbers, some for text, some for 
              true/false values. Each type has its own purpose and size.
            </p>
          </div>

          <div className="categories-section">
            <h2 className="section-title">
              <span className="section-icon">📚</span>
              Categories of Data Types
            </h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-icon">🔢</div>
                <h3 className="category-title">Integer Types</h3>
                <p className="category-desc">Store whole numbers</p>
                <div className="types-list">
                  <div className="type-item">
                    <code>int</code>
                    <span className="type-desc">-2,147,483,648 to 2,147,483,647</span>
                  </div>
                  <div className="type-item">
                    <code>short</code>
                    <span className="type-desc">-32,768 to 32,767</span>
                  </div>
                  <div className="type-item">
                    <code>long</code>
                    <span className="type-desc">Larger range than int</span>
                  </div>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">📊</div>
                <h3 className="category-title">Floating Point</h3>
                <p className="category-desc">Store decimal numbers</p>
                <div className="types-list">
                  <div className="type-item">
                    <code>float</code>
                    <span className="type-desc">7 decimal places</span>
                  </div>
                  <div className="type-item">
                    <code>double</code>
                    <span className="type-desc">15 decimal places</span>
                  </div>
                  <div className="type-item">
                    <code>long double</code>
                    <span className="type-desc">19 decimal places</span>
                  </div>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">🔤</div>
                <h3 className="category-title">Character Types</h3>
                <p className="category-desc">Store text and symbols</p>
                <div className="types-list">
                  <div className="type-item">
                    <code>char</code>
                    <span className="type-desc">Single character</span>
                  </div>
                  <div className="type-item">
                    <code>string</code>
                    <span className="type-desc">Multiple characters</span>
                  </div>
                  <div className="type-item">
                    <code>wchar_t</code>
                    <span className="type-desc">Wide characters</span>
                  </div>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">✅</div>
                <h3 className="category-title">Boolean</h3>
                <p className="category-desc">Store true/false values</p>
                <div className="types-list">
                  <div className="type-item">
                    <code>bool</code>
                    <span className="type-desc">true or false only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="comparison-section">
            <h2 className="section-title">
              <span className="section-icon">⚖️</span>
              Size Comparison
            </h2>
            <div className="comparison-table">
              <div className="table-header">
                <div className="header-cell">Data Type</div>
                <div className="header-cell">Size (bytes)</div>
                <div className="header-cell">Range</div>
                <div className="header-cell">Example</div>
              </div>
              <div className="table-row">
                <div className="cell"><code>char</code></div>
                <div className="cell">1</div>
                <div className="cell">-128 to 127</div>
                <div className="cell"><code>'A'</code></div>
              </div>
              <div className="table-row">
                <div className="cell"><code>int</code></div>
                <div className="cell">4</div>
                <div className="cell">-2B to 2B</div>
                <div className="cell"><code>42</code></div>
              </div>
              <div className="table-row">
                <div className="cell"><code>float</code></div>
                <div className="cell">4</div>
                <div className="cell">±3.4e±38</div>
                <div className="cell"><code>3.14f</code></div>
              </div>
              <div className="table-row">
                <div className="cell"><code>double</code></div>
                <div className="cell">8</div>
                <div className="cell">±1.7e±308</div>
                <div className="cell"><code>3.14159</code></div>
              </div>
              <div className="table-row">
                <div className="cell"><code>bool</code></div>
                <div className="cell">1</div>
                <div className="cell">true/false</div>
                <div className="cell"><code>true</code></div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Data Types in Action
            </h2>
            <p className="code-description">
              Let's see how different data types work in a real program:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
#include <string>
using namespace std;

int main() {
    // Different data types
    char grade = 'A';           // Single character
    int age = 25;               // Whole number
    float height = 5.9f;        // Decimal number
    double salary = 50000.50;   // More precise decimal
    bool isEmployed = true;     // True or false
    string name = "John";       // Text
    
    // Display all values
    cout << "Name: " << name << endl;
    cout << "Age: " << age << " years" << endl;
    cout << "Height: " << height << " feet" << endl;
    cout << "Salary: $" << salary << endl;
    cout << "Grade: " << grade << endl;
    cout << "Employed: " << (isEmployed ? "Yes" : "No") << endl;
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this program demonstrates:</strong></p>
              <ul>
                <li>🎯 <code>char grade = 'A';</code> - Stores a single character</li>
                <li>🎯 <code>int age = 25;</code> - Stores a whole number</li>
                <li>🎯 <code>float height = 5.9f;</code> - Stores a decimal with 'f' suffix</li>
                <li>🎯 <code>double salary = 50000.50;</code> - Stores a more precise decimal</li>
                <li>🎯 <code>bool isEmployed = true;</code> - Stores true/false value</li>
                <li>🎯 <code>string name = "John";</code> - Stores text (requires #include &lt;string&gt;)</li>
              </ul>
            </div>
          </div>

          <div className="challenge-section">
            <h2 className="challenge-title">
              <span className="challenge-icon">🎯</span>
              Try It Yourself!
            </h2>
            <p className="challenge-description">
              Choose the right data type for each piece of information. What would you use for each?
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Think about what kind of data each item represents
            </div>
            <div className="challenge-list">
              <div className="challenge-item">
                <span className="challenge-question">Student's name:</span>
                <div className="challenge-options">
                  <button className="option-btn">char</button>
                  <button className="option-btn">string</button>
                  <button className="option-btn">int</button>
                </div>
              </div>
              <div className="challenge-item">
                <span className="challenge-question">Number of students:</span>
                <div className="challenge-options">
                  <button className="option-btn">float</button>
                  <button className="option-btn">int</button>
                  <button className="option-btn">bool</button>
                </div>
              </div>
              <div className="challenge-item">
                <span className="challenge-question">Average grade:</span>
                <div className="challenge-options">
                  <button className="option-btn">int</button>
                  <button className="option-btn">double</button>
                  <button className="option-btn">char</button>
                </div>
              </div>
            </div>
            <button className="challenge-button">Check Answers!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataTypes;
