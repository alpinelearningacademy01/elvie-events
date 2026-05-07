const express = require('express');
const router = express.Router();
const { 
    registerPartner, 
    loginPartner 
} = require('../controllers/venuePartnerController');

router.post('/signup', registerPartner);
router.post('/signin', loginPartner);

module.exports = router;
