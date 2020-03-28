const bcrypt = require('bcryptjs');
const db = require('../data/db-config');

function find() {
  return db('users').select('id', 'email', 'email_verified', 'created_at');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'email', 'email_verified', 'created_at');
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 12);
  const [id] = await db('users').insert(user);

  return findById(id);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first('id', 'email', 'email_verified', 'created_at');
}

module.exports = {
  add,
  find,
  findBy,
  findById,
};
