const Booking = require('../models/Booking');
const sendEmail = require('../utils/emailService');

// @desc    Create new booking and send email
// @route   POST /api/bookings
// @access  Public
exports.createBooking = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerPhone,
            customerCompany,
            customerDesignation,
            venueId,
            eventDate,
            guestCount,
            eventType,
            message,
            venueName
        } = req.body;

        const booking = await Booking.create({
            customerName,
            customerEmail,
            customerPhone,
            customerCompany,
            customerDesignation,
            venueId,
            eventDate,
            guestCount,
            eventType,
            message
        });

        // Email Template Design with Inline Styles for Maximum Compatibility
        const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Booking Request</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f7fa; color: #333333;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
                <tr>
                    <td align="center" style="padding: 40px 0;">
                        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td align="center" bgcolor="#153170" style="padding: 40px 20px;">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; letter-spacing: 3px; font-weight: bold; text-transform: uppercase;">
                                        ELVIE <span style="color: #d4af37;">EVENTS</span>
                                    </h1>
                                    <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px; opacity: 0.8; letter-spacing: 1px;">
                                        NEW EVENT BOOKING REQUEST
                                    </p>
                                </td>
                            </tr>

                            <!-- Content Section -->
                            <tr>
                                <td style="padding: 40px;">
                                    <h2 style="margin: 0 0 20px 0; color: #153170; font-size: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                                        Customer Details
                                    </h2>
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                                        <tr>
                                            <td width="140" style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Full Name:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${customerName}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Email:</td>
                                            <td style="padding: 8px 0; color: #153170; font-size: 15px; font-weight: bold;">${customerEmail}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Phone:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${customerPhone}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Company:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${customerCompany || 'N/A'}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Designation:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${customerDesignation || 'N/A'}</td>
                                        </tr>
                                    </table>

                                    <h2 style="margin: 0 0 20px 0; color: #153170; font-size: 20px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
                                        Event Information
                                    </h2>
                                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px;">
                                        <tr>
                                            <td width="140" style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Venue Name:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px; font-weight: bold;">${venueName || 'General Enquiry'}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Event Date:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${new Date(eventDate).toDateString()}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Event Type:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${eventType}</td>
                                        </tr>
                                        <tr>
                                            <td style="padding: 8px 0; font-weight: bold; color: #666666; font-size: 14px;">Guests:</td>
                                            <td style="padding: 8px 0; color: #111111; font-size: 15px;">${guestCount}</td>
                                        </tr>
                                    </table>

                                    <h2 style="margin: 0 0 15px 0; color: #153170; font-size: 20px;">
                                        Customer Message
                                    </h2>
                                    <div style="background-color: #f9fbff; border: 1px solid #e1e8f5; border-radius: 8px; padding: 20px; color: #444444; font-size: 15px; line-height: 1.6;">
                                        ${message ? message.replace(/\n/g, '<br>') : 'No specific message provided.'}
                                    </div>

                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" style="padding-top: 40px;">
                                                <a href="http://localhost:5173/dashboard" style="display: inline-block; background-color: #153170; color: #ffffff; padding: 16px 36px; border-radius: 30px; font-weight: bold; text-decoration: none; font-size: 16px; box-shadow: 0 4px 10px rgba(21, 49, 112, 0.3);">
                                                    Access Admin Dashboard
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td bgcolor="#f4f4f4" style="padding: 30px; text-align: center;">
                                    <p style="margin: 0; color: #888888; font-size: 13px;">
                                        &copy; ${new Date().getFullYear()} Elvie Events. All rights reserved.
                                    </p>
                                    <p style="margin: 5px 0 0 0; color: #888888; font-size: 12px;">
                                        Building the future of event management.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        // Send Email to Admin/Venue Partner
        await sendEmail({
            email: process.env.SMTP_USER,
            subject: `New Booking Inquiry from ${customerName} - Elvie Events`,
            html: emailHtml
        });

        res.status(201).json({
            success: true,
            data: booking,
            message: 'Booking created and email sent successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
