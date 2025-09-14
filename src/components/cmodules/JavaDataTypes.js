import React from 'react';
import './JavaDataTypes.css';

function JavaDataTypes({ onBackClick }) {
  return (
    <div className="java-datatypes-container">
      <div className="java-datatypes-content">
        <div className="java-datatypes-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Java Module
          </button>
          <h1 className="page-title">Java Data Types</h1>
        </div>

        <div className="java-datatypes-body">
          <div className="intro-section">
            <h2 className="section-title">What are Data Types in Java?</h2>
            <p className="section-description">
              Data types in Java specify the type of data that can be stored in variables. Java has two main categories: primitive data types and reference data types.
            </p>
          </div>

          <div className="concept-section">
            <h2 className="section-title">Primitive Data Types</h2>
            <div className="concept-grid">
              <div className="concept-card">
                <h3 className="concept-title">Integer Types</h3>
                <p className="concept-description">
                  byte (8-bit), short (16-bit), int (32-bit), long (64-bit)
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Floating-Point Types</h3>
                <p className="concept-description">
                  float (32-bit), double (64-bit) for decimal numbers
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Character Type</h3>
                <p className="concept-description">
                  char (16-bit) for single Unicode characters
                </p>
              </div>
              <div className="concept-card">
                <h3 className="concept-title">Boolean Type</h3>
                <p className="concept-description">
                  boolean for true/false values
                </p>
              </div>
            </div>
          </div>

          <div className="example-section">
            <h2 className="section-title">Code Examples</h2>
            
            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">💻</span>
                Primitive Data Types
              </h3>
              <p className="code-description">
                Learn how to declare and use different primitive data types in Java.
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Integer types</span><br/>
                  <span className="code-type">byte</span> smallNumber = <span className="code-number">127</span>; <span className="code-comment">// -128 to 127</span><br/>
                  <span className="code-type">short</span> mediumNumber = <span className="code-number">32000</span>; <span className="code-comment">// -32,768 to 32,767</span><br/>
                  <span className="code-type">int</span> regularNumber = <span className="code-number">1000000</span>; <span className="code-comment">// Most commonly used</span><br/>
                  <span className="code-type">long</span> bigNumber = <span className="code-number">1234567890L</span>; <span className="code-comment">// Note the 'L' suffix</span><br/>
                  <br/>
                  <span className="code-comment">// Floating-point types</span><br/>
                  <span className="code-type">float</span> decimalNumber = <span className="code-number">3.14f</span>; <span className="code-comment">// Note the 'f' suffix</span><br/>
                  <span className="code-type">double</span> preciseNumber = <span className="code-number">3.14159265359</span>; <span className="code-comment">// More precise</span><br/>
                  <br/>
                  <span className="code-comment">// Character type</span><br/>
                  <span className="code-type">char</span> letter = <span className="code-string">'A'</span>; <span className="code-comment">// Single quotes for char</span><br/>
                  <span className="code-type">char</span> unicodeChar = <span className="code-string">'\u0041'</span>; <span className="code-comment">// Unicode for 'A'</span><br/>
                  <br/>
                  <span className="code-comment">// Boolean type</span><br/>
                  <span className="code-type">boolean</span> isJavaFun = <span className="code-keyword">true</span>;<br/>
                  <span className="code-type">boolean</span> isLearning = <span className="code-keyword">false</span>;<br/>
                  <br/>
                  <span className="code-comment">// Display values</span><br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Integer: "</span> + regularNumber);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Float: "</span> + decimalNumber);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Character: "</span> + letter);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Boolean: "</span> + isJavaFun);
                </code>
              </div>
            </div>

            <div className="code-section">
              <h3 className="code-title">
                <span className="code-icon">🔢</span>
                Type Conversion and Casting
              </h3>
              <p className="code-description">
                Learn about automatic type conversion (widening) and explicit casting (narrowing).
              </p>
              <div className="code-block">
                <code>
                  <span className="code-comment">// Automatic type conversion (widening)</span><br/>
                  <span className="code-type">int</span> intValue = <span className="code-number">100</span>;<br/>
                  <span className="code-type">long</span> longValue = intValue; <span className="code-comment">// Automatic conversion</span><br/>
                  <span className="code-type">float</span> floatValue = intValue; <span className="code-comment">// Automatic conversion</span><br/>
                  <span className="code-type">double</span> doubleValue = floatValue; <span className="code-comment">// Automatic conversion</span><br/>
                  <br/>
                  <span className="code-comment">// Explicit casting (narrowing)</span><br/>
                  <span className="code-type">double</span> doubleNum = <span className="code-number">9.78</span>;<br/>
                  <span className="code-type">int</span> intNum = (<span className="code-type">int</span>) doubleNum; <span className="code-comment">// Explicit cast</span><br/>
                  <br/>
                  <span className="code-comment">// Character to integer conversion</span><br/>
                  <span className="code-type">char</span> ch = <span className="code-string">'A'</span>;<br/>
                  <span className="code-type">int</span> asciiValue = ch; <span className="code-comment">// Gets ASCII value (65)</span><br/>
                  <br/>
                  <span className="code-comment">// Integer to character conversion</span><br/>
                  <span className="code-type">int</span> num = <span className="code-number">66</span>;<br/>
                  <span className="code-type">char</span> character = (<span className="code-type">char</span>) num; <span className="code-comment">// Gets 'B'</span><br/>
                  <br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Double: "</span> + doubleNum);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Int (casted): "</span> + intNum);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"ASCII of A: "</span> + asciiValue);<br/>
                  <span className="code-keyword">System.out.println</span>(<span className="code-string">"Character from 66: "</span> + character);
                </code>
              </div>
            </div>
          </div>

          <div className="try-section">
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <h3 className="challenge-title">Challenge: Data Type Calculator</h3>
              <p className="challenge-description">
                Create a program that demonstrates different data types and performs type conversions.
              </p>
              <div className="hint-box">
                <strong>Hint:</strong> Use different primitive types, perform calculations, and demonstrate both automatic and explicit type conversions.
              </div>
              <div className="solution-code">
                <code>
                  <span className="code-keyword">public class</span> DataTypeCalculator &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">public static void</span> main(<span className="code-type">String</span>[] args) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Different data types</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">byte</span> byteValue = <span className="code-number">10</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">short</span> shortValue = <span className="code-number">20</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> intValue = <span className="code-number">30</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">long</span> longValue = <span className="code-number">40L</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">float</span> floatValue = <span className="code-number">3.14f</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> doubleValue = <span className="code-number">2.71828</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">char</span> charValue = <span className="code-string">'X'</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">boolean</span> boolValue = <span className="code-keyword">true</span>;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Automatic type conversion</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">double</span> sum = byteValue + shortValue + intValue + longValue + floatValue + doubleValue;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Explicit casting</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> castedSum = (<span className="code-type">int</span>) sum;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Character operations</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">int</span> asciiValue = charValue;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-type">char</span> nextChar = (<span className="code-type">char</span>) (asciiValue + <span className="code-number">1</span>);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-comment">// Display results</span><br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Sum of all numbers: "</span> + sum);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Casted sum (int): "</span> + castedSum);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Character: "</span> + charValue);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"ASCII value: "</span> + asciiValue);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Next character: "</span> + nextChar);<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">System.out.println</span>(<span className="code-string">"Boolean value: "</span> + boolValue);<br/>
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

export default JavaDataTypes;