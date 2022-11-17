import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { FixMeLater } from '../types/index';
import config from '../config';

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

export const comparePasswords = (password: string, hash: string) =>
  bcrypt.compare(password, hash);

export const generateToken = (user: FixMeLater) => {
  const { id, email } = user;
  const token = jwt.sign({ id, email }, config.secrets.jwt);
  return token;
};
