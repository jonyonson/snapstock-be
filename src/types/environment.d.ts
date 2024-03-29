declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      JWT_SECRET: string;
      DATABASE_URL: string;
      IEX_CLOUD_API_KEY: string;
      IEX_CLOUD_BASE_URL: string;
      NEWS_API_KEY: string;
    }
  }
}

export {};
