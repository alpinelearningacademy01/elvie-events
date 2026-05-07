const VenuePartner = require('../models/VenuePartner');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
};

// @desc    Register a new venue partner
// @route   POST /api/venue-partner/signup
// @access  Public
exports.registerPartner = async (req, res) => {
    try {
        const { name, email, phoneCode, phoneNumber, password, venueName } = req.body;

        // Check if partner already exists
        const partnerExists = await VenuePartner.findOne({ 
            $or: [{ email }, { phoneNumber }] 
        });

        if (partnerExists) {
            return res.status(400).json({
                success: false,
                message: 'Partner already exists with this email or phone number'
            });
        }

        // Create partner
        const partner = await VenuePartner.create({
            name,
            email,
            phoneCode,
            phoneNumber,
            password,
            venueName
        });

        if (partner) {
            res.status(201).json({
                success: true,
                _id: partner._id,
                name: partner.name,
                email: partner.email,
                phoneCode: partner.phoneCode,
                phoneNumber: partner.phoneNumber,
                venueName: partner.venueName,
                token: generateToken(partner._id)
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Authenticate a venue partner
// @route   POST /api/venue-partner/signin
// @access  Public
exports.loginPartner = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for partner email
        const partner = await VenuePartner.findOne({ email }).select('+password');

        if (partner && (await partner.matchPassword(password))) {
            res.json({
                success: true,
                _id: partner._id,
                name: partner.name,
                email: partner.email,
                phoneCode: partner.phoneCode,
                phoneNumber: partner.phoneNumber,
                venueName: partner.venueName,
                token: generateToken(partner._id)
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
