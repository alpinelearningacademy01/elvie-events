const jwt = require('jsonwebtoken');
const VenuePartner = require('../models/VenuePartner');
const Inquiry = require('../models/Inquiry');
const Property = require('../models/Property');

// Helper to sign JWT (same secret as venue-partner auth)
const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ─────────────────────────────────────
// @desc    Admin login (VenuePartner with role='admin')
// @route   POST /api/admin/login
// @access  Public
// ─────────────────────────────────────
exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        // Look up in VenuePartner collection
        const partner = await VenuePartner.findOne({ email }).select('+password');

        if (!partner) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // Role guard — only 'admin' role can sign in here
        if (partner.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Access denied: Not an admin account' });
        }

        const isMatch = await partner.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = signToken(partner._id);
        res.status(200).json({
            success: true,
            token,
            admin: {
                _id: partner._id,
                name: partner.name,
                email: partner.email,
                role: partner.role,
                venueName: partner.venueName,
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────
// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
// ─────────────────────────────────────
exports.getStats = async (req, res) => {
    try {
        const [totalInquiries, newInquiries, repliedInquiries, closedInquiries, totalPartners, totalProperties] =
            await Promise.all([
                Inquiry.countDocuments(),
                Inquiry.countDocuments({ status: 'New' }),
                Inquiry.countDocuments({ status: 'Replied' }),
                Inquiry.countDocuments({ status: 'Closed' }),
                VenuePartner.countDocuments({ role: { $ne: 'admin' } }), // exclude admins from partner count
                Property.countDocuments(),
            ]);

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentInquiries = await Inquiry.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        res.status(200).json({
            success: true,
            data: { totalInquiries, newInquiries, repliedInquiries, closedInquiries, totalPartners, totalProperties, recentInquiries }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────
// @desc    Get all inquiries (with search + pagination)
// @route   GET /api/admin/inquiries
// @access  Private (Admin)
// ─────────────────────────────────────
exports.getAllInquiries = async (req, res) => {
    try {
        const { status, search, page = 1, limit = 15 } = req.query;

        const query = {};
        if (status && status !== 'All') query.status = status;

        let inquiries = await Inquiry.find(query)
            .populate('property', 'propertyName location images')
            .sort('-createdAt')
            .lean();

        if (search) {
            const s = search.toLowerCase();
            inquiries = inquiries.filter(i =>
                i.fullName?.toLowerCase().includes(s) ||
                i.email?.toLowerCase().includes(s) ||
                i.phone?.includes(s) ||
                i.property?.propertyName?.toLowerCase().includes(s) ||
                i.venue?.toLowerCase().includes(s) ||
                i.eventType?.toLowerCase().includes(s)
            );
        }

        const total = inquiries.length;
        const start = (Number(page) - 1) * Number(limit);
        const paginated = inquiries.slice(start, start + Number(limit));

        res.status(200).json({
            success: true,
            count: paginated.length,
            total,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            data: paginated
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────
// @desc    Get single inquiry
// @route   GET /api/admin/inquiries/:id
// @access  Private (Admin)
// ─────────────────────────────────────
exports.getInquiryById = async (req, res) => {
    try {
        const inquiry = await Inquiry.findById(req.params.id).populate('property', 'propertyName location images');
        if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
        res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────
// @desc    Update inquiry
// @route   PUT /api/admin/inquiries/:id
// @access  Private (Admin)
// ─────────────────────────────────────
exports.updateInquiry = async (req, res) => {
    try {
        const { status, notes } = req.body;
        const update = {};
        if (status) update.status = status;
        if (notes !== undefined) update.notes = notes;

        const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
        if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
        res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────
// @desc    Delete inquiry
// @route   DELETE /api/admin/inquiries/:id
// @access  Private (Admin)
// ─────────────────────────────────────
exports.deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByIdAndDelete(req.params.id);
        if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
        res.status(200).json({ success: true, message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ─────────────────────────────────────
// @desc    Get all venue partners (exclude admins)
// @route   GET /api/admin/partners
// @access  Private (Admin)
// ─────────────────────────────────────
exports.getAllPartners = async (req, res) => {
    try {
        const partners = await VenuePartner.find({ role: { $ne: 'admin' } }).sort('-createdAt').lean();
        res.status(200).json({ success: true, count: partners.length, data: partners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
