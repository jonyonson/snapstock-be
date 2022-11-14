import express from 'express';
import fetch from 'node-fetch';
import { IEX_CLOUD } from '../constants';
import prisma from '../db';
import { FixMeLater } from '../types/index';

const router = express.Router();

router.post('/', async (req, res, next) => {
  const { symbol, name, uuid } = req.body;

  try {
    const stock = await prisma.stock.create({
      data: {
        symbol,
        name,

        user: {
          connect: {
            authProviderId: uuid,
          },
        },
      },
    });

    res.status(201).json(stock);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  const uuid = req.query.uuid as string;

  try {
    const watchlist = await prisma.stock.findMany({
      where: {
        type: 'WATCHLIST',
        user: {
          authProviderId: uuid,
        },
      },
    });

    const symbols = watchlist
      .map((stock: FixMeLater) => stock.symbol)
      .join(',');

    const url = `${IEX_CLOUD.BASE_URL}/stock/market/batch?symbols=${symbols}&types=quote&token=${IEX_CLOUD.API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // add the quote for each stock
    watchlist.forEach((stock: FixMeLater) => {
      const symbol = stock.symbol.toUpperCase();

      stock.latestPrice = data[symbol].quote.latestPrice;
      stock.change = data[symbol].quote.change;
      stock.volume = data[symbol].quote.volume;
      stock.latestVolume = data[symbol].quote.latestVolume;
      stock.changePercent = data[symbol].quote.changePercent;
    });

    res.json(watchlist);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  // const uuid = req.query.uuid;

  try {
    const stock = await prisma.stock.delete({ where: { id } });
    res.json(stock);
  } catch (err) {
    next(err);
  }
});

export default router;
