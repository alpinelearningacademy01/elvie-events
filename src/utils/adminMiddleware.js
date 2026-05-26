const jwt = require('jsonwebtoken');
const VenuePartner = require('../models/VenuePartner');

/**
 * Admin middleware — uses the VenuePartner collection.
 * Any VenuePartner with role === 'admin' is treated as an admin.
 */
const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find in VenuePartner table, must have role = 'admin'
            const partner = await VenuePartner.findById(decoded.id).select('-password');

            if (!partner) {
                return res.status(401).json({ success: false, message: 'Admin account not found' });
            }

            if (partner.role !== 'admin') {
                return res.status(403).json({ success: false, message: 'Access denied: Admins only' });
            }

            req.admin = partner;
            next();
        } catch (error) {
            console.error('Admin auth error:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

module.exports = { protectAdmin };
