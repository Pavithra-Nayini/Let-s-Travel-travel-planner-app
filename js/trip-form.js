// Trip form functionality
document.addEventListener('DOMContentLoaded', function() {
    initTripForm();
    initTransportOptions();
});

function initTripForm() {
    const form = document.getElementById('tripPlanForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Build query parameters
        const params = new URLSearchParams();
        
        if (data.destination) {
            params.set('search', data.destination);
        }
        if (data.budget) {
            params.set('budget', data.budget);
        }
        if (data.startDate) {
            params.set('startDate', data.startDate);
        }
        if (data.endDate) {
            params.set('endDate', data.endDate);
        }
        if (data.travelers) {
            params.set('travelers', data.travelers);
        }
        if (data.transportPreference) {
            params.set('transport', data.transportPreference);
        }
        if (data.accommodationType) {
            params.set('accommodation', data.accommodationType);
        }
        if (data.tripType) {
            params.set('type', data.tripType);
        }
        
        // Navigate to destinations page with filters
        window.location.href = `destinations.html?${params.toString()}`;
    });
}

function initTransportOptions() {
    const transportOptions = document.querySelectorAll('.transport-option');
    const hiddenInput = document.getElementById('transportPreference');
    
    transportOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            transportOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update hidden input value
            const transport = this.dataset.transport;
            if (hiddenInput) {
                hiddenInput.value = transport;
            }
        });
    });
}

// Form validation
function validateForm(formData) {
    const errors = [];
    
    if (!formData.budget) {
        errors.push('Please select your budget');
    }
    
    if (formData.startDate && formData.endDate) {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        
        if (startDate >= endDate) {
            errors.push('End date must be after start date');
        }
        
        if (startDate < new Date()) {
            errors.push('Start date cannot be in the past');
        }
    }
    
    return errors;
}

// Show form errors
function showFormErrors(errors) {
    // Remove existing error messages
    const existingErrors = document.querySelectorAll('.form-error');
    existingErrors.forEach(error => error.remove());
    
    if (errors.length > 0) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error error-message';
        errorContainer.innerHTML = `
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        const form = document.getElementById('tripPlanForm');
        form.insertBefore(errorContainer, form.firstChild);
        
        // Scroll to top of form
        errorContainer.scrollIntoView({ behavior: 'smooth' });
    }
}

// Auto-populate form from URL parameters
function populateFormFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Populate destination
    const destination = urlParams.get('destination');
    if (destination) {
        const destinationInput = document.querySelector('input[name="destination"]');
        if (destinationInput) {
            destinationInput.value = destination;
        }
    }
    
    // Populate budget
    const budget = urlParams.get('budget');
    if (budget) {
        const budgetSelect = document.querySelector('select[name="budget"]');
        if (budgetSelect) {
            budgetSelect.value = budget;
        }
    }
    
    // Populate travelers
    const travelers = urlParams.get('travelers');
    if (travelers) {
        const travelersSelect = document.querySelector('select[name="travelers"]');
        if (travelersSelect) {
            travelersSelect.value = travelers;
        }
    }
}

// Initialize form population on page load
document.addEventListener('DOMContentLoaded', populateFormFromURL);