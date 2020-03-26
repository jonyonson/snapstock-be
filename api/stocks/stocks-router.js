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

    // const imageRes = await fetch(imageURL);
    // let imageData = await imageRes.json();

    const response = await fetch(batchURL);
    let data = await response.json();

    // data.logo_url = imageData.url;

    // const response = await fetch(quoteUrl);
    // let data = await response.json();
    // data = data['Global Quote'];

    // let quote = {};
    // for (let [key, value] of Object.entries(data)) {
    //   let newKey = key.split(' ').slice(1).join('_');
    //   quote[newKey] = value;
    // }

    const stock = await stocksModel.findBy({ symbol }).first();

    if (!stock) {
      stocksModel.addStock({
        symbol: data.quote.symbol,
        company_name: data.quote.companyName,
        primary_exchange: data.quote.primaryExchange,
        image_url: data.logo.url,
      });
    }

    // if (stock) {
    //   quote.logo_url = stock.image_url;
    // } else {
    //   const response = await fetch(imageUrl);
    //   const data = await response.json();
    //   quote.logo_url = data.url;

    //   await stocksModel.addStock({
    //     symbol: symbol,
    //     image_url: data.url,
    //   });
    // }

    // res.status(200).json(quote);

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Error getting quote' });
  }
});

module.exports = router;
