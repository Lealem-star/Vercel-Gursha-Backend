const express = require('express');
const router = express.Router();
const gameController = require('../controllers/GameController');

// Game routes
router.post('/', gameController.createGame); // Create a new game
router.get('/', gameController.getGames); // Get all games
router.put('/:gameId', gameController.updateGame); // Update a game
router.delete('/:gameId', gameController.deleteGame); // Delete a game
router.get('/:gameId', gameController.getGameById); // Get a specific game by ID

module.exports = router;
