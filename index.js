require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/auth-router');
const usersRouter = require('./users/users-router');
const stocksRouter = require('./api/stocks/stocks-router');
const watchlistRouter = require('./api/watchlist/watchlist-router');
const stocklistRouter = require('./api/stocklist/stocklist-router');
const newsRouter = require('./api/news/news-router');

const server = express();
const port = process.env.PORT || 5000;

let whitelist = [
  'https://snapstockapp.com',
  'https://snapstock.vercel.app',
  'https://snapstock-mulligan.vercel.app',
  'https://snapstock-next.vercel.app',
  'http://127.0.0.1:3001'
];

if (process.env.NODE_ENV === 'development') {
  whitelist = whitelist.concat([
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:6006',
    'http://10.0.0.39:6006',
    'http://10.0.0.39:3000',
    'http://localhost:8001',
  ]);
}

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
server.use('/api/stocklist', stocklistRouter);
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
