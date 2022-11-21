import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.router';
import watchlistRouter from './routes/watchlist.router';
import stocksRouter from './routes/stocks.router';
import newsRouter from './routes/news.router';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (_, res) => res.json({ status: 'ok' }));
app.use('/auth', authRouter);
app.use('/api/watchlist', watchlistRouter);
app.use('/api/stocks', stocksRouter);
app.use('/api/news', newsRouter);

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let status = 500;
  let message = 'Internal Server Error';

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      status = 409;
      message = 'Unique constraint failed';
    }
  }

  if (err) {
    res.status(status).json({ message });
  }
});

export default app;
