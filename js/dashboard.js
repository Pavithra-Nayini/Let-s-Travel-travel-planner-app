// Dashboard page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!auth.requireAuth()) {
        return;
    }
    
    initDashboard();
    loadUserTrips();
    updateStats();
});

function initDashboard() {
    const user = auth.getCurrentUser();
    if (!user) return;
    
    // Update welcome message
    const welcomeName = document.getElementById('welcomeName');
    if (welcomeName) {
        welcomeName.textContent = user.name;
    }
    
    // Update navigation
    auth.updateNavigation();
}

function loadUserTrips() {
    const userTrips = tripManager.getUserTrips();
    const tripsContainer = document.getElementById('tripsContainer');
    const noTrips = document.getElementById('noTrips');
    
    if (!tripsContainer) return;
    
    if (userTrips.length === 0) {
        tripsContainer.classList.add('hidden');
        if (noTrips) noTrips.classList.remove('hidden');
        return;
    }
    
    tripsContainer.classList.remove('hidden');
    if (noTrips) noTrips.classList.add('hidden');
    
    tripsContainer.innerHTML = userTrips.map(trip => `
        <div class="trip-card fade-in">
            <div class="trip-content">
                <div class="trip-image">
                    <img src="${trip.image}" alt="${trip.destinationName}">
                </div>
                
                <div class="trip-details">
                    <div class="trip-header">
                        <h3 class="trip-name">${trip.destinationName}</h3>
                        <div class="trip-actions">
                            <button class="action-btn view-btn" onclick="viewTrip('${trip.destinationId}')" title="View Details">
                                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                    <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteTrip('${trip.id}')" title="Delete Trip">
                                <svg class="action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3,6 5,6 21,6"></polyline>
                                    <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="trip-meta">
                        <div class="meta-item">
                            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="1" x2="12" y2="23"></line>
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                            </svg>
                            <span>₹${trip.totalCost.toLocaleString()}</span>
                        </div>
                        <div class="meta-item">
                            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M12 1v6m0 6v6"></path>
                                <path d="m21 12-6 0m-6 0-6 0"></path>
                            </svg>
                            <span>${trip.duration}</span>
                        </div>
                        <div class="meta-item">
                            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="16" y1="2" x2="16" y2="6"></line>
                                <line x1="8" y1="2" x2="8" y2="6"></line>
                                <line x1="3" y1="10" x2="21" y2="10"></line>
                            </svg>
                            <span>For ${trip.travelers} travelers</span>
                        </div>
                        <div class="meta-item">
                            <span>Saved ${formatDate(trip.savedAt)}</span>
                        </div>
                    </div>
                    
                    ${trip.startDate && trip.endDate ? `
                        <div class="trip-dates">
                            <p class="dates-text">
                                Planned dates: ${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}
                            </p>
                            ${new Date(trip.startDate) > new Date() ? `
                                <p class="countdown-text">
                                    ${Math.ceil((new Date(trip.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go!
                                </p>
                            ` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function updateStats() {
    const userTrips = tripManager.getUserTrips();
    
    // Update saved trips count
    const savedTripsCount = document.getElementById('savedTripsCount');
    if (savedTripsCount) {
        savedTripsCount.textContent = userTrips.length;
    }
    
    // Update total budget
    const totalBudget = document.getElementById('totalBudget');
    if (totalBudget) {
        const total = userTrips.reduce((sum, trip) => sum + trip.totalCost, 0);
        totalBudget.textContent = `₹${total.toLocaleString()}`;
    }
    
    // Update upcoming trips
    const upcomingTrips = document.getElementById('upcomingTrips');
    if (upcomingTrips) {
        const upcoming = userTrips.filter(trip => 
            trip.startDate && new Date(trip.startDate) > new Date()
        ).length;
        upcomingTrips.textContent = upcoming;
    }
}

function viewTrip(destinationId) {
    window.location.href = `itinerary.html?id=${destinationId}`;
}

function deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip?')) {
        tripManager.deleteTrip(tripId);
        loadUserTrips();
        updateStats();
    }
}

// Make functions available globally
window.viewTrip = viewTrip;
window.deleteTrip = deleteTrip;

// Add some mock trips for demo purposes
function addMockTrips() {
    if (auth.isLoggedIn() && tripManager.getUserTrips().length === 0) {
        // Add some sample trips
        const mockTrips = [
            {
                id: '1',
                userId: auth.getCurrentUser().id,
                destinationId: 'goa',
                destinationName: 'Goa',
                totalCost: 18000,
                travelers: 2,
                duration: '4-5 days',
                image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
                savedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 34 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: '2',
                userId: auth.getCurrentUser().id,
                destinationId: 'rishikesh',
                destinationName: 'Rishikesh',
                totalCost: 12000,
                travelers: 2,
                duration: '3-4 days',
                image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
                savedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
                startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
                endDate: new Date(Date.now() + 63 * 24 * 60 * 60 * 1000).toISOString()
            }
        ];
        
        tripManager.trips.push(...mockTrips);
        tripManager.saveTrips();
    }
}

// Add mock trips on page load for demo
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addMockTrips, 100);
    setTimeout(() => {
        loadUserTrips();
        updateStats();
    }, 200);
});