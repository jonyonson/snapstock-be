import express from 'express';
import { IEX_CLOUD, MARKET_INDEX_URL } from '../utils/constants';
import fetch from 'node-fetch';

const router = express.Router();

// GET /api/search/:query
router.get('/search/:query', async (req, res, next) => {
  const { query } = req.params;
  const url = `${IEX_CLOUD.BASE_URL}/search/${query}?token=${IEX_CLOUD.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/stocks/market/list/:type
router.get('/market/list/:type', async (req, res, next) => {
  const { type } = req.params;

  const listTypes = [
    'mostactive',
    'gainers',
    'losers',
    'iexvolume',
    'iexpercent',
  ];

  if (!listTypes.includes(type)) {
    const message = `Must be a valid list type ('${listTypes.join("', '")})`;
    return res.status(400).json({ message });
  }

  const url = `${IEX_CLOUD.BASE_URL}/stock/market/list/${type}?token=${IEX_CLOUD.API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/stocks/market/indices
router.get('/market/indices', async (_, res, next) => {
  try {
    const response = await fetch(`${MARKET_INDEX_URL}/api/v2/indices`);
    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/stocks/:symbol
router.get('/:symbol', async (req, res, next) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const url = `${IEX_CLOUD.BASE_URL}/stock/${symbol}/batch?types=quote,company,intraday-prices,stats&token=${IEX_CLOUD.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/stocks/:symbol/chart/:range
router.get('/:symbol/chart/:range', async (req, res, next) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const range = req.params.range;
    const url = `${IEX_CLOUD.BASE_URL}/stock/${symbol}/chart/${range}?token=${IEX_CLOUD.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
