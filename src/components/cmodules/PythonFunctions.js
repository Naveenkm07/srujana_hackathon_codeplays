import React from 'react';
import './PythonFunctions.css';

function PythonFunctions({ onBackClick }) {
  return (
    <div className="python-functions-container">
      <div className="python-functions-content">
        <div className="python-functions-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-functions-title">Python Functions</h1>
        </div>

        <div className="python-functions-section">
          <div className="section-content">
            <span className="section-icon">🔧</span>
            <h2 className="section-title">What are Functions?</h2>
            <p className="section-text">
              Functions in Python are reusable blocks of code that perform specific tasks. 
              They help organize code, avoid repetition, and make programs easier to understand and maintain.
            </p>
          </div>
        </div>

        <div className="python-functions-section">
          <div className="section-content">
            <span className="section-icon">📝</span>
            <h2 className="section-title">Creating Functions</h2>
            <p className="section-text">
              Define functions using the def keyword followed by the function name and parameters:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Function Definition</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Simple function</span><br/>
                  <span className="code-keyword">def</span> greet():<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"Hello, World!"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Function with parameters</span><br/>
                  <span className="code-keyword">def</span> greet_person(name):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"Hello, name!"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Function with return value</span><br/>
                  <span className="code-keyword">def</span> add_numbers(a, b):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a + b<br/>
                  <br/>
                  <span className="code-comment"># Call the functions</span><br/>
                  greet()<br/>
                  greet_person(<span className="code-string">"Alice"</span>)<br/>
                  result = add_numbers(<span className="code-number">5</span>, <span className="code-number">3</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Sum: result"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-functions-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Function Types</h2>
            <div className="types-grid">
              <div className="type-card">
                <h3 className="type-title">No Parameters</h3>
                <p className="type-desc">Functions that don't take any input</p>
                <div className="type-example">
                  <code>def say_hello():</code>
                </div>
              </div>
              <div className="type-card">
                <h3 className="type-title">With Parameters</h3>
                <p className="type-desc">Functions that accept input values</p>
                <div className="type-example">
                  <code>def calculate(x, y):</code>
                </div>
              </div>
              <div className="type-card">
                <h3 className="type-title">With Return</h3>
                <p className="type-desc">Functions that return a value</p>
                <div className="type-example">
                  <code>def multiply(a, b): return a * b</code>
                </div>
              </div>
              <div className="type-card">
                <h3 className="type-title">Default Values</h3>
                <p className="type-desc">Parameters with default values</p>
                <div className="type-example">
                  <code>def greet(name="World"):</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-functions-section">
          <div className="section-content">
            <span className="section-icon">💻</span>
            <h2 className="section-title">Practical Examples</h2>
            <p className="section-text">
              Real-world examples of functions in action:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Function Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Calculator functions</span><br/>
                  <span className="code-keyword">def</span> add(x, y):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> x + y<br/>
                  <br/>
                  <span className="code-keyword">def</span> multiply(x, y):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> x * y<br/>
                  <br/>
                  <span className="code-keyword">def</span> is_even(number):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> number % <span className="code-number">2</span> == <span className="code-number">0</span><br/>
                  <br/>
                  <span className="code-comment"># String processing function</span><br/>
                  <span className="code-keyword">def</span> format_name(first, last):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-string">f"first.title() last.title()"</span><br/>
                  <br/>
                  <span className="code-comment"># Use the functions</span><br/>
                  <span className="code-keyword">print</span>(add(<span className="code-number">10</span>, <span className="code-number">5</span>))<br/>
                  <span className="code-keyword">print</span>(multiply(<span className="code-number">4</span>, <span className="code-number">7</span>))<br/>
                  <span className="code-keyword">print</span>(is_even(<span className="code-number">8</span>))<br/>
                  <span className="code-keyword">print</span>(format_name(<span className="code-string">"john"</span>, <span className="code-string">"doe"</span>))
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-functions-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Math Helper Functions</h3>
                <p className="challenge-desc">
                  Create functions to calculate the area of a rectangle, check if a number is prime, 
                  and find the maximum of three numbers.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use return statements to send values back from functions</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      # Math helper functions<br/>
                      def rectangle_area(length, width):<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;return length * width<br/>
                      <br/>
                      def is_prime(n):<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;if n &lt; 2:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return False<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;for i in range(2, n):<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if n % i == 0:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return False<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;return True<br/>
                      <br/>
                      def max_of_three(a, b, c):<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;return max(a, b, c)<br/>
                      <br/>
                      # Test the functions<br/>
                      print(f"Area: rectangle_area(5, 3)")<br/>
                      print(f"Is 17 prime? is_prime(17)")<br/>
                      print(f"Max of 10, 25, 15: max_of_three(10, 25, 15)")
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

export default PythonFunctions;
