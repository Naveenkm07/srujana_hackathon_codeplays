// Question Generation Service using LLM integration
class QuestionGenerationService {
  constructor() {
    this.apiEndpoint = process.env.REACT_APP_LLM_API_ENDPOINT || 'https://api.openai.com/v1/chat/completions';
    this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  }

  /**
   * Generate a programming question based on topic and level
   * @param {string} language - Programming language (cpp, java, python)
   * @param {string} level - Proficiency level (basic, intermediate, advanced)
   * @param {string} specificTopic - Optional specific topic within the language
   * @returns {Object} Generated question object
   */
  async generateQuestion(language, level, specificTopic = null) {
    const prompt = this.buildPrompt(language, level, specificTopic);
    
    try {
      // If no API key is configured, return a demo question
      if (!this.apiKey) {
        return this.getDemoQuestion(language, level);
      }

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are an expert programming instructor. Generate educational programming questions with clear explanations.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      
      return this.parseQuestionResponse(generatedContent, language, level);
    } catch (error) {
      console.error('Question generation failed:', error);
      // Fallback to demo questions
      return this.getDemoQuestion(language, level);
    }
  }

  /**
   * Build prompt for question generation
   */
  buildPrompt(language, level, specificTopic) {
    const languageSpecs = {
      cpp: 'C++',
      java: 'Java', 
      python: 'Python'
    };

    const levelDescriptions = {
      basic: 'beginner level with fundamental concepts',
      intermediate: 'intermediate level with practical applications',
      advanced: 'advanced level with complex problem-solving'
    };

    const topicFocus = specificTopic ? ` focusing on ${specificTopic}` : '';

    return `Generate a ${levelDescriptions[level]} ${languageSpecs[language]} programming question${topicFocus}. 

Return the response in this exact JSON format:
{
  "question": "Clear question statement",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": 0,
  "explanation": "Detailed explanation of the correct answer",
  "codeExample": "Optional code snippet if applicable",
  "difficulty": "${level}",
  "topic": "specific topic name",
  "points": ${level === 'basic' ? 10 : level === 'intermediate' ? 20 : 30}
}

Make the question educational, practical, and appropriate for the specified level.`;
  }

  /**
   * Parse LLM response into question object
   */
  parseQuestionResponse(response, language, level) {
    try {
      // Try to extract JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const questionData = JSON.parse(jsonMatch[0]);
        return {
          id: `${language}_${level}_${Date.now()}`,
          language,
          level,
          timestamp: new Date().toISOString(),
          ...questionData
        };
      }
    } catch (error) {
      console.error('Failed to parse LLM response:', error);
    }
    
