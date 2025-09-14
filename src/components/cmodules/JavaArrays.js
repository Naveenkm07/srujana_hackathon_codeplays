import React from 'react';
import './JavaArrays.css';

function JavaArrays({ onBackClick }) {
  return (
    <div className="java-arrays-container">
      <div className="java-arrays-content">
        <div className="java-arrays-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Arrays</h1>
        </div>

        <div className="java-arrays-body">
          <div className="intro-section">
            <h2 className="section-title">What are Arrays in Java?</h2>
            <p className="section-description">
              Arrays in Java are containers that hold multiple values of the same data type. They provide an efficient way to store and access collections of data.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Key Concepts</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">Array Declaration</h3>
                <p className="concept-description">
                  Arrays are declared with a data type followed by square brackets [].
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Array Initialization</h3>
                <p className="concept-description">
                  Arrays can be initialized with values or with a specific size.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Array Indexing</h3>
                <p className="concept-description">
                  Access array elements using index numbers starting from 0.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Array Length</h3>
                <p className="concept-description">
                  Use the length property to get the number of elements in an array.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Basic Array Operations
              </h3>
              <p className="code-description">
                Learn how to create, initialize, and access array elements in Java.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Array declaration and initialization</span><br/>
                  <span className="code-type">int</span>[] numbers = <span className="code-keyword">new int</span>[<span className="code-number">5</span>]; <span className="code-comment">// Array of 5 integers</span><br/>
                  <span className="code-type">String</span>[] names = &#123;<span className="code-string">"Alice"</span>, <span className="code-string">"Bob"</span>, <span className="code-string">"Charlie"</span>&#125;;<br/>
                  <br/>
                  <span className="code-comment">// Assigning values to array elements</span><br/>
                  numbers[<span className="code-number">0</span>] = <span className="code-number">10</span>;<br/>
                  numbers[<span className="code-number">1</span>] = <span className="code-number">20</span>;<br/>
                  numbers[<span className="code-number">2</span>] = <span className="code-number">30</span>;<br/>
                  <br/>
                  <span className="code-comment">// Accessing array elements</span><br/>
                  <span className="code-keyword">System.out.println</span>(numbers[<span className="code-number">0</span>]); <span className="code-comment">// Output: 10</span><br/>
                  <span className="code-keyword">System.out.println</span>(names[<span className="code-number">1</span>]); <span className="code-comment">// Output: Bob</span><br/>
                  <br/>
                  <span className="code-comment">// Getting array length</span><br/>
                  <span className="code-type">int</span> arrayLength = numbers.length; <span className="code-comment">// Returns 5</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Array length: "</span> + arrayLength);
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔄</span>
                Array Iteration and Manipulation
              </h3>
              <p className="code-description">
                Explore how to loop through arrays and perform common operations.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">int</span>[] scores = &#123;<span className="code-number">85</span>, <span className="code-number">92</span>, <span className="code-number">78</span>, <span className="code-number">96</span>, <span className="code-number">88</span>&#125;;<br/>
                  <br/>
                  <span className="code-comment">// Using for loop to iterate through array</span><br/>
                  <span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">0</span>; i &lt; scores.length; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Score "</span> + (i + <span className="code-number">1</span>) + <span className="code-string">": "</span> + scores[i]);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// Enhanced for loop (for-each loop)</span><br/>
                  <span className="code-keyword">for</span> (<span className="code-type">int</span> score : scores) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Score: "</span> + score);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// Finding maximum value</span><br/>
                  <span className="code-type">int</span> max = scores[<span className="code-number">0</span>];<br/>
                  <span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">1</span>; i &lt; scores.length; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (scores[i] &gt; max) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max = scores[i];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &#125;<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Highest score: "</span> + max);
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Array Statistics</h3>
              <p className="challenge-description">
                Create a program that calculates the average, minimum, and maximum values from an array of numbers.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use loops to iterate through the array and keep track of sum, minimum, and maximum values.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> ArrayStatistics &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span>[] numbers = &#123;<span className="code-number">15</span>, <span className="code-number">23</span>, <span className="code-number">8</span>, <span className="code-number">42</span>, <span className="code-number">17</span>, <span className="code-number">31</span>&#125;;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Calculate sum and average</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> sum = <span className="code-number">0</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> num : numbers) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;sum += num;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> average = (<span className="code-type">double</span>) sum / numbers.length;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Find minimum and maximum</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> min = numbers[<span className="code-number">0</span>];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> max = numbers[<span className="code-number">0</span>];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">1</span>; i &lt; numbers.length; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (numbers[i] &lt; min) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;min = numbers[i];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (numbers[i] &gt; max) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max = numbers[i];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Display results</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Array: "</span> + java.util.Arrays.toString(numbers));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Sum: "</span> + sum);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Average: "</span> + String.format(<span className="code-string">"%.2f"</span>, average));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Minimum: "</span> + min);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Maximum: "</span> + max);<br/>
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

export default JavaArrays;