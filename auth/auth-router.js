const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const usersModel = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);

  try {
    const saved = await usersModel.add(user);
    const token = generateToken(saved);
    res.status(201).json({ ...saved[0], token });
  } catch (err) {
    next(err);
  }

  // usersModel
  //   .add(req.body)
  //   .then((user) => {
  //     const token = generateToken(user);
  //     res.status(201).json({ ...user, token });
  //   })
  //   .catch((error) => {
  //     res.status(500).json(error);
  //   });
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  usersModel
    .findBy({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        user.token = generateToken(user);
        delete user.password;

        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });

  // try {
  //   const { email, password } = req.body;
  //   const user = await usersModel.findBy({ email }).first();
  //   const passwordValid = await bcrypt.compare(password, user.password);
  //   if (user && passwordValid) {
  //     const token = generateToken(user);
  //     const { id, email } = user;
  //     res.status(200).json({ id, email, token });
  //   } else {
  //     res.status(401).json({ message: 'Invalid Credentials' });
  //   }
  // } catch (err) {
  //   next(err);
  // }
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
