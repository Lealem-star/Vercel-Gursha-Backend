const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/PrizeController');
const { upload, handleUploadError } = require('../middleware/uploadMiddleware');

// Prize routes
router.post('/', upload.single('image'), prizeController.createPrize); // Create a new prize
router.get('/', prizeController.getPrizes); // Get all prizes
router.put('/:prizeId', prizeController.updatePrize); // Update a prize
router.delete('/:prizeId', prizeController.deletePrize); // Delete a prize

module.exports = router;
