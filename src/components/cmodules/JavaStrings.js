import React from 'react';
import './JavaStrings.css';

function JavaStrings({ onBackClick }) {
  return (
    <div className="java-strings-container">
      <div className="java-strings-content">
        <div className="java-strings-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Strings</h1>
        </div>

        <div className="java-strings-body">
          <div className="intro-section">
            <h2 className="section-title">What are Strings in Java?</h2>
            <p className="section-description">
              Strings in Java are sequences of characters used to store text data. They are one of the most commonly used data types in Java programming.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Key Concepts</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">String Declaration</h3>
                <p className="concept-description">
                  Strings can be declared using the String keyword and assigned text values.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">String Methods</h3>
                <p className="concept-description">
                  Java provides many built-in methods to manipulate strings like length(), toUpperCase(), etc.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">String Concatenation</h3>
                <p className="concept-description">
                  You can combine strings using the + operator or concat() method.
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">String Comparison</h3>
                <p className="concept-description">
                  Use equals() method to compare string contents, not == operator.
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Basic String Operations
              </h3>
              <p className="code-description">
                Learn how to create, manipulate, and work with strings in Java.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Creating strings</span><br/>
                  <span className="code-type">String</span> name = <span className="code-string">"Alice"</span>;<br/>
                  <span className="code-type">String</span> greeting = <span className="code-string">"Hello"</span>;<br/>
                  <br/>
                  <span className="code-comment">// String concatenation</span><br/>
                  <span className="code-type">String</span> message = greeting + <span className="code-string">" "</span> + name;<br/>
                  <span className="code-keyword">System.out.println</span>(message); <span className="code-comment">// Output: Hello Alice</span><br/>
                  <br/>
                  <span className="code-comment">// String methods</span><br/>
                  <span className="code-type">int</span> length = name.length(); <span className="code-comment">// Gets string length</span><br/>
                  <span className="code-type">String</span> upperName = name.toUpperCase(); <span className="code-comment">// Converts to uppercase</span><br/>
                  <span className="code-type">String</span> lowerName = name.toLowerCase(); <span className="code-comment">// Converts to lowercase</span><br/>
                  <br/>
                  <span className="code-comment">// String comparison</span><br/>
                  <span className="code-type">boolean</span> isEqual = name.equals(<span className="code-string">"Alice"</span>); <span className="code-comment">// true</span><br/>
                  <span className="code-type">boolean</span> isEmpty = name.isEmpty(); <span className="code-comment">// false</span>
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔍</span>
                String Searching and Manipulation
              </h3>
              <p className="code-description">
                Explore advanced string operations like searching, replacing, and extracting substrings.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-type">String</span> text = <span className="code-string">"Java Programming is fun!"</span>;<br/>
                  <br/>
                  <span className="code-comment">// Finding characters and substrings</span><br/>
                  <span className="code-type">int</span> index = text.indexOf(<span className="code-string">"Java"</span>); <span className="code-comment">// Returns 0</span><br/>
                  <span className="code-type">boolean</span> contains = text.contains(<span className="code-string">"fun"</span>); <span className="code-comment">// Returns true</span><br/>
                  <br/>
                  <span className="code-comment">// Extracting substrings</span><br/>
                  <span className="code-type">String</span> firstWord = text.substring(<span className="code-number">0</span>, <span className="code-number">4</span>); <span className="code-comment">// "Java"</span><br/>
                  <span className="code-type">String</span> lastPart = text.substring(<span className="code-number">5</span>); <span className="code-comment">// "Programming is fun!"</span><br/>
                  <br/>
                  <span className="code-comment">// Replacing text</span><br/>
                  <span className="code-type">String</span> newText = text.replace(<span className="code-string">"fun"</span>, <span className="code-string">"awesome"</span>);<br/>
                  <span className="code-comment">// Result: "Java Programming is awesome!"</span><br/>
                  <br/>
                  <span className="code-comment">// Trimming whitespace</span><br/>
                  <span className="code-type">String</span> spaced = <span className="code-string">"  Hello World  "</span>;<br/>
                  <span className="code-type">String</span> trimmed = spaced.trim(); <span className="code-comment">// "Hello World"</span>
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: String Manipulation</h3>
              <p className="challenge-description">
                Create a program that takes a user's full name and formats it properly.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use string methods like toLowerCase(), substring(), and concatenation to format the name as "First Last" with proper capitalization.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">import</span> java.util.Scanner;<br/>
                  <br/>
                  <span className="code-keyword">public class</span> NameFormatter &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Scanner scanner = <span className="code-keyword">new</span> Scanner(<span className="code-keyword">System.in</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Get user input</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.print</span>(<span className="code-string">"Enter your first name: "</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> firstName = scanner.nextLine();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.print</span>(<span className="code-string">"Enter your last name: "</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> lastName = scanner.nextLine();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Format the name</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> formattedFirst = firstName.substring(<span className="code-number">0</span>, <span className="code-number">1</span>).toUpperCase() +<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;firstName.substring(<span className="code-number">1</span>).toLowerCase();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> formattedLast = lastName.substring(<span className="code-number">0</span>, <span className="code-number">1</span>).toUpperCase() +<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;lastName.substring(<span className="code-number">1</span>).toLowerCase();<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Display formatted name</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">String</span> fullName = formattedFirst + <span className="code-string">" "</span> + formattedLast;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Formatted name: "</span> + fullName);<br/>
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

export default JavaStrings;