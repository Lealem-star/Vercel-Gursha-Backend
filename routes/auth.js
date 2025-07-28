// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Test Route
console.log('Auth: Registering route: /test');
router.get('/test', authController.test);

// Sign Up Route
console.log('Auth: Registering route: /signup');
router.post('/signup', authController.signup);

// Sign In Route
console.log('Auth: Registering route: /signin');
router.post('/signin', authController.signin);

module.exports = router;
