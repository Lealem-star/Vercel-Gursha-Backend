const express = require('express');
const router = express.Router();
const gameController = require('../controllers/GameController');

// Game routes
console.log('Game: Registering route: / (POST)');
router.post('/', gameController.createGame); // Create a new game

console.log('Game: Registering route: / (GET)');
router.get('/', gameController.getGames); // Get all games

console.log('Game: Registering route: /:gameId (PUT)');
router.put('/:gameId', gameController.updateGame); // Update a game

console.log('Game: Registering route: /:gameId (DELETE)');
router.delete('/:gameId', gameController.deleteGame); // Delete a game

console.log('Game: Registering route: /:gameId (GET)');
router.get('/:gameId', gameController.getGameById); // Get a specific game by ID

module.exports = router;
