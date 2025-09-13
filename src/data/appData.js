export const appData = {
  subjects: [
    {"id": 1, "name": "Mathematics", "icon": "🧮", "modules": 12, "difficulty": "Beginner to Advanced"},
    {"id": 2, "name": "Science", "icon": "🔬", "modules": 10, "difficulty": "Beginner to Advanced"}, 
    {"id": 3, "name": "English", "icon": "📚", "modules": 8, "difficulty": "Beginner to Advanced"},
    {"id": 4, "name": "History", "icon": "🏛️", "modules": 6, "difficulty": "Intermediate"}
  ],
  diagnosticQuestions: [
    {
      "id": 1,
      "subject": "Mathematics",
      "question": "What is 15 × 8?",
      "options": ["110", "120", "130", "140"],
      "correct": 1,
      "difficulty": "basic"
    },
    {
      "id": 2,
      "subject": "Mathematics", 
      "question": "Solve for x: 2x + 5 = 17",
      "options": ["6", "7", "8", "9"],
      "correct": 0,
      "difficulty": "intermediate"
    },
    {
      "id": 3,
      "subject": "Science",
      "question": "What is the chemical symbol for water?",
      "options": ["H2O", "CO2", "O2", "NaCl"],
      "correct": 0,
      "difficulty": "basic"
    },
    {
      "id": 4,
      "subject": "English",
      "question": "Which is the correct spelling?",
      "options": ["Recieve", "Receive", "Receve", "Receiv"],
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
      "progress": {"Mathematics": 75, "Science": 60, "English": 90},
      "weeklyActivity": [2, 4, 3, 5, 4, 6, 3],
      "currentStreak": 5
    },
    {
      "id": 2, 
      "name": "Emma Davis",
      "level": "Advanced",
      "totalPoints": 1200,
      "badges": [1, 2, 3, 4],
      "progress": {"Mathematics": 95, "Science": 85, "English": 88},
      "weeklyActivity": [5, 6, 4, 7, 5, 6, 4],
      "currentStreak": 12
    },
    {
      "id": 3,
      "name": "Sam Wilson", 
      "level": "Beginner",
      "totalPoints": 320,
      "badges": [1],
      "progress": {"Mathematics": 45, "Science": 30, "English": 55},
      "weeklyActivity": [1, 2, 1, 3, 2, 2, 1],
      "currentStreak": 2
    }
  ],
  learningModules: [
    {
      "id": 1,
      "subject": "Mathematics",
      "title": "Basic Arithmetic",
      "description": "Learn addition, subtraction, multiplication and division",
      "difficulty": "Beginner",
      "estimatedTime": "45 minutes",
      "points": 50,
      "topics": ["Addition", "Subtraction", "Multiplication", "Division"]
    },
    {
      "id": 2,
      "subject": "Mathematics", 
      "title": "Algebra Basics",
      "description": "Introduction to variables and simple equations",
      "difficulty": "Intermediate", 
      "estimatedTime": "60 minutes",
      "points": 75,
      "topics": ["Variables", "Simple Equations", "Problem Solving"]
    },
    {
      "id": 3,
      "subject": "Science",
      "title": "States of Matter",
      "description": "Explore solids, liquids, gases and plasma",
      "difficulty": "Beginner",
      "estimatedTime": "40 minutes", 
      "points": 50,
      "topics": ["Solids", "Liquids", "Gases", "Phase Changes"]
    }
  ],
  resources: [
    {
      "id": 1,
      "title": "Interactive Math Playground", 
      "type": "Interactive Tool",
      "subject": "Mathematics",
      "difficulty": "All Levels",
      "description": "Practice math concepts through games and activities"
    },
    {
      "id": 2,
      "title": "Science Experiment Videos",
      "type": "Video Series", 
      "subject": "Science",
      "difficulty": "Beginner",
      "description": "Watch exciting science experiments you can try at home"
    },
    {
      "id": 3,
      "title": "Grammar Guide",
      "type": "Reference Guide",
      "subject": "English", 
      "difficulty": "Intermediate",
      "description": "Comprehensive guide to English grammar rules"
    }
  ]
};
