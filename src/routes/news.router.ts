import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// GET /api/news/latest
router.get('/latest', async (_, res, next) => {
  const url = `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const { articles } = data;

    res.json(articles);
  } catch (err) {
    next(err);
  }
});

export default router;
