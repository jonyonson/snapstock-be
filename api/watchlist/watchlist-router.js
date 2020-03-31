const express = require('express');
const watchlistModel = require('./watchlist-model');
// const stocksModel = require('../stocks/stocks-model');
const router = express.Router();

router.post('/', async (req, res) => {
  const { symbol, user_id, company_name } = req.body;

  try {
    const saved = await watchlistModel.add({ symbol, user_id, company_name });
    res.status(200).json(saved[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving stock to watchlist.' });
  }
});

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const watchlist = await watchlistModel.findByUserId(userId);
    res.status(200).json(watchlist);
  } catch (err) {
    res.status(500).json({ message: 'Error getting watchlist' });
  }
});

// router.post('/', async (req, res) => {
//   // const stock = req.body;
//   // console.log(stock);

//   const { symbol, user_id, company_name } = req.body;

//   const stock = await stocksModel.findBy({ symbol }).first();
//   console.log(stock);
//   let watchedStock = {};

//   if (!stock) {
//     const newStock = {
//       symbol: req.body.symbol,
//       company_name: req.body.company_name,
//       // primary_exchange: data.quote.primaryExchange,
//       // image_url: data.logo.url,
//     };

//     const saved = await stocksModel.addStock(newStock);
//     watchedStock['stock_id'] = stockId = saved[0].id;
//   } else {
//     watchedStock['stock_id'] = stock.id;
//   }

//   watchedStock['user_id'] = req.body.user_id;
//   console.log(watchedStock);

//   try {
//     const newWatched = await watchlistModel.add(watchedStock);
//     console.log('new watched stock', newWatched);

//     res.status(200).json(watchedStock);
//   } catch (err) {
//     res.status(200).json({ message: 'Error saving stock to watchlist' });
//   }
// });

module.exports = router;
