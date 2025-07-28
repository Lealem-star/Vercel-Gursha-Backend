const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/PrizeController');
const { upload, handleUploadError } = require('../middleware/uploadMiddleware');

// Prize routes
console.log('Prize: Registering route: / (POST)');
router.post('/', upload.single('image'), prizeController.createPrize); // Create a new prize

console.log('Prize: Registering route: / (GET)');
router.get('/', prizeController.getPrizes); // Get all prizes

console.log('Prize: Registering route: /:prizeId (PUT)');
router.put('/:prizeId', prizeController.updatePrize); // Update a prize

console.log('Prize: Registering route: /:prizeId (DELETE)');
router.delete('/:prizeId', prizeController.deletePrize); // Delete a prize

module.exports = router;
