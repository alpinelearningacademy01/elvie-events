const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    title: String,
    type: String,
    eventTypes: [String],
    view: String,
    style: String,
    environment: String,
    layouts: mongoose.Schema.Types.Mixed,
    pricing: mongoose.Schema.Types.Mixed,
    images: [String],
    video: String,
    virtualTour: String,
    floorPlans: [String]
});

const propertySchema = new mongoose.Schema({
    propertyType: {
        type: String,
        required: [true, 'Property type is required']
    },
    propertyName: {
        type: String,
        required: [true, 'Property name is required']
    },
    includeAccommodation: {
        type: Boolean,
        default: false
    },
    chainName: String,
    brand: String,
    builtYear: String,
    renovatedYear: String,
    measurementSystem: {
        type: String,
        enum: ['Metric (m)', 'Imperial (ft)'],
        default: 'Metric (m)'
    },
    socialLinks: [String],
    overview: String,
    floorPlans: [{
        url: String,
        title: String
    }], // S3 URLs and titles for global floor plans
    heroImage: String, // S3 URL
    images: [{
        url: String,
        title: String,
        description: String,
        eventType: {
            type: String,
            enum: ['regular', 'wedding']
        }
    }],
    video: {
        url: String,
        title: String,
        description: String
    },
    virtualTour: {
        url: String,
        title: String,
        description: String
    },
    address: {
        title: String,
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    location: {
        mapLink: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    fnb: {
        options: [String],
        cuisineType: String,
        foodPreference: String,
        requirements: String,
        menus: [{
            url: String,
            title: String
        }], // S3 URLs and titles
        foodPhotos: [String] // S3 URLs
    },
    production: {
        audioVisual: [String],
        lighting: [String],
        staging: [String],
        furniture: [String],
        decor: [String],
        logistics: [String],
        duration: [String],
        safety: [String],
        extraRequirements: mongoose.Schema.Types.Mixed
    },
    venues: [venueSchema],
    amenities: [String],
    popularAmenities: [String],
    extraAmenities: String,
    guestRooms: {
        totalRooms: Number,
        checkInTime: String,
        roomTypes: [{
            type: String,
            count: Number
        }]
    },
    seasonality: {
        highSeason: [String],
        shoulderSeason: [String],
        lowSeason: [String]
    },
    hostRules: {
        venueDescription: String,
        checkInOutTimes: String,
        beveragePolicy: String,
        cancellationPolicy: String,
        healthSafetyGuidelines: String,
        additionalInfo: String
    },
    contactInfo: [{
        title: String,
        name: String,
        designation: String,
        email: String,
        phone: String
    }],
    partner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VenuePartner',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Property', propertySchema);
