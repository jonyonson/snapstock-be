const db = require('../../data/db-config');

function add(stock) {
  return db('watchlist')
    .insert(stock, 'id')
    .returning(['id', 'user_id', 'symbol', 'company_name']);
}

function findByUserId(user_id) {
  return db('watchlist')
    .where({ user_id })
    .select('id', 'symbol', 'company_name');
}

module.exports = {
  add,
  findByUserId,
};
