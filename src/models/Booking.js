const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Please add customer name']
    },
    customerEmail: {
        type: String,
        required: [true, 'Please add customer email']
    },
    customerPhone: {
        type: String,
        required: [true, 'Please add customer phone']
    },
    customerCompany: String,
    customerDesignation: String,
    venueId: {
        type: mongoose.Schema.ObjectId,
        ref: 'VenuePartner',
        required: true
    },
    eventDate: {
        type: Date,
        required: [true, 'Please add event date']
    },
    guestCount: {
        type: Number,
        required: [true, 'Please add guest count']
    },
    eventType: {
        type: String,
        required: [true, 'Please add event type']
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
