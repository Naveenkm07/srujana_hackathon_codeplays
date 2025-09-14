import React from 'react';
import './JavaConditionalStatements.css';

function JavaConditionalStatements({ onBackClick }) {
  return (
    <div className="java-conditionals-container">
      <div className="java-conditionals-content">
        <div className="java-conditionals-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Conditional Statements</h1>
        </div>

        <div className="java-conditionals-body">
          <div className="intro-section">
            <h2 className="section-title">What are Conditional Statements?</h2>
            <p className="section-description">
              Conditional statements allow your program to make decisions and execute different code blocks based on certain conditions. They are essential for creating dynamic and interactive programs.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Key Concepts</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">if Statement</h3>
                <p className="concept-description">
                  Executes code only if a condition is true.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">if-else Statement</h3>
                <p className="concept-description">
                  Executes one block if condition is true, another if false.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">if-else-if Ladder</h3>
                <p className="concept-description">
                  Checks multiple conditions in sequence.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">switch Statement</h3>
                <p className="concept-description">
                  Selects one of many code blocks to execute.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Basic Conditional Statements
              </h3>
              <p className="code-description">
                Learn how to use if, if-else, and if-else-if statements in Java.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">int</span> age = <span className="code-number">18</span>;<br/>
                  <span className="code-type">int</span> score = <span className="code-number">85</span>;<br/>
                  <br/>
                  <span className="code-comment">// Simple if statement</span><br/>
                  <span className="code-keyword">if</span> (age &gt;= <span className="code-number">18</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"You are an adult"</span>);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// if-else statement</span><br/>
                  <span className="code-keyword">if</span> (score &gt;= <span className="code-number">60</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"You passed!"</span>);<br/>
                  &#125; <span className="code-keyword">else</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"You failed!"</span>);<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-comment">// if-else-if ladder</span><br/>
                  <span className="code-keyword">if</span> (score &gt;= <span className="code-number">90</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Grade: A"</span>);<br/>
                  &#125; <span className="code-keyword">else if</span> (score &gt;= <span className="code-number">80</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Grade: B"</span>);<br/>
                  &#125; <span className="code-keyword">else if</span> (score &gt;= <span className="code-number">70</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Grade: C"</span>);<br/>
                  &#125; <span className="code-keyword">else</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Grade: F"</span>);<br/>
                  &#125;
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔄</span>
                Switch Statement
              </h3>
              <p className="code-description">
                Use switch statements for multiple choice scenarios with cleaner syntax.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">int</span> dayOfWeek = <span className="code-number">3</span>;<br/>
                  <span className="code-type">String</span> dayName;<br/>
                  <br/>
                  <span className="code-keyword">switch</span> (dayOfWeek) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> <span className="code-number">1</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span className="code-string">"Monday"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> <span className="code-number">2</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span className="code-string">"Tuesday"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> <span className="code-number">3</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span className="code-string">"Wednesday"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> <span className="code-number">4</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span className="code-string">"Thursday"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">case</span> <span className="code-number">5</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span className="code-string">"Friday"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">default</span>:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dayName = <span className="code-string">"Weekend"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">break</span>;<br/>
                  &#125;<br/>
                  <br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Today is "</span> + dayName);
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Grade Calculator</h3>
              <p className="challenge-description">
                Create a program that takes a student's score and determines their letter grade using conditional statements.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use if-else-if statements to check score ranges and assign appropriate grades (A: 90-100, B: 80-89, C: 70-79, D: 60-69, F: below 60).
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">import</span> java.util.Scanner;<br/>
                  <br/>
                  <span className="code-keyword">public class</span> GradeCalculator &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scanner scanner = <span className="code-keyword">new</span> Scanner(<span className="code-keyword">System.in</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.print</span>(<span className="code-string">"Enter your score (0-100): "</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> score = scanner.nextInt();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> grade;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">if</span> (score &gt;= <span className="code-number">90</span> && score &lt;= <span className="code-number">100</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"A"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else if</span> (score &gt;= <span className="code-number">80</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"B"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else if</span> (score &gt;= <span className="code-number">70</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"C"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else if</span> (score &gt;= <span className="code-number">60</span>) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"D"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className="code-keyword">else</span> &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grade = <span className="code-string">"F"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Your grade is: "</span> + grade);<br/>
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

export default JavaConditionalStatements;