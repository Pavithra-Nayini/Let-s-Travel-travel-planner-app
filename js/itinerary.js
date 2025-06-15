// Itinerary page functionality
document.addEventListener('DOMContentLoaded', function() {
    initItineraryPage();
});

let currentDestination = null;
let selectedTransport = 0;
let selectedAccommodation = 0;
let travelers = 2;

function initItineraryPage() {
    // Get destination ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const destinationId = urlParams.get('id');
    
    if (!destinationId) {
        showError();
        return;
    }
    
    // Load destination data
    currentDestination = getDestinationById(destinationId);
    
    if (!currentDestination) {
        showError();
        return;
    }
    
    // Render page content
    renderHeroSection();
    renderHighlights();
    renderTransportOptions();
    renderAccommodationOptions();
    renderItinerary();
    renderSidebar();
    
    // Initialize interactions
    initCalculator();
    initSaveTrip();
}

function showError() {
    document.body.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; text-align: center;">
            <div>
                <h2 style="font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 1rem;">Destination not found</h2>
                <a href="destinations.html" style="color: #f97316; text-decoration: none; font-weight: 600;">← Back to destinations</a>
            </div>
        </div>
    `;
}

function renderHeroSection() {
    const heroImage = document.getElementById('heroImage');
    const destinationName = document.getElementById('destinationName');
    const destinationDescription = document.getElementById('destinationDescription');
    const heroBadges = document.getElementById('heroBadges');
    
    if (heroImage) heroImage.src = currentDestination.image;
    if (destinationName) destinationName.textContent = currentDestination.name;
    if (destinationDescription) destinationDescription.textContent = currentDestination.description;
    
    if (heroBadges) {
        heroBadges.innerHTML = `
            <div class="hero-badge">
                <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>${currentDestination.state}</span>
            </div>
            <div class="hero-badge">
                <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 1v6m0 6v6"></path>
                    <path d="m21 12-6 0m-6 0-6 0"></path>
                </svg>
                <span>${currentDestination.duration}</span>
            </div>
            <div class="hero-badge">
                <svg class="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>${currentDestination.bestTime}</span>
            </div>
        `;
    }
}

function renderHighlights() {
    const container = document.getElementById('highlightsGrid');
    if (!container) return;
    
    container.innerHTML = currentDestination.highlights.map(highlight => `
        <div class="highlight-item">
            <svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
            </svg>
            <span>${highlight}</span>
        </div>
    `).join('');
}

function renderTransportOptions() {
    const container = document.getElementById('transportGrid');
    if (!container) return;
    
    container.innerHTML = currentDestination.transportOptions.map((transport, index) => `
        <div class="transport-item ${index === selectedTransport ? 'selected' : ''}" onclick="selectTransport(${index})">
            <div class="item-content">
                <div class="item-info">
                    <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${getTransportIcon(transport.type)}
                    </svg>
                    <div class="item-details">
                        <h3>${transport.type}</h3>
                        <p>${transport.duration}</p>
                    </div>
                </div>
                <div class="item-price">
                    <p class="price-amount">₹${transport.cost.toLocaleString()}</p>
                    <p class="price-unit">per person</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderAccommodationOptions() {
    const container = document.getElementById('accommodationGrid');
    if (!container) return;
    
    container.innerHTML = currentDestination.accommodation.map((acc, index) => `
        <div class="accommodation-item ${index === selectedAccommodation ? 'selected' : ''}" onclick="selectAccommodation(${index})">
            <div class="item-content">
                <div class="item-info">
                    <svg class="item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 16h20v4H2v-4zm1.5-1h17l-2-7H5.5l-2 7z"></path>
                        <path d="M6 10V6a6 6 0 0 1 12 0v4"></path>
                    </svg>
                    <div class="item-details">
                        <h3>${acc.type}</h3>
                        <p>${acc.description}</p>
                    </div>
                </div>
                <div class="item-price">
                    <p class="price-amount">₹${acc.cost.toLocaleString()}</p>
                    <p class="price-unit">per night</p>
                </div>
            </div>
        </div>
    `).join('');
}

function renderItinerary() {
    const container = document.getElementById('itineraryTimeline');
    if (!container) return;
    
    container.innerHTML = currentDestination.itinerary.map(day => `
        <div class="timeline-item">
            <div class="timeline-header">
                <div class="day-number">${day.day}</div>
                <h3 class="day-title">${day.title}</h3>
            </div>
            
            <div class="timeline-content">
                <div class="activity-section">
                    <div class="section-header">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                        </svg>
                        Activities
                    </div>
                    <ul class="activity-list">
                        ${day.activities.map(activity => `<li class="activity-item">${activity}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="meal-section">
                    <div class="section-header">
                        <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path>
                            <path d="M7 2v20"></path>
                            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"></path>
                        </svg>
                        Meals
                    </div>
                    <ul class="meal-list">
                        ${day.meals.map(meal => `<li class="meal-item">${meal}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="day-cost">
                <span class="cost-badge">
                    <svg class="cost-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="1" x2="12" y2="23"></line>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    ₹${day.cost.toLocaleString()} per person
                </span>
            </div>
        </div>
    `).join('');
}

function renderSidebar() {
    renderQuickInfo();
    updateCostCalculator();
}

function renderQuickInfo() {
    const container = document.getElementById('quickInfo');
    if (!container) return;
    
    container.innerHTML = `
        <div class="info-item">
            <span class="info-label">Best Time to Visit:</span>
            <span class="info-value">${currentDestination.bestTime}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Recommended Duration:</span>
            <span class="info-value">${currentDestination.duration}</span>
        </div>
        <div class="info-item">
            <span class="info-label">Budget Range:</span>
            <span class="info-value">₹${currentDestination.minBudget.toLocaleString()} - ₹${currentDestination.maxBudget.toLocaleString()}</span>
        </div>
    `;
}

function initCalculator() {
    const travelersSelect = document.getElementById('travelersSelect');
    if (travelersSelect) {
        travelersSelect.addEventListener('change', function() {
            travelers = parseInt(this.value);
            updateCostCalculator();
        });
    }
}

function initSaveTrip() {
    renderSaveTripSection();
}

function renderSaveTripSection() {
    const container = document.getElementById('saveTripSection');
    if (!container) return;
    
    if (auth.isLoggedIn()) {
        container.innerHTML = `
            <button class="btn btn-primary btn-full" onclick="saveTrip()" id="saveTripBtn">
                Save This Trip
            </button>
        `;
    } else {
        container.innerHTML = `
            <div class="save-message">
                <p class="save-text">Want to save this trip?</p>
            </div>
            <a href="login.html" class="btn btn-outline btn-full">
                Sign In to Save
            </a>
        `;
    }
}

function selectTransport(index) {
    selectedTransport = index;
    renderTransportOptions();
    updateCostCalculator();
}

function selectAccommodation(index) {
    selectedAccommodation = index;
    renderAccommodationOptions();
    updateCostCalculator();
}

function updateCostCalculator() {
    const costBreakdown = document.getElementById('costBreakdown');
    const totalCost = document.getElementById('totalCost');
    const totalNote = document.getElementById('totalNote');
    
    if (!costBreakdown || !totalCost || !totalNote) return;
    
    const transport = currentDestination.transportOptions[selectedTransport];
    const accommodation = currentDestination.accommodation[selectedAccommodation];
    const itineraryCost = currentDestination.itinerary.reduce((sum, day) => sum + day.cost, 0);
    
    const transportCost = transport.cost * travelers;
    const accommodationCost = accommodation.cost * currentDestination.itinerary.length * travelers;
    const activitiesCost = itineraryCost * travelers;
    const total = transportCost + accommodationCost + activitiesCost;
    
    costBreakdown.innerHTML = `
        <div class="cost-item">
            <span class="cost-label">Transport (${transport.type})</span>
            <span class="cost-amount">₹${transportCost.toLocaleString()}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Accommodation (${currentDestination.itinerary.length} nights)</span>
            <span class="cost-amount">₹${accommodationCost.toLocaleString()}</span>
        </div>
        <div class="cost-item">
            <span class="cost-label">Activities & Meals</span>
            <span class="cost-amount">₹${activitiesCost.toLocaleString()}</span>
        </div>
    `;
    
    totalCost.textContent = `₹${total.toLocaleString()}`;
    totalNote.textContent = `For ${travelers} traveler(s)`;
}

function saveTrip() {
    if (!auth.isLoggedIn()) {
        window.location.href = 'login.html';
        return;
    }
    
    const success = tripManager.saveTrip(currentDestination.id, travelers);
    
    if (success) {
        const btn = document.getElementById('saveTripBtn');
        if (btn) {
            btn.textContent = '✓ Trip Saved!';
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-success');
            btn.style.background = '#059669';
            
            setTimeout(() => {
                btn.textContent = 'Save This Trip';
                btn.classList.remove('btn-success');
                btn.classList.add('btn-primary');
                btn.style.background = '';
            }, 2000);
        }
    }
}

function getTransportIcon(type) {
    switch (type.toLowerCase()) {
        case 'flight':
        case 'flight to dehradun + taxi':
        case 'flight to kochi':
        case 'flight to kullu + taxi':
            return `<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 10l-8.2-1.8c-.5-.1-.9.1-1.1.5-.2.4-.1.9.2 1.2L6 14l-2 3 3-2 4.1 4.1c.3.3.8.4 1.2.2.4-.2.6-.6.5-1.1z"></path>`;
        case 'train':
        case 'train to chandigarh + bus':
            return `<rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect><path d="M4 12h2"></path><path d="M18 12h2"></path><path d="M12 20v2"></path><path d="M12 2v2"></path>`;
        case 'bus':
        case 'bus (volvo)':
            return `<path d="M8 6v6"></path><path d="M15 6v6"></path><path d="M2 12h19.6"></path><path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2v-2H22"></path><path d="M2 12v2c0 .4.1.8.2 1.2.3 1.1.8 2.8.8 2.8h3"></path><circle cx="7" cy="18" r="2"></circle><circle cx="17" cy="18" r="2"></circle>`;
        default:
            return `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>`;
    }
}

// Make functions available globally
window.selectTransport = selectTransport;
window.selectAccommodation = selectAccommodation;
window.saveTrip = saveTrip;