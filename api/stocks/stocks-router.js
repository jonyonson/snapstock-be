const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const { IEX_API_KEY, BASE_URL, FLASK_BASE_URL } = require('../../constants');

router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const endpoint = `${BASE_URL}/${symbol}/batch?types=quote,company,intraday-prices,stats&token=${IEX_API_KEY}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error getting data' });
  }
});

router.get('/:symbol/chart/:range', async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const range = req.params.range;
    const url = `${BASE_URL}/${symbol}/chart/${range}?token=${IEX_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error getting chart data from IEX' });
  }
});

/**
 * 'mostactive' | 'gainers' | 'losers' |'iexvolume' | 'iexpercent'
 * */
router.get('/market/list/:type', async (req, res) => {
  const listType = req.params.type;
  const url = `${BASE_URL}/market/list/${listType}?token=${IEX_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

router.get('/market/indices', async (req, res) => {
  try {
    const url = FLASK_BASE_URL + '/indices';
    const response = await fetch(url);
    let data = await response.json();
    console.log(data);

    for (let prop in data) {
      data[prop].yearRange = data[prop]['52 Week Range'];
      delete data[prop]['52 Week Range'];
      data[prop].avgVolume = data[prop]['Avg. Volume'];
      delete data[prop]['Avg. Volume'];
      data[prop].change = data[prop]['Change'];
      delete data[prop]['Change'];
      data[prop].dayRange = data[prop]["Day's Range"];
      delete data[prop]["Day's Range"];
      data[prop].open = data[prop]['Open'];
      delete data[prop]['Open'];
      data[prop].percentChange = data[prop]['Percent Change'];
      delete data[prop]['Percent Change'];
      data[prop].previousClose = data[prop]['Previous Close'];
      delete data[prop]['Previous Close'];
      data[prop].price = data[prop]['Quote Price'];
      delete data[prop]['Quote Price'];
      data[prop].volume = data[prop]['Volume'];
      delete data[prop]['Volume'];
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

module.exports = router;
