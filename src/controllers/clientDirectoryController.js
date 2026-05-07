const ClientDirectory = require('../models/ClientDirectory');

// @desc    Get all client directory entries for the logged-in partner
// @route   GET /api/client-directory
// @access  Private
const getClients = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 20 } = req.query;
        const filter = { venuePartner: req.user._id };

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { contactName: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { role: { $regex: search, $options: 'i' } },
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const total = await ClientDirectory.countDocuments(filter);
        const clients = await ClientDirectory.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        res.status(200).json({
            success: true,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: clients
        });
    } catch (error) {
        console.error('getClients error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Get single client
// @route   GET /api/client-directory/:id
// @access  Private
const getClientById = async (req, res) => {
    try {
        const client = await ClientDirectory.findOne({
            _id: req.params.id,
            venuePartner: req.user._id
        });
        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }
        res.status(200).json({ success: true, data: client });
    } catch (error) {
        console.error('getClientById error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Create a client directory entry
// @route   POST /api/client-directory
// @access  Private
const createClient = async (req, res) => {
    try {
        const { contactName, company, role, email, phone, whatsapp, website, address, category, notes, tags } = req.body;

        if (!contactName) {
            return res.status(400).json({ success: false, message: 'Contact name is required' });
        }

        const client = await ClientDirectory.create({
            venuePartner: req.user._id,
            contactName,
            company,
            role,
            email,
            phone,
            whatsapp,
            website,
            address,
            category: category || 'client',
            notes,
            tags: tags || []
        });

        res.status(201).json({ success: true, data: client });
    } catch (error) {
        console.error('createClient error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Update a client directory entry
// @route   PUT /api/client-directory/:id
// @access  Private
const updateClient = async (req, res) => {
    try {
        const client = await ClientDirectory.findOneAndUpdate(
            { _id: req.params.id, venuePartner: req.user._id },
            { ...req.body },
            { new: true, runValidators: true }
        );

        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        res.status(200).json({ success: true, data: client });
    } catch (error) {
        console.error('updateClient error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// @desc    Delete a client directory entry
// @route   DELETE /api/client-directory/:id
// @access  Private
const deleteClient = async (req, res) => {
    try {
        const client = await ClientDirectory.findOneAndDelete({
            _id: req.params.id,
            venuePartner: req.user._id
        });

        if (!client) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        res.status(200).json({ success: true, message: 'Client deleted successfully' });
    } catch (error) {
        console.error('deleteClient error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getClients, getClientById, createClient, updateClient, deleteClient };
