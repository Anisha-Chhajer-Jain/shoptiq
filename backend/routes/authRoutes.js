const express = require('express');
const router = express.Router();
const { authUser, registerUser, googleAuth } = require('../controllers/authController');

router.post('/login', authUser);
router.post('/register', registerUser);
router.post('/google', googleAuth);

module.exports = router;
