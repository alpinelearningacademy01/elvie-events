const express = require('express');
const router = express.Router();
const {
    loginAdmin,
    getStats,
    getAllInquiries,
    getInquiryById,
    updateInquiry,
    deleteInquiry,
    getAllPartners,
} = require('../controllers/adminController');
const { protectAdmin } = require('../utils/adminMiddleware');

// ── Auth ──────────────────────────────
// Login: checks VenuePartner with role='admin'
router.post('/login', loginAdmin);

// ── Protected admin routes ────────────
router.get('/stats',            protectAdmin, getStats);
router.get('/inquiries',        protectAdmin, getAllInquiries);
router.get('/inquiries/:id',    protectAdmin, getInquiryById);
router.put('/inquiries/:id',    protectAdmin, updateInquiry);
router.delete('/inquiries/:id', protectAdmin, deleteInquiry);
router.get('/partners',         protectAdmin, getAllPartners);

module.exports = router;
