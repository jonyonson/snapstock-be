const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
// const restricted = require('../middleware/restricted');
const usersModel = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  // const { email, password } = req.body;

  // usersModel.findBy({email}).first().then(user => {
  //   if (user && bcrypt.com)
  // })
  try {
    const { email, password } = req.body;
    const user = await usersModel.findBy({ email }).first();

    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const token = generateToken(user);
      const { id, email } = user;
      res.status(200).json({ id, email, token });
    } else {
      res.status(401).json({ message: 'Invalid Credentials' });
    }
  } catch (err) {
    next(err);
  }
});

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
  const payload = {
    subject: user.id, // standard claim = sub
    email: user.email,
  };
  const options = {
    expiresIn: '7d',
  };
  return jwt.sign(payload, secrets.jwt, options);
}

module.exports = router;
