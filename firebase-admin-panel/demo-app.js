import { mockUsers, mockAdmins, getLocalUsers, getLocalAdmins, saveLocalUsers, saveLocalAdmins } from './demo-data.js';

// DOM Elements
const loginScreen = document.getElementById('login-screen');
const loadingScreen = document.getElementById('loading-screen');
const accessDeniedScreen = document.getElementById('access-denied-screen');
const adminScreen = document.getElementById('admin-screen');

// Login elements
const googleSigninBtn = document.getElementById('google-signin-btn');
const emailAuthForm = document.getElementById('email-auth-form');
const signinBtn = document.getElementById('signin-btn');
const signupBtn = document.getElementById('signup-btn');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const authError = document.getElementById('auth-error');

// Admin panel elements
const adminInfo = document.getElementById('admin-info');
const logoutBtn = document.getElementById('logout-btn');
const logoutBtnDenied = document.getElementById('logout-btn-denied');
const searchInput = document.getElementById('search-input');
const providerFilter = document.getElementById('provider-filter');
const userCount = document.getElementById('user-count');
const usersTable = document.getElementById('users-table');
const usersTbody = document.getElementById('users-tbody');
const noUsers = document.getElementById('no-users');

// State
let currentUser = null;
let allUsers = [];
let filteredUsers = [];
let admins = [];

// Initialize app
function init() {
    setupEventListeners();
    loadDemoData();
    checkCurrentUser();
}

function setupEventListeners() {
    // Auth buttons
    googleSigninBtn.addEventListener('click', handleGoogleSignin);
    signinBtn.addEventListener('click', handleEmailSignin);
    signupBtn.addEventListener('click', handleEmailSignup);
    logoutBtn.addEventListener('click', handleLogout);
    logoutBtnDenied.addEventListener('click', handleLogout);
    
    // Search and filter
    searchInput.addEventListener('input', handleSearch);
    providerFilter.addEventListener('change', handleProviderFilter);
    
    // Form submission
    emailAuthForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleEmailSignin();
    });
}

function loadDemoData() {
    allUsers = getLocalUsers();
    admins = getLocalAdmins();
}

function checkCurrentUser() {
    const stored = localStorage.getItem('windsurf-current-user');
    if (stored) {
        currentUser = JSON.parse(stored);
        handleAuthStateChange(currentUser);
    } else {
        showScreen('login');
    }
}

// Auth handlers
function handleGoogleSignin() {
    // Simulate Google sign-in
    const user = {
        uid: "google-demo-" + Date.now(),
        name: "Demo Google User",
        email: "demo@gmail.com",
        provider: "google.com"
    };
    
    simulateLogin(user);
}

function handleEmailSignin() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showError('Please enter email and password');
        return;
    }
    
    // Check for demo admin
    if (email === "admin@windsurf.com" && password === "admin123") {
        const user = {
            uid: "admin-1",
            name: "Admin User",
            email: "admin@windsurf.com",
            provider: "password"
        };
        simulateLogin(user);
        return;
    }
    
    // Regular login simulation
    const user = {
        uid: "email-demo-" + Date.now(),
        name: email.split('@')[0],
        email: email,
        provider: "password"
    };
    
    simulateLogin(user);
}

function handleEmailSignup() {
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showError('Please enter email and password');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    const user = {
        uid: "signup-demo-" + Date.now(),
        name: email.split('@')[0],
        email: email,
        provider: "password"
    };
    
    simulateLogin(user);
}

function simulateLogin(user) {
    showError('');
    
    // Add user to local storage
    upsertUser(user);
    
    // Set as current user
    currentUser = user;
    localStorage.setItem('windsurf-current-user', JSON.stringify(user));
    
    handleAuthStateChange(user);
}

function upsertUser(user) {
    const users = getLocalUsers();
    const existingIndex = users.findIndex(u => u.uid === user.uid);
    
    const userData = {
        ...user,
        lastLogin: { seconds: Date.now() / 1000 },
        createdAt: existingIndex >= 0 ? users[existingIndex].createdAt : { seconds: Date.now() / 1000 }
    };
    
    if (existingIndex >= 0) {
        users[existingIndex] = userData;
    } else {
        users.push(userData);
    }
    
    saveLocalUsers(users);
    allUsers = users;
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('windsurf-current-user');
    showScreen('login');
    clearInputs();
}

function clearInputs() {
    emailInput.value = '';
    passwordInput.value = '';
    showError('');
}

