const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/top-headlines', async (req, res) => {
  const url = `http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${NEWS_API_KEY} `;

  // Preferred sites
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

  // These sites consistenly have issues with images, link or content
  const blacklist = ['Bloomberg', 'Nypost.com'];

  try {
    const response = await fetch(url);
    let data = await response.json();

    // get all of the articles from the whitelist first
    const articles = data.articles.filter((article) => {
      return whitelist.includes(article.source.name);
    });

    // add additional articles until total is 6
    // as long as the source isn't blacklisted
    let i = 0;
    while (articles.length < 6) {
      if (
        !articles.includes(data.articles[i]) &&
        !blacklist.includes(data.articles[i].source.name)
      ) {
        articles.push(data.articles[i]);
      }
      i++;
    }

    // get the articles back in order
    articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    console.log(articles);

    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Error getting data' });
  }
});

module.exports = router;
