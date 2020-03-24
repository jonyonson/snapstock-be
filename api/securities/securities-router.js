const express = require('express');
// const restricted = require('../middleware/restricted');
const fetch = require('node-fetch');
const stocksModel = require('./securities-model');
const router = express.Router();
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

router.get('/stock/:symbol', async (req, res, next) => {
  try {
    const symbol = req.params.symbol;

    const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    const imageUrl = `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_00ecb118fca947a2ac355634d457e406`;

    const response = await fetch(quoteUrl);
    let data = await response.json();
    data = data['Global Quote'];

    let quote = {};
    for (let [key, value] of Object.entries(data)) {
      let newKey = key.split(' ').slice(1).join('_');
      quote[newKey] = value;
    }

    const stock = await stocksModel.findBy({ symbol }).first();

    if (stock) {
      quote[logo_url] = stock.image_url;
    } else {
      const response = await fetch(imageUrl);
      const data = await response.json();
      quote[logo_url] = data.url;

      await stocksModel.add({
        symbol: symbol,
        image_url: data.url,
      });
    }

    res.status(200).json(quote);
  } catch (err) {
    res.status(400).json({ error: 'Error getting quote' });
  }
});

module.exports = router;
