// Destinations page functionality
document.addEventListener('DOMContentLoaded', function() {
    initDestinationsPage();
    initFilters();
    loadDestinations();
});

let filteredDestinations = [...destinations];
let currentFilters = {
    search: '',
    budget: '',
    state: '',
    sort: 'popular'
};

function initDestinationsPage() {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Set initial filters from URL
    currentFilters.search = urlParams.get('search') || '';
    currentFilters.budget = urlParams.get('budget') || '';
    currentFilters.state = urlParams.get('state') || '';
    currentFilters.sort = urlParams.get('sort') || 'popular';
    
    // Update filter inputs
    updateFilterInputs();
    
    // Show budget filter if budget is specified
    if (currentFilters.budget) {
        showBudgetFilter(currentFilters.budget);
    }
    
    // Populate state filter options
    populateStateFilter();
}

function updateFilterInputs() {
    const searchInput = document.getElementById('searchInput');
    const budgetSelect = document.getElementById('budgetSelect');
    const stateSelect = document.getElementById('stateSelect');
    const sortSelect = document.getElementById('sortSelect');
    
    if (searchInput) searchInput.value = currentFilters.search;
    if (budgetSelect) budgetSelect.value = currentFilters.budget;
    if (stateSelect) stateSelect.value = currentFilters.state;
    if (sortSelect) sortSelect.value = currentFilters.sort;
}

function showBudgetFilter(budget) {
    const budgetFilter = document.getElementById('budgetFilter');
    const budgetText = document.getElementById('budgetText');
    
    if (budgetFilter && budgetText) {
        budgetFilter.classList.remove('hidden');
        budgetText.textContent = `Destinations under ₹${parseInt(budget).toLocaleString()}`;
    }
}

function populateStateFilter() {
    const stateSelect = document.getElementById('stateSelect');
    if (!stateSelect) return;
    
    const states = [...new Set(destinations.map(dest => dest.state))].sort();
    
    // Keep the "All States" option and add state options
    const currentOptions = stateSelect.innerHTML;
    stateSelect.innerHTML = currentOptions + states.map(state => 
        `<option value="${state}">${state}</option>`
    ).join('');
}

function initFilters() {
    const searchInput = document.getElementById('searchInput');
    const budgetSelect = document.getElementById('budgetSelect');
    const stateSelect = document.getElementById('stateSelect');
    const sortSelect = document.getElementById('sortSelect');
    
    // Search input with debounce
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = this.value;
                applyFilters();
            }, 300);
        });
    }
    
    // Filter selects
    if (budgetSelect) {
        budgetSelect.addEventListener('change', function() {
            currentFilters.budget = this.value;
            if (this.value) {
                showBudgetFilter(this.value);
            } else {
                const budgetFilter = document.getElementById('budgetFilter');
                if (budgetFilter) budgetFilter.classList.add('hidden');
            }
            applyFilters();
        });
    }
    
    if (stateSelect) {
        stateSelect.addEventListener('change', function() {
            currentFilters.state = this.value;
            applyFilters();
        });
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentFilters.sort = this.value;
            applyFilters();
        });
    }
}

function applyFilters() {
    let filtered = [...destinations];
    
    // Apply search filter
    if (currentFilters.search) {
        const searchTerm = currentFilters.search.toLowerCase();
        filtered = filtered.filter(dest =>
            dest.name.toLowerCase().includes(searchTerm) ||
            dest.state.toLowerCase().includes(searchTerm) ||
            dest.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply budget filter
    if (currentFilters.budget) {
        const budget = parseInt(currentFilters.budget);
        filtered = filtered.filter(dest => dest.minBudget <= budget);
    }
    
    // Apply state filter
    if (currentFilters.state) {
        filtered = filtered.filter(dest => dest.state === currentFilters.state);
    }
    
    // Apply sorting
    switch (currentFilters.sort) {
        case 'price-low':
            filtered.sort((a, b) => a.minBudget - b.minBudget);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.minBudget - a.minBudget);
            break;
        case 'name':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Keep original order for 'popular'
            break;
    }
    
    filteredDestinations = filtered;
    renderDestinations();
    updateResultsCount();
}

function loadDestinations() {
    applyFilters();
}

function renderDestinations() {
    const container = document.getElementById('destinationsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!container) return;
    
    if (filteredDestinations.length === 0) {
        container.classList.add('hidden');
        if (noResults) noResults.classList.remove('hidden');
        return;
    }
    
    container.classList.remove('hidden');
    if (noResults) noResults.classList.add('hidden');
    
    container.innerHTML = filteredDestinations.map(destination => `
        <div class="destination-card fade-in">
            <div class="destination-image">
                <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                <div class="destination-badge">
                    ₹${destination.minBudget.toLocaleString()}+
                </div>
                <div class="destination-state">${destination.state}</div>
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
                    <div class="meta-item">
                        <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>${destination.bestTime}</span>
                    </div>
                </div>

                <div class="destination-highlights">
                    ${destination.highlights.slice(0, 3).map(highlight => 
                        `<span class="highlight-tag">${highlight}</span>`
                    ).join('')}
                </div>

                <div class="destination-footer">
                    <div class="budget-range">
                        <span class="budget-label">Budget Range:</span>
                        <span class="budget-value">₹${destination.minBudget.toLocaleString()} - ₹${destination.maxBudget.toLocaleString()}</span>
                    </div>
                    
                    <a href="itinerary.html?id=${destination.id}" class="btn btn-primary btn-full">
                        <span>View Detailed Plan</span>
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    `).join('');
    
    // Trigger animations
    setTimeout(() => {
        const cards = container.querySelectorAll('.destination-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-up');
            }, index * 100);
        });
    }, 100);
}

function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        const count = filteredDestinations.length;
        resultsCount.textContent = `Showing ${count} destination${count !== 1 ? 's' : ''}`;
    }
}

function clearFilters() {
    currentFilters = {
        search: '',
        budget: '',
        state: '',
        sort: 'popular'
    };
    
    updateFilterInputs();
    
    const budgetFilter = document.getElementById('budgetFilter');
    if (budgetFilter) budgetFilter.classList.add('hidden');
    
    applyFilters();
}

// Make clearFilters available globally
window.clearFilters = clearFilters;