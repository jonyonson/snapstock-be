const express = require('express');
const fetch = require('node-fetch');
const watchlistModel = require('./watchlist-model');
const router = express.Router();

const IEX_API_KEY = process.env.IEX_CLOUD_API_KEY;
const BASE_URL = `https://cloud.iexapis.com/stable/stock`;

router.post('/', async (req, res) => {
  const { symbol, user_id, company_name } = req.body;

  try {
    const saved = await watchlistModel.add({ symbol, user_id, company_name });
    res.status(200).json(saved[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving stock to watchlist.' });
  }
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const watchlist = await watchlistModel.findByUserId(userId);

    // Get a quote for each security in our watchlist
    const symbols = watchlist.map((stock) => stock.symbol).join(',');
    const url = `${BASE_URL}/market/batch?symbols=${symbols}&types=quote&token=${IEX_API_KEY}`;
    const response = await fetch(url);
    let data = await response.json();

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

    console.log(data);

    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Error getting watchlist' });
  }
});

module.exports = router;
