const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const { login, getUser } = require('../controllers/auth');

// @route     GET api/auth
// @desc      Get logged in a user
// access     Private
router.get('/api/auth', auth, getUser);

// @route     POST api/auth
// @desc      Auth user and get token
// access     Public
router.post(
  '/api/auth',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

module.exports = router;
