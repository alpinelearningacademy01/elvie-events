const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const venuePartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    phoneCode: {
        type: String,
        required: [true, 'Please add a country code (e.g., +91)']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please add a phone number'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    venueName: {
        type: String,
        required: [true, 'Please add your venue name']
    },
    role: {
        type: String,
        default: 'partner'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
venuePartnerSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
venuePartnerSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('VenuePartner', venuePartnerSchema);
