const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createUser } = require('../controllers/users');

// @route     POST api/users
// @desc      Register a user
// access     Public
router.post(
  '/api/users',
  [
    check('name', 'Please add name').notEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more character'
    ).isLength({ min: 6 }),
  ],
  createUser
);

module.exports = router;
