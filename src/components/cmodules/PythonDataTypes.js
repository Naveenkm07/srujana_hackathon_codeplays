import React from 'react';
import './PythonDataTypes.css';

function PythonDataTypes({ onBackClick }) {
  return (
    <div className="python-datatypes-container">
      <div className="python-datatypes-content">
        <div className="python-datatypes-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-datatypes-title">Python Data Types</h1>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">📊</span>
            <h2 className="section-title">What are Data Types?</h2>
            <p className="section-text">
              Data types in Python define what kind of data a variable can store. Python automatically determines 
              the type based on the value you assign, making it easy to work with different kinds of information.
            </p>
          </div>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">🔢</span>
            <h2 className="section-title">Numeric Types</h2>
            <div className="types-grid">
              <div className="type-card">
                <h3 className="type-title">Integer (int)</h3>
                <p className="type-desc">Whole numbers, positive or negative</p>
                <div className="type-examples">
                  <code>age = 25</code>
                  <code>temperature = -10</code>
                </div>
              </div>
              <div className="type-card">
                <h3 className="type-title">Float (float)</h3>
                <p className="type-desc">Decimal numbers with fractional parts</p>
                <div className="type-examples">
                  <code>price = 19.99</code>
                  <code>pi = 3.14159</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">📝</span>
            <h2 className="section-title">Text Type</h2>
            <div className="types-grid">
              <div className="type-card">
                <h3 className="type-title">String (str)</h3>
                <p className="type-desc">Text data enclosed in quotes</p>
                <div className="type-examples">
                  <code>name = "Alice"</code>
                  <code>message = 'Hello World!'</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">✅</span>
            <h2 className="section-title">Boolean Type</h2>
            <div className="types-grid">
              <div className="type-card">
                <h3 className="type-title">Boolean (bool)</h3>
                <p className="type-desc">True or False values for logic</p>
                <div className="type-examples">
                  <code>is_student = True</code>
                  <code>is_working = False</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">🔍</span>
            <h2 className="section-title">Checking Data Types</h2>
            <p className="section-text">
              Use the type() function to check what type of data you're working with:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Type Checking</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Different data types</span><br/>
                  number = <span className="code-number">42</span><br/>
                  decimal = <span className="code-number">3.14</span><br/>
                  text = <span className="code-string">"Hello"</span><br/>
                  flag = <span className="code-keyword">True</span><br/>
                  <br/>
                  <span className="code-comment"># Check their types</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-keyword">type</span>(number))    <span className="code-comment"># &lt;class 'int'&gt;</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-keyword">type</span>(decimal))  <span className="code-comment"># &lt;class 'float'&gt;</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-keyword">type</span>(text))     <span className="code-comment"># &lt;class 'str'&gt;</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-keyword">type</span>(flag))     <span className="code-comment"># &lt;class 'bool'&gt;</span>
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">🔄</span>
            <h2 className="section-title">Type Conversion</h2>
            <p className="section-text">
              Convert between different data types using built-in functions:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Type Conversion</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Converting between types</span><br/>
                  age_str = <span className="code-string">"25"</span><br/>
                  age_int = <span className="code-keyword">int</span>(age_str)        <span className="code-comment"># String to int</span><br/>
                  <br/>
                  price = <span className="code-number">19.99</span><br/>
                  price_str = <span className="code-keyword">str</span>(price)       <span className="code-comment"># Float to string</span><br/>
                  <br/>
                  number = <span className="code-number">1</span><br/>
                  is_positive = <span className="code-keyword">bool</span>(number)   <span className="code-comment"># Int to boolean</span><br/>
                  <br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Age: age_int (type: type(age_int))"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Price: price_str (type: type(price_str))"</span>)<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Is positive: is_positive (type: type(is_positive))"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-datatypes-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Data Type Detective</h3>
                <p className="challenge-desc">
                  Create variables with different data types, then write a program that identifies and displays 
                  each variable's type and value.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use type() function and f-strings to display the information</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      # Create different data types<br/>
                      my_name = "Python Learner"<br/>
                      my_age = 20<br/>
                      my_height = 5.8<br/>
                      is_student = True<br/>
                      <br/>
                      # Display type and value<br/>
                      print(f"Name: my_name - Type: type(my_name)")<br/>
                      print(f"Age: my_age - Type: type(my_age)")<br/>
                      print(f"Height: my_height - Type: type(my_height)")<br/>
                      print(f"Is Student: is_student - Type: type(is_student)")
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

export default PythonDataTypes;
