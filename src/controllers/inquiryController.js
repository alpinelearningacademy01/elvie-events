const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');
const sendEmail = require('../utils/emailService');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
exports.createInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);

        // Fetch property and partner details for email
        const property = await Property.findById(inquiry.property).populate('partner');

        if (property && property.partner) {
            // 1. Send Email to Venue Partner
            try {
                await sendEmail({
                    email: property.partner.email,
                    subject: `New Inquiry for ${property.propertyName}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                            <h2 style="color: #003b95;">New Event Inquiry Received!</h2>
                            <p>Hello <strong>${property.partner.name}</strong>,</p>
                            <p>You have received a new inquiry for <strong>${property.propertyName}</strong>.</p>
                            <hr />
                            <h3 style="color: #1a1a1a;">Inquiry Details:</h3>
                            <ul>
                                <li><strong>Customer Name:</strong> ${inquiry.fullName}</li>
                                <li><strong>Event Type:</strong> ${inquiry.eventType}</li>
                                <li><strong>Event Date:</strong> ${new Date(inquiry.eventDate).toLocaleDateString()}</li>
                                <li><strong>Attendees:</strong> ${inquiry.attendees}</li>
                                <li><strong>Budget:</strong> ${inquiry.budget} ${inquiry.budgetCurrency}</li>
                            </ul>
                            <p>Please log in to your dashboard to view full details and reply to the customer.</p>
                            <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 10px 20px; background-color: #003b95; color: #fff; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
                            <p>Best regards,<br />Venue Partners Team</p>
                        </div>
                    `
                });
            } catch (err) {
                console.error('Error sending email to partner:', err);
            }

            // 2. Send Email to Customer (Thank you / Confirmation)
            try {
                await sendEmail({
                    email: inquiry.email,
                    subject: `Your Inquiry for ${property.propertyName}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                            <h2 style="color: #003b95;">Thank you for your inquiry!</h2>
                            <p>Hello <strong>${inquiry.fullName}</strong>,</p>
                            <p>We have successfully received your inquiry for <strong>${property.propertyName}</strong>.</p>
                            <p>The venue team has been notified and will get back to you shortly at <strong>${inquiry.email}</strong> or <strong>${inquiry.phone}</strong>.</p>
                            <hr />
                            <h3 style="color: #1a1a1a;">Summary of your request:</h3>
                            <ul>
                                <li><strong>Venue:</strong> ${property.propertyName}</li>
                                <li><strong>Event Type:</strong> ${inquiry.eventType}</li>
                                <li><strong>Event Date:</strong> ${new Date(inquiry.eventDate).toLocaleDateString()}</li>
                                <li><strong>Attendees:</strong> ${inquiry.attendees}</li>
                            </ul>
                            <p>Thank you for using Venue Partners.</p>
                            <p>Best regards,<br />Venue Partners Team</p>
                        </div>
                    `
                });
            } catch (err) {
                console.error('Error sending email to customer:', err);
            }
        }

        res.status(201).json({
            success: true,
            data: inquiry
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Venue Partner / Admin)
exports.getInquiries = async (req, res) => {
    try {
        // If user is a partner, only show inquiries for their properties
        // This logic depends on your auth implementation
        const inquiries = await Inquiry.find().populate('property', 'propertyName').sort('-createdAt');

        res.status(200).json({
            success: true,
            count: inquiries.length,
            data: inquiries
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private
exports.updateInquiryStatus = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
            new: true,
            runValidators: true
        });

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: 'Inquiry not found'
            });
        }

        res.status(200).json({
            success: true,
            data: inquiry
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
