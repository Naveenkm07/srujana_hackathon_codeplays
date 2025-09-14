import React from 'react';
import './JavaMethods.css';

function JavaMethods({ onBackClick }) {
  return (
    <div className="java-methods-container">
      <div className="java-methods-content">
        <div className="java-methods-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Methods</h1>
        </div>

        <div className="java-methods-body">
          <div className="intro-section">
            <h2 className="section-title">What are Methods in Java?</h2>
            <p className="section-description">
              Methods in Java are blocks of code that perform specific tasks and can be called repeatedly. They help organize code, make it reusable, and improve readability by breaking complex programs into smaller, manageable pieces.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Key Concepts</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">Method Declaration</h3>
                <p className="concept-description">
                  Define methods with access modifier, return type, method name, and parameters.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Method Parameters</h3>
                <p className="concept-description">
                  Pass data to methods through parameters for flexible and reusable code.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Return Values</h3>
                <p className="concept-description">
                  Methods can return values using the return statement and specify return types.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Method Overloading</h3>
                <p className="concept-description">
                  Create multiple methods with the same name but different parameters.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Basic Method Declaration and Usage
              </h3>
              <p className="code-description">
                Learn how to create and call methods in Java with different return types and parameters.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-keyword">public class</span> MethodExamples &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Method with no parameters and no return value</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> greet() &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Hello, World!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Method with parameters and no return value</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> greetPerson(<span className="code-type">String</span> name) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Hello, "</span> + name + <span className="code-string">"!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Method with parameters and return value</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static int</span> add(<span className="code-type">int</span> a, <span className="code-type">int</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> sum = a + b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> sum;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Calling methods</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;greet();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;greetPerson(<span className="code-string">"Alice"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> result = add(<span className="code-number">5</span>, <span className="code-number">3</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Sum: "</span> + result);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &#125;
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔄</span>
                Method Overloading and Advanced Examples
              </h3>
              <p className="code-description">
                Explore method overloading and more complex method examples with different data types.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-keyword">public class</span> AdvancedMethods &#123;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Method overloading - same name, different parameters</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> calculateArea(<span className="code-type">double</span> radius) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-number">3.14159</span> * radius * radius; <span className="code-comment">// Circle area</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> calculateArea(<span className="code-type">double</span> length, <span className="code-type">double</span> width) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> length * width; <span className="code-comment">// Rectangle area</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> calculateArea(<span className="code-type">double</span> base, <span className="code-type">double</span> height, <span className="code-type">String</span> shape) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (shape.equals(<span className="code-string">"triangle"</span>)) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-number">0.5</span> * base * height; <span className="code-comment">// Triangle area</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-number">0</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Method with array parameter</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static int</span> findMax(<span className="code-type">int</span>[] numbers) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> max = numbers[<span className="code-number">0</span>];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">1</span>; i &lt; numbers.length; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (numbers[i] &gt; max) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;max = numbers[i];<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> max;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Using overloaded methods</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> circleArea = calculateArea(<span className="code-number">5.0</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> rectangleArea = calculateArea(<span className="code-number">4.0</span>, <span className="code-number">6.0</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> triangleArea = calculateArea(<span className="code-number">3.0</span>, <span className="code-number">4.0</span>, <span className="code-string">"triangle"</span>);<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Circle area: "</span> + circleArea);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Rectangle area: "</span> + rectangleArea);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Triangle area: "</span> + triangleArea);<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Using array method</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span>[] numbers = &#123;<span className="code-number">10</span>, <span className="code-number">25</span>, <span className="code-number">5</span>, <span className="code-number">40</span>, <span className="code-number">15</span>&#125;;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> maximum = findMax(numbers);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Maximum number: "</span> + maximum);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &#125;
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Calculator with Methods</h3>
              <p className="challenge-description">
                Create a calculator program using methods for different mathematical operations.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Create separate methods for addition, subtraction, multiplication, and division. Use method overloading to handle different data types.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> MethodCalculator &#123;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Addition methods</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static int</span> add(<span className="code-type">int</span> a, <span className="code-type">int</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a + b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> add(<span className="code-type">double</span> a, <span className="code-type">double</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a + b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Subtraction methods</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static int</span> subtract(<span className="code-type">int</span> a, <span className="code-type">int</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a - b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> subtract(<span className="code-type">double</span> a, <span className="code-type">double</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a - b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Multiplication methods</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static int</span> multiply(<span className="code-type">int</span> a, <span className="code-type">int</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a * b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> multiply(<span className="code-type">double</span> a, <span className="code-type">double</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a * b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Division methods</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> divide(<span className="code-type">int</span> a, <span className="code-type">int</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (b == <span className="code-number">0</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Error: Division by zero!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-number">0</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> (<span className="code-type">double</span>) a / b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> divide(<span className="code-type">double</span> a, <span className="code-type">double</span> b) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (b == <span className="code-number">0</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Error: Division by zero!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> <span className="code-number">0</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> a / b;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Power method</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static double</span> power(<span className="code-type">double</span> base, <span className="code-type">int</span> exponent) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> result = <span className="code-number">1</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">for</span> (<span className="code-type">int</span> i = <span className="code-number">0</span>; i &lt; exponent; i++) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;result *= base;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">return</span> result;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Test integer operations</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> a = <span className="code-number">15</span>, b = <span className="code-number">4</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Integer Operations:"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(a + <span className="code-string">" + "</span> + b + <span className="code-string">" = "</span> + add(a, b));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(a + <span className="code-string">" - "</span> + b + <span className="code-string">" = "</span> + subtract(a, b));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(a + <span className="code-string">" * "</span> + b + <span className="code-string">" = "</span> + multiply(a, b));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(a + <span className="code-string">" / "</span> + b + <span className="code-string">" = "</span> + divide(a, b));<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Test double operations</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> x = <span className="code-number">7.5</span>, y = <span className="code-number">2.5</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"\nDouble Operations:"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(x + <span className="code-string">" + "</span> + y + <span className="code-string">" = "</span> + add(x, y));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(x + <span className="code-string">" - "</span> + y + <span className="code-string">" = "</span> + subtract(x, y));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(x + <span className="code-string">" * "</span> + y + <span className="code-string">" = "</span> + multiply(x, y));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(x + <span className="code-string">" / "</span> + y + <span className="code-string">" = "</span> + divide(x, y));<br/>
                  <br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Test power operation</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"\nPower Operation:"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-number">2</span> + <span className="code-string">"^"</span> + <span className="code-number">8</span> + <span className="code-string">" = "</span> + power(<span className="code-number">2</span>, <span className="code-number">8</span>));<br/>
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

export default JavaMethods;