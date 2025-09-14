// Application Data
const appData = {
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

// Application State
let currentUser = null;
let currentAssessment = null;

// DOM Elements
const landingPage = document.getElementById('landing-page');
const studentDashboard = document.getElementById('student-dashboard');
const teacherDashboard = document.getElementById('teacher-dashboard');
const profileModal = document.getElementById('profile-modal');
const assessmentModal = document.getElementById('assessment-modal');
const quizModal = document.getElementById('quiz-modal');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Check for existing user session
    const savedUser = localStorage.getItem('smartTutorUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            if (currentUser.role === 'student') {
                showStudentDashboard();
            } // else {
                // showTeacherDashboard(); // Teacher feature temporarily disabled
            // }
        } catch (e) {
            localStorage.removeItem('smartTutorUser');
            showLandingPage();
        }
    } else {
        showLandingPage();
    }
}

function setupEventListeners() {
    // Role selection buttons - Fix the event handling
    const roleButtons = document.querySelectorAll('.role-card .btn[data-role]');
    roleButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            const role = this.dataset.role;
            handleRoleSelection(role);
        });
    });

    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSetup);
    }

    // Modal close buttons
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const quizClose = document.getElementById('quiz-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeProfileModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProfileModal);
    }
    if (quizClose) {
        quizClose.addEventListener('click', closeQuizModal);
    }

    // Navigation
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('nav-item')) {
            handleNavigation(event);
        }
    });

    // Logout buttons
    const logoutBtn = document.getElementById('logout-btn');
    const teacherLogoutBtn = document.getElementById('teacher-logout-btn');
    
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (teacherLogoutBtn) teacherLogoutBtn.addEventListener('click', handleLogout);

    // Assessment
    const startLearningBtn = document.getElementById('start-learning');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', startLearning);
    }

    // Subjects
    const backToSubjectsBtn = document.getElementById('back-to-subjects');
    if (backToSubjectsBtn) {
        backToSubjectsBtn.addEventListener('click', showSubjects);
    }

    // Quiz buttons
    const quizNextBtn = document.getElementById('quiz-next');
    const quizPrevBtn = document.getElementById('quiz-prev');
    
    if (quizNextBtn) quizNextBtn.addEventListener('click', handleQuizNext);
    if (quizPrevBtn) quizPrevBtn.addEventListener('click', handleQuizPrev);

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (!profileModal.classList.contains('hidden')) {
                closeProfileModal();
            }
            if (!quizModal.classList.contains('hidden')) {
                closeQuizModal();
            }
        }
    });
}

// Modal Management
function closeProfileModal() {
    if (profileModal) {
        profileModal.classList.add('hidden');
    }
}

function closeQuizModal() {
    if (quizModal) {
        quizModal.classList.add('hidden');
    }
}

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

function showLandingPage() {
    showPage('landing-page');
}

function showStudentDashboard() {
    showPage('student-dashboard');
    const studentNameEl = document.getElementById('student-name');
    if (studentNameEl && currentUser) {
        studentNameEl.textContent = currentUser.name;
    }
    setTimeout(() => {
        loadStudentData();
    }, 100);
}

/* Teacher feature temporarily disabled
function showTeacherDashboard() {
    showPage('teacher-dashboard');
    const teacherNameEl = document.getElementById('teacher-name');
    if (teacherNameEl && currentUser) {
        teacherNameEl.textContent = currentUser.name;
    }
    setTimeout(() => {
        loadTeacherData();
    }, 100);
}
*/

// Role Selection - Fixed function
function handleRoleSelection(role) {
    if (!role) return;
    
    currentUser = { role: role };
    showProfileModal(role);
}

function showProfileModal(role) {
    if (!profileModal) return;
    
    profileModal.classList.remove('hidden');
    
    // Show/hide student-specific fields
    const studentFields = document.getElementById('student-subjects');
    if (studentFields) {
        if (role === 'student') {
            studentFields.style.display = 'block';
            populateSubjects();
        } else {
            studentFields.style.display = 'none';
        }
    }

    // Focus on first input
    setTimeout(() => {
        const nameInput = document.getElementById('name');
        if (nameInput) {
            nameInput.focus();
        }
    }, 100);
}

