const express = require('express');
const fetch = require('node-fetch');
// const restricted = require('../middleware/restricted');
const stocksModel = require('./stocks-model');
const router = express.Router();

// const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const IEX_CLOUD_API_TOKEN = process.env.IEX_CLOUD_API_TOKEN;

router.get('/:symbol', async (req, res, next) => {
  try {
    const symbol = req.params.symbol.toUpperCase();

    // const quoteUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
    // const imageURL = `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_00ecb118fca947a2ac355634d457e406`;
    // const batchURL = `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,news,chart,logo&range=1m&last=10&token=${IEX_CLOUD_API_TOKEN} `;
    const batchURL = `https://cloud.iexapis.com/stable/stock/${symbol}/batch?types=quote,intraday-prices,logo&token=${IEX_CLOUD_API_TOKEN} `;

    const response = await fetch(batchURL);
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

module.exports = router;
