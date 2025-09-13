import { supabase, isDemo } from './supabase-config.js';

// DOM Elements
const demoNotice = document.getElementById('demo-notice');
const dismissDemo = document.getElementById('dismiss-demo');
const loginScreen = document.getElementById('login-screen');
const loadingScreen = document.getElementById('loading-screen');
const accessDeniedScreen = document.getElementById('access-denied-screen');
const adminScreen = document.getElementById('admin-screen');

// Login elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const googleSigninBtn = document.getElementById('google-signin-btn');
const authError = document.getElementById('auth-error');

// Admin panel elements
const adminInfo = document.getElementById('admin-info');
const logoutBtn = document.getElementById('logout-btn');
const logoutBtnDenied = document.getElementById('logout-btn-denied');

// Stats elements
const totalUsers = document.getElementById('total-users');
const totalTeachers = document.getElementById('total-teachers');
const totalStudents = document.getElementById('total-students');
const totalAdmins = document.getElementById('total-admins');

// Controls
const searchInput = document.getElementById('search-input');
const roleFilter = document.getElementById('role-filter');
const statusFilter = document.getElementById('status-filter');
const refreshBtn = document.getElementById('refresh-btn');

// Table
const usersTbody = document.getElementById('users-tbody');
const noUsers = document.getElementById('no-users');

// State
let currentUser = null;
let allUsers = [];
let filteredUsers = [];

// Demo data
const demoUsers = [
    {
        id: '1',
        email: 'admin@smarttutor.com',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        created_at: '2024-01-15T10:00:00Z',
        last_sign_in_at: '2024-09-13T15:30:00Z'
    },
    {
        id: '2',
        email: 'teacher@example.com',
        name: 'Sarah Johnson',
        role: 'teacher',
        status: 'active',
        created_at: '2024-02-20T09:15:00Z',
        last_sign_in_at: '2024-09-13T14:22:00Z'
    },
    {
        id: '3',
        email: 'student1@example.com',
        name: 'Alex Smith',
        role: 'student',
        status: 'active',
        created_at: '2024-03-10T11:45:00Z',
        last_sign_in_at: '2024-09-13T16:10:00Z'
    },
    {
        id: '4',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'student',
        status: 'inactive',
        created_at: '2024-04-01T16:30:00Z',
        last_sign_in_at: '2024-08-20T10:15:00Z'
    }
];

// Initialize app
function init() {
    setupEventListeners();
    checkAuthState();
    
    if (isDemo) {
        demoNotice.style.display = 'flex';
    }
}

function setupEventListeners() {
    dismissDemo.addEventListener('click', () => {
        demoNotice.style.display = 'none';
    });
    
    loginForm.addEventListener('submit', handleLogin);
    googleSigninBtn.addEventListener('click', handleGoogleSignin);
    logoutBtn.addEventListener('click', handleLogout);
    logoutBtnDenied.addEventListener('click', handleLogout);
    
    searchInput.addEventListener('input', applyFilters);
    roleFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    refreshBtn.addEventListener('click', loadUsers);
}

async function checkAuthState() {
    if (isDemo) {
        const demoUser = localStorage.getItem('demo-admin-user');
        if (demoUser) {
            currentUser = JSON.parse(demoUser);
            showAdminPanel();
        } else {
            showScreen('login');
        }
        return;
    }
    
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            currentUser = user;
            showAdminPanel();
        } else {
            showScreen('login');
        }
    } catch (error) {
        console.error('Auth check error:', error);
        showScreen('login');
    }
}

async function handleLogin(e) {
    e.preventDefault();
    showError('');
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showError('Please enter email and password');
        return;
    }
    
    if (isDemo) {
        if (email === 'admin@smarttutor.com' && password === 'admin123') {
            const user = { email, name: 'Admin User', role: 'admin' };
            localStorage.setItem('demo-admin-user', JSON.stringify(user));
            currentUser = user;
            showAdminPanel();
        } else if (email === 'user@example.com' && password === 'user123') {
            showScreen('access-denied');
        } else {
            showError('Invalid credentials. Use demo credentials provided above.');
        }
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        currentUser = data.user;
        showAdminPanel();
    } catch (error) {
        showError(getErrorMessage(error));
    }
}

async function handleGoogleSignin() {
    if (isDemo) {
        showError('Google sign-in is disabled in demo mode. Use email/password instead.');
        return;
    }
    
    try {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw error;
    } catch (error) {
        showError(getErrorMessage(error));
    }
}

async function handleLogout() {
    if (isDemo) {
        localStorage.removeItem('demo-admin-user');
        currentUser = null;
        showScreen('login');
        return;
    }
    
    try {
        await supabase.auth.signOut();
        currentUser = null;
        showScreen('login');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

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
    if (currentUser) {
        adminInfo.textContent = `Welcome, ${currentUser.name || currentUser.email}`;
    }
    loadUsers();
}

function loadUsers() {
    if (isDemo) {
        allUsers = [...demoUsers];
    }
    updateStats();
    applyFilters();
}

function updateStats() {
    totalUsers.textContent = allUsers.length;
    totalTeachers.textContent = allUsers.filter(u => u.role === 'teacher').length;
    totalStudents.textContent = allUsers.filter(u => u.role === 'student').length;
    totalAdmins.textContent = allUsers.filter(u => u.role === 'admin').length;
}

function applyFilters() {
    let filtered = [...allUsers];
    
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }
    
    const roleValue = roleFilter.value;
    if (roleValue !== 'all') {
        filtered = filtered.filter(user => user.role === roleValue);
    }
    
    const statusValue = statusFilter.value;
    if (statusValue !== 'all') {
        filtered = filtered.filter(user => user.status === statusValue);
    }
    
    filteredUsers = filtered;
    renderUsers();
}

function renderUsers() {
    if (filteredUsers.length === 0) {
        document.getElementById('users-table').style.display = 'none';
        noUsers.style.display = 'block';
        return;
    }
    
    document.getElementById('users-table').style.display = 'table';
    noUsers.style.display = 'none';
    
    usersTbody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = createUserRow(user);
        usersTbody.appendChild(row);
    });
}

function createUserRow(user) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td><span class="role-badge ${user.role}">${user.role}</span></td>
        <td><span class="status-badge ${user.status}">${user.status}</span></td>
        <td>${formatDate(user.last_sign_in_at)}</td>
        <td>${formatDate(user.created_at)}</td>
        <td>
            <div class="action-buttons">
                <button class="action-btn edit" onclick="editUser('${user.id}')">Edit</button>
                <button class="action-btn delete" onclick="deleteUser('${user.id}')">Delete</button>
            </div>
        </td>
    `;
    return row;
}

function formatDate(dateString) {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
}

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
        'Invalid login credentials': 'Invalid email or password',
        'Email not confirmed': 'Please confirm your email before signing in',
        'Too many requests': 'Too many attempts. Please try again later.'
    };
    
    return errorMessages[error.message] || error.message || 'An error occurred';
}

// Global functions for buttons
window.editUser = (id) => {
    console.log('Edit user:', id);
};

window.deleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
        console.log('Delete user:', id);
    }
};

document.addEventListener('DOMContentLoaded', init);