function populateSubjects() {
    const subjectsList = document.getElementById('subjects-list');
    if (!subjectsList) return;
    
    subjectsList.innerHTML = '';
    
    appData.subjects.forEach(subject => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        div.innerHTML = `
            <input type="checkbox" id="subject-${subject.id}" value="${subject.id}">
            <label for="subject-${subject.id}">${subject.icon} ${subject.name}</label>
        `;
        subjectsList.appendChild(div);
    });
}

// Profile Setup
function handleProfileSetup(event) {
    event.preventDefault();
    
    const nameInput = document.getElementById('name');
    const gradeInput = document.getElementById('grade');
    
    if (!nameInput || !gradeInput) return;
    
    const name = nameInput.value.trim();
    const grade = gradeInput.value;
    
    if (!name) {
        alert('Please enter your full name');
        nameInput.focus();
        return;
    }
    
    if (!grade) {
        alert('Please select your grade level');
        gradeInput.focus();
        return;
    }
    
    currentUser.name = name;
    currentUser.grade = grade;
    
    if (currentUser.role === 'student') {
        const selectedSubjects = [];
        const checkboxes = document.querySelectorAll('#subjects-list input:checked');
        checkboxes.forEach(checkbox => {
            selectedSubjects.push(parseInt(checkbox.value));
        });
        currentUser.favoriteSubjects = selectedSubjects;
        
        // Initialize student data
        currentUser.totalPoints = 120;
        currentUser.badges = [1];
        currentUser.progress = {};
        currentUser.currentStreak = 3;
        currentUser.weeklyActivity = [2, 3, 1, 4, 2, 3, 2];
        
        // Initialize progress for all subjects
        appData.subjects.forEach(subject => {
            currentUser.progress[subject.name] = Math.floor(Math.random() * 40) + 10;
        });
    }
    
    localStorage.setItem('smartTutorUser', JSON.stringify(currentUser));
    closeProfileModal();
    
    if (currentUser.role === 'student') {
        startDiagnosticAssessment();
    } // else {
        // showTeacherDashboard(); // Teacher feature temporarily disabled
    // }
}

// Diagnostic Assessment
function startDiagnosticAssessment() {
    currentAssessment = {
        questions: [...appData.diagnosticQuestions],
        currentQuestionIndex: 0,
        answers: [],
        score: 0
    };
    
    if (assessmentModal) {
        assessmentModal.classList.remove('hidden');
        showAssessmentQuestion();
    }
}

function showAssessmentQuestion() {
    if (!currentAssessment || !currentAssessment.questions) return;
    
    const question = currentAssessment.questions[currentAssessment.currentQuestionIndex];
    const progress = ((currentAssessment.currentQuestionIndex + 1) / currentAssessment.questions.length) * 100;
    
    const progressEl = document.getElementById('assessment-progress');
    if (progressEl) {
        progressEl.style.width = `${progress}%`;
    }
    
    const questionContainer = document.getElementById('question-container');
    if (questionContainer) {
        questionContainer.innerHTML = `
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <div class="quiz-option" data-answer="${index}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-actions">
                <button class="btn btn--primary" id="assessment-next" disabled>
                    ${currentAssessment.currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Complete' : 'Next'}
                </button>
            </div>
        `;
        
        // Add option selection listeners
        questionContainer.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', selectAssessmentAnswer);
        });
        
        const nextBtn = questionContainer.querySelector('#assessment-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', nextAssessmentQuestion);
        }
    }
}

function selectAssessmentAnswer(event) {
    const questionContainer = document.getElementById('question-container');
    if (questionContainer) {
        questionContainer.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    }
    
    event.target.classList.add('selected');
    
    const answer = parseInt(event.target.dataset.answer);
    const question = currentAssessment.questions[currentAssessment.currentQuestionIndex];
    
    currentAssessment.answers[currentAssessment.currentQuestionIndex] = answer;
    if (answer === question.correct) {
        currentAssessment.score++;
    }
    
    const nextBtn = document.getElementById('assessment-next');
    if (nextBtn) {
        nextBtn.disabled = false;
    }
}

function nextAssessmentQuestion() {
    currentAssessment.currentQuestionIndex++;
    
    if (currentAssessment.currentQuestionIndex >= currentAssessment.questions.length) {
        completeAssessment();
    } else {
        showAssessmentQuestion();
    }
}

