const express = require('express');
const router = express.Router();
const { 
    registerPartner, 
    loginPartner,
    forgotPassword,
    verifyResetCode,
    resetPassword
} = require('../controllers/venuePartnerController');

router.post('/signup', registerPartner);
router.post('/signin', loginPartner);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-code', verifyResetCode);
router.post('/reset-password', resetPassword);

module.exports = router;
