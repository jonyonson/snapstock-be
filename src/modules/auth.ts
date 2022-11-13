import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { FixMeLater } from '../types/index';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const comparePasswords = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const generateToken = (user: FixMeLater) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
  );
  return token;
};
