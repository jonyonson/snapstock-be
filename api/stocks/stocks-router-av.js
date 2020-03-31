const express = require('express');
const fetch = require('node-fetch');
const isSameDay = require('date-fns/isSameDay');
const router = express.Router();

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

router.get('/:symbol/chart/1d', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const interval = '1min';
    const outputSize = 'full'; // full or compact (last 100)
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();
    const timeSeriesData = data[`Time Series (${interval})`];

    const entries = Object.entries(timeSeriesData);
    // this response may contain more than 1 day of daya
    // get only today's prices
    const today = new Date(entries[0][0]);
    let parsed = [];
    for (let [key, value] of entries) {
      isSameDay(today, new Date(key)) &&
        parsed.push({
          date: key,
          open: value['1. open'],
          high: value['2. high'],
          low: value['3. low'],
          close: value['4. close'],
          volume: value['5. volume'],
        });
    }

    res.status(200).json(parsed);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data from Alpha Vantage' });
  }
});

module.exports = router;
