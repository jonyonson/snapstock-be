const db = require('../../data/db-config');

function add(stock) {
  return db('stocks').insert(stock);
}

function findBy(filter) {
  return db('stocks').where(filter).select('id', 'symbol', 'image_url');
}

module.exports = {
  add,
  findBy,
};
