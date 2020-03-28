const express = require('express');
// const restricted = require('../middleware/restricted');
const usersModel = require('./users-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
