import React from 'react';
import './PythonConditionalStatements.css';

function PythonConditionalStatements({ onBackClick }) {
  return (
    <div className="python-conditional-container">
      <div className="python-conditional-content">
        <div className="python-conditional-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-conditional-title">Python Conditional Statements</h1>
        </div>

        <div className="python-conditional-section">
          <div className="section-content">
            <span className="section-icon">🤔</span>
            <h2 className="section-title">What are Conditional Statements?</h2>
            <p className="section-text">
              Conditional statements in Python allow your program to make decisions based on different conditions. 
              They help create intelligent programs that can respond differently to various situations.
            </p>
          </div>
        </div>

        <div className="python-conditional-section">
          <div className="section-content">
            <span className="section-icon">🔀</span>
            <h2 className="section-title">If Statement</h2>
            <p className="section-text">
              The if statement executes code only when a condition is True:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">If Statement Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Simple if statement</span><br/>
                  age = <span className="code-number">18</span><br/>
                  <span className="code-keyword">if</span> age >= <span className="code-number">18</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"You are an adult"</span>)<br/>
                  <br/>
                  <span className="code-comment"># If with multiple conditions</span><br/>
                  score = <span className="code-number">85</span><br/>
                  <span className="code-keyword">if</span> score >= <span className="code-number">90</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"Excellent!"</span>)<br/>
                  <span className="code-keyword">elif</span> score >= <span className="code-number">80</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"Good job!"</span>)<br/>
                  <span className="code-keyword">elif</span> score >= <span className="code-number">70</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"Not bad"</span>)<br/>
                  <span className="code-keyword">else</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"Keep trying!"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-conditional-section">
          <div className="section-content">
            <span className="section-icon">🔀</span>
            <h2 className="section-title">Comparison Operators</h2>
            <p className="section-text">
              Use these operators to compare values in conditions:
            </p>
            
            <div className="operators-grid">
              <div className="operator-card">
                <div className="operator-symbol">==</div>
                <div className="operator-name">Equal to</div>
                <div className="operator-example">age == 18</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">!=</div>
                <div className="operator-name">Not equal to</div>
                <div className="operator-example">name != "admin"</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&gt;</div>
                <div className="operator-name">Greater than</div>
                <div className="operator-example">score &gt; 80</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&lt;</div>
                <div className="operator-name">Less than</div>
                <div className="operator-example">age &lt; 21</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&gt;=</div>
                <div className="operator-name">Greater or equal</div>
                <div className="operator-example">temperature &gt;= 0</div>
              </div>
              <div className="operator-card">
                <div className="operator-symbol">&lt;=</div>
                <div className="operator-name">Less or equal</div>
                <div className="operator-example">count &lt;= 10</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-conditional-section">
          <div className="section-content">
            <span className="section-icon">🧠</span>
            <h2 className="section-title">Logical Operators</h2>
            <p className="section-text">
              Combine multiple conditions using logical operators:
            </p>
            
            <div className="logical-grid">
              <div className="logical-card">
                <div className="logical-name">and</div>
                <div className="logical-desc">Both conditions must be True</div>
                <div className="logical-example">age >= 18 and has_license</div>
              </div>
              <div className="logical-card">
                <div className="logical-name">or</div>
                <div className="logical-desc">At least one condition must be True</div>
                <div className="logical-example">is_student or is_teacher</div>
              </div>
              <div className="logical-card">
                <div className="logical-name">not</div>
                <div className="logical-desc">Reverses the condition</div>
                <div className="logical-example">not is_weekend</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-conditional-section">
          <div className="section-content">
            <span className="section-icon">💻</span>
            <h2 className="section-title">Practical Examples</h2>
            <p className="section-text">
              Real-world examples of conditional statements:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Conditional Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Grade calculator</span><br/>
                  score = <span className="code-number">85</span><br/>
                  <span className="code-keyword">if</span> score >= <span className="code-number">90</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"A"</span><br/>
                  <span className="code-keyword">elif</span> score >= <span className="code-number">80</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"B"</span><br/>
                  <span className="code-keyword">elif</span> score >= <span className="code-number">70</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"C"</span><br/>
                  <span className="code-keyword">else</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"F"</span><br/>
                  <br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Your grade: grade"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Weather checker</span><br/>
                  temperature = <span className="code-number">25</span><br/>
                  is_sunny = <span className="code-keyword">True</span><br/>
                  <br/>
                  <span className="code-keyword">if</span> temperature &gt; <span className="code-number">30</span> <span className="code-keyword">and</span> is_sunny:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"It's a hot sunny day!"</span>)<br/>
                  <span className="code-keyword">elif</span> temperature &lt; <span className="code-number">10</span> <span className="code-keyword">or</span> <span className="code-keyword">not</span> is_sunny:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"It's cold or cloudy"</span>)<br/>
                  <span className="code-keyword">else</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">"Nice weather!"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-conditional-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Age-Based Access Control</h3>
                <p className="challenge-desc">
                  Create a program that checks a person's age and determines what they can access. 
                  Children (under 13) can access kids content, teenagers (13-17) can access teen content, 
                  and adults (18+) can access all content.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use if, elif, and else statements with age comparisons</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      # Age-based access control<br/>
                      age = int(input("Enter your age: "))<br/>
                      <br/>
                      if age &lt; 13:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print("You can access kids content only")<br/>
                      elif age &lt; 18:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print("You can access kids and teen content")<br/>
                      else:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print("You can access all content")<br/>
                      <br/>
                      # Additional check for specific content<br/>
                      if age >= 18:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print("Welcome to adult section!")<br/>
                      else:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;print("Sorry, you need to be 18+ for this section")
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

export default PythonConditionalStatements;
