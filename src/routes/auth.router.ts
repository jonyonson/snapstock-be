import express from 'express';
import prisma from '../db';
import { generateToken } from '../modules/auth';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    // const hash = await hashPassword(req.body.password);
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        emailVerified: req.body.emailVerified,
        image: req.body.image || null,
        name: req.body.name || null,
        authProviderId: req.body.authProviderId,
        // password: hash,
      },
    });

    const token = generateToken(user);
    const { id, email } = user;

    res.status(201).json({ id, email, token });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // const isValid = await comparePasswords(req.body.password, user.password);

    // if (!isValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    const token = generateToken(user);
    const { id, email } = user;

    res.json({ id, email, token });
  } catch (err) {
    next(err);
  }
});

export default router;
