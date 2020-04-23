const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: `Invalid credentials` });

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ msg: `Invalid credentials` });

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(`Server error`);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      msg: `Server error`,
    });
  }
};

module.exports = {
  login,
  getUser,
};
