require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const stocksRouter = require('./api/stocks/stocks-router.js');

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/users', usersRouter);
server.use('/api/stocks', stocksRouter);

// sanity check
server.get('/', (req, res, next) => {
  res.json({ message: 'Hello, world!' });
});

server.use((err, req, res, next) => {
  console.log('Error:', err);
  res.status(500).json({ message: 'Something went wrong' });
});

server.listen(port, () => {
  console.log(`\n** Running on http://localhost:${port} **\n`);
});
