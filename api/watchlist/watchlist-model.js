const db = require('../../data/db-config');

function add(stock) {
  return db('watchlist')
    .insert(stock, 'id')
    .returning(['id', 'user_id', 'symbol', 'company_name']);
}

module.exports = {
  add,
};
