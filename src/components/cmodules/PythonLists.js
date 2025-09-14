import React from 'react';
import './PythonLists.css';

function PythonLists({ onBackClick }) {
  return (
    <div className="python-lists-container">
      <div className="python-lists-content">
        <div className="python-lists-header">
          <button className="back-button" onClick={onBackClick}>
            <span className="back-icon">←</span>
            Back to Python Module
          </button>
          <h1 className="python-lists-title">Python Lists</h1>
        </div>

        <div className="python-lists-section">
          <div className="section-content">
            <span className="section-icon">📋</span>
            <h2 className="section-title">What are Lists?</h2>
            <p className="section-text">
              Lists in Python are ordered collections of items that can be of different data types. 
              They're like shopping lists where you can add, remove, and modify items easily!
            </p>
          </div>
        </div>

        <div className="python-lists-section">
          <div className="section-content">
            <span className="section-icon">🛠️</span>
            <h2 className="section-title">Creating Lists</h2>
            <p className="section-text">
              Lists are created using square brackets [] and can contain any type of data:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">List Creation</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Different ways to create lists</span><br/>
                  numbers = [<span className="code-number">1</span>, <span className="code-number">2</span>, <span className="code-number">3</span>, <span className="code-number">4</span>, <span className="code-number">5</span>]<br/>
                  fruits = [<span className="code-string">"apple"</span>, <span className="code-string">"banana"</span>, <span className="code-string">"orange"</span>]<br/>
                  mixed = [<span className="code-number">1</span>, <span className="code-string">"hello"</span>, <span className="code-keyword">True</span>, <span className="code-number">3.14</span>]<br/>
                  empty = []<br/>
                  <br/>
                  <span className="code-keyword">print</span>(numbers)<br/>
                  <span className="code-keyword">print</span>(fruits)<br/>
                  <span className="code-keyword">print</span>(mixed)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-lists-section">
          <div className="section-content">
            <span className="section-icon">🔍</span>
            <h2 className="section-title">Accessing List Items</h2>
            <p className="section-text">
              Access items using their index (position) in the list:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">List Access</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># Accessing list items</span><br/>
                  fruits = [<span className="code-string">"apple"</span>, <span className="code-string">"banana"</span>, <span className="code-string">"orange"</span>]<br/>
                  <br/>
                  <span className="code-comment"># First item (index 0)</span><br/>
                  first_fruit = fruits[<span className="code-number">0</span>]<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"First fruit: first_fruit"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Last item (index -1)</span><br/>
                  last_fruit = fruits[<span className="code-number">-1</span>]<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Last fruit: last_fruit"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Slicing (range of items)</span><br/>
                  middle_fruits = fruits[<span className="code-number">1</span>:<span className="code-number">3</span>]<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Middle fruits: middle_fruits"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-lists-section">
          <div className="section-content">
            <span className="section-icon">🔧</span>
            <h2 className="section-title">List Methods</h2>
            <p className="section-text">
              Python provides many methods to work with lists:
            </p>
            
            <div className="methods-grid">
              <div className="method-card">
                <div className="method-name">append()</div>
                <div className="method-desc">Add item to end</div>
                <div className="method-example">fruits.append("grape")</div>
              </div>
              <div className="method-card">
                <div className="method-name">insert()</div>
                <div className="method-desc">Add item at index</div>
                <div className="method-example">fruits.insert(1, "kiwi")</div>
              </div>
              <div className="method-card">
                <div className="method-name">remove()</div>
                <div className="method-desc">Remove first occurrence</div>
                <div className="method-example">fruits.remove("banana")</div>
              </div>
              <div className="method-card">
                <div className="method-name">pop()</div>
                <div className="method-desc">Remove and return item</div>
                <div className="method-example">last = fruits.pop()</div>
              </div>
              <div className="method-card">
                <div className="method-name">sort()</div>
                <div className="method-desc">Sort list in place</div>
                <div className="method-example">fruits.sort()</div>
              </div>
              <div className="method-card">
                <div className="method-name">len()</div>
                <div className="method-desc">Get list length</div>
                <div className="method-example">len(fruits)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="python-lists-section">
          <div className="section-content">
            <span className="section-icon">🔄</span>
            <h2 className="section-title">List Operations</h2>
            <p className="section-text">
              Lists support various operations like concatenation, repetition, and iteration:
            </p>
            
            <div className="code-section">
              <div className="code-header">
                <span className="code-icon">🐍</span>
                <span className="code-title">List Operations</span>
              </div>
              <div className="code-block">
                <code className="code">
                  <span className="code-comment"># List operations</span><br/>
                  list1 = [<span className="code-number">1</span>, <span className="code-number">2</span>, <span className="code-number">3</span>]<br/>
                  list2 = [<span className="code-number">4</span>, <span className="code-number">5</span>, <span className="code-number">6</span>]<br/>
                  <br/>
                  <span className="code-comment"># Concatenation</span><br/>
                  combined = list1 + list2<br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Combined: combined"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Repetition</span><br/>
                  repeated = list1 * <span className="code-number">2</span><br/>
                  <span className="code-keyword">print</span>(<span className="code-string">f"Repeated: repeated"</span>)<br/>
                  <br/>
                  <span className="code-comment"># Iteration</span><br/>
                  <span className="code-keyword">for</span> item <span className="code-keyword">in</span> list1:<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="code-keyword">print</span>(<span className="code-string">f"Item: item"</span>)
                </code>
              </div>
            </div>
          </div>
        </div>

        <div className="python-lists-section">
          <div className="section-content">
            <span className="section-icon">🎯</span>
            <h2 className="section-title">Try It Yourself!</h2>
            <div className="challenge-section">
              <div className="challenge-box">
                <h3 className="challenge-title">Challenge: Shopping List Manager</h3>
                <p className="challenge-desc">
                  Create a shopping list program that allows you to add items, remove items, 
                  sort the list, and display the total number of items.
                </p>
                <div className="hint-box">
                  <span className="hint-icon">💡</span>
                  <span className="hint-text">Use append(), remove(), sort(), and len() methods</span>
                </div>
                <div className="example-solution">
                  <h4 className="solution-title">Example Solution:</h4>
                  <div className="solution-code">
                    <code>
                      # Shopping list manager<br/>
                      shopping_list = []<br/>
                      <br/>
                      # Add items<br/>
                      shopping_list.append("milk")<br/>
                      shopping_list.append("bread")<br/>
                      shopping_list.append("eggs")<br/>
                      <br/>
                      print(f"Shopping list: shopping_list")<br/>
                      print(f"Total items: len(shopping_list)")<br/>
                      <br/>
                      # Sort the list<br/>
                      shopping_list.sort()<br/>
                      print(f"Sorted list: shopping_list")<br/>
                      <br/>
                      # Remove an item<br/>
                      shopping_list.remove("bread")<br/>
                      print(f"After removing bread: shopping_list")
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

export default PythonLists;
