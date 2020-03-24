const express = require('express');
// const restricted = require('../middleware/restricted');
const fetch = require('node-fetch');
const router = express.Router();
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

router.get('/quote/:symbol', async (req, res, next) => {
  try {
    const symbol = req.params.symbol;

    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;

    const response = await fetch(url);
    let data = await response.json();
    data = data['Global Quote'];

    let quote = {};
    for (let [key, value] of Object.entries(data)) {
      let newKey = key.slice(4).split(' ').join('_');
      quote[newKey] = value;
    }

    res.status(200).json(quote);
  } catch (err) {
    res.status(400).json({ error: 'Error getting quote' });
  }
});

module.exports = router;