    // Fallback if parsing fails
    return this.getDemoQuestion(language, level);
  }

  /**
   * Get demo questions when API is not available
   */
  getDemoQuestion(language, level) {
    const demoQuestions = {
      cpp: {
        basic: {
          question: "What is the correct way to declare an integer variable in C++?",
          options: ["int x;", "integer x;", "var x;", "number x;"],
          correctAnswer: 0,
          explanation: "In C++, 'int' is the keyword used to declare integer variables. The syntax is 'int variableName;'",
          codeExample: "int age = 25;\nint count;",
          topic: "Variable Declaration",
          points: 10
        },
        intermediate: {
          question: "What will be the output of this C++ code?\n```cpp\nint arr[] = {1, 2, 3, 4, 5};\nint *ptr = arr + 2;\ncout << *ptr << endl;\n```",
          options: ["1", "2", "3", "4"],
          correctAnswer: 2,
          explanation: "arr + 2 moves the pointer to the third element (index 2) of the array. *ptr dereferences it to get the value 3.",
          codeExample: "int arr[] = {1, 2, 3, 4, 5};\nint *ptr = arr + 2;  // Points to arr[2]\ncout << *ptr;  // Outputs 3",
          topic: "Pointers and Arrays",
          points: 20
        },
        advanced: {
          question: "Which of the following demonstrates proper RAII (Resource Acquisition Is Initialization) in C++?",
          options: [
            "Using malloc() and free()",
            "Using smart pointers like unique_ptr",
            "Manual resource management",
            "Global variables for resources"
          ],
          correctAnswer: 1,
          explanation: "RAII is best implemented using smart pointers like unique_ptr, shared_ptr which automatically manage resource lifetime through constructors and destructors.",
          codeExample: "std::unique_ptr<int[]> data(new int[100]);\n// Automatically deallocated when out of scope",
          topic: "RAII and Smart Pointers",
          points: 30
        }
      },
      java: {
        basic: {
          question: "Which keyword is used to create a class in Java?",
          options: ["class", "Class", "new", "object"],
          correctAnswer: 0,
          explanation: "The 'class' keyword is used to define a class in Java. It's case-sensitive and must be lowercase.",
          codeExample: "public class MyClass {\n    // class body\n}",
          topic: "Class Declaration",
          points: 10
        },
        intermediate: {
          question: "What is the purpose of the 'final' keyword when applied to a method in Java?",
          options: [
            "Makes the method static",
            "Prevents method overriding",
            "Makes the method abstract", 
            "Increases method performance"
          ],
          correctAnswer: 1,
          explanation: "The 'final' keyword prevents a method from being overridden in subclasses, ensuring the method implementation remains unchanged.",
          codeExample: "public final void display() {\n    // This method cannot be overridden\n}",
          topic: "Method Modifiers",
          points: 20
        },
        advanced: {
          question: "Which design pattern is demonstrated by Java's Collections.synchronizedList()?",
          options: ["Decorator Pattern", "Adapter Pattern", "Proxy Pattern", "Wrapper Pattern"],
          correctAnswer: 0,
          explanation: "Collections.synchronizedList() uses the Decorator pattern to add thread-safety functionality to existing list implementations without modifying their structure.",
          codeExample: "List<String> syncList = Collections.synchronizedList(new ArrayList<>());",
          topic: "Design Patterns",
          points: 30
        }
      },
      python: {
        basic: {
          question: "How do you create a list in Python?",
          options: ["list = []", "list = ()", "list = {}", "list = <>"],
          correctAnswer: 0,
          explanation: "Square brackets [] are used to create lists in Python. Lists are ordered, mutable collections that can hold different data types.",
          codeExample: "my_list = [1, 2, 3, 'hello']\nempty_list = []",
          topic: "Data Structures",
          points: 10
        },
        intermediate: {
          question: "What is the output of this Python code?\n```python\ndef func(lst=[]):\n    lst.append(1)\n    return lst\n\nprint(func())\nprint(func())\n```",
          options: ["[1] [1]", "[1] [1, 1]", "Error", "[] []"],
          correctAnswer: 1,
          explanation: "This demonstrates the mutable default argument trap. The default list is shared between function calls, so each call appends to the same list.",
          codeExample: "# Correct way:\ndef func(lst=None):\n    if lst is None:\n        lst = []\n    lst.append(1)\n    return lst",
          topic: "Function Default Arguments",
          points: 20
        },
        advanced: {
          question: "Which Python feature allows a function to maintain state between calls without using global variables?",
          options: ["Lambda functions", "Closures", "Decorators", "Generators"],
          correctAnswer: 1,
          explanation: "Closures allow inner functions to access variables from the outer function's scope, maintaining state between calls even after the outer function returns.",
          codeExample: "def counter():\n    count = 0\n    def increment():\n        nonlocal count\n        count += 1\n        return count\n    return increment\n\nc = counter()\nprint(c())  # 1\nprint(c())  # 2",
          topic: "Closures and Scope",
          points: 30
        }
      }
    };

    const questionData = demoQuestions[language]?.[level] || demoQuestions.python.basic;
    
    return {
      id: `${language}_${level}_${Date.now()}`,
      language,
      level,
      timestamp: new Date().toISOString(),
      ...questionData
    };
  }

  /**
   * Evaluate user's answer and calculate score
   */
  evaluateAnswer(question, userAnswer, timeSpent) {
    const isCorrect = parseInt(userAnswer) === question.correctAnswer;
    const basePoints = question.points || 10;
    
    let earnedPoints = 0;
    let rating = 'poor';
    
    if (isCorrect) {
      earnedPoints = basePoints;
      
      // Time bonus (if answered quickly)
      if (timeSpent < 30000) { // Less than 30 seconds
        earnedPoints += Math.floor(basePoints * 0.2);
        rating = 'excellent';
      } else if (timeSpent < 60000) { // Less than 1 minute
        rating = 'good';
      } else {
        rating = 'average';
      }
    } else {
      rating = 'poor';
    }

    return {
      isCorrect,
      earnedPoints,
      rating,
      maxPoints: basePoints,
      accuracy: isCorrect ? 100 : 0,
      timeSpent,
      feedback: isCorrect 
        ? `Correct! ${question.explanation}` 
        : `Incorrect. ${question.explanation}`
    };
  }

  /**
   * Update user proficiency level based on performance
   */
  updateProficiencyLevel(currentLevel, accuracy, consecutiveCorrect) {
    const levelOrder = ['basic', 'intermediate', 'advanced'];
    const currentIndex = levelOrder.indexOf(currentLevel);
    
    // Promote if high accuracy and consecutive correct answers
    if (accuracy > 85 && consecutiveCorrect >= 3 && currentIndex < levelOrder.length - 1) {
      return levelOrder[currentIndex + 1];
    }
    
    // Demote if low accuracy
    if (accuracy < 50 && currentIndex > 0) {
      return levelOrder[currentIndex - 1];
    }
    
    return currentLevel;
  }
}

export default QuestionGenerationService;
