// Login page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    if (auth.isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    initLoginForm();
});

function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');
        
        // Clear previous errors
        hideError();
        
        // Show loading state
        const submitBtn = document.getElementById('loginBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Signing in...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            try {
                const success = auth.login(email, password);
                
                if (success) {
                    // Redirect to dashboard or intended page
                    const urlParams = new URLSearchParams(window.location.search);
                    const redirect = urlParams.get('redirect') || 'dashboard.html';
                    window.location.href = redirect;
                } else {
                    showError('Invalid email or password');
                }
            } catch (error) {
                showError('Login failed. Please try again.');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
    });
}

function showError(message) {
    const errorElement = document.getElementById('loginError');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function hideError() {
    const errorElement = document.getElementById('loginError');
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Demo login functionality
function fillDemoCredentials() {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    if (emailInput && passwordInput) {
        emailInput.value = 'demo@example.com';
        passwordInput.value = 'password123';
    }
}

// Add demo login button
document.addEventListener('DOMContentLoaded', function() {
    const demoInfo = document.querySelector('.demo-info');
    if (demoInfo) {
        const demoButton = document.createElement('button');
        demoButton.type = 'button';
        demoButton.className = 'btn btn-outline btn-full';
        demoButton.style.marginTop = '1rem';
        demoButton.innerHTML = '<span>Try Demo Login</span>';
        demoButton.onclick = fillDemoCredentials;
        
        demoInfo.appendChild(demoButton);
    }
});