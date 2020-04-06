const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/top-headlines', async (req, res) => {
  const url = `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY} `;

  const whitelist = [
    'CNBC',
    'Trust.org',
    'Marketwatch.com',
    'The Hill',
    'Reuters',
    'Nytimes.com',
    'The Washington Post',
    'Investopedia.com',
    // 'TechCrunch',
    'Fool.com',
    'CNN',
  ];

  try {
    const response = await fetch(url);
    let data = await response.json();

    const articles = data.articles.filter((article) => {
      return whitelist.includes(article.source.name);
    });

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

module.exports = router;
