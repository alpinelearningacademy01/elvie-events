const mongoose = require('mongoose');

const clientDirectorySchema = new mongoose.Schema(
    {
        venuePartner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'VenuePartner',
            required: true
        },
        contactName: {
            type: String,
            required: [true, 'Contact name is required'],
            trim: true
        },
        company: {
            type: String,
            trim: true,
            default: ''
        },
        role: {
            type: String,
            trim: true,
            default: ''
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            default: ''
        },
        phone: {
            type: String,
            trim: true,
            default: ''
        },
        whatsapp: {
            type: String,
            trim: true,
            default: ''
        },
        website: {
            type: String,
            trim: true,
            default: ''
        },
        address: {
            type: String,
            trim: true,
            default: ''
        },
        category: {
            type: String,
            enum: ['client', 'lead', 'vip', 'partner', 'vendor', 'other'],
            default: 'client'
        },
        notes: {
            type: String,
            trim: true,
            default: ''
        },
        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true  // Mongoose auto-manages createdAt & updatedAt — no hooks needed
    }
);

module.exports = mongoose.model('ClientDirectory', clientDirectorySchema);
