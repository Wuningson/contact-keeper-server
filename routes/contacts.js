const express = require('express');
const router = express.Router();

// @route     GET api/contacts
// @desc      Get all user contacts
// access     Private
router.get('/api/contacts');

// @route     POST api/users
// @desc      Add new contact
// access     Private
router.post('/api/contacts');

// @route     PUT api/contacts/:id
// @desc      Update contact
// access     Private
router.put('/api/contacts/:id');

// @route     DELETE api/users
// @desc      Delete contact
// access     Private
router.delete('/api/contacts/:id');

module.exports = router;