function completeAssessment() {
    const percentage = Math.round((currentAssessment.score / currentAssessment.questions.length) * 100);
    let level = 'Beginner';
    
    if (percentage >= 80) level = 'Advanced';
    else if (percentage >= 60) level = 'Intermediate';
    
    currentUser.level = level;
    currentUser.assessmentScore = percentage;
    
    // Update progress based on assessment
    appData.subjects.forEach(subject => {
        const baseProgress = currentUser.progress[subject.name] || 20;
        const bonus = Math.floor(percentage / 4);
        currentUser.progress[subject.name] = Math.min(95, baseProgress + bonus);
    });
    
    localStorage.setItem('smartTutorUser', JSON.stringify(currentUser));
    
    const assessmentContent = document.getElementById('assessment-content');
    const assessmentResults = document.getElementById('assessment-results');
    
    if (assessmentContent) assessmentContent.style.display = 'none';
    if (assessmentResults) assessmentResults.style.display = 'block';
    
    const resultsSummary = document.getElementById('results-summary');
    if (resultsSummary) {
        resultsSummary.innerHTML = `
            <div class="assessment-result">
                <h4>Your Level: ${level}</h4>
                <p>Score: ${percentage}% (${currentAssessment.score}/${currentAssessment.questions.length} correct)</p>
                <p>Based on your performance, we've created a personalized learning path for you!</p>
            </div>
        `;
    }
}

function startLearning() {
    if (assessmentModal) {
        assessmentModal.classList.add('hidden');
    }
    showStudentDashboard();
}

// Student Dashboard
function loadStudentData() {
    updateStudentStats();
    updateSubjectProgress();
    updateWeeklyActivity();
    updateRecommendations();
    loadSubjects();
    loadResources();
    loadAchievements();
}

function updateStudentStats() {
    const totalPointsEl = document.getElementById('total-points');
    const badgesCountEl = document.getElementById('badges-count');
    const currentStreakEl = document.getElementById('current-streak');
    
    if (totalPointsEl) totalPointsEl.textContent = currentUser.totalPoints || 0;
    if (badgesCountEl) badgesCountEl.textContent = (currentUser.badges || []).length;
    if (currentStreakEl) currentStreakEl.textContent = currentUser.currentStreak || 0;
}

