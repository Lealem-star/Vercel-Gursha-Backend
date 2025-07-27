const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/AuthMiddleware');
const { upload, handleUploadError } = require('../middleware/uploadMiddleware');
const gameController = require('../controllers/GameController');

// Admin routes for managing game controllers
router.post('/controllers',
    authMiddleware.verifyToken,
    authMiddleware.isAdmin,
    upload.single('image'), // Handle single image upload
    userController.createUser
); // Create a new game controller
router.get('/controllers', authMiddleware.verifyToken, authMiddleware.isAdmin, (req, res, next) => {
    // Add role filter to get only controllers
    req.query.role = 'gameController';
    next();
}, userController.getUsers); // Get all game controllers

// Get a single game controller by ID
router.get('/controllers/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getUserById);

// Get all games managed by a controller
router.get('/controllers/:id/games', authMiddleware.verifyToken, authMiddleware.isAdmin, gameController.getGamesByController);

// Get total revenue for a controller
router.get('/controllers/:id/revenue', authMiddleware.verifyToken, authMiddleware.isAdmin, gameController.getControllerRevenue);

router.put('/controllers/:userId', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.updateUser); // Update a game controller
router.delete('/controllers/:userId', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.deleteUser); // Delete a game controller

// General user management routes (for admin)
router.get('/users', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getUsers); // Get all users
router.get('/users/:userId', authMiddleware.verifyToken, authMiddleware.isAdmin, userController.getUserById); // Get specific user

// Note: Login route is handled by authRoutes, not here

module.exports = router;
