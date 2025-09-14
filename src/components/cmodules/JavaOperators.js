import React from 'react';
import './JavaOperators.css';

function JavaOperators({ onBackClick }) {
  return (
    <div className="java-operators-container">
      <div className="java-operators-content">
        <div className="java-operators-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Operators</h1>
        </div>

        <div className="java-operators-body">
          <div className="intro-section">
            <h2 className="section-title">What are Operators in Java?</h2>
            <p className="section-description">
              Operators in Java are special symbols that perform specific operations on one, two, or three operands and return a result. They are essential for performing calculations, comparisons, and logical operations.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Types of Operators</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">Arithmetic Operators</h3>
                <p className="concept-description">
                  +, -, *, /, % for mathematical operations like addition, subtraction, multiplication, division, and modulus.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Comparison Operators</h3>
                <p className="concept-description">
                  ==, !=, &lt;, &gt;, &lt;=, &gt;= for comparing values and returning boolean results.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Logical Operators</h3>
                <p className="concept-description">
                  &&, ||, ! for combining boolean expressions and logical operations.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Assignment Operators</h3>
                <p className="concept-description">
                  =, +=, -=, *=, /=, %= for assigning values and performing operations simultaneously.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Arithmetic Operators
              </h3>
              <p className="code-description">
                Learn how to perform basic mathematical operations using arithmetic operators.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">int</span> a = <span className="code-number">10</span>;<br/>
                  <span className="code-type">int</span> b = <span className="code-number">3</span>;<br/>
                  <br/>
                  <span className="code-comment">// Basic arithmetic operations</span><br/>
                  <span className="code-type">int</span> sum = a + b; <span className="code-comment">// Addition: 13</span><br/>
                  <span className="code-type">int</span> difference = a - b; <span className="code-comment">// Subtraction: 7</span><br/>
                  <span className="code-type">int</span> product = a * b; <span className="code-comment">// Multiplication: 30</span><br/>
                  <span className="code-type">int</span> quotient = a / b; <span className="code-comment">// Division: 3</span><br/>
                  <span className="code-type">int</span> remainder = a % b; <span className="code-comment">// Modulus: 1</span><br/>
                  <br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Sum: "</span> + sum);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Difference: "</span> + difference);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Product: "</span> + product);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Quotient: "</span> + quotient);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Remainder: "</span> + remainder);
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔍</span>
                Comparison and Logical Operators
              </h3>
              <p className="code-description">
                Use comparison operators to compare values and logical operators to combine conditions.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">int</span> x = <span className="code-number">15</span>;<br/>
                  <span className="code-type">int</span> y = <span className="code-number">10</span>;<br/>
                  <span className="code-type">int</span> z = <span className="code-number">20</span>;<br/>
                  <br/>
                  <span className="code-comment">// Comparison operators</span><br/>
                  <span className="code-type">boolean</span> isEqual = (x == y); <span className="code-comment">// false</span><br/>
                  <span className="code-type">boolean</span> isNotEqual = (x != y); <span className="code-comment">// true</span><br/>
                  <span className="code-type">boolean</span> isGreater = (x &gt; y); <span className="code-comment">// true</span><br/>
                  <span className="code-type">boolean</span> isLess = (x &lt; z); <span className="code-comment">// true</span><br/>
                  <br/>
                  <span className="code-comment">// Logical operators</span><br/>
                  <span className="code-type">boolean</span> andResult = (x &gt; y) && (x &lt; z); <span className="code-comment">// true && true = true</span><br/>
                  <span className="code-type">boolean</span> orResult = (x &lt; y) || (x &gt; y); <span className="code-comment">// false || true = true</span><br/>
                  <span className="code-type">boolean</span> notResult = !(x == y); <span className="code-comment">// !false = true</span><br/>
                  <br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"x equals y: "</span> + isEqual);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"x greater than y: "</span> + isGreater);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"AND result: "</span> + andResult);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"OR result: "</span> + orResult);
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">⚡</span>
                Assignment Operators
              </h3>
              <p className="code-description">
                Use assignment operators to assign values and perform operations in a single step.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">int</span> num = <span className="code-number">10</span>;<br/>
                  <br/>
                  <span className="code-comment">// Basic assignment</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Initial value: "</span> + num);<br/>
                  <br/>
                  <span className="code-comment">// Compound assignment operators</span><br/>
                  num += <span className="code-number">5</span>; <span className="code-comment">// num = num + 5 (15)</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"After += 5: "</span> + num);<br/>
                  <br/>
                  num -= <span className="code-number">3</span>; <span className="code-comment">// num = num - 3 (12)</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"After -= 3: "</span> + num);<br/>
                  <br/>
                  num *= <span className="code-number">2</span>; <span className="code-comment">// num = num * 2 (24)</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"After *= 2: "</span> + num);<br/>
                  <br/>
                  num /= <span className="code-number">4</span>; <span className="code-comment">// num = num / 4 (6)</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"After /= 4: "</span> + num);<br/>
                  <br/>
                  num %= <span className="code-number">5</span>; <span className="code-comment">// num = num % 5 (1)</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"After %= 5: "</span> + num);
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Calculator Program</h3>
              <p className="challenge-description">
                Create a simple calculator program that performs basic arithmetic operations using different operators.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use arithmetic operators for calculations, comparison operators for validation, and logical operators for decision making.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> SimpleCalculator &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> num1 = <span className="code-number">15.5</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> num2 = <span className="code-number">4.2</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">char</span> operation = <span className="code-string">'+'</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> result = <span className="code-number">0</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Perform calculation based on operation</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (operation == <span className="code-string">'+'</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = num1 + num2;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else if</span> (operation == <span className="code-string">'-'</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = num1 - num2;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else if</span> (operation == <span className="code-string">'*'</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = num1 * num2;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else if</span> (operation == <span className="code-string">'/'</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Check for division by zero</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (num2 != <span className="code-number">0</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result = num1 / num2;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Error: Division by zero!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Invalid operation!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Display result</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(num1 + <span className="code-string">" "</span> + operation + <span className="code-string">" "</span> + num2 + <span className="code-string">" = "</span> + result);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Additional operations using compound assignment</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> counter = <span className="code-number">0</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;counter += <span className="code-number">1</span>; <span className="code-comment">// Increment counter</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Calculations performed: "</span> + counter);<br/>
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

export default JavaOperators;