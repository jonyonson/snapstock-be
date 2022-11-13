import { Secret } from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: Secret;
      DATABASE_URL: string;
      IEX_CLOUD_API_KEY: string;
      IEX_CLOUD_BASE_URL: string;
      IEX_CLOUD_SECRET: string;
    }
  }
}

export {};
