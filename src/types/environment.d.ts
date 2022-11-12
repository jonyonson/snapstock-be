import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: Secret;
      DATABASE_URL: string;
      // PORT?: string;
    }
  }
}

export {};