function updateSubjectProgress() {
    const container = document.getElementById('subject-progress');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.keys(currentUser.progress || {}).forEach(subject => {
        const progress = currentUser.progress[subject];
        const div = document.createElement('div');
        div.className = 'subject-progress-item';
        div.innerHTML = `
            <div class="subject-progress-header">
                <span class="subject-name">${subject}</span>
                <span class="progress-percentage">${Math.round(progress)}%</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function updateWeeklyActivity() {
    const canvas = document.getElementById('activity-chart');
    if (!canvas) return;
    
    try {
        const ctx = canvas.getContext('2d');
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Hours Studied',
                    data: currentUser.weeklyActivity || [0, 0, 0, 0, 0, 0, 0],
                    backgroundColor: '#1FB8CD',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 8
                    }
                }
            }
        });
    } catch (error) {
        console.log('Chart.js not available, skipping chart rendering');
    }
}

function updateRecommendations() {
    const container = document.getElementById('recommendations');
    if (!container) return;
    
    const recommendations = [
        {
            title: "Continue with Mathematics",
            description: "You're making great progress! Complete the next algebra module."
        },
        {
            title: "Practice Science Lab",
            description: "Try the interactive chemistry experiments to reinforce concepts."
        },
        {
            title: "Weekly Challenge",
            description: "Join this week's spelling challenge to earn bonus points!"
        }
    ];
    
    container.innerHTML = recommendations.map(rec => `
        <div class="recommendation-item">
            <div class="recommendation-title">${rec.title}</div>
            <div class="recommendation-description">${rec.description}</div>
        </div>
    `).join('');
}

function loadSubjects() {
    const container = document.getElementById('subjects-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.subjects.forEach(subject => {
        const progress = currentUser.progress[subject.name] || 0;
        const div = document.createElement('div');
        div.className = 'subject-card';
        div.dataset.subjectId = subject.id;
        div.innerHTML = `
            <div class="subject-header">
                <span class="subject-icon">${subject.icon}</span>
                <div class="subject-info">
                    <h3>${subject.name}</h3>
                    <div class="subject-meta">${subject.modules} modules • ${subject.difficulty}</div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <p>${Math.round(progress)}% Complete</p>
        `;
        div.addEventListener('click', () => showSubjectModules(subject));
        container.appendChild(div);
    });
}

function showSubjectModules(subject) {
    const subjectsGrid = document.getElementById('subjects-grid');
    const moduleView = document.getElementById('module-view');
    
    if (subjectsGrid) subjectsGrid.style.display = 'none';
    if (moduleView) moduleView.style.display = 'block';
    
    const moduleTitle = document.getElementById('module-title');
    const moduleDescription = document.getElementById('module-description');
    const moduleProgress = document.getElementById('module-progress');
    
    if (moduleTitle) moduleTitle.textContent = subject.name;
    if (moduleDescription) moduleDescription.textContent = `Explore ${subject.modules} comprehensive modules in ${subject.name}`;
    
    const progress = currentUser.progress[subject.name] || 0;
    if (moduleProgress) moduleProgress.style.width = `${progress}%`;
    
    const lessonsContainer = document.getElementById('module-lessons');
    if (lessonsContainer) {
        lessonsContainer.innerHTML = '';
        
        // Generate sample lessons
        const lessons = [
            { title: 'Introduction & Basics', status: 'completed' },
            { title: 'Core Concepts', status: 'completed' },
            { title: 'Practice Problems', status: 'in-progress' },
            { title: 'Advanced Topics', status: 'locked' },
            { title: 'Final Assessment', status: 'locked' }
        ];
        
        lessons.forEach((lesson, index) => {
            const div = document.createElement('div');
            div.className = 'lesson-item';
            div.innerHTML = `
                <div class="lesson-header">
                    <span class="lesson-title">${lesson.title}</span>
                    <span class="lesson-status ${lesson.status}">${lesson.status.replace('-', ' ')}</span>
                </div>
                <p>Estimated time: ${15 + Math.floor(Math.random() * 30)} minutes</p>
            `;
            
            if (lesson.status !== 'locked') {
                div.addEventListener('click', () => startLesson(lesson, subject));
            }
            
            lessonsContainer.appendChild(div);
        });
    }
}

function showSubjects() {
    const subjectsGrid = document.getElementById('subjects-grid');
    const moduleView = document.getElementById('module-view');
    
    if (subjectsGrid) subjectsGrid.style.display = 'grid';
    if (moduleView) moduleView.style.display = 'none';
}

function startLesson(lesson, subject) {
    // Simple quiz for demonstration
    showQuiz([
        {
            question: `${subject.name} Question: What is the main concept in ${lesson.title}?`,
            options: ['Option A - Basic principles', 'Option B - Advanced theories', 'Option C - Practical applications', 'Option D - Historical context'],
            correct: 0
        }
    ]);
}

function showQuiz(questions) {
    const currentQuiz = {
        questions: questions,
        currentIndex: 0,
        score: 0,
        answers: []
    };
    
    if (quizModal) {
        quizModal.classList.remove('hidden');
        displayQuizQuestion(currentQuiz);
    }
}

function displayQuizQuestion(quiz) {
    const question = quiz.questions[quiz.currentIndex];
    
    const quizTitle = document.getElementById('quiz-title');
    const quizCounter = document.getElementById('quiz-question-counter');
    const quizQuestion = document.getElementById('quiz-question');
    
    if (quizTitle) quizTitle.textContent = 'Practice Quiz';
    if (quizCounter) quizCounter.textContent = `${quiz.currentIndex + 1}/${quiz.questions.length}`;
    if (quizQuestion) quizQuestion.textContent = question.question;
    
    const optionsContainer = document.getElementById('quiz-options');
    if (optionsContainer) {
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const div = document.createElement('div');
            div.className = 'quiz-option';
            div.dataset.answer = index;
            div.textContent = option;
            div.addEventListener('click', selectQuizAnswer);
            optionsContainer.appendChild(div);
        });
    }
    
    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) nextBtn.disabled = true;
}

function selectQuizAnswer(event) {
    document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
    event.target.classList.add('selected');
    
    const nextBtn = document.getElementById('quiz-next');
    if (nextBtn) nextBtn.disabled = false;
}

function handleQuizNext() {
    // Award points and close quiz for demo
    currentUser.totalPoints = (currentUser.totalPoints || 0) + 25;
    localStorage.setItem('smartTutorUser', JSON.stringify(currentUser));
    
    closeQuizModal();
    updateStudentStats();
}

function handleQuizPrev() {
    // Quiz navigation logic would go here
}

function loadResources() {
    const container = document.getElementById('resources-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.resources.forEach(resource => {
        const div = document.createElement('div');
        div.className = 'resource-card';
        div.innerHTML = `
            <div class="resource-type">${resource.type}</div>
            <h4 class="resource-title">${resource.title}</h4>
            <div class="resource-meta">${resource.subject} • ${resource.difficulty}</div>
            <p class="resource-description">${resource.description}</p>
        `;
        container.appendChild(div);
    });
}

function loadAchievements() {
    const earnedContainer = document.getElementById('earned-badges');
    const availableContainer = document.getElementById('available-badges');
    
    if (earnedContainer) earnedContainer.innerHTML = '';
    if (availableContainer) availableContainer.innerHTML = '';
    
    appData.badges.forEach(badge => {
        const isEarned = (currentUser.badges || []).includes(badge.id);
        const div = document.createElement('div');
        div.className = `badge-card ${isEarned ? 'earned' : 'locked'}`;
        div.innerHTML = `
            <div class="badge-icon">${badge.icon}</div>
            <h4 class="badge-name">${badge.name}</h4>
            <p class="badge-description">${badge.description}</p>
            <div class="badge-points">${badge.points} points</div>
        `;
        
        if (isEarned && earnedContainer) {
            earnedContainer.appendChild(div);
        } else if (!isEarned && availableContainer) {
            availableContainer.appendChild(div);
        }
    });
}

// Teacher Dashboard
function loadTeacherData() {
    loadStudentsOverview();
    loadClassAnalytics();
    loadContentManagement();
}

function loadStudentsOverview() {
    const container = document.getElementById('students-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.sampleStudents.forEach(student => {
        const avgProgress = Object.values(student.progress).reduce((a, b) => a + b, 0) / Object.values(student.progress).length;
        
        const div = document.createElement('div');
        div.className = 'student-card';
        div.innerHTML = `
            <div class="student-header">
                <span class="student-name">${student.name}</span>
                <span class="student-level">${student.level}</span>
            </div>
            <div class="student-stats">
                <div class="student-stat">
                    <div class="student-stat-value">${student.totalPoints}</div>
                    <div class="student-stat-label">Points</div>
                </div>
                <div class="student-stat">
                    <div class="student-stat-value">${Math.round(avgProgress)}%</div>
                    <div class="student-stat-label">Progress</div>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${avgProgress}%"></div>
            </div>
        `;
        container.appendChild(div);
    });
}

function loadClassAnalytics() {
    try {
        // Class Performance Chart
        const performanceCtx = document.getElementById('class-performance-chart');
        if (performanceCtx) {
            new Chart(performanceCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Class Average',
                        data: [65, 70, 75, 78, 82, 85],
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
        
        // Subject Distribution Chart
        const subjectCtx = document.getElementById('subject-distribution-chart');
        if (subjectCtx) {
            new Chart(subjectCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Mathematics', 'Science', 'English', 'History'],
                    datasets: [{
                        data: [30, 25, 25, 20],
                        backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5']
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false
                }
            });
        }
        
        // Engagement Chart
        const engagementCtx = document.getElementById('engagement-chart');
        if (engagementCtx) {
            new Chart(engagementCtx.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Active Students',
                        data: [18, 22, 20, 24, 19, 12, 8],
                        backgroundColor: '#5D878F'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
        }
    } catch (error) {
        console.log('Chart.js not available, skipping chart rendering');
    }
}

function loadContentManagement() {
    const container = document.getElementById('modules-list');
    if (!container) return;
    
    container.innerHTML = '';
    
    appData.learningModules.forEach(module => {
        const div = document.createElement('div');
        div.className = 'module-list-item';
        div.innerHTML = `
            <div class="module-list-info">
                <h4>${module.title}</h4>
                <p>${module.subject} • ${module.difficulty} • ${module.estimatedTime}</p>
            </div>
            <div class="module-list-actions">
                <button class="btn btn--outline btn--sm">Edit</button>
            </div>
        `;
        container.appendChild(div);
    });
}

// Navigation
function handleNavigation(event) {
    const section = event.target.dataset.section;
    if (!section) return;
    
    // Update active nav item
    const navItems = event.target.parentElement.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show corresponding section
    const dashboard = event.target.closest('.page');
    if (dashboard) {
        dashboard.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
        });
        
        const targetSection = dashboard.querySelector(`#${section}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }
    }
}

// Logout
function handleLogout() {
    localStorage.removeItem('smartTutorUser');
    currentUser = null;
    showLandingPage();
}