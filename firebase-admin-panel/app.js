import { onAuthChange, loginWithGoogle, loginWithEmail, signUpWithEmail, logout, isUserAdmin } from './auth.js';
import { subscribeToUsers, makeAdmin, revokeAdmin, formatTimestamp, filterUsers, filterUsersByProvider } from './admin.js';

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
let unsubscribeUsers = null;

// Initialize app
function init() {
    setupEventListeners();
    onAuthChange(handleAuthStateChange);
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

// Auth handlers
async function handleGoogleSignin() {
    try {
        showError('');
        await loginWithGoogle();
    } catch (error) {
        showError(getErrorMessage(error));
    }
}

async function handleEmailSignin() {
    try {
        showError('');
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        if (!email || !password) {
            showError('Please enter email and password');
            return;
        }
        
        await loginWithEmail(email, password);
    } catch (error) {
        showError(getErrorMessage(error));
    }
}

async function handleEmailSignup() {
    try {
        showError('');
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
        
        await signUpWithEmail(email, password);
    } catch (error) {
        showError(getErrorMessage(error));
    }
}

async function handleLogout() {
    try {
        if (unsubscribeUsers) {
            unsubscribeUsers();
            unsubscribeUsers = null;
        }
        await logout();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Auth state handler
async function handleAuthStateChange(user) {
    if (user) {
        currentUser = user;
        showScreen('loading');
        
        // Check if user is admin
        const isAdmin = await isUserAdmin(user.uid);
        
        if (isAdmin) {
            showAdminPanel();
        } else {
            showScreen('access-denied');
        }
    } else {
        currentUser = null;
        if (unsubscribeUsers) {
            unsubscribeUsers();
            unsubscribeUsers = null;
        }
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
        adminInfo.textContent = `Welcome, ${currentUser.displayName || currentUser.email}`;
    }
    
    // Start listening to users
    if (!unsubscribeUsers) {
        unsubscribeUsers = subscribeToUsers(handleUsersUpdate, handleUsersError);
    }
}

// Users management
function handleUsersUpdate(users) {
    allUsers = users;
    applyFilters();
}

function handleUsersError(error) {
    console.error('Users fetch error:', error);
    showError('Failed to load users. Please check your permissions.');
}

function applyFilters() {
    let filtered = allUsers;
    
    // Apply search filter
    const searchTerm = searchInput.value.trim();
    filtered = filterUsers(filtered, searchTerm);
    
    // Apply provider filter
    const provider = providerFilter.value;
    filtered = filterUsersByProvider(filtered, provider);
    
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
    
    // Check if user is admin
    const isAdmin = allUsers.some(u => u.uid === user.uid && u.isAdmin);
    
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
    toggleBtn.addEventListener('click', () => handleAdminToggle(user.uid, !isAdmin));
    
    return row;
}

async function handleAdminToggle(uid, makeAdminFlag) {
    try {
        if (makeAdminFlag) {
            await makeAdmin(uid);
        } else {
            await revokeAdmin(uid);
        }
        
        // The UI will update automatically via the real-time listener
        console.log(`Admin status ${makeAdminFlag ? 'granted' : 'revoked'} for user ${uid}`);
    } catch (error) {
        console.error('Error toggling admin status:', error);
        showError('Failed to update admin status. Please try again.');
    }
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

function getErrorMessage(error) {
    const errorMessages = {
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/email-already-in-use': 'An account with this email already exists.',
        'auth/weak-password': 'Password should be at least 6 characters.',
        'auth/invalid-email': 'Invalid email address.',
        'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
        'auth/cancelled-popup-request': 'Sign-in was cancelled.',
        'permission-denied': 'You do not have permission to access this resource.'
    };
    
    return errorMessages[error.code] || errorMessages[error.message] || error.message || 'An error occurred. Please try again.';
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
