const express = require('express');
const router = express.Router();
const participantController = require('../controllers/ParticipantController');

// Participant routes
router.post('/games/:gameId', participantController.createParticipant); // Add a participant to a game
router.get('/games/:gameId', participantController.getParticipants); // Get all participants for a specific game
router.put('/:participantId', participantController.updateParticipant); // Update a participant
router.delete('/:participantId', participantController.deleteParticipant); // Delete a participant
router.get('/', participantController.getAllParticipants); // Get all participants

module.exports = router;
