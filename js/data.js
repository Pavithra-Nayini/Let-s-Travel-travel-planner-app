// Destinations data
const destinations = [
    {
        id: 'goa',
        name: 'Goa',
        state: 'Goa',
        description: 'Sun, sand, and sea - the perfect beach getaway with Portuguese heritage',
        image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
        minBudget: 8000,
        maxBudget: 25000,
        bestTime: 'November to March',
        duration: '4-5 days',
        highlights: ['Beautiful beaches', 'Portuguese architecture', 'Vibrant nightlife', 'Water sports'],
        activities: ['Beach hopping', 'Water sports', 'Heritage walks', 'Sunset cruises'],
        transportOptions: [
            { type: 'Flight', cost: 8000, duration: '2 hours' },
            { type: 'Train', cost: 1500, duration: '12 hours' },
            { type: 'Bus', cost: 800, duration: '14 hours' }
        ],
        accommodation: [
            { type: 'Beach Resort', cost: 4000, description: 'Luxury beachfront resort with all amenities' },
            { type: 'Boutique Hotel', cost: 2500, description: 'Charming hotel with Portuguese architecture' },
            { type: 'Hostel', cost: 800, description: 'Budget-friendly option near beaches' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & North Goa Exploration',
                activities: ['Check-in to hotel', 'Visit Baga Beach', 'Explore Anjuna Market', 'Sunset at Vagator Beach'],
                meals: ['Welcome drink', 'Seafood lunch at beach shack', 'Dinner at Tito\'s'],
                cost: 2500
            },
            {
                day: 2,
                title: 'South Goa & Heritage',
                activities: ['Visit Old Goa churches', 'Explore Panjim city', 'Colva Beach relaxation', 'Spice plantation tour'],
                meals: ['Hotel breakfast', 'Traditional Goan lunch', 'Beach dinner'],
                cost: 2800
            },
            {
                day: 3,
                title: 'Adventure & Water Sports',
                activities: ['Parasailing', 'Jet skiing', 'Dolphin spotting cruise', 'Beach volleyball'],
                meals: ['Breakfast', 'Lunch on cruise', 'Farewell dinner'],
                cost: 3200
            }
        ]
    },
    {
        id: 'rishikesh',
        name: 'Rishikesh',
        state: 'Uttarakhand',
        description: 'Yoga capital of the world nestled in the Himalayas by the Ganges',
        image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
        minBudget: 5000,
        maxBudget: 15000,
        bestTime: 'March to June, September to November',
        duration: '3-4 days',
        highlights: ['River Ganges', 'Adventure sports', 'Yoga ashrams', 'Himalayan views'],
        activities: ['River rafting', 'Bungee jumping', 'Yoga sessions', 'Temple visits'],
        transportOptions: [
            { type: 'Flight to Dehradun + Taxi', cost: 6000, duration: '3 hours' },
            { type: 'Train', cost: 1200, duration: '6 hours' },
            { type: 'Bus', cost: 600, duration: '8 hours' }
        ],
        accommodation: [
            { type: 'Riverside Resort', cost: 3000, description: 'Luxury resort with Ganges view' },
            { type: 'Ashram Stay', cost: 800, description: 'Spiritual accommodation with yoga classes' },
            { type: 'Guesthouse', cost: 1000, description: 'Comfortable stay near main market' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Spiritual Rishikesh',
                activities: ['Check-in', 'Ganga Aarti at Triveni Ghat', 'Visit Laxman Jhula', 'Evening yoga session'],
                meals: ['Arrival snacks', 'Vegetarian lunch', 'Satvik dinner'],
                cost: 1800
            },
            {
                day: 2,
                title: 'Adventure Day',
                activities: ['White water rafting', 'Bungee jumping at Jumpin Heights', 'Visit Beatles Ashram', 'Cafe hopping'],
                meals: ['Early breakfast', 'Packed lunch', 'Organic dinner'],
                cost: 4500
            },
            {
                day: 3,
                title: 'Nature & Departure',
                activities: ['Neer Garh Waterfall trek', 'Shopping in main market', 'Final Ganga Aarti', 'Departure'],
                meals: ['Breakfast', 'Local lunch', 'Travel snacks'],
                cost: 2200
            }
        ]
    },
    {
        id: 'jaipur',
        name: 'Jaipur',
        state: 'Rajasthan',
        description: 'The Pink City showcasing royal palaces and vibrant Rajasthani culture',
        image: 'https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg',
        minBudget: 6000,
        maxBudget: 20000,
        bestTime: 'October to March',
        duration: '3-4 days',
        highlights: ['Amber Fort', 'City Palace', 'Hawa Mahal', 'Local bazaars'],
        activities: ['Palace tours', 'Elephant rides', 'Shopping', 'Cultural shows'],
        transportOptions: [
            { type: 'Flight', cost: 5000, duration: '1.5 hours' },
            { type: 'Train', cost: 1800, duration: '5 hours' },
            { type: 'Bus', cost: 900, duration: '6 hours' }
        ],
        accommodation: [
            { type: 'Heritage Hotel', cost: 5000, description: 'Royal palace converted to luxury hotel' },
            { type: 'Boutique Hotel', cost: 2500, description: 'Modern amenities with traditional decor' },
            { type: 'Budget Hotel', cost: 1200, description: 'Clean accommodation near main attractions' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Royal Jaipur',
                activities: ['Amber Fort visit', 'Elephant ride', 'Jal Mahal photo stop', 'City Palace tour'],
                meals: ['Welcome drink', 'Rajasthani thali', 'Rooftop dinner'],
                cost: 3500
            },
            {
                day: 2,
                title: 'Pink City Exploration',
                activities: ['Hawa Mahal', 'Jantar Mantar', 'Local bazaar shopping', 'Puppet show'],
                meals: ['Breakfast', 'Street food tour', 'Cultural dinner with folk dance'],
                cost: 2800
            },
            {
                day: 3,
                title: 'Culture & Crafts',
                activities: ['Block printing workshop', 'Gem cutting demonstration', 'Nahargarh Fort sunset', 'Departure prep'],
                meals: ['Hotel breakfast', 'Traditional lunch', 'Farewell dinner'],
                cost: 2500
            }
        ]
    },
    {
        id: 'kerala-backwaters',
        name: 'Kerala Backwaters',
        state: 'Kerala',
        description: 'Serene backwaters with lush greenery and unique houseboat experiences',
        image: 'https://images.pexels.com/photos/3586966/pexels-photo-3586966.jpeg',
        minBudget: 10000,
        maxBudget: 30000,
        bestTime: 'December to February',
        duration: '4-5 days',
        highlights: ['Houseboat cruise', 'Coconut groves', 'Ayurvedic treatments', 'Local cuisine'],
        activities: ['Houseboat stay', 'Village walks', 'Ayurvedic spa', 'Bird watching'],
        transportOptions: [
            { type: 'Flight to Kochi', cost: 8000, duration: '2.5 hours' },
            { type: 'Train', cost: 2500, duration: '24 hours' },
            { type: 'Bus', cost: 1200, duration: '20 hours' }
        ],
        accommodation: [
            { type: 'Luxury Houseboat', cost: 8000, description: 'Premium houseboat with AC and chef' },
            { type: 'Standard Houseboat', cost: 4000, description: 'Comfortable houseboat with basic amenities' },
            { type: 'Lakeside Resort', cost: 3000, description: 'Resort with backwater views' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Alleppey',
                activities: ['Arrival in Kochi', 'Drive to Alleppey', 'Houseboat check-in', 'Sunset cruise'],
                meals: ['Welcome coconut water', 'Kerala lunch on boat', 'Traditional dinner'],
                cost: 3500
            },
            {
                day: 2,
                title: 'Backwater Exploration',
                activities: ['Village visit', 'Coir making demonstration', 'Toddy tapping experience', 'Fishing'],
                meals: ['Breakfast on boat', 'Local home lunch', 'Fresh fish dinner'],
                cost: 2800
            },
            {
                day: 3,
                title: 'Kumarakom & Bird Sanctuary',
                activities: ['Kumarakom bird sanctuary', 'Ayurvedic massage', 'Spice garden visit', 'Cultural show'],
                meals: ['Breakfast', 'Spice-infused lunch', 'Ayurvedic dinner'],
                cost: 4200
            }
        ]
    },
    {
        id: 'manali',
        name: 'Manali',
        state: 'Himachal Pradesh',
        description: 'Hill station paradise with snow-capped mountains and adventure activities',
        image: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg',
        minBudget: 7000,
        maxBudget: 22000,
        bestTime: 'March to June, October to February',
        duration: '4-5 days',
        highlights: ['Rohtang Pass', 'Solang Valley', 'Old Manali', 'Adventure sports'],
        activities: ['Skiing', 'Paragliding', 'Trekking', 'River rafting'],
        transportOptions: [
            { type: 'Flight to Kullu + Taxi', cost: 8000, duration: '4 hours total' },
            { type: 'Bus (Volvo)', cost: 1500, duration: '14 hours' },
            { type: 'Train to Chandigarh + Bus', cost: 2000, duration: '18 hours total' }
        ],
        accommodation: [
            { type: 'Mountain Resort', cost: 4500, description: 'Luxury resort with valley views' },
            { type: 'Boutique Hotel', cost: 2200, description: 'Cozy hotel in Old Manali' },
            { type: 'Backpacker Hostel', cost: 800, description: 'Budget stay with mountain views' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Arrival & Local Sightseeing',
                activities: ['Check-in', 'Hadimba Temple visit', 'Mall Road shopping', 'Old Manali exploration'],
                meals: ['Welcome tea', 'Himachali lunch', 'Bonfire dinner'],
                cost: 2200
            },
            {
                day: 2,
                title: 'Solang Valley Adventure',
                activities: ['Solang Valley visit', 'Paragliding', 'Zorbing', 'Cable car ride'],
                meals: ['Early breakfast', 'Valley lunch', 'Hotel dinner'],
                cost: 3800
            },
            {
                day: 3,
                title: 'Rohtang Pass Excursion',
                activities: ['Rohtang Pass trip', 'Snow activities', 'Photography', 'Local shopping'],
                meals: ['Packed breakfast', 'Mountain lunch', 'Traditional dinner'],
                cost: 4500
            },
            {
                day: 4,
                title: 'Nature & Departure',
                activities: ['Nature walk', 'Visit local cafes', 'Souvenir shopping', 'Departure'],
                meals: ['Breakfast', 'Cafe lunch', 'Travel snacks'],
                cost: 1800
            }
        ]
    },
    {
        id: 'udaipur',
        name: 'Udaipur',
        state: 'Rajasthan',
        description: 'City of Lakes with stunning palaces and romantic ambiance',
        image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg',
        minBudget: 8000,
        maxBudget: 25000,
        bestTime: 'October to March',
        duration: '3-4 days',
        highlights: ['City Palace', 'Lake Pichola', 'Jag Mandir', 'Sunset boat rides'],
        activities: ['Palace tours', 'Boat rides', 'Cultural shows', 'Art galleries'],
        transportOptions: [
            { type: 'Flight', cost: 6000, duration: '1.5 hours' },
            { type: 'Train', cost: 2200, duration: '12 hours' },
            { type: 'Bus', cost: 1000, duration: '8 hours' }
        ],
        accommodation: [
            { type: 'Lake Palace Hotel', cost: 15000, description: 'Iconic palace hotel on Lake Pichola' },
            { type: 'Heritage Haveli', cost: 4000, description: 'Traditional haveli with lake views' },
            { type: 'Budget Hotel', cost: 1500, description: 'Comfortable stay near City Palace' }
        ],
        itinerary: [
            {
                day: 1,
                title: 'Royal Udaipur',
                activities: ['City Palace complex', 'Crystal Gallery', 'Jagdish Temple', 'Sunset boat ride'],
                meals: ['Welcome drink', 'Royal lunch', 'Lake-view dinner'],
                cost: 3200
            },
            {
                day: 2,
                title: 'Lakes & Gardens',
                activities: ['Saheliyon ki Bari', 'Fateh Sagar Lake', 'Jag Mandir visit', 'Cultural show'],
                meals: ['Breakfast', 'Garden lunch', 'Cultural dinner'],
                cost: 2800
            },
            {
                day: 3,
                title: 'Art & Culture',
                activities: ['Shilpgram crafts village', 'Monsoon Palace', 'Local bazaar shopping', 'Mewar show'],
                meals: ['Hotel breakfast', 'Village lunch', 'Farewell dinner'],
                cost: 2500
            }
        ]
    }
];

// Helper functions
function getDestinationsByBudget(budget) {
    return destinations.filter(dest => dest.minBudget <= budget);
}

function getDestinationById(id) {
    return destinations.find(dest => dest.id === id);
}

function getPopularDestinations() {
    return destinations.slice(0, 6);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        destinations,
        getDestinationsByBudget,
        getDestinationById,
        getPopularDestinations,
        formatCurrency,
        formatDate
    };
}