import React from 'react';
import './PythonStrings.css';

function PythonStrings({ onBackClick }) {
  return (
    <div className="python-strings-container">
      <div className="python-strings-content">
        <div className="python-strings-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-strings-title">Python Strings</h1>
        </div>

        <div className="python-strings-section">
          <div className="section-content">
            <span className="section-icon">📝</span>
            <h2 className="section-title">What are Strings?</h2>
            <p className="section-text">
              Strings in Python are sequences of characters enclosed in quotes. They're used to store and manipulate 
              text data. Python makes working with strings easy and intuitive!
            </p>
          </div>
        </div>

        <div className="python-strings-section">
          <div className="section-content">
            <span className="section-icon">💬</span>
            <h2 className="section-title">Creating Strings</h2>
            <p className="section-text">
              You can create strings using single quotes, double quotes, or triple quotes:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">String Creation</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Different ways to create strings</span><br/>
                  single_quote = <span className="code-string">'Hello World'</span><br/>
                  double_quote = <span className="code-string">"Hello World"</span><br/>
                  triple_quote = <span className="code-string">"""Hello World"""</span><br/>
                  <br/>
                  <span className="code-comment"># Multi-line strings</span><br/>
                  multiline = <span className="code-string">"""This is a<br/>multi-line<br/>string"""</span><br/>
                  <br/>
                  <span className="code-keyword">print</span>(single_quote)<br/>
                  <span className="code-keyword">print</span>(multiline)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-strings-section">
          <div className="section-content">
            <span className="section-icon">🔧</span>
            <h2 className="section-title">String Methods</h2>
            <p className="section-text">
              Python provides many built-in methods to work with strings:
            </p>
            
            <div className="methods-grid">
              <div className="method-card">
                <div className="method-name">upper()</div>
                <div className="method-desc">Convert to uppercase</div>
                <div className="method-example">"hello".upper() → "HELLO"</div>
              </div>
              <div className="method-card">
                <div className="method-name">lower()</div>
                <div className="method-desc">Convert to lowercase</div>
                <div className="method-example">"HELLO".lower() → "hello"</div>
              </div>
              <div className="method-card">
                <div className="method-name">strip()</div>
                <div className="method-desc">Remove whitespace</div>
                <div className="method-example">" hello ".strip() → "hello"</div>
              </div>
              <div className="method-card">
                <div className="method-name">split()</div>
                <div className="method-desc">Split into list</div>
                <div className="method-example">"a,b,c".split(",") → ["a","b","c"]</div>
              </div>
              <div className="method-card">
                <div className="method-name">replace()</div>
                <div className="method-desc">Replace text</div>
                <div className="method-example">"Hello".replace("H","J") → "Jello"</div>
              </div>
              <div className="method-card">
                <div className="method-name">len()</div>
                <div className="method-desc">Get length</div>
                <div className="method-example">len("Hello") → 5</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-strings-section">
          <div className="section-content">
            <span className="section-icon">🔗</span>
            <h2 className="section-title">String Concatenation</h2>
            <p className="section-text">
              Combine strings using the + operator or f-strings:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">String Concatenation</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># String concatenation</span><br/>
                  first_name = <span className="code-string">"John"</span><br/>
                  last_name = <span className="code-string">"Doe"</span><br/>
                  <br/>
                  <span className="code-comment"># Using + operator</span><br/>
                  full_name = first_name + <span className="code-string">" "</span> + last_name<br/>
                  <br/>
                  <span className="code-comment"># Using f-strings (recommended)</span><br/>
                  age = <span className="code-number">25</span><br/>
                  message = <span className="code-string">f"Hello, full_name! You are age years old."</span><br/>
                  <br/>
                  <span className="code-keyword">print</span>(full_name)<br/>
                  <span className="code-keyword">print</span>(message)<br/>
                  <br/>
                  <span className="code-comment"># String repetition</span><br/>
                  repeated = <span className="code-string">"Python "</span> * <span className="code-number">3</span><br/>
                  <span className="code-keyword">print</span>(repeated)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-strings-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Text Processor</h3>
                <p className="challenge-desc">
                  Create a program that takes a sentence, converts it to uppercase, counts the words, 
                  and replaces a specific word with another word.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use upper(), split(), len(), and replace() methods</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      # Text processor<br/>
                      sentence = "Hello world, this is Python programming"<br/>
                      <br/>
                      # Convert to uppercase<br/>
                      upper_sentence = sentence.upper()<br/>
                      print(f"Uppercase: upper_sentence")<br/>
                      <br/>
                      # Count words<br/>
                      words = sentence.split()<br/>
                      word_count = len(words)<br/>
                      print(f"Word count: word_count")<br/>
                      <br/>
                      # Replace word<br/>
                      new_sentence = sentence.replace("Python", "Amazing Python")<br/>
                      print(f"Modified: new_sentence")
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

export default PythonStrings;
