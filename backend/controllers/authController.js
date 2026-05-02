const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const user = await User.create({ name, email, password, role });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

const axios = require('axios');

// @desc    Auth with Google
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res, next) => {
  try {
    const { token, role } = req.body;

    if (!token) {
      console.error('[Google Auth] No token provided');
      return res.status(400).json({ message: 'No token provided' });
    }

    console.log('[Google Auth] Fetching user info with token...');

    // Fetch user info from Google using the access token
    const { data } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
      headers: { Authorization: `Bearer ${token}` }
    }).catch(err => {
      console.error('[Google Auth] Google API Error:', err.response?.data || err.message);
      throw new Error('Invalid Google token');
    });

    const { email, name, picture, sub: googleId } = data;
    console.log(`[Google Auth] Success for email: ${email}`);

    let user = await User.findOne({ email });

    if (user) {
      // User exists, just login
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // Create new user for Google login
      console.log(`[Google Auth] Creating new user: ${email}`);
      const randomPassword = Math.random().toString(36).slice(-10);
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        password: randomPassword,
        role: role || 'buyer',
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    console.error('[Google Auth] Catch Error:', error.message);
    res.status(401).json({ message: error.message || 'Google authentication failed' });
  }
};

module.exports = { authUser, registerUser, googleAuth };
