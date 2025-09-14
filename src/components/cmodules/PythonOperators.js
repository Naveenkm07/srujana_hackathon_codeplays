import React from 'react';
import './PythonOperators.css';

function PythonOperators({ onBackClick }) {
  return (
    <div className="python-operators-container">
      <div className="python-operators-content">
        <div className="python-operators-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-operators-title">Python Operators</h1>
        </div>

        <div className="python-operators-section">
          <div className="section-content">
            <span className="section-icon">⚡</span>
            <h2 className="section-title">What are Operators?</h2>
            <p className="section-text">
              Operators are special symbols that perform operations on variables and values. Python has various 
              types of operators for arithmetic, comparison, logical operations, and more.
            </p>
          </div>
        </div>

        <div className="python-operators-section">
          <div className="section-content">
            <span className="section-icon">🔢</span>
            <h2 className="section-title">Arithmetic Operators</h2>
            <p className="section-text">
              Perform mathematical operations on numbers:
            </p>
            
            <div className="operators-grid">
              <div className="operator-card">
                <div className="operator-symbol">+</div>
                <div className="operator-name">Addition</div>
                <div className="operator-example">a + b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">-</div>
                <div className="operator-name">Subtraction</div>
                <div className="operator-example">a - b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">*</div>
                <div className="operator-name">Multiplication</div>
                <div className="operator-example">a * b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">/</div>
                <div className="operator-name">Division</div>
                <div className="operator-example">a / b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">//</div>
                <div className="operator-name">Floor Division</div>
                <div className="operator-example">a // b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">%</div>
                <div className="operator-name">Modulus</div>
                <div className="operator-example">a % b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">**</div>
                <div className="operator-name">Exponentiation</div>
                <div className="operator-example">a ** b</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-operators-section">
          <div className="section-content">
            <span className="section-icon">🔍</span>
            <h2 className="section-title">Comparison Operators</h2>
            <p className="section-text">
              Compare values and return True or False:
            </p>
            
            <div className="operators-grid">
              <div className="operator-card">
                <div className="operator-symbol">==</div>
                <div className="operator-name">Equal</div>
                <div className="operator-example">a == b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">!=</div>
                <div className="operator-name">Not Equal</div>
                <div className="operator-example">a != b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&gt;</div>
                <div className="operator-name">Greater Than</div>
                <div className="operator-example">a &gt; b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&lt;</div>
                <div className="operator-name">Less Than</div>
                <div className="operator-example">a &lt; b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&gt;=</div>
                <div className="operator-name">Greater or Equal</div>
                <div className="operator-example">a &gt;= b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&lt;=</div>
                <div className="operator-name">Less or Equal</div>
                <div className="operator-example">a &lt;= b</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-operators-section">
          <div className="section-content">
            <span className="section-icon">🧠</span>
            <h2 className="section-title">Logical Operators</h2>
            <p className="section-text">
              Combine boolean values and conditions:
            </p>
            
            <div className="operators-grid">
              <div className="operator-card">
                <div className="operator-symbol">and</div>
                <div className="operator-name">Logical AND</div>
                <div className="operator-example">a and b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">or</div>
                <div className="operator-name">Logical OR</div>
                <div className="operator-example">a or b</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">not</div>
                <div className="operator-name">Logical NOT</div>
                <div className="operator-example">not a</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-operators-section">
          <div className="section-content">
            <span className="section-icon">💻</span>
            <h2 className="section-title">Practical Examples</h2>
            <p className="section-text">
              Let's see operators in action with real examples:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Operator Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Arithmetic operators</span><br/>
                  a = <span className="code-number">10</span><br/>
                  b = <span className="code-number">3</span><br/>
                  <br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Addition: a + b = a + b"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Division: a / b = a / b"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Floor Division: a // b = a // b"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Modulus: a % b = a % b"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Power: a ** b = a ** b"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Comparison operators</span><br/>
                  age = <span className="code-number">18</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Age >= 18: age >= 18"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Age == 21: age == 21"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Logical operators</span><br/>
                  is_student = <span className="code-keyword">True</span><br/>
                  has_id = <span className="code-keyword">False</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Student and has ID: is_student and has_id"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Student or has ID: is_student or has_id"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-operators-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Calculator Program</h3>
                <p className="challenge-desc">
                  Create a simple calculator that performs basic arithmetic operations on two numbers. 
                  Display the results for addition, subtraction, multiplication, and division.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use variables to store the two numbers and different operators to perform calculations</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      # Simple calculator<br/>
                      num1 = 15<br/>
                      num2 = 4<br/>
                      <br/>
                      print(f"Calculator Results:")<br/>
                      print(f"num1 + num2 = num1 + num2")<br/>
                      print(f"num1 - num2 = num1 - num2")<br/>
                      print(f"num1 * num2 = num1 * num2")<br/>
                      print(f"num1 / num2 = num1 / num2")<br/>
                      print(f"num1 // num2 = num1 // num2")<br/>
                      print(f"num1 % num2 = num1 % num2")
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

export default PythonOperators;
