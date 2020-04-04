const express = require('express');
const router = express.Router();

// @route     GET auth/users
// @desc      Get logged in a user
// access     Private
router.get('/auth/users');

// @route     POST auth/users
// @desc      Auth user and get token
// access     Public
router.post('/auth/users');

module.exports = router;
