const VenuePartner = require('../models/VenuePartner');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/emailService');

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

// @desc    Forgot Password - Send reset code
// @route   POST /api/venue-partner/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const partner = await VenuePartner.findOne({ email });

        if (!partner) {
            return res.status(404).json({
                success: false,
                message: 'No account registered with this email address'
            });
        }

        // Generate 6-digit verification code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to partner document
        partner.resetPasswordToken = resetCode;
        partner.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 mins expiry
        await partner.save();

        // Send Email
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                <div style="background-color: #070c18; padding: 24px; text-align: center;">
                    <h1 style="color: #c5a880; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: bold;">VENUE PARTNERS</h1>
                </div>
                <div style="padding: 32px 24px; background-color: #ffffff; color: #1a202c;">
                    <h2 style="font-size: 20px; font-weight: bold; margin-top: 0; margin-bottom: 16px; color: #0f172a;">Reset Your Password</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 24px;">
                        Hello <strong>${partner.name}</strong>,<br/>
                        We received a request to reset the password for your account. Use the verification code below to proceed with setting up a new password:
                    </p>
                    <div style="background-color: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 16px; text-align: center; margin-bottom: 24px;">
                        <span style="font-size: 32px; font-weight: 800; letter-spacing: 6px; color: #003b95;">${resetCode}</span>
                    </div>
                    <p style="font-size: 14px; line-height: 1.6; color: #718096; margin-bottom: 0;">
                        This code is valid for <strong>15 minutes</strong>. If you did not make this request, you can safely ignore this email.
                    </p>
                </div>
                <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0;">
                    &copy; ${new Date().getFullYear()} Venue Partners. All rights reserved.
                </div>
            </div>
        `;

        try {
            await sendEmail({
                email: partner.email,
                subject: 'Password Reset Verification Code',
                html: emailHtml
            });
            res.json({
                success: true,
                message: 'A 6-digit password reset verification code has been sent to your email.'
            });
        } catch (mailError) {
            console.error('Mail sending error:', mailError);
            res.status(500).json({
                success: false,
                message: 'Failed to send password reset email. Please contact support or try again later.'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Verify Reset Code
// @route   POST /api/venue-partner/verify-reset-code
// @access  Public
exports.verifyResetCode = async (req, res) => {
    try {
        const { email, code } = req.body;

        const partner = await VenuePartner.findOne({
            email,
            resetPasswordToken: code,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!partner) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            });
        }

        res.json({
            success: true,
            message: 'Verification code is valid'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Reset Password
// @route   POST /api/venue-partner/reset-password
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        const { email, code, password } = req.body;

        const partner = await VenuePartner.findOne({
            email,
            resetPasswordToken: code,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!partner) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            });
        }

        // Set the new password (will be hashed automatically on save due to pre-save hook)
        partner.password = password;
        partner.resetPasswordToken = undefined;
        partner.resetPasswordExpire = undefined;
        await partner.save();

        res.json({
            success: true,
            message: 'Password has been reset successfully. You can now login.'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
