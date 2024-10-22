const express = require('express');
const router = express.Router();
const path = require('path');
const registerController = require('../controllers/registerController');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'auth', 'register.html'));
});
router.post('/submit', registerController.handleNewUser);

module.exports = router;
