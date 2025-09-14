import React from 'react';
import './PythonLoops.css';

function PythonLoops({ onBackClick }) {
  return (
    <div className="python-loops-container">
      <div className="python-loops-content">
        <div className="python-loops-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-loops-title">Python Loops</h1>
        </div>

        <div className="python-loops-section">
          <div className="section-content">
            <span className="section-icon">🔄</span>
            <h2 className="section-title">What are Loops?</h2>
            <p className="section-text">
              Loops in Python allow you to repeat a block of code multiple times. They're perfect for 
              automating repetitive tasks and processing collections of data efficiently.
            </p>
          </div>
        </div>

        <div className="python-loops-section">
          <div className="section-content">
            <span className="section-icon">🔁</span>
            <h2 className="section-title">For Loop</h2>
            <p className="section-text">
              The for loop iterates over a sequence (like a list, string, or range) and executes code for each item:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">For Loop Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Loop through a list</span><br/>
                  fruits = [<span className="code-string">"apple"</span>, <span className="code-string">"banana"</span>, <span className="code-string">"orange"</span>]<br/>
                  <span className="code-keyword">for</span> fruit <span className="code-keyword">in</span> fruits:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"I like fruit"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Loop through a string</span><br/>
                  word = <span className="code-string">"Python"</span><br/>
                  <span className="code-keyword">for</span> letter <span className="code-keyword">in</span> word:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(letter)<br/>
                  <br/>
                  <span className="code-comment"># Loop with range</span><br/>
                  <span className="code-keyword">for</span> i <span className="code-keyword">in</span> <span className="code-keyword">range</span>(<span className="code-number">5</span>):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"Number: i"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-loops-section">
          <div className="section-content">
            <span className="section-icon">⏰</span>
            <h2 className="section-title">While Loop</h2>
            <p className="section-text">
              The while loop repeats code as long as a condition is True:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">While Loop Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Count from 1 to 5</span><br/>
                  count = <span className="code-number">1</span><br/>
                  <span className="code-keyword">while</span> count &lt;= <span className="code-number">5</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"Count: count"</span>)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;count += <span className="code-number">1</span><br/>
                  <br/>
                  <span className="code-comment"># User input loop</span><br/>
                  name = <span className="code-string">""</span><br/>
                  <span className="code-keyword">while</span> name != <span className="code-string">"quit"</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;name = <span className="code-keyword">input</span>(<span className="code-string">"Enter your name (or 'quit' to exit): "</span>)<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> name != <span className="code-string">"quit"</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"Hello, name!"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-loops-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Loop Control</h2>
            <p className="section-text">
              Control loop execution with break, continue, and else statements:
            </p>
            
            <div className="control-grid">
              <div className="control-card">
                <div className="control-name">break</div>
                <div className="control-desc">Exit the loop immediately</div>
                <div className="control-example">if condition: break</div>
              </div>
              <div className="control-card">
                <div className="control-name">continue</div>
                <div className="control-desc">Skip to next iteration</div>
                <div className="control-example">if condition: continue</div>
              </div>
              <div className="control-card">
                <div className="control-name">else</div>
                <div className="control-desc">Execute when loop ends normally</div>
                <div className="control-example">else: print("Done")</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-loops-section">
          <div className="section-content">
            <span className="section-icon">💻</span>
            <h2 className="section-title">Practical Examples</h2>
            <p className="section-text">
              Real-world examples of loops in action:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">Loop Examples</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Sum numbers in a list</span><br/>
                  numbers = [<span className="code-number">1</span>, <span className="code-number">2</span>, <span className="code-number">3</span>, <span className="code-number">4</span>, <span className="code-number">5</span>]<br/>
                  total = <span className="code-number">0</span><br/>
                  <span className="code-keyword">for</span> num <span className="code-keyword">in</span> numbers:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;total += num<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Sum: total"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Find even numbers</span><br/>
                  <span className="code-keyword">for</span> i <span className="code-keyword">in</span> <span className="code-keyword">range</span>(<span className="code-number">1</span>, <span className="code-number">11</span>):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> i % <span className="code-number">2</span> == <span className="code-number">0</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"i is even"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Nested loops</span><br/>
                  <span className="code-keyword">for</span> i <span className="code-keyword">in</span> <span className="code-keyword">range</span>(<span className="code-number">3</span>):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> j <span className="code-keyword">in</span> <span className="code-keyword">range</span>(<span className="code-number">3</span>):<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"(i, j)"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-loops-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Number Guessing Game</h3>
                <p className="challenge-desc">
                  Create a number guessing game where the user tries to guess a random number between 1 and 10. 
                  Use a while loop to keep asking until they guess correctly.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use random.randint() to generate a random number and while loop for the game loop</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      import random<br/>
                      <br/>
                      # Generate random number<br/>
                      secret_number = random.randint(1, 10)<br/>
                      guess = 0<br/>
                      attempts = 0<br/>
                      <br/>
                      print("Guess a number between 1 and 10!")<br/>
                      <br/>
                      while guess != secret_number:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;guess = int(input("Enter your guess: "))<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;attempts += 1<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;if guess &lt; secret_number:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Too low!")<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;elif guess &gt; secret_number:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print("Too high!")<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;else:<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"Correct! You guessed it in attempts attempts!")
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

export default PythonLoops;
