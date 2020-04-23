const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middleware/auth');
const {
  getContacts,
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/contacts');

// @route     GET api/contacts
// @desc      Get all user contacts
// access     Private
router.get('/api/contacts', auth, getContacts);

// @route     POST api/users
// @desc      Add new contact
// access     Private
router.post(
  '/api/contacts',
  auth,
  [
    check('name', 'Name is required').notEmpty(),
    check('email', 'Email is required').notEmpty().isEmail()
  ],
  createContact
);

// @route     PUT api/contacts/:id
// @desc      Update contact
// access     Private
router.put('/api/contacts/:id', auth, updateContact);

// @route     DELETE api/users
// @desc      Delete contact
// access     Private
router.delete('/api/contacts/:id', auth, deleteContact);

module.exports = router;
