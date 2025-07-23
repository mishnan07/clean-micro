const express = require('express');
const { googleAuth } = require('../controllers/googleAuthController');
const { appleAuth } = require('../controllers/appleAuthController');
const { login } = require('../controllers/loginController');
const { register } = require('../controllers/registerController');
const { getProfile } = require('../controllers/profileController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Authentication routes
router.post('/google', googleAuth);
router.post('/apple', appleAuth);
router.post('/login', login);
router.post('/register', register);

// Protected route
router.get('/profile', authenticateToken, getProfile);

module.exports = router;