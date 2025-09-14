import React from 'react';
import './Keywords.css';

function Keywords({ onBackClick }) {
  return (
    <div className="keywords-container">
      <div className="keywords-content">
        <div className="page-header">
          <h1 className="page-title">C++ Keywords</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="keywords-section">
            <h2 className="section-title">
              <span className="section-icon">🔑</span>
              What are Keywords?
            </h2>
            <p className="section-description">
              Keywords are special words that have a specific meaning in C++. They are reserved by the language 
              and cannot be used as identifiers (variable names, function names, etc.). Think of them as the 
              "grammar rules" of the programming language.
            </p>
          </div>

          <div className="categories-section">
            <h2 className="section-title">
              <span className="section-icon">📚</span>
              Categories of Keywords
            </h2>
            <div className="categories-grid">
              <div className="category-card">
                <div className="category-icon">🏗️</div>
                <h3 className="category-title">Data Types</h3>
                <p className="category-desc">Define what kind of data we store</p>
                <div className="keywords-list">
                  <span className="keyword">int</span>
                  <span className="keyword">char</span>
                  <span className="keyword">float</span>
                  <span className="keyword">double</span>
                  <span className="keyword">bool</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">🔄</div>
                <h3 className="category-title">Control Flow</h3>
                <p className="category-desc">Control how our program runs</p>
                <div className="keywords-list">
                  <span className="keyword">if</span>
                  <span className="keyword">else</span>
                  <span className="keyword">while</span>
                  <span className="keyword">for</span>
                  <span className="keyword">switch</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">⚡</div>
                <h3 className="category-title">Modifiers</h3>
                <p className="category-desc">Change how things work</p>
                <div className="keywords-list">
                  <span className="keyword">const</span>
                  <span className="keyword">static</span>
                  <span className="keyword">public</span>
                  <span className="keyword">private</span>
                  <span className="keyword">virtual</span>
                </div>
              </div>

              <div className="category-card">
                <div className="category-icon">🎯</div>
                <h3 className="category-title">Functions</h3>
                <p className="category-desc">Define program structure</p>
                <div className="keywords-list">
                  <span className="keyword">return</span>
                  <span className="keyword">void</span>
                  <span className="keyword">class</span>
                  <span className="keyword">struct</span>
                  <span className="keyword">namespace</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rules-section">
            <h2 className="rules-title">
              <span className="rules-icon">⚠️</span>
              Important Rules
            </h2>
            <div className="rules-list">
              <div className="rule-item">
                <div className="rule-number">1</div>
                <div className="rule-text">Keywords are case-sensitive: <code>int</code> is valid, <code>Int</code> is not a keyword</div>
              </div>
              <div className="rule-item">
                <div className="rule-number">2</div>
                <div className="rule-text">You cannot use keywords as variable names: <code>int int = 5;</code> ❌</div>
              </div>
              <div className="rule-item">
                <div className="rule-number">3</div>
                <div className="rule-text">Keywords have specific purposes and cannot be redefined</div>
              </div>
              <div className="rule-item">
                <div className="rule-number">4</div>
                <div className="rule-text">Some keywords are C++ specific, others come from C language</div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Keywords in Action
            </h2>
            <p className="code-description">
              Let's see how different keywords work together in a C++ program:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    // Data type keywords
    int age = 25;
    char grade = 'A';
    bool isStudent = true;
    
    // Control flow keywords
    if (age >= 18) {
        cout << "You are an adult" << endl;
    } else {
        cout << "You are a minor" << endl;
    }
    
    // Loop keywords
    for (int i = 0; i < 3; i++) {
        cout << "Count: " << i << endl;
    }
    
    // Return keyword
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>Keywords used in this example:</strong></p>
              <ul>
                <li>🎯 <code>int</code> - Data type for whole numbers</li>
                <li>🎯 <code>char</code> - Data type for single characters</li>
                <li>🎯 <code>bool</code> - Data type for true/false values</li>
                <li>🎯 <code>if/else</code> - Control flow for decisions</li>
                <li>🎯 <code>for</code> - Loop for repetition</li>
                <li>🎯 <code>return</code> - Exit function with a value</li>
              </ul>
            </div>
          </div>

          <div className="challenge-section">
            <h2 className="challenge-title">
              <span className="challenge-icon">🎯</span>
              Try It Yourself!
            </h2>
            <p className="challenge-description">
              Identify which words in this code are keywords and which are identifiers:
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Keywords are reserved words, identifiers are names we choose
            </div>
            <div className="example-solution">
              <strong>Code to analyze:</strong>
              <div className="code-block">
                <pre className="code">
{`int studentAge = 20;
char studentGrade = 'B';
bool isPassed = true;

if (studentAge > 18) {
    cout << "Adult student" << endl;
}`}
                </pre>
              </div>
            </div>
            <button className="challenge-button">Check Your Answer!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Keywords;
