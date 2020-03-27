const express = require('express');
const fetch = require('node-fetch');
const stocksModel = require('./stocks-model');
const router = express.Router();

const IEX_API_KEY = process.env.IEX_SANDBOX_API_KEY;
// const IEX_API_KEY = process.env.IEX_CLOUD_API_KEY;

const BASE_URL = `https://sandbox.iexapis.com/stable/stock`;
// const BASE_URL = `https://cloud.iexapis.com/stable/stock`;

router.get('/:symbol', async (req, res, next) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const url = `${BASE_URL}/${symbol}/batch?types=quote,intraday-prices,logo&token=${IEX_API_KEY}`;

    const response = await fetch(url);
    let data = await response.json();

    // save some basic info on this stock to the db if it isn't already
    const stock = await stocksModel.findBy({ symbol }).first();

    if (!stock) {
      stocksModel.addStock({
        symbol: data.quote.symbol,
        company_name: data.quote.companyName,
        primary_exchange: data.quote.primaryExchange,
        image_url: data.logo.url,
      });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Error getting quote' });
  }
});

router.get('/:symbol/chart/:range', async (req, res, next) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const range = req.params.range;
    const url = `${BASE_URL}/${symbol}/chart/${range}?token=${IEX_API_KEY}`;

    const response = await fetch(url);
    let data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error getting data' });
  }
});

module.exports = router;
