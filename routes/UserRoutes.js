const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

// User routes
console.log('User: Registering route: / (POST)');
router.post('/', userController.createUser); // Create a new user

console.log('User: Registering route: / (GET)');
router.get('/', userController.getUsers); // Get all users

console.log('User: Registering route: /:id');
router.get('/:id', userController.getUserById); // Get user by ID

console.log('User: Registering route: /:userId (PUT)');
router.put('/:userId', userController.updateUser); // Update a user

console.log('User: Registering route: /:userId (DELETE)');
router.delete('/:userId', userController.deleteUser); // Delete a user

module.exports = router;
