// Main JavaScript file for homepage
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Load popular destinations
    loadPopularDestinations();
    
    // Initialize search forms
    initSearchForms();
});

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('hidden');
        });
    }
    
    // Update navigation based on auth state
    auth.updateNavigation();
}

function loadPopularDestinations() {
    const container = document.getElementById('popularDestinations');
    if (!container) return;
    
    const popularDestinations = getPopularDestinations();
    
    container.innerHTML = popularDestinations.map(destination => `
        <div class="destination-card fade-in">
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}">
                <div class="destination-badge">
                    From ₹${destination.minBudget.toLocaleString()}
                </div>
            </div>
            
            <div class="destination-content">
                <div class="destination-header">
                    <h3 class="destination-name">${destination.name}</h3>
                    <div class="destination-rating">
                        <svg class="star-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
                        </svg>
                        <span class="rating-text">4.8</span>
                    </div>
                </div>
                
                <p class="destination-description">${destination.description}</p>
                
                <div class="destination-meta">
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M12 1v6m0 6v6"></path>
                            <path d="m21 12-6 0m-6 0-6 0"></path>
                        </svg>
                        <span>${destination.duration}</span>
                    </div>
                    <span>${destination.state}</span>
                </div>

                <div class="destination-highlights">
                    ${destination.highlights.slice(0, 2).map(highlight => 
                        `<span class="highlight-tag">${highlight}</span>`
                    ).join('')}
                </div>

                <div class="destination-footer">
                    <a href="itinerary.html?id=${destination.id}" class="btn btn-primary btn-full">
                        <span>View Details</span>
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12,5 19,12 12,19"></polyline>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

function initSearchForms() {
    // Destination search form
    const destinationForm = document.getElementById('destinationForm');
    if (destinationForm) {
        destinationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('destinationInput');
            const query = input.value.trim();
            
            if (query) {
                window.location.href = `destinations.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
    
    // Budget search form
    const budgetForm = document.getElementById('budgetForm');
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const select = document.getElementById('budgetSelect');
            const budget = select.value;
            
            if (budget) {
                window.location.href = `destinations.html?budget=${budget}`;
            }
        });
    }
}

// Utility functions
function showLoading(element) {
    element.innerHTML = `
        <div class="loading">
            <div class="loading-spinner"></div>
        </div>
    `;
}

function showError(element, message) {
    element.innerHTML = `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}

// Animation utilities
function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', animateOnScroll);