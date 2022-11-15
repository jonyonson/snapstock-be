import express from 'express';
import { MARKET_INDEX_URL } from '../utils/constants';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/market/indices', async (_, res, next) => {
  try {
    const response = await fetch(`${MARKET_INDEX_URL}/api/v2/indices`);
    let data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