// Auth state handler
function handleAuthStateChange(user) {
    if (user) {
        showScreen('loading');
        
        // Check if user is admin
        const isAdmin = admins.includes(user.uid);
        
        setTimeout(() => {
            if (isAdmin) {
                showAdminPanel();
            } else {
                showScreen('access-denied');
            }
        }, 1000);
    } else {
        showScreen('login');
    }
}

// Screen management
function showScreen(screen) {
    loginScreen.style.display = 'none';
    loadingScreen.style.display = 'none';
    accessDeniedScreen.style.display = 'none';
    adminScreen.style.display = 'none';
    
    switch (screen) {
        case 'login':
            loginScreen.style.display = 'flex';
            break;
        case 'loading':
            loadingScreen.style.display = 'flex';
            break;
        case 'access-denied':
            accessDeniedScreen.style.display = 'flex';
            break;
        case 'admin':
            adminScreen.style.display = 'block';
            break;
    }
}

function showAdminPanel() {
    showScreen('admin');
    
    // Update admin info
    if (currentUser) {
        adminInfo.textContent = `Welcome, ${currentUser.name || currentUser.email}`;
    }
    
    // Load and display users
    loadDemoData();
    applyFilters();
}

// Users management
function applyFilters() {
    let filtered = [...allUsers];
    
    // Apply search filter
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(user => 
            (user.name && user.name.toLowerCase().includes(searchTerm)) ||
            (user.email && user.email.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply provider filter
    const provider = providerFilter.value;
    if (provider && provider !== "all") {
        filtered = filtered.filter(user => user.provider === provider);
    }
    
    filteredUsers = filtered;
    renderUsers();
}

function handleSearch() {
    applyFilters();
}

function handleProviderFilter() {
    applyFilters();
}

function renderUsers() {
    userCount.textContent = `${filteredUsers.length} user${filteredUsers.length !== 1 ? 's' : ''}`;
    
    if (filteredUsers.length === 0) {
        usersTable.style.display = 'none';
        noUsers.style.display = 'block';
        return;
    }
    
    usersTable.style.display = 'table';
    noUsers.style.display = 'none';
    
    usersTbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = createUserRow(user);
        usersTbody.appendChild(row);
    });
}

function createUserRow(user) {
    const row = document.createElement('tr');
    const isAdmin = admins.includes(user.uid);
    
    row.innerHTML = `
        <td>${user.name || 'N/A'}</td>
        <td>${user.email || 'N/A'}</td>
        <td>
            <span class="provider-badge provider-${user.provider === 'google.com' ? 'google' : 'password'}">
                ${user.provider === 'google.com' ? 'Google' : 'Email'}
            </span>
        </td>
        <td>${formatTimestamp(user.createdAt)}</td>
        <td>${formatTimestamp(user.lastLogin)}</td>
        <td>
            <span class="admin-status">${isAdmin ? 'Yes' : 'No'}</span>
        </td>
        <td>
            <button class="admin-toggle ${isAdmin ? 'is-admin revoke' : ''}" 
                    data-uid="${user.uid}" 
                    ${user.uid === currentUser?.uid ? 'disabled' : ''}>
                ${isAdmin ? 'Revoke Admin' : 'Make Admin'}
            </button>
        </td>
    `;
    
    // Add event listener to admin toggle button
    const toggleBtn = row.querySelector('.admin-toggle');
    if (!toggleBtn.disabled) {
        toggleBtn.addEventListener('click', () => handleAdminToggle(user.uid, !isAdmin));
    }
    
    return row;
}

function handleAdminToggle(uid, makeAdminFlag) {
    const currentAdmins = getLocalAdmins();
    
    if (makeAdminFlag) {
        if (!currentAdmins.includes(uid)) {
            currentAdmins.push(uid);
        }
    } else {
        const index = currentAdmins.indexOf(uid);
        if (index > -1) {
            currentAdmins.splice(index, 1);
        }
    }
    
    saveLocalAdmins(currentAdmins);
    admins = currentAdmins;
    applyFilters(); // Refresh the display
}

function formatTimestamp(timestamp) {
    if (!timestamp || !timestamp.seconds) return "Never";
    return new Date(timestamp.seconds * 1000).toLocaleString();
}

// Utility functions
function showError(message) {
    if (message) {
        authError.textContent = message;
        authError.classList.add('show');
    } else {
        authError.classList.remove('show');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
































