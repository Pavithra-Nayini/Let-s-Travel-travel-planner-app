// Authentication system
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check for existing user session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            this.currentUser = JSON.parse(storedUser);
            this.updateNavigation();
        }
    }

    login(email, password) {
        // Mock authentication - in real app, this would call backend
        if (email && password) {
            const mockUser = {
                id: Date.now().toString(),
                name: email.split('@')[0],
                email: email
            };
            
            this.currentUser = mockUser;
            localStorage.setItem('user', JSON.stringify(mockUser));
            this.updateNavigation();
            return true;
        }
        return false;
    }

    register(name, email, password, confirmPassword) {
        // Validation
        if (!name || !email || !password || !confirmPassword) {
            throw new Error('All fields are required');
        }

        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        if (password.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }

        // Mock registration
        const mockUser = {
            id: Date.now().toString(),
            name: name,
            email: email
        };

        this.currentUser = mockUser;
        localStorage.setItem('user', JSON.stringify(mockUser));
        this.updateNavigation();
        return true;
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('user');
        localStorage.removeItem('savedTrips');
        this.updateNavigation();
        
        // Redirect to home if on protected page
        if (window.location.pathname === '/dashboard.html') {
            window.location.href = 'index.html';
        }
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateNavigation() {
        const navAuth = document.getElementById('navAuth');
        const navUser = document.getElementById('navUser');
        const userName = document.getElementById('userName');

        if (this.currentUser) {
            if (navAuth) navAuth.classList.add('hidden');
            if (navUser) navUser.classList.remove('hidden');
            if (userName) userName.textContent = this.currentUser.name;
        } else {
            if (navAuth) navAuth.classList.remove('hidden');
            if (navUser) navUser.classList.add('hidden');
        }
    }

    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// Create global auth instance
const auth = new AuthSystem();

// Global logout function
function logout() {
    auth.logout();
}

// Password toggle function
function togglePassword(button) {
    const input = button.parentElement.querySelector('input');
    const icon = button.querySelector('.eye-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
        `;
    } else {
        input.type = 'password';
        icon.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
            <circle cx="12" cy="12" r="3"></circle>
        `;
    }
}

// Trip management
class TripManager {
    constructor() {
        this.trips = this.loadTrips();
    }

    loadTrips() {
        const saved = localStorage.getItem('savedTrips');
        return saved ? JSON.parse(saved) : [];
    }

    saveTrips() {
        localStorage.setItem('savedTrips', JSON.stringify(this.trips));
    }

    saveTrip(destinationId, travelers = 2) {
        if (!auth.isLoggedIn()) {
            return false;
        }

        const destination = getDestinationById(destinationId);
        if (!destination) {
            return false;
        }

        const trip = {
            id: Date.now().toString(),
            userId: auth.getCurrentUser().id,
            destinationId: destinationId,
            destinationName: destination.name,
            totalCost: this.calculateTotalCost(destination, travelers),
            travelers: travelers,
            duration: destination.duration,
            image: destination.image,
            savedAt: new Date().toISOString(),
            startDate: null,
            endDate: null
        };

        this.trips.push(trip);
        this.saveTrips();
        return true;
    }

    deleteTrip(tripId) {
        this.trips = this.trips.filter(trip => trip.id !== tripId);
        this.saveTrips();
    }

    getUserTrips() {
        if (!auth.isLoggedIn()) {
            return [];
        }
        
        const userId = auth.getCurrentUser().id;
        return this.trips.filter(trip => trip.userId === userId);
    }

    calculateTotalCost(destination, travelers) {
        const transportCost = destination.transportOptions[0]?.cost || 0;
        const accommodationCost = destination.accommodation[0]?.cost || 0;
        const itineraryCost = destination.itinerary.reduce((sum, day) => sum + day.cost, 0);
        
        return (transportCost + accommodationCost * destination.itinerary.length + itineraryCost) * travelers;
    }
}

// Create global trip manager instance
const tripManager = new TripManager();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AuthSystem,
        TripManager,
        auth,
        tripManager
    };
}