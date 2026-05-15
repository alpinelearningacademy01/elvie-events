const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    property: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: [true, 'Property is required']
    },
    venue: {
        type: String,
        required: [true, 'Venue is required']
    },
    eventDate: {
        type: Date,
        required: [true, 'Event date is required']
    },
    dateFlexible: {
        type: Boolean,
        default: false
    },
    attendees: {
        type: Number,
        required: [true, 'Number of attendees is required']
    },
    eventType: {
        type: String,
        required: [true, 'Event type is required']
    },
    budget: {
        type: Number,
        required: [true, 'Budget is required']
    },
    budgetCurrency: {
        type: String,
        default: 'AED'
    },
    notes: {
        type: String
    },
    infoType: {
        type: String,
        enum: ['Company', 'Individual'],
        default: 'Company'
    },
    companyName: {
        type: String
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    commMethods: [String],
    status: {
        type: String,
        enum: ['New', 'Replied', 'Closed'],
        default: 'New'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
