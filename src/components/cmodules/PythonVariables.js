import React from 'react';
import './PythonVariables.css';

function PythonVariables({ onBackClick }) {
  return (
    <div className="python-variables-container">
      <div className="python-variables-content">
        <div className="python-variables-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-variables-title">Python Variables</h1>
        </div>

        <div className="python-variables-section">
          <div className="section-content">
            <span className="section-icon">📦</span>
            <h2 className="section-title">What are Variables?</h2>
            <p className="section-text">
              Variables in Python are like labeled boxes that store data. You can put different types of information 
              in them and use them throughout your program. The best part? You don't need to declare the type!
            </p>
          </div>
        </div>

        <div className="python-variables-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Creating Variables</h2>
            <p className="section-text">
              In Python, creating variables is super simple. Just choose a name and assign a value using the = operator:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Variable Creation</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Different types of variables</span><br/>
                  name = <span className="code-string">"Alice"</span>          <span className="code-comment"># String</span><br/>
                  age = <span className="code-number">25</span>                <span className="code-comment"># Integer</span><br/>
                  height = <span className="code-number">5.6</span>            <span className="code-comment"># Float</span><br/>
                  is_student = <span className="code-keyword">True</span>      <span className="code-comment"># Boolean</span><br/>
                  <br/>
                  <span className="code-comment"># Print the variables</span><br/>
                  <span className="code-keyword">print</span>(name)<br/>
                  <span className="code-keyword">print</span>(age)<br/>
                  <span className="code-keyword">print</span>(height)<br/>
                  <span className="code-keyword">print</span>(is_student)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-variables-section">
          <div className="section-content">
            <span className="section-icon">📝</span>
            <h2 className="section-title">Variable Naming Rules</h2>
            <div className="rules-grid">
              <div className="rule-card valid">
                <span className="rule-icon">✅</span>
                <h3 className="rule-title">Valid Names</h3>
                <ul className="rule-list">
                  <li>Start with letter or underscore</li>
                  <li>Can contain letters, numbers, underscores</li>
                  <li>Case sensitive (name ≠ Name)</li>
                  <li>Use descriptive names</li>
                </ul>
              </div>
              <div className="rule-card invalid">
                <span className="rule-icon">❌</span>
                <h3 className="rule-title">Invalid Names</h3>
                <ul className="rule-list">
                  <li>Can't start with numbers</li>
                  <li>No spaces or special characters</li>
                  <li>Can't use Python keywords</li>
                  <li>Avoid single letters (except i, j, k)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="python-variables-section">
          <div className="section-content">
            <span className="section-icon">🔄</span>
            <h2 className="section-title">Variable Operations</h2>
            <p className="section-text">
              Variables can be updated, combined, and used in calculations:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Variable Operations</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Updating variables</span><br/>
                  count = <span className="code-number">10</span><br/>
                  count = count + <span className="code-number">5</span>  <span className="code-comment"># Now count is 15</span><br/>
                  count += <span className="code-number">3</span>         <span className="code-comment"># Short form: count = count + 3</span><br/>
                  <br/>
                  <span className="code-comment"># Combining strings</span><br/>
                  first_name = <span className="code-string">"John"</span><br/>
                  last_name = <span className="code-string">"Doe"</span><br/>
                  full_name = first_name + <span className="code-string">" "</span> + last_name<br/>
                  <br/>
                  <span className="code-comment"># Using variables in calculations</span><br/>
                  price = <span className="code-number">19.99</span><br/>
                  tax_rate = <span className="code-number">0.08</span><br/>
                  total = price * (<span className="code-number">1</span> + tax_rate)<br/>
                  <br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Hello &#123;full_name&#125;!"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Total: $&#123;total:.2f&#125;"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-variables-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Personal Calculator</h3>
                <p className="challenge-desc">
                  Create variables for your name, age, and favorite number. Then calculate how old you'll be in 10 years 
                  and what your favorite number multiplied by 2 equals.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use variables to store your information and perform calculations</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      my_name = "Alex"<br/>
                      my_age = 20<br/>
                      favorite_number = 7<br/>
                      <br/>
                      future_age = my_age + 10<br/>
                      doubled_number = favorite_number * 2<br/>
                      <br/>
                      print(f"Hi my_name!")<br/>
                      print(f"In 10 years, you'll be future_age")<br/>
                      print(f"Your favorite number doubled is doubled_number")
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

export default PythonVariables;
