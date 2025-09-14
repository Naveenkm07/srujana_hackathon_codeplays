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
    },
    {
      "id": 5,
      "title": "Python Data Science Toolkit",
      "type": "Interactive Tool",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Learn NumPy, Pandas, and Matplotlib with hands-on data analysis projects"
    },
    {
      "id": 6,
      "title": "JavaScript ES6+ Features Guide",
      "type": "Tutorial",
      "subject": "JavaScript",
      "difficulty": "Intermediate",
      "description": "Master modern JavaScript features including arrow functions, destructuring, and async/await"
    },
    {
      "id": 7,
      "title": "React Hooks Deep Dive",
      "type": "Video Series",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Comprehensive guide to useState, useEffect, useContext, and custom hooks"
    },
    {
      "id": 8,
      "title": "Java Spring Boot Bootcamp",
      "type": "Course",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Build enterprise-level web applications with Spring Boot framework"
    },
    {
      "id": 9,
      "title": "C++ Memory Management Masterclass",
      "type": "Tutorial",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Deep dive into pointers, smart pointers, and memory optimization techniques"
    },
    {
      "id": 10,
      "title": "Node.js REST API Development",
      "type": "Project Guide",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Build scalable REST APIs with Express.js, MongoDB, and authentication"
    },
    {
      "id": 11,
      "title": "Python Algorithm Challenges",
      "type": "Practice Problems",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Solve complex algorithmic problems to improve your problem-solving skills"
    },
    {
      "id": 12,
      "title": "JavaScript DOM Manipulation Lab",
      "type": "Interactive Tool",
      "subject": "JavaScript",
      "difficulty": "Beginner",
      "description": "Practice selecting, modifying, and animating DOM elements interactively"
    },
    {
      "id": 13,
      "title": "React State Management Patterns",
      "type": "Reference Guide",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Learn Redux, Context API, and Zustand for complex state management"
    },
    {
      "id": 14,
      "title": "Java Object-Oriented Programming",
      "type": "Tutorial Series",
      "subject": "Java",
      "difficulty": "Intermediate",
      "description": "Master classes, inheritance, polymorphism, and design patterns"
    },
    {
      "id": 15,
      "title": "C++ STL Container Guide",
      "type": "Reference Guide",
      "subject": "C++",
      "difficulty": "Intermediate",
      "description": "Complete guide to vectors, maps, sets, and other STL containers"
    },
    {
      "id": 16,
      "title": "Node.js Performance Optimization",
      "type": "Advanced Guide",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Optimize Node.js applications for speed, memory usage, and scalability"
    },
    {
      "id": 17,
      "title": "Python Web Scraping Workshop",
      "type": "Workshop",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Learn BeautifulSoup, Scrapy, and Selenium for web data extraction"
    },
    {
      "id": 18,
      "title": "JavaScript Testing Fundamentals",
      "type": "Course",
      "subject": "JavaScript",
      "difficulty": "Intermediate",
      "description": "Write unit tests with Jest and integration tests with Cypress"
    },
    {
      "id": 19,
      "title": "React Native Mobile Development",
      "type": "Project Guide",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Build cross-platform mobile apps using React Native and Expo"
    },
    {
      "id": 20,
      "title": "Java Concurrency and Multithreading",
      "type": "Advanced Tutorial",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Master threads, thread pools, and concurrent data structures"
    },
    {
      "id": 21,
      "title": "C++ Game Development Primer",
      "type": "Project Guide",
      "subject": "C++",
      "difficulty": "Intermediate",
      "description": "Create 2D games using SFML and learn game programming fundamentals"
    },
    {
      "id": 22,
      "title": "Node.js Microservices Architecture",
      "type": "Architecture Guide",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Design and implement scalable microservices with Docker and Kubernetes"
    },
    {
      "id": 23,
      "title": "Python Machine Learning Basics",
      "type": "Course",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Introduction to scikit-learn, TensorFlow, and neural networks"
    },
    {
      "id": 24,
      "title": "JavaScript Functional Programming",
      "type": "Tutorial",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Learn map, filter, reduce, and functional programming paradigms"
    },
    {
      "id": 25,
      "title": "React Performance Optimization",
      "type": "Advanced Guide",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Optimize React apps with memoization, lazy loading, and code splitting"
    },
    {
      "id": 26,
      "title": "Java Database Connectivity (JDBC)",
      "type": "Tutorial",
      "subject": "Java",
      "difficulty": "Intermediate",
      "description": "Connect Java applications to databases and perform CRUD operations"
    },
    {
      "id": 27,
      "title": "C++ Template Programming",
      "type": "Advanced Tutorial",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Master function templates, class templates, and template metaprogramming"
    },
    {
      "id": 28,
      "title": "Node.js GraphQL Implementation",
      "type": "Project Guide",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Build GraphQL APIs with Apollo Server and implement real-time subscriptions"
    },
    {
      "id": 29,
      "title": "Python Flask Web Development",
      "type": "Project Guide",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Build web applications with Flask, SQLAlchemy, and user authentication"
    },
    {
      "id": 30,
      "title": "JavaScript Progressive Web Apps",
      "type": "Workshop",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Create PWAs with service workers, caching, and offline functionality"
    },
    {
      "id": 31,
      "title": "React Three.js Integration",
      "type": "Project Guide",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Build 3D web experiences combining React with Three.js"
    },
    {
      "id": 32,
      "title": "Java Design Patterns Catalog",
      "type": "Reference Guide",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Implement Singleton, Factory, Observer, and other essential design patterns"
    },
    {
      "id": 33,
      "title": "C++ Competitive Programming",
      "type": "Practice Problems",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Solve algorithmic challenges for competitive programming contests"
    },
    {
      "id": 34,
      "title": "Node.js Security Best Practices",
      "type": "Security Guide",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Implement authentication, authorization, and protect against common vulnerabilities"
    },
    {
      "id": 35,
      "title": "Python Automation Scripts",
      "type": "Code Examples",
      "subject": "Python",
      "difficulty": "Beginner",
      "description": "Automate daily tasks with Python scripts for file management and data processing"
    },
    {
      "id": 36,
      "title": "JavaScript Animation Libraries",
      "type": "Tutorial",
      "subject": "JavaScript",
      "difficulty": "Intermediate",
      "description": "Create smooth animations with GSAP, Framer Motion, and CSS transitions"
    },
    {
      "id": 37,
      "title": "React Server Components Guide",
      "type": "Advanced Guide",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Understand and implement React Server Components for better performance"
    },
    {
      "id": 38,
      "title": "Java Build Tools Mastery",
      "type": "Tutorial",
      "subject": "Java",
      "difficulty": "Intermediate",
      "description": "Master Maven and Gradle for dependency management and project builds"
    },
    {
      "id": 39,
      "title": "C++ Modern Features (C++17/20)",
      "type": "Reference Guide",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Explore std::optional, concepts, ranges, and other modern C++ features"
    },
    {
      "id": 40,
      "title": "Node.js Testing Strategies",
      "type": "Testing Guide",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Implement unit, integration, and end-to-end testing for Node.js applications"
    },
    {
      "id": 41,
      "title": "Python Django Full-Stack Development",
      "type": "Comprehensive Course",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Build enterprise web applications with Django, PostgreSQL, and deployment strategies"
    },
    {
      "id": 42,
      "title": "JavaScript WebGL Graphics Programming",
      "type": "Specialized Tutorial",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Create stunning 3D graphics and visualizations using WebGL and shader programming"
    },
    {
      "id": 43,
      "title": "React TypeScript Development",
      "type": "Best Practices Guide",
      "subject": "React",
      "difficulty": "Intermediate",
      "description": "Build type-safe React applications with TypeScript and advanced type patterns"
    },
    {
      "id": 44,
      "title": "Java Enterprise Patterns",
      "type": "Architecture Guide",
      "subject": "Java",
      "difficulty": "Expert",
      "description": "Master enterprise integration patterns, messaging, and distributed systems"
    },
    {
      "id": 45,
      "title": "C++ High-Performance Computing",
      "type": "Performance Guide",
      "subject": "C++",
      "difficulty": "Expert",
      "description": "Optimize C++ code for scientific computing, SIMD, and parallel processing"
    },
    {
      "id": 46,
      "title": "Node.js Real-time Applications",
      "type": "Project Workshop",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Build chat apps, live dashboards, and collaborative tools with Socket.io"
    },
    {
      "id": 47,
      "title": "Python Computer Vision with OpenCV",
      "type": "AI/ML Course",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Process images and videos for object detection, facial recognition, and AR"
    },
    {
      "id": 48,
      "title": "JavaScript Blockchain Development",
      "type": "Emerging Tech",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Build decentralized applications (DApps) with Web3.js and smart contracts"
    },
    {
      "id": 49,
      "title": "React Micro-frontends Architecture",
      "type": "Enterprise Guide",
      "subject": "React",
      "difficulty": "Expert",
      "description": "Design scalable micro-frontend systems with module federation"
    },
    {
      "id": 50,
      "title": "Java Cloud-Native Development",
      "type": "Cloud Computing",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Deploy Java apps on AWS, GCP, and Azure with containers and serverless"
    },
    {
      "id": 51,
      "title": "C++ Embedded Systems Programming",
      "type": "Hardware Integration",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Program microcontrollers, IoT devices, and real-time embedded systems"
    },
    {
      "id": 52,
      "title": "Node.js Serverless Functions",
      "type": "Cloud Guide",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Build and deploy serverless functions on AWS Lambda, Vercel, and Netlify"
    },
    {
      "id": 53,
      "title": "Python Natural Language Processing",
      "type": "AI Specialization",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Build chatbots, sentiment analysis, and language models with NLTK and spaCy"
    },
    {
      "id": 54,
      "title": "JavaScript Virtual Reality (WebXR)",
      "type": "Immersive Tech",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Create VR/AR experiences for the web using WebXR and A-Frame"
    },
    {
      "id": 55,
      "title": "React Design Systems",
      "type": "UI/UX Guide",
      "subject": "React",
      "difficulty": "Intermediate",
      "description": "Build consistent, reusable component libraries and design tokens"
    },
    {
      "id": 56,
      "title": "Java Reactive Programming",
      "type": "Paradigm Guide",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Master reactive streams with RxJava and Project Reactor"
    },
    {
      "id": 57,
      "title": "C++ Cross-Platform Development",
      "type": "Platform Guide",
      "subject": "C++",
      "difficulty": "Intermediate",
      "description": "Build applications for Windows, macOS, and Linux with CMake and Qt"
    },
    {
      "id": 58,
      "title": "Node.js Event-Driven Architecture",
      "type": "Architecture Pattern",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Implement event sourcing, CQRS, and message-driven systems"
    },
    {
      "id": 59,
      "title": "Python Quantum Computing Basics",
      "type": "Cutting-Edge Tech",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Explore quantum algorithms with Qiskit and quantum machine learning"
    },
    {
      "id": 60,
      "title": "JavaScript WebAssembly Integration",
      "type": "Performance Tech",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Boost JavaScript performance with WebAssembly modules and Rust/C++ integration"
    },
    {
      "id": 61,
      "title": "React Accessibility (a11y) Mastery",
      "type": "Inclusive Design",
      "subject": "React",
      "difficulty": "Intermediate",
      "description": "Build accessible web apps with ARIA, screen readers, and inclusive patterns"
    },
    {
      "id": 62,
      "title": "Java DevOps and CI/CD",
      "type": "DevOps Guide",
      "subject": "Java",
      "difficulty": "Intermediate",
      "description": "Automate Java application deployment with Jenkins, Docker, and Kubernetes"
    },
    {
      "id": 63,
      "title": "C++ Network Programming",
      "type": "Systems Programming",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Build network servers, clients, and distributed systems with TCP/UDP"
    },
    {
      "id": 64,
      "title": "Node.js Stream Processing",
      "type": "Data Processing",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Handle large data streams efficiently with Node.js streams and pipelines"
    },
    {
      "id": 65,
      "title": "Python Robotics Programming",
      "type": "Robotics Course",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Control robots with ROS, computer vision, and sensor integration"
    },
    {
      "id": 66,
      "title": "JavaScript Audio Programming",
      "type": "Creative Coding",
      "subject": "JavaScript",
      "difficulty": "Intermediate",
      "description": "Create music apps, audio visualizers, and sound effects with Web Audio API"
    },
    {
      "id": 67,
      "title": "React Advanced Rendering Patterns",
      "type": "Advanced Patterns",
      "subject": "React",
      "difficulty": "Expert",
      "description": "Master render props, higher-order components, and compound components"
    },
    {
      "id": 68,
      "title": "Java Machine Learning with Weka",
      "type": "ML Framework",
      "subject": "Java",
      "difficulty": "Intermediate",
      "description": "Build ML models and data mining applications with Java-based tools"
    },
    {
      "id": 69,
      "title": "C++ Graphics Programming with OpenGL",
      "type": "Graphics Development",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Create 3D graphics, games, and visualizations with modern OpenGL"
    },
    {
      "id": 70,
      "title": "Node.js Monitoring and Observability",
      "type": "Production Guide",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Monitor applications with Prometheus, Grafana, and distributed tracing"
    },
    {
      "id": 71,
      "title": "Python Bioinformatics Programming",
      "type": "Domain-Specific",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Analyze biological data, DNA sequences, and protein structures"
    },
    {
      "id": 72,
      "title": "JavaScript Game Engine Development",
      "type": "Game Development",
      "subject": "JavaScript",
      "difficulty": "Expert",
      "description": "Build custom 2D/3D game engines with Canvas, WebGL, and physics"
    },
    {
      "id": 73,
      "title": "React Concurrent Features Deep Dive",
      "type": "Advanced React",
      "subject": "React",
      "difficulty": "Expert",
      "description": "Master Suspense, concurrent rendering, and React 18+ features"
    },
    {
      "id": 74,
      "title": "Java Microservices with Quarkus",
      "type": "Modern Framework",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Build cloud-native microservices with Quarkus and GraalVM"
    },
    {
      "id": 75,
      "title": "C++ Financial Computing",
      "type": "Industry Application",
      "subject": "C++",
      "difficulty": "Expert",
      "description": "Implement trading systems, risk models, and quantitative finance algorithms"
    },
    {
      "id": 76,
      "title": "Node.js CLI Tools Development",
      "type": "Tool Development",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Create powerful command-line tools and developer utilities"
    },
    {
      "id": 77,
      "title": "Python Geospatial Data Analysis",
      "type": "Data Science",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Work with maps, GPS data, and geographic information systems (GIS)"
    },
    {
      "id": 78,
      "title": "JavaScript Compiler Construction",
      "type": "Language Design",
      "subject": "JavaScript",
      "difficulty": "Expert",
      "description": "Build interpreters, parsers, and transpilers from scratch"
    },
    {
      "id": 79,
      "title": "React Animation and Motion",
      "type": "Visual Development",
      "subject": "React",
      "difficulty": "Intermediate",
      "description": "Create beautiful animations with Framer Motion and React Spring"
    },
    {
      "id": 80,
      "title": "Java Functional Programming with Vavr",
      "type": "Paradigm Exploration",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Apply functional programming concepts in Java with immutable data structures"
    },
    {
      "id": 81,
      "title": "Python FastAPI Modern Web APIs",
      "type": "Framework Course",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Build high-performance APIs with FastAPI, Pydantic, and async programming"
    },
    {
      "id": 82,
      "title": "JavaScript Micro-frontends with Single-SPA",
      "type": "Architecture Guide",
      "subject": "JavaScript",
      "difficulty": "Expert",
      "description": "Implement scalable micro-frontend architectures for large applications"
    },
    {
      "id": 83,
      "title": "React GraphQL with Apollo Client",
      "type": "Data Management",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Master GraphQL queries, mutations, and real-time subscriptions in React"
    },
    {
      "id": 84,
      "title": "Java Kubernetes Operators Development",
      "type": "Cloud Native",
      "subject": "Java",
      "difficulty": "Expert",
      "description": "Build custom Kubernetes operators with Java and the Operator SDK"
    },
    {
      "id": 85,
      "title": "C++ CUDA Programming for GPU Computing",
      "type": "Parallel Computing",
      "subject": "C++",
      "difficulty": "Expert",
      "description": "Accelerate computations with NVIDIA CUDA and parallel programming"
    },
    {
      "id": 86,
      "title": "Node.js Deno Runtime Transition",
      "type": "Runtime Guide",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Migrate from Node.js to Deno with TypeScript-first development"
    },
    {
      "id": 87,
      "title": "Python Computer Graphics with PyOpenGL",
      "type": "Graphics Programming",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Create 3D graphics, shaders, and interactive visualizations"
    },
    {
      "id": 88,
      "title": "JavaScript WebRTC Real-time Communication",
      "type": "Real-time Tech",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Build video chat, file sharing, and P2P communication apps"
    },
    {
      "id": 89,
      "title": "React Storybook Component Documentation",
      "type": "Development Tools",
      "subject": "React",
      "difficulty": "Intermediate",
      "description": "Document and test UI components with Storybook and design systems"
    },
    {
      "id": 90,
      "title": "Java Apache Kafka Event Streaming",
      "type": "Event Processing",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Build event-driven systems with Kafka, streams, and KSQL"
    },
    {
      "id": 91,
      "title": "C++ Real-time Audio Processing",
      "type": "Audio Programming",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Process audio signals, build synthesizers, and audio effects"
    },
    {
      "id": 92,
      "title": "Node.js Blockchain Backend Development",
      "type": "Blockchain Tech",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Create blockchain backends, smart contract APIs, and DeFi platforms"
    },
    {
      "id": 93,
      "title": "Python AI Ethics and Explainable AI",
      "type": "AI Ethics",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Build transparent AI models with LIME, SHAP, and fairness metrics"
    },
    {
      "id": 94,
      "title": "JavaScript Edge Computing with Cloudflare Workers",
      "type": "Edge Computing",
      "subject": "JavaScript",
      "difficulty": "Intermediate",
      "description": "Deploy serverless functions at the edge for ultra-low latency"
    },
    {
      "id": 95,
      "title": "React Native Web Cross-platform Development",
      "type": "Cross-Platform",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Share code between React Native mobile and web applications"
    },
    {
      "id": 96,
      "title": "Java GraalVM Native Images",
      "type": "Performance Optimization",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Compile Java applications to native executables for faster startup"
    },
    {
      "id": 97,
      "title": "C++ Rust Interoperability",
      "type": "Language Integration",
      "subject": "C++",
      "difficulty": "Expert",
      "description": "Integrate Rust code with C++ for memory safety and performance"
    },
    {
      "id": 98,
      "title": "Node.js Edge-side Includes (ESI) Implementation",
      "type": "Caching Strategy",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Implement sophisticated caching with ESI and CDN integration"
    },
    {
      "id": 99,
      "title": "Python Reinforcement Learning with Gym",
      "type": "AI/ML Specialization",
      "subject": "Python",
      "difficulty": "Expert",
      "description": "Train AI agents with reinforcement learning and game environments"
    },
    {
      "id": 100,
      "title": "JavaScript WebCodecs API for Media Processing",
      "type": "Multimedia Programming",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Process video and audio codecs directly in the browser"
    },
    {
      "id": 101,
      "title": "React Suspense for Data Fetching",
      "type": "Advanced React Features",
      "subject": "React",
      "difficulty": "Expert",
      "description": "Master advanced Suspense patterns for async data handling"
    },
    {
      "id": 102,
      "title": "Java Micronaut Framework Deep Dive",
      "type": "Modern Framework",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Build cloud-native microservices with Micronaut's compile-time DI"
    },
    {
      "id": 103,
      "title": "C++ WebAssembly System Interface (WASI)",
      "type": "WebAssembly Development",
      "subject": "C++",
      "difficulty": "Advanced",
      "description": "Port C++ applications to run in WebAssembly runtime environments"
    },
    {
      "id": 104,
      "title": "Node.js Temporal Database Programming",
      "type": "Database Specialization",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Work with time-series and temporal data using specialized databases"
    },
    {
      "id": 105,
      "title": "Python Automated Testing with Hypothesis",
      "type": "Property-Based Testing",
      "subject": "Python",
      "difficulty": "Intermediate",
      "description": "Generate comprehensive test cases with property-based testing"
    },
    {
      "id": 106,
      "title": "JavaScript Service Workers Advanced Patterns",
      "type": "Progressive Web Apps",
      "subject": "JavaScript",
      "difficulty": "Advanced",
      "description": "Implement offline-first applications with advanced caching strategies"
    },
    {
      "id": 107,
      "title": "React Concurrent Mode Migration Guide",
      "type": "Migration Guide",
      "subject": "React",
      "difficulty": "Expert",
      "description": "Migrate legacy React apps to concurrent features and Suspense"
    },
    {
      "id": 108,
      "title": "Java Project Loom Virtual Threads",
      "type": "Concurrency Innovation",
      "subject": "Java",
      "difficulty": "Advanced",
      "description": "Use lightweight virtual threads for massive concurrency"
    },
    {
      "id": 109,
      "title": "C++ Coroutines for Asynchronous Programming",
      "type": "Modern C++ Features",
      "subject": "C++",
      "difficulty": "Expert",
      "description": "Master C++20 coroutines for elegant async code"
    },
    {
      "id": 110,
      "title": "Node.js Bun Runtime Performance Optimization",
      "type": "Runtime Performance",
      "subject": "Node.js",
      "difficulty": "Intermediate",
      "description": "Optimize applications for the ultra-fast Bun JavaScript runtime"
    },
    {
      "id": 111,
      "title": "Python Distributed Computing with Dask",
      "type": "Distributed Systems",
      "subject": "Python",
      "difficulty": "Advanced",
      "description": "Scale Python computations across clusters with Dask"
    },
    {
      "id": 112,
      "title": "JavaScript Module Federation Advanced Patterns",
      "type": "Micro-frontend Architecture",
      "subject": "JavaScript",
      "difficulty": "Expert",
      "description": "Build federated module systems for large-scale applications"
    },
    {
      "id": 113,
      "title": "React Remix Full-Stack Framework",
      "type": "Full-Stack Framework",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Build modern web applications with Remix's nested routing and loaders"
    },
    {
      "id": 114,
      "title": "Java Project Panama Foreign Function Interface",
      "type": "Native Integration",
      "subject": "Java",
      "difficulty": "Expert",
      "description": "Call native C libraries directly from Java without JNI"
    },
    {
      "id": 115,
      "title": "C++ Concepts and Constraints Programming",
      "type": "Template Metaprogramming",
      "subject": "C++",
      "difficulty": "Expert",
      "description": "Write safer generic code with C++20 concepts and constraints"
    },
    {
      "id": 116,
      "title": "Node.js Offline-First Architecture Patterns",
      "type": "Architecture Pattern",
      "subject": "Node.js",
      "difficulty": "Advanced",
      "description": "Design applications that work seamlessly online and offline"
    },
    {
      "id": 117,
      "title": "Python Neuromorphic Computing with Brian2",
      "type": "Specialized Computing",
      "subject": "Python",
      "difficulty": "Expert",
      "description": "Simulate spiking neural networks and brain-inspired computing"
    },
    {
      "id": 118,
      "title": "JavaScript Temporal API for Date/Time Handling",
      "type": "Language Features",
      "subject": "JavaScript",
      "difficulty": "Intermediate",
      "description": "Master the new Temporal API for robust date and time operations"
    },
    {
      "id": 119,
      "title": "React Server-Side Rendering with Streaming",
      "type": "SSR Optimization",
      "subject": "React",
      "difficulty": "Advanced",
      "description": "Implement progressive server-side rendering with React 18 streaming"
    },
    {
      "id": 120,
      "title": "Java Vector API for SIMD Programming",
      "type": "Performance Computing",
      "subject": "Java",
      "difficulty": "Expert",
      "description": "Vectorize computations using Java's experimental Vector API"
    }
  ]
};
