const express = require('express');
const router = express.Router();
const {
    getClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
} = require('../controllers/clientDirectoryController');
const { protect } = require('../utils/authMiddleware');

router.use(protect); // All routes require authentication

router.route('/')
    .get(getClients)
    .post(createClient);

router.route('/:id')
    .get(getClientById)
    .put(updateClient)
    .delete(deleteClient);

module.exports = router;
