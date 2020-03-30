// const bcrypt = require('bcryptjs');
const db = require('../data/db-config');

function find() {
  return db('users').select('id', 'email', 'email_verified', 'created_at');
}

function findBy(filter) {
  return db('users').where(filter).select('id', 'email', 'password');
}

async function add(user) {
  // const [id] = await db('users').insert(user);
  // return findById(id);

  return db('users')
    .insert(user, 'id')
    .returning(['id', 'email', 'email_verified', 'created_at']);
}

function findById(id) {
  return db('users').where({ id }).first('id', 'email');
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
