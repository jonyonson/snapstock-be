import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'development';

let envConfig;
if (stage === 'production') {
  envConfig = require('./production').default;
} else {
  envConfig = require('./development').default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 4000,
    secrets: {
      jwt: process.env.JWT_SECRET,
      dbUrl: process.env.DB_URL,
    },
  },
  envConfig,
);
