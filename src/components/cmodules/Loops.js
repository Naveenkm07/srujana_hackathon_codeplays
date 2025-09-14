import React from 'react';
import './Loops.css';

function Loops({ onBackClick }) {
  return (
    <div className="loops-container">
      <div className="loops-content">
        <div className="page-header">
          <h1 className="page-title">C++ Loops</h1>
          <button className="back-button" onClick={onBackClick}>
            ← Back
          </button>
        </div>
        
        <div className="concept-content">
          <div className="loops-section">
            <h2 className="section-title">
              <span className="section-icon">🔄</span>
              What are Loops?
            </h2>
            <p className="section-description">
              Loops are like repeating instructions - they let you run the same code multiple times without 
              writing it over and over. Think of it like telling someone "count from 1 to 10" instead of 
              saying "say 1, say 2, say 3..." all the way to 10. Loops make programming much more efficient!
            </p>
          </div>

          <div className="types-section">
            <h2 className="section-title">
              <span className="section-icon">📚</span>
              Types of Loops
            </h2>
            <div className="types-grid">
              <div className="type-card">
                <div className="type-icon">🔢</div>
                <h3 className="type-title">for Loop</h3>
                <p className="type-desc">Repeat a specific number of times</p>
                <div className="type-syntax">
                  <code>for (int i = 0; i &lt; 5; i++)</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Counter variable</span>
                  <span className="feature-tag">Condition check</span>
                  <span className="feature-tag">Increment</span>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">❓</div>
                <h3 className="type-title">while Loop</h3>
                <p className="type-desc">Repeat while condition is true</p>
                <div className="type-syntax">
                  <code>while (condition)</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Condition check</span>
                  <span className="feature-tag">Unknown iterations</span>
                  <span className="feature-tag">User input</span>
                </div>
              </div>

              <div className="type-card">
                <div className="type-icon">🔄</div>
                <h3 className="type-title">do-while Loop</h3>
                <p className="type-desc">Execute at least once, then check condition</p>
                <div className="type-syntax">
                  <code>do &#123; ... &#125; while (condition);</code>
                </div>
                <div className="type-features">
                  <span className="feature-tag">Execute first</span>
                  <span className="feature-tag">Then check</span>
                  <span className="feature-tag">Menu systems</span>
                </div>
              </div>
            </div>
          </div>

          <div className="examples-section">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              Loop Examples
            </h2>
            <div className="examples-grid">
              <div className="example-card">
                <h3 className="example-title">for Loop - Count Numbers</h3>
                <div className="example-code">
                  <pre className="code">
{`for (int i = 1; i <= 5; i++) {
    cout << i << " ";
}`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> 1 2 3 4 5
                </div>
              </div>

              <div className="example-card">
                <h3 className="example-title">while Loop - User Input</h3>
                <div className="example-code">
                  <pre className="code">
{`int number;
cout << "Enter a number (0 to stop): ";
cin >> number;
while (number != 0) {
    cout << "You entered: " << number << endl;
    cout << "Enter another number: ";
    cin >> number;
}`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> Keeps asking until user enters 0
                </div>
              </div>

              <div className="example-card">
                <h3 className="example-title">do-while Loop - Menu</h3>
                <div className="example-code">
                  <pre className="code">
{`int choice;
do {
    cout << "1. Play Game" << endl;
    cout << "2. Settings" << endl;
    cout << "3. Exit" << endl;
    cout << "Choose: ";
    cin >> choice;
} while (choice != 3);`}
                  </pre>
                </div>
                <div className="example-output">
                  <strong>Output:</strong> Shows menu at least once
                </div>
              </div>
            </div>
          </div>

          <div className="code-section">
            <h2 className="code-title">
              <span className="code-icon">💻</span>
              Complete Loop Program
            </h2>
            <p className="code-description">
              Let's see how different loops work together in a real program:
            </p>
            <div className="code-block">
              <pre className="code">
{`#include <iostream>
using namespace std;

int main() {
    // for loop - count from 1 to 10
    cout << "=== Counting with for loop ===" << endl;
    for (int i = 1; i <= 10; i++) {
        cout << i << " ";
    }
    cout << endl << endl;
    
    // while loop - sum numbers until user enters 0
    cout << "=== Sum with while loop ===" << endl;
    int sum = 0;
    int number;
    cout << "Enter numbers to sum (0 to stop): ";
    cin >> number;
    
    while (number != 0) {
        sum += number;
        cout << "Enter another number: ";
        cin >> number;
    }
    cout << "Total sum: " << sum << endl << endl;
    
    // do-while loop - ask for name
    cout << "=== Name with do-while loop ===" << endl;
    string name;
    do {
        cout << "Enter your name: ";
        cin >> name;
        if (name != "quit") {
            cout << "Hello, " << name << "!" << endl;
        }
    } while (name != "quit");
    
    return 0;
}`}
              </pre>
            </div>
            <div className="code-explanation">
              <p><strong>What this program demonstrates:</strong></p>
              <ul>
                <li>🎯 <code>for (int i = 1; i &lt;= 10; i++)</code> - Counts from 1 to 10</li>
                <li>🎯 <code>while (number != 0)</code> - Keeps asking for numbers until 0 is entered</li>
                <li>🎯 <code>do &#123; ... &#125; while (name != "quit");</code> - Shows menu at least once</li>
                <li>🎯 Each loop type has its own best use case</li>
                <li>🎯 Loops can be combined in the same program</li>
              </ul>
            </div>
          </div>

          <div className="tips-section">
            <h2 className="section-title">
              <span className="section-icon">💡</span>
              Loop Tips & Tricks
            </h2>
            <div className="tips-list">
              <div className="tip-item">
                <div className="tip-icon">⚠️</div>
                <div className="tip-content">
                  <strong>Infinite Loops:</strong> Make sure your condition will eventually become false, or you'll have an infinite loop!
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🔢</div>
                <div className="tip-content">
                  <strong>for vs while:</strong> Use for when you know how many times to repeat, while when you don't know
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🔄</div>
                <div className="tip-content">
                  <strong>do-while:</strong> Perfect for menus and user input that needs to happen at least once
                </div>
              </div>
              <div className="tip-item">
                <div className="tip-icon">🏃</div>
                <div className="tip-content">
                  <strong>break & continue:</strong> Use break to exit loop early, continue to skip to next iteration
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
              Create a program that asks the user for a number and prints its multiplication table from 1 to 10.
            </p>
            <div className="hint-box">
              <strong>💡 Hint:</strong> Use a for loop to go from 1 to 10, and multiply each number by the user's input
            </div>
            <div className="example-solution">
              <strong>Expected output for input 5:</strong>
              <div className="code-block">
                <pre className="code">
{`5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`}
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

export default Loops;
