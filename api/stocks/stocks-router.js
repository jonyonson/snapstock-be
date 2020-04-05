const express = require('express');
const fetch = require('node-fetch');
const stocksModel = require('./stocks-model');
const router = express.Router();

// const IEX_API_KEY = process.env.IEX_SANDBOX_API_KEY;
const IEX_API_KEY = process.env.IEX_CLOUD_API_KEY;
// const BASE_URL = `https://sandbox.iexapis.com/stable/stock`;
const BASE_URL = `https://cloud.iexapis.com/stable/stock`;

router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    // const url = `${BASE_URL}/${symbol}/batch?types=quote,intraday-prices,logo&token=${IEX_API_KEY}`;
    const url = `${BASE_URL}/${symbol}/batch?types=quote,company,logo&token=${IEX_API_KEY}`;

    const response = await fetch(url);
    let data = await response.json();

    // save some basic info on this stock to the db if it isn't already
    const stock = await stocksModel.findBy({ symbol }).first();

    if (!stock) {
      const newStock = {
        symbol: data.quote.symbol,
        company_name: data.quote.companyName,
        primary_exchange: data.quote.primaryExchange,
        image_url: data.logo.url,
      };

      await stocksModel.addStock(newStock);
    }

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error getting quote data from Alpha Vantage' });
  }
});

router.get('/:symbol/chart/:range', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const range = req.params.range;
    const url = `${BASE_URL}/${symbol}/chart/${range}?token=${IEX_API_KEY}`;

    const response = await fetch(url);
    let data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error getting chart data from IEX' });
  }
});

router.get('/market/list/:type', async (req, res) => {
  const listType = req.params.type;
  // 'mostactive', 'gainers', 'losers', 'iexvolume', 'iexpercent'
  const url = `${BASE_URL}/market/list/${listType}?token=${IEX_API_KEY}`;

  try {
    const response = await fetch(url);
    let data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

router.get('/market/indices', async (req, res) => {
  let flaskBaseURL;
  if (process.env.NODE_ENV === 'development') {
    flaskBaseURL = 'http://localhost:4000';
  } else {
    flaskBaseURL = 'https://snapstock-flask.herokuapp.com';
  }

  try {
    const url = flaskBaseURL + '/indices';
    const response = await fetch(url);
    let data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

module.exports = router;
