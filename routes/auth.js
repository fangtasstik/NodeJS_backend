const express = require('express');
const router = express.Router();
const path = require('path');
const authController = require('../controllers/authController');

// Route to serve the login page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'auth', 'login.html'));
});

// Route to handle login POST request
router.post('/login', authController.handleLogin);

module.exports = router;
