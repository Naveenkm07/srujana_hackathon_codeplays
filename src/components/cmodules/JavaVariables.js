import React from 'react';
import './JavaVariables.css';

function JavaVariables({ onBackClick }) {
  return (
    <div className="java-variables-container">
      <div className="java-variables-content">
        <div className="java-variables-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Variables</h1>
        </div>

        <div className="java-variables-body">
          <div className="intro-section">
            <h2 className="section-title">What are Variables in Java?</h2>
            <p className="section-description">
              Variables in Java are containers that store data values. They have a name, a data type, and a value. Variables allow you to store and manipulate data throughout your program.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Key Concepts</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">Variable Declaration</h3>
                <p className="concept-description">
                  Declare variables by specifying the data type followed by the variable name.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Variable Initialization</h3>
                <p className="concept-description">
                  Assign initial values to variables using the assignment operator (=).
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Variable Naming</h3>
                <p className="concept-description">
                  Use meaningful names following Java naming conventions (camelCase).
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Variable Scope</h3>
                <p className="concept-description">
                  Variables have different scopes: local, instance, and class variables.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Basic Variable Operations
              </h3>
              <p className="code-description">
                Learn how to declare, initialize, and use variables in Java.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Variable declaration and initialization</span><br/>
                  <span className="code-type">int</span> age = <span className="code-number">25</span>; <span className="code-comment">// Integer variable</span><br/>
                  <span className="code-type">String</span> name = <span className="code-string">"Alice"</span>; <span className="code-comment">// String variable</span><br/>
                  <span className="code-type">double</span> height = <span className="code-number">5.6</span>; <span className="code-comment">// Double variable</span><br/>
                  <span className="code-type">boolean</span> isStudent = <span className="code-keyword">true</span>; <span className="code-comment">// Boolean variable</span><br/>
                  <br/>
                  <span className="code-comment">// Variable declaration without initialization</span><br/>
                  <span className="code-type">int</span> score; <span className="code-comment">// Declared but not initialized</span><br/>
                  score = <span className="code-number">95</span>; <span className="code-comment">// Initialize later</span><br/>
                  <br/>
                  <span className="code-comment">// Multiple variables of same type</span><br/>
                  <span className="code-type">int</span> x = <span className="code-number">10</span>, y = <span className="code-number">20</span>, z = <span className="code-number">30</span>;<br/>
                  <br/>
                  <span className="code-comment">// Display variable values</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Name: "</span> + name);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Age: "</span> + age);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Height: "</span> + height + <span className="code-string">" feet"</span>);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Is Student: "</span> + isStudent);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Score: "</span> + score);
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔄</span>
                Variable Manipulation
              </h3>
              <p className="code-description">
                Learn how to modify variable values and perform operations with variables.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Initial values</span><br/>
                  <span className="code-type">int</span> count = <span className="code-number">0</span>;<br/>
                  <span className="code-type">String</span> message = <span className="code-string">"Hello"</span>;<br/>
                  <span className="code-type">double</span> price = <span className="code-number">19.99</span>;<br/>
                  <br/>
                  <span className="code-comment">// Modify variable values</span><br/>
                  count = count + <span className="code-number">1</span>; <span className="code-comment">// Increment count</span><br/>
                  count += <span className="code-number">5</span>; <span className="code-comment">// Add 5 to count</span><br/>
                  <br/>
                  message = message + <span className="code-string">" World"</span>; <span className="code-comment">// Concatenate strings</span><br/>
                  <br/>
                  price = price * <span className="code-number">1.1</span>; <span className="code-comment">// Apply 10% increase</span><br/>
                  <br/>
                  <span className="code-comment">// Create new variables from existing ones</span><br/>
                  <span className="code-type">int</span> doubleCount = count * <span className="code-number">2</span>;<br/>
                  <span className="code-type">String</span> upperMessage = message.toUpperCase();<br/>
                  <span className="code-type">int</span> roundedPrice = (<span className="code-type">int</span>) price;<br/>
                  <br/>
                  <span className="code-comment">// Display results</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Count: "</span> + count);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Double Count: "</span> + doubleCount);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Message: "</span> + message);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Upper Message: "</span> + upperMessage);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Price: $"</span> + price);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Rounded Price: $"</span> + roundedPrice);
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Personal Information Manager</h3>
              <p className="challenge-description">
                Create a program that stores and manipulates personal information using different types of variables.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use different data types (String, int, double, boolean) to store various pieces of information and perform calculations with them.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> PersonalInfoManager &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Personal information variables</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> firstName = <span className="code-string">"John"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> lastName = <span className="code-string">"Doe"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> age = <span className="code-number">28</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> height = <span className="code-number">5.9</span>; <span className="code-comment">// in feet</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> weight = <span className="code-number">165.5</span>; <span className="code-comment">// in pounds</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">boolean</span> isEmployed = <span className="code-keyword">true</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> jobTitle = <span className="code-string">"Software Developer"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Calculate derived information</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> fullName = firstName + <span className="code-string">" "</span> + lastName;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> birthYear = <span className="code-number">2024</span> - age;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> heightInCm = height * <span className="code-number">30.48</span>; <span className="code-comment">// Convert to cm</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> bmi = weight / (height * height) * <span className="code-number">703</span>; <span className="code-comment">// BMI calculation</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Display personal information</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"=== Personal Information ==="</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Full Name: "</span> + fullName);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Age: "</span> + age + <span className="code-string">" years old"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Birth Year: "</span> + birthYear);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Height: "</span> + height + <span className="code-string">" feet ("</span> + String.format(<span className="code-string">"%.1f"</span>, heightInCm) + <span className="code-string">" cm)"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Weight: "</span> + weight + <span className="code-string">" pounds"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"BMI: "</span> + String.format(<span className="code-string">"%.1f"</span>, bmi));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Employment Status: "</span> + (isEmployed ? <span className="code-string">"Employed"</span> : <span className="code-string">"Unemployed"</span>));<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (isEmployed) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Job Title: "</span> + jobTitle);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
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

export default JavaVariables;