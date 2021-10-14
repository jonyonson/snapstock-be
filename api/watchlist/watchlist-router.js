const express = require('express');
const fetch = require('node-fetch');
const watchlistModel = require('./watchlist-model');
const router = express.Router();
const { IEX_API_KEY, BASE_URL } = require('../../constants');

router.post('/', async (req, res) => {
  const { symbol, company_name, uuid } = req.body;
  const user_id = uuid;
  try {
    const saved = await watchlistModel.add({ symbol, user_id, company_name });
    res.status(200).json(saved[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving stock to watchlist.' });
  }
});

router.get('/', async (req, res) => {
  const uuid = req.query.uuid;
  try {
    const watchlist = await watchlistModel.findByUserId(uuid);

    // Get a quote for each security in our watchlist
    const symbols = watchlist.map((stock) => stock.symbol).join(',');
    const url = `${BASE_URL}/stock/market/batch?symbols=${symbols}&types=quote&token=${IEX_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    // add the quote for each stock
    watchlist.forEach((stock) => {
      // stock['quote'] = data[stock.symbol.toUpperCase()].quote;
      stock['latestPrice'] = data[stock.symbol.toUpperCase()].quote.latestPrice;
      stock['change'] = data[stock.symbol.toUpperCase()].quote.change;
      stock['volume'] = data[stock.symbol.toUpperCase()].quote.volume;
      stock['latestVolume'] =
        data[stock.symbol.toUpperCase()].quote.latestVolume;
      stock['changePercent'] =
        data[stock.symbol.toUpperCase()].quote.changePercent;
    });

    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Error getting watchlist' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user_id = req.query.uuid;
  try {
    const removed = await watchlistModel.removeStock(user_id, id);
    res.status(200).json({ message: 'Stock removed from watchlist' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
