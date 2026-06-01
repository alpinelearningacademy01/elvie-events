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
            // 1. Send Email to Venue Partner (client details hidden — must purchase/approve to view)
            try {
                await sendEmail({
                    email: property.partner.email,
                    subject: `🔔 New Inquiry Received — ${property.propertyName}`,
                    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #070c18; padding: 24px; text-align: center;">
    <h1 style="color: #c5a880; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: bold;">VENUE PARTNERS</h1>
  </div>
  <div style="padding: 32px 24px; background-color: #ffffff; color: #1a202c;">
    <h2 style="font-size: 20px; font-weight: bold; margin-top: 0; margin-bottom: 8px; color: #0f172a;">New Inquiry Received!</h2>
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 24px;">
      Hello <strong>${property.partner.name}</strong>,<br/>
      A new event inquiry has been submitted for <strong style="color: #c5a880;">${property.propertyName}</strong>. Review the details below and log in to your dashboard to access full client information.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600; width: 40%;">Venue</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; font-weight: 600;">${property.propertyName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Event Type</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${inquiry.eventType}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Event Date</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${new Date(inquiry.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
      </tr>
      <tr>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Attendees</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${inquiry.attendees} Guests</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px 16px; font-size: 13px; color: #64748b; font-weight: 600;">Budget</td>
        <td style="padding: 10px 16px; font-size: 13px; color: #c5a880; font-weight: 700;">${inquiry.budget} ${inquiry.budgetCurrency}</td>
      </tr>
    </table>

    <div style="background-color: #fffbeb; border: 1px dashed #c5a880; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0 0 10px; font-size: 13px; font-weight: 700; color: #92400e;">🔒 Client Details are Hidden</p>
      <table width="100%" cellpadding="4" cellspacing="0">
        <tr><td style="font-size: 13px; color: #78716c; width: 45%;">Customer Name:</td><td style="font-size: 13px; color: #d1d5db; font-family: monospace; letter-spacing: 3px;">● ● ● ● ● ●</td></tr>
        <tr><td style="font-size: 13px; color: #78716c;">Email:</td><td style="font-size: 13px; color: #d1d5db; font-family: monospace; letter-spacing: 3px;">● ● ●@● ● ●</td></tr>
        <tr><td style="font-size: 13px; color: #78716c;">Phone:</td><td style="font-size: 13px; color: #d1d5db; font-family: monospace; letter-spacing: 3px;">+● ● ● ● ● ●</td></tr>
        <tr><td style="font-size: 13px; color: #78716c;">Event Notes:</td><td style="font-size: 13px; color: #d1d5db; font-family: monospace; letter-spacing: 3px;">● ● ● ● ● ● ●</td></tr>
      </table>
      <p style="margin: 10px 0 0; font-size: 12px; color: #78716c;">Purchase access or request admin approval in your dashboard to unlock full client contact details.</p>
    </div>

    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 12px 32px; background-color: #c5a880; color: #070c18; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; letter-spacing: 0.5px;">View in Dashboard →</a>
    </div>
  </div>
  <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0;">
    © ${new Date().getFullYear()} Venue Partners. All rights reserved.
  </div>
</div>
                    `
                });
            } catch (err) {
                console.error('Error sending email to partner:', err);
            }

            // 2. Send Confirmation Email to Customer
            try {
                await sendEmail({
                    email: inquiry.email,
                    subject: `✅ Inquiry Confirmed — ${property.propertyName}`,
                    html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
  <div style="background-color: #070c18; padding: 24px; text-align: center;">
    <h1 style="color: #c5a880; margin: 0; font-size: 24px; letter-spacing: 1px; font-weight: bold;">VENUE PARTNERS</h1>
  </div>
  <div style="padding: 32px 24px; background-color: #ffffff; color: #1a202c;">
    <h2 style="font-size: 20px; font-weight: bold; margin-top: 0; margin-bottom: 8px; color: #0f172a;">✅ Inquiry Confirmed!</h2>
    <p style="font-size: 16px; line-height: 1.6; color: #4a5568; margin-bottom: 24px;">
      Hello <strong>${inquiry.fullName}</strong>,<br/>
      Thank you for your interest! Your inquiry for <strong style="color: #c5a880;">${property.propertyName}</strong> has been successfully submitted. The venue team will get back to you shortly.
    </p>

    <p style="font-size: 13px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Summary of Your Request</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600; width: 40%;">Venue</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b; font-weight: 600;">${property.propertyName}</td>
      </tr>
      <tr>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Event Type</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${inquiry.eventType}</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Event Date</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${new Date(inquiry.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</td>
      </tr>
      <tr>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #64748b; font-weight: 600;">Attendees</td>
        <td style="padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; color: #1e293b;">${inquiry.attendees} Guests</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="padding: 10px 16px; font-size: 13px; color: #64748b; font-weight: 600;">Budget</td>
        <td style="padding: 10px 16px; font-size: 13px; color: #c5a880; font-weight: 700;">${inquiry.budget} ${inquiry.budgetCurrency}</td>
      </tr>
    </table>

    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
      <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #718096;">
        The venue team will contact you at <strong style="color: #4a5568;">${inquiry.email}</strong> or <strong style="color: #4a5568;">${inquiry.phone}</strong>.<br/>
        Please expect a response within <strong>24–48 hours</strong>.
      </p>
    </div>
  </div>
  <div style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #a0aec0;">
    © ${new Date().getFullYear()} Venue Partners. All rights reserved. This is an automated message, please do not reply.
  </div>
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
        const inquiries = await Inquiry.find().populate('property', 'propertyName').sort('-createdAt');
        
        let processedInquiries = inquiries;
        
        // Mask details for 'partner' role if not unlocked
        if (req.user && req.user.role !== 'admin') {
            const unlocked = req.user.unlockedInquiries ? req.user.unlockedInquiries.map(id => id.toString()) : [];
            const requested = req.user.requestedInquiries ? req.user.requestedInquiries.map(id => id.toString()) : [];
            
            processedInquiries = inquiries.map(inq => {
                const inqObj = inq.toObject();
                // We check if this inquiry is unlocked by the partner
                const isUnlocked = unlocked.includes(inqObj._id.toString());
                const isRequested = requested.includes(inqObj._id.toString());
                
                if (!isUnlocked) {
                    // Mask sensitive data
                    inqObj.fullName = 'Hidden (Unlock to View)';
                    inqObj.email = '**********@*****.***';
                    inqObj.phone = '+** *** *** ****';
                    if (inqObj.companyName) {
                        inqObj.companyName = 'Hidden (Unlock to View)';
                    }
                }
                
                inqObj.isUnlocked = isUnlocked;
                inqObj.isRequested = isRequested;
                return inqObj;
            });
        }

        res.status(200).json({
            success: true,
            count: processedInquiries.length,
            data: processedInquiries
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

// @desc    Request access from admin for an inquiry
// @route   POST /api/inquiries/:id/request
// @access  Private (Partner)
exports.requestInquiryAccess = async (req, res) => {
    try {
        const inquiryId = req.params.id;
        const user = req.user;
        
        if (!user.requestedInquiries.includes(inquiryId)) {
            user.requestedInquiries.push(inquiryId);
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'Access requested successfully'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Purchase or unlock an inquiry 
// @route   POST /api/inquiries/:id/unlock
// @access  Private (Partner)
exports.unlockInquiry = async (req, res) => {
    try {
        const inquiryId = req.params.id;
        const user = req.user;
        
        if (!user.unlockedInquiries.includes(inquiryId)) {
            user.unlockedInquiries.push(inquiryId);
            // Remove from requested if present
            user.requestedInquiries = user.requestedInquiries.filter(id => id.toString() !== inquiryId.toString());
            await user.save();
        }

        res.status(200).json({
            success: true,
            message: 'Inquiry unlocked successfully'
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
