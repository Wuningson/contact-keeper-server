const Contact = require('../models/Contact');
const User = require('../models/Contact');
const { validationResult } = require('express-validator');

const createContact = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const { name, email, phone, type } = req.body;
  try {
    let contact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id
    });
    await contact.save();
    return res.json(contact);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(`Server error`);
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    return res.json(contacts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(`Server error`);
  }
};

const updateContact = async (req, res) => {
  const { name, type, email, phone } = req.body;

  // Build contact object
  let contactFields = {};
  if (name) contactFields.name = name;
  if (type) contactFields.type = type;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) res.status(404).json({ msg: `Contact not found` });
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: `Not authorized` });

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    req.json(contact);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Server error`);
  }
};

const deleteContact = async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) res.status(404).json({ msg: `Contact not found` });

    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: `Not authorized` });

    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: `Contact remove` });
  } catch (err) {
    console.log(err);
    res.status(500).send(`Server error`);
  }
};

module.exports = {
  createContact,
  getContacts,
  updateContact,
  deleteContact
};
