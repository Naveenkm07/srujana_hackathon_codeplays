export const appData = {
  subjects: [
    {"id": 1, "name": "Python", "icon": "🐍", "modules": 12, "difficulty": "Beginner to Advanced"},
    {"id": 2, "name": "JavaScript", "icon": "⚡", "modules": 10, "difficulty": "Beginner to Advanced"}, 
    {"id": 3, "name": "Java", "icon": "☕", "modules": 8, "difficulty": "Beginner to Advanced"},
    {"id": 4, "name": "C++", "icon": "⚙️", "modules": 6, "difficulty": "Intermediate"},
    {"id": 5, "name": "React", "icon": "⚛️", "modules": 8, "difficulty": "Intermediate to Advanced"},
    {"id": 6, "name": "Node.js", "icon": "🟢", "modules": 7, "difficulty": "Intermediate"}
  ],
  diagnosticQuestions: [
    {
      "id": 1,
      "subject": "Python",
      "question": "What is the correct way to declare a variable in Python?",
      "options": ["var x = 5", "let x = 5", "x = 5", "int x = 5"],
      "correct": 2,
      "difficulty": "basic"
    },
    {
      "id": 2,
      "subject": "JavaScript", 
      "question": "Which keyword is used to declare a constant in JavaScript?",
      "options": ["var", "let", "const", "final"],
      "correct": 2,
      "difficulty": "intermediate"
    },
    {
      "id": 3,
      "subject": "Java",
      "question": "What is the entry point of a Java application?",
      "options": ["main() method", "start() method", "init() method", "run() method"],
      "correct": 0,
      "difficulty": "basic"
    },
    {
      "id": 4,
      "subject": "React",
      "question": "What is JSX in React?",
      "options": ["A database", "A syntax extension for JavaScript", "A CSS framework", "A testing library"],
      "correct": 1,
      "difficulty": "basic"
    }
  ],
  badges: [
    {"id": 1, "name": "First Steps", "description": "Complete your first module", "icon": "🏃", "points": 50},
    {"id": 2, "name": "Quiz Master", "description": "Score 90%+ on 5 quizzes", "icon": "🎯", "points": 100},
    {"id": 3, "name": "Streak Master", "description": "Study for 7 days in a row", "icon": "🔥", "points": 150},
    {"id": 4, "name": "Perfect Score", "description": "Get 100% on an assessment", "icon": "⭐", "points": 200},
    {"id": 5, "name": "Helper", "description": "Help 3 classmates", "icon": "🤝", "points": 75},
    {"id": 6, "name": "Explorer", "description": "Complete modules in 3 subjects", "icon": "🗺️", "points": 125}
  ],
  sampleStudents: [
    {
      "id": 1,
      "name": "Alex Johnson",
      "level": "Intermediate",
      "totalPoints": 850,
      "badges": [1, 2, 5],
      "progress": {"Python": 75, "JavaScript": 60, "React": 45},
      "weeklyActivity": [2, 4, 3, 5, 4, 6, 3],
      "currentStreak": 5
    },
    {
      "id": 2, 
      "name": "Emma Davis",
      "level": "Advanced",
      "totalPoints": 1200,
      "badges": [1, 2, 3, 4],
      "progress": {"Python": 95, "JavaScript": 85, "Java": 78, "React": 90},
      "weeklyActivity": [5, 6, 4, 7, 5, 6, 4],
      "currentStreak": 12
    },
    {
      "id": 3,
      "name": "Sam Wilson", 
      "level": "Beginner",
      "totalPoints": 320,
      "badges": [1],
      "progress": {"Python": 45, "JavaScript": 30},
      "weeklyActivity": [1, 2, 1, 3, 2, 2, 1],
      "currentStreak": 2
    }
  ],
  learningModules: [
    {
      "id": 1,
      "subject": "Python",
      "title": "Python Fundamentals",
      "description": "Learn variables, data types, and basic syntax",
      "difficulty": "Beginner",
      "estimatedTime": "45 minutes",
      "points": 50,
      "topics": ["Variables", "Data Types", "Print Statements", "Basic Input"]
    },
    {
      "id": 2,
      "subject": "Python", 
      "title": "Control Structures",
      "description": "Master if statements, loops, and conditional logic",
      "difficulty": "Intermediate", 
      "estimatedTime": "60 minutes",
      "points": 75,
      "topics": ["If Statements", "For Loops", "While Loops", "Conditional Logic"]
    },
    {
      "id": 3,
      "subject": "JavaScript",
      "title": "JavaScript Basics",
      "description": "Introduction to JavaScript syntax and DOM manipulation",
      "difficulty": "Beginner",
      "estimatedTime": "50 minutes", 
      "points": 60,
      "topics": ["Variables", "Functions", "DOM", "Events"]
    },
    {
      "id": 4,
      "subject": "React",
      "title": "React Components",
      "description": "Learn to build reusable UI components with React",
      "difficulty": "Intermediate",
      "estimatedTime": "70 minutes", 
      "points": 80,
      "topics": ["JSX", "Components", "Props", "State"]
    }
  ],
  resources: [
    {
      "id": 1,
      "title": "Python Code Playground", 
      "type": "Interactive Tool",
      "subject": "Python",
      "difficulty": "All Levels",
      "description": "Practice Python concepts through interactive coding exercises"
    },
    {
      "id": 2,
      "title": "JavaScript Tutorial Videos",
      "type": "Video Series", 
      "subject": "JavaScript",
      "difficulty": "Beginner",
      "description": "Watch comprehensive JavaScript tutorials and examples"
    },
    {
      "id": 3,
      "title": "React Documentation",
      "type": "Reference Guide",
      "subject": "React", 
      "difficulty": "Intermediate",
      "description": "Official React documentation and best practices"
    },
    {
      "id": 4,
      "title": "Java Programming Exercises",
      "type": "Practice Problems",
      "subject": "Java", 
      "difficulty": "Beginner to Advanced",
      "description": "Hands-on Java coding challenges and solutions"
    }
  ]
};
