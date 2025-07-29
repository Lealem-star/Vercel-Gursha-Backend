const express = require('express');
const router = express.Router();
const participantController = require('../controllers/ParticipantController');

// Participant routes
console.log('Participant: Registering route: /games/:gameId (POST)');
router.post('/games/:gameId/participants', participantController.createParticipant); // Add a participant to a game

console.log('Participant: Registering route: /games/:gameId (GET)');
router.get('/games/:gameId/participants', participantController.getParticipants); // Get all participants for a specific game

console.log('Participant: Registering route: /:participantId (PUT)');
router.put('/:participantId', participantController.updateParticipant); // Update a participant

console.log('Participant: Registering route: /:participantId (DELETE)');
router.delete('/:participantId', participantController.deleteParticipant); // Delete a participant

console.log('Participant: Registering route: / (GET)');
router.get('/', participantController.getAllParticipants); // Get all participants

module.exports = router;
