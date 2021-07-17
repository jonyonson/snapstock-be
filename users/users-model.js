// const bcrypt = require('bcryptjs');
const db = require('../data/db-config');

function find() {
  return db('users').select('id', 'email', 'email_verified', 'created_at');
}

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'email', 'password', 'email_verified', 'created_at');
}

async function add(user) {
  const [uuid] = await db('users').insert(user, 'uuid');
  return findByUUID(uuid);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first(
      'id',
      'uuid',
      'email',
      'display_name',
      'photo_url',
      'email_verified',
      'created_at',
      'updated_at',
    );
}

function findByUUID(uuid) {
  return db('users')
    .where({ uuid })
    .first(
      'id',
      'uuid',
      'email',
      'display_name',
      'photo_url',
      'email_verified',
      'created_at',
      'updated_at',
    );
}

module.exports = {
  add,
  find,
  findBy,
  findByUUID,
  findById,
};
