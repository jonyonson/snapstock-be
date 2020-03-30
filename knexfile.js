module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  // development: {
  //   client: 'sqlite3',
  //   useNullAsDefault: true,
  //   connection: {
  //     filename: './data/dev.sqlite3',
  //   },
  //   migrations: {
  //     directory: './data/migrations',
  //   },
  //   seeds: {
  //     directory: './data/seeds',
  //   },
  //   pool: {
  //     afterCreate: (conn, done) => {
  //       conn.run('PRAGMA foreign_keys = ON', done);
  //     },
  //   },
  // },
};
