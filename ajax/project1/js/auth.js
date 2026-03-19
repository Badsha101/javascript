// API Base URL
const API_BASE_URL = '/api';

// DOM Elements
const loginContainer = document.getElementById('loginContainer');
const registerContainer = document.getElementById('registerContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const messageDiv = document.getElementById('message');
const loadingDiv = document.getElementById('loading');
const showRegisterLink = document.getElementById('showRegisterLink');
const showLoginLink = document.getElementById('showLoginLink');

// ফাংশন ডিফাইন - এগুলো গ্লোবাল স্কোপে আছে
function showRegister() {
    console.log('👉 showRegister function called');
    if (loginContainer) {
        loginContainer.classList.add('hidden');
    } else {
        console.error('loginContainer not found');
    }
    
    if (registerContainer) {
        registerContainer.classList.remove('hidden');
    } else {
        console.error('registerContainer not found');
    }
    
    clearMessage();
}

function showLogin() {
    console.log('👉 showLogin function called');
    if (registerContainer) {
        registerContainer.classList.add('hidden');
    } else {
        console.error('registerContainer not found');
    }
    
    if (loginContainer) {
        loginContainer.classList.remove('hidden');
    } else {
        console.error('loginContainer not found');
    }
    
    clearMessage();
}

// Message Functions
function showMessage(text, type) {
    if (messageDiv) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
    }
}

function clearMessage() {
    if (messageDiv) {
        messageDiv.textContent = '';
        messageDiv.className = 'message';
    }
}

function showLoading(show) {
    if (loadingDiv) {
        if (show) {
            loadingDiv.classList.remove('hidden');
        } else {
            loadingDiv.classList.add('hidden');
        }
    }
}

// Logout function
function logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/';
}

// DOM সম্পূর্ণ লোড হওয়ার পর event listeners যোগ করুন
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ auth.js loaded successfully');
    console.log('📁 Current path:', window.location.pathname);
    
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (token && window.location.pathname === '/') {
        console.log('🔓 User already logged in, redirecting to dashboard');
        window.location.href = '/dashboard';
    }
    
    // Register link click handler
    if (showRegisterLink) {
        console.log('✅ Register link found');
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Register link clicked');
            showRegister();
        });
    } else {
        console.error('❌ Register link not found!');
    }
    
    // Login link click handler
    if (showLoginLink) {
        console.log('✅ Login link found');
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Login link clicked');
            showLogin();
        });
    } else {
        console.error('❌ Login link not found!');
    }
    
    // Login Form Handler
    if (loginForm) {
        console.log('✅ Login form found');
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('🔑 Login form submitted');
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            showLoading(true);
            clearMessage();
            
            try {
                console.log('📡 Sending login request to:', `${API_BASE_URL}/login`);
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                console.log('📨 Login response:', data);
                
                if (response.ok) {
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    showMessage('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = '/dashboard';
                    }, 1500);
                } else {
                    showMessage(data.message || 'Login failed!', 'error');
                }
            } catch (error) {
                console.error('❌ Login error:', error);
                showMessage('Network error. Please try again.', 'error');
            } finally {
                showLoading(false);
            }
        });
    } else {
        console.error('❌ Login form not found!');
    }
    
    // Register Form Handler
    if (registerForm) {
        console.log('✅ Register form found');
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('📝 Register form submitted');
            
            const name = document.getElementById('regName').value;
            const email = document.getElementById('regEmail').value;
            const password = document.getElementById('regPassword').value;
            const confirmPassword = document.getElementById('regConfirmPassword').value;
            
            if (password !== confirmPassword) {
                showMessage('Passwords do not match!', 'error');
                return;
            }
            
            showLoading(true);
            clearMessage();
            
            try {
                console.log('📡 Sending register request to:', `${API_BASE_URL}/register`);
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                });
                
                const data = await response.json();
                console.log('📨 Register response:', data);
                
                if (response.ok) {
                    showMessage('Registration successful! Please login.', 'success');
                    registerForm.reset();
                    setTimeout(() => {
                        showLogin();
                    }, 2000);
                } else {
                    showMessage(data.message || 'Registration failed!', 'error');
                }
            } catch (error) {
                console.error('❌ Registration error:', error);
                showMessage('Network error. Please try again.', 'error');
            } finally {
                showLoading(false);
            }
        });
    } else {
        console.error('❌ Register form not found!');
    }
});

// গ্লোবাল স্কোপে ফাংশন আছে কিনা চেক করুন
console.log('🔍 Checking global functions:', {
    showLogin: typeof showLogin,
    showRegister: typeof showRegister,
    logout: typeof logout
});