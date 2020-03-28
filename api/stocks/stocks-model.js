const db = require('../../data/db-config');

function addStock(stock) {
  return db('stocks').insert(stock);
}

function findBy(filter) {
  return db('stocks')
    .where(filter)
    .select('id', 'symbol', 'company_name', 'primary_exchange', 'image_url');
}

module.exports = {
  addStock,
  findBy,
};
