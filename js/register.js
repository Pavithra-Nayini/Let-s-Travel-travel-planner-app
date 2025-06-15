// Register page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Redirect if already logged in
    if (auth.isLoggedIn()) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    initRegisterForm();
});

function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        
        // Clear previous errors
        hideError();
        
        // Show loading state
        const submitBtn = document.getElementById('registerBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Creating account...</span>';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            try {
                const success = auth.register(name, email, password, confirmPassword);
                
                if (success) {
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                showError(error.message);
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
    });
}

function showError(message) {
    const errorElement = document.getElementById('registerError');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
}

function hideError() {
    const errorElement = document.getElementById('registerError');
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
}

// Password strength indicator
function initPasswordStrength() {
    const passwordInput = document.querySelector('input[name="password"]');
    if (!passwordInput) return;
    
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strength = calculatePasswordStrength(password);
        updatePasswordStrengthIndicator(strength);
    });
}

function calculatePasswordStrength(password) {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/)) score++;
    if (password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9]/)) score++;
    
    return score;
}

function updatePasswordStrengthIndicator(strength) {
    // This could be implemented to show a visual password strength indicator
    // For now, we'll just log it
    console.log('Password strength:', strength);
}

// Initialize password strength on page load
document.addEventListener('DOMContentLoaded', initPasswordStrength);