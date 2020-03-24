const bcrypt = require('bcryptjs');
const db = require('../data/db-config');

function find() {
  return db('users').select('id', 'email');
}

function findBy(filter) {
  return db('users').where(filter).select('id', 'email', 'password');
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users').where({ id }).first('id', 'email');
}

module.exports = {
  add,
  find,
  findby,
  findById,
};
