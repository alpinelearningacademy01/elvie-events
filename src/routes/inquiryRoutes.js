const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiryStatus, requestInquiryAccess, unlockInquiry } = require('../controllers/inquiryController');
const { protect } = require('../utils/authMiddleware');

router.post('/', createInquiry);
router.get('/', protect, getInquiries);
router.put('/:id', protect, updateInquiryStatus);
router.post('/:id/request', protect, requestInquiryAccess);
router.post('/:id/unlock', protect, unlockInquiry);

module.exports = router;
