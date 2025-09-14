import React from 'react';
import './JavaIntroduction.css';

function JavaIntroduction({ onBackClick }) {
  return (
    <div className="java-introduction-container">
      <div className="java-introduction-content">
        <div className="java-introduction-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Introduction</h1>
        </div>

        <div className="java-introduction-body">
          <div className="intro-section">
            <h2 className="section-title">What is Java?</h2>
            <p className="section-description">
              Java is a powerful, object-oriented programming language that is platform-independent, meaning Java programs can run on any device that has a Java Virtual Machine (JVM). It's widely used for building enterprise applications, mobile apps, and web services.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Key Features of Java</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">Platform Independent</h3>
                <p className="concept-description">
                  "Write once, run anywhere" - Java code runs on any platform with JVM.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Object-Oriented</h3>
                <p className="concept-description">
                  Everything in Java is an object, making code organized and reusable.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Secure</h3>
                <p className="concept-description">
                  Built-in security features protect against viruses and unauthorized access.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Multithreaded</h3>
                <p className="concept-description">
                  Java supports concurrent programming with built-in thread support.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Your First Java Program</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Hello World Program
              </h3>
              <p className="code-description">
                Every Java program starts with a class and a main method. Here's the classic "Hello World" example.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-keyword">public class</span> HelloWorld &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Hello, World!"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &#125;
                </code>
              </div>
              <div className="code-explanation">
                <h4>What it does:</h4>
                <ul>
                  <li><strong>public class HelloWorld:</strong> Creates a public class named HelloWorld</li>
                  <li><strong>public static void main:</strong> The main method where program execution begins</li>
                  <li><strong>String[] args:</strong> Command-line arguments (optional)</li>
                  <li><strong>System.out.println:</strong> Prints text to the console</li>
                </ul>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔧</span>
                Java Program Structure
              </h3>
              <p className="code-description">
                Understanding the basic structure and components of a Java program.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// This is a comment - ignored by the compiler</span><br/>
                  <br/>
                  <span className="code-keyword">public class</span> MyFirstProgram &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Class body starts here</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Main method - program entry point</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Variable declaration</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> message = <span className="code-string">"Welcome to Java!"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> year = <span className="code-number">2024</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Output statements</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(message);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Current year: "</span> + year);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Simple calculation</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> nextYear = year + <span className="code-number">1</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Next year will be: "</span> + nextYear);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &#125;
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Personal Introduction</h3>
              <p className="challenge-description">
                Create your first Java program that introduces yourself with your name, age, and a fun fact.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use variables to store your information and System.out.println() to display it. Remember to use proper Java syntax with semicolons and curly braces.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> PersonalIntroduction &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Personal information</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> name = <span className="code-string">"Alex"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> age = <span className="code-number">20</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> hobby = <span className="code-string">"programming"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> funFact = <span className="code-string">"I love solving puzzles!"</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Display introduction</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Hello! My name is "</span> + name);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"I am "</span> + age + <span className="code-string">" years old"</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"My hobby is "</span> + hobby);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Fun fact: "</span> + funFact);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Calculate years until 25</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> yearsUntil25 = <span className="code-number">25</span> - age;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"I will be 25 in "</span> + yearsUntil25 + <span className="code-string">" years"</span>);<br/>
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

export default JavaIntroduction;