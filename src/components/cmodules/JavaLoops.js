import React from 'react';
import './JavaLoops.css';

function JavaLoops({ onBackClick }) {
  return (
    <div className="java-loops-container">
      <div className="java-loops-content">
        <div className="java-loops-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Loops</h1>
        </div>

        <div className="java-loops-body">
          <div className="intro-section">
            <h2 className="section-title">What are Loops in Java?</h2>
            <p className="section-description">
              Loops in Java allow you to execute a block of code repeatedly. They are essential for automating repetitive tasks and processing collections of data efficiently.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Types of Loops</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">for Loop</h3>
                <p className="concept-description">
                  Executes code a specific number of times with initialization, condition, and increment.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">while Loop</h3>
                <p className="concept-description">
                  Repeats code while a condition is true. Checks condition before each iteration.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">do-while Loop</h3>
                <p className="concept-description">
                  Executes code at least once, then repeats while condition is true.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Enhanced for Loop</h3>
                <p className="concept-description">
                  Iterates through arrays and collections with simplified syntax.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Basic Loop Types
              </h3>
              <p className="code-description">
                Learn how to use different types of loops in Java with practical examples.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// for loop - count from 1 to 5</span><br/>
                  <span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">1</span>; i &lt;= <span className="code-number">5</span>; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Count: "</span> + i);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// while loop - count down from 5</span><br/>
                  <span className="code-type">int</span> count = <span className="code-number">5</span>;<br/>
                  <span className="code-keyword">while</span> (count &gt; <span className="code-number">0</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Countdown: "</span> + count);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;count--; <span className="code-comment">// Decrement count</span><br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// do-while loop - executes at least once</span><br/>
                  <span className="code-type">int</span> number = <span className="code-number">10</span>;<br/>
                  <span className="code-keyword">do</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Number: "</span> + number);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;number += <span className="code-number">5</span>;<br/>
                  &#125; <span className="code-keyword">while</span> (number &lt; <span className="code-number">25</span>);
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔄</span>
                Enhanced for Loop and Array Iteration
              </h3>
              <p className="code-description">
                Use enhanced for loops to iterate through arrays and collections easily.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Array of fruits</span><br/>
                  <span className="code-type">String</span>[] fruits = &#123;<span className="code-string">"Apple"</span>, <span className="code-string">"Banana"</span>, <span className="code-string">"Orange"</span>, <span className="code-string">"Grape"</span>&#125;;<br/>
                  <br/>
                  <span className="code-comment">// Traditional for loop</span><br/>
                  <span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">0</span>; i &lt; fruits.length; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Fruit "</span> + (i + <span className="code-number">1</span>) + <span className="code-string">": "</span> + fruits[i]);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// Enhanced for loop (for-each)</span><br/>
                  <span className="code-keyword">for</span> (<span className="code-type">String</span> fruit : fruits) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"I like "</span> + fruit);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// Array of numbers</span><br/>
                  <span className="code-type">int</span>[] numbers = &#123;<span className="code-number">10</span>, <span className="code-number">20</span>, <span className="code-number">30</span>, <span className="code-number">40</span>, <span className="code-number">50</span>&#125;;<br/>
                  <span className="code-type">int</span> sum = <span className="code-number">0</span>;<br/>
                  <br/>
                  <span className="code-comment">// Calculate sum using enhanced for loop</span><br/>
                  <span className="code-keyword">for</span> (<span className="code-type">int</span> num : numbers) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;sum += num;<br/>
                  &#125;<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Sum of numbers: "</span> + sum);
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Number Pattern Generator</h3>
              <p className="challenge-description">
                Create a program that generates different number patterns using various types of loops.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use nested for loops to create patterns. Try creating a triangle of numbers or a multiplication table.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> NumberPatterns &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Pattern 1: Number triangle</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Number Triangle:"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">1</span>; i &lt;= <span className="code-number">5</span>; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> j = <span className="code-number">1</span>; j &lt;= i; j++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.print</span>(j + <span className="code-string">" "</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(); <span className="code-comment">// New line</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Pattern 2: Multiplication table</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"\nMultiplication Table (5x5):"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">1</span>; i &lt;= <span className="code-number">5</span>; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> j = <span className="code-number">1</span>; j &lt;= <span className="code-number">5</span>; j++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> result = i * j;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.print</span>(result + <span className="code-string">"\t"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Pattern 3: Even numbers using while loop</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"\nEven numbers from 2 to 20:"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> evenNum = <span className="code-number">2</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">while</span> (evenNum &lt;= <span className="code-number">20</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.print</span>(evenNum + <span className="code-string">" "</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;evenNum += <span className="code-number">2</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &#125;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JavaLoops;