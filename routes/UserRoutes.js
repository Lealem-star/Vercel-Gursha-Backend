const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// User routes
router.post('/', userController.createUser); // Create a new user
router.get('/', userController.getUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.put('/:userId', userController.updateUser); // Update a user
router.delete('/:userId', userController.deleteUser); // Delete a user

module.exports = router;
