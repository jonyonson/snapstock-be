require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const stocksRouter = require('./api/stocks/stocks-router');
const watchlistRouter = require('./api/watchlist/watchlist-router');
const newsRouter = require('./api/news/news-router');

const server = express();
const port = process.env.PORT || 5000;

const whitelist = ['https://snapstockapp.com', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    // checking for `!origin` allows requests from REST tools
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

server.use(cors(corsOptions));
server.use(helmet());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use('/api/stocks', stocksRouter);
server.use('/api/watchlist', watchlistRouter);
server.use('/api/news', newsRouter);

// sanity check
server.get('/', (req, res, next) => {
  res.json({ env: process.env.NODE_ENV });
});

server.use((err, req, res, next) => {
  console.log('Error:', err);
  res.status(500).json({ message: 'Something went wrong' });
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`);
});
