const express = require('express');
const router = express.Router();
const { addProperty, getProperties, updateProperty, getPropertyById } = require('../controllers/propertyController');
const { upload } = require('../utils/s3Upload');
const { protect } = require('../utils/authMiddleware');

// Set up multi-file upload fields
const uploadFields = upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'regularImages', maxCount: 20 },
    { name: 'weddingImages', maxCount: 20 },
    { name: 'video', maxCount: 1 },
    { name: 'virtualTour', maxCount: 1 },
    { name: 'menus', maxCount: 10 },
    { name: 'foodPhotos', maxCount: 20 },
    { name: 'floorPlans', maxCount: 10 },
    { name: 'venueImages', maxCount: 50 },
    { name: 'venueFloorPlans', maxCount: 50 }
]);

router.post('/', protect, uploadFields, addProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', protect, uploadFields, updateProperty);

module.exports = router;
