const express = require('express');
const { googleAuth, appleAuth, login, register } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Authentication routes
router.post('/google', googleAuth);
router.post('/apple', appleAuth);
router.post('/login', login);
router.post('/register', register);

// Protected route example
router.get('/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

module.exports = router;