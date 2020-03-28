exports.up = async (knex) => {
  await knex.schema.createTable('users', (users) => {
    users.increments();
    users.string('email', 128).notNullable().unique();
    users.string('password', 128).notNullable();
    users.boolean('email_verified').defaultTo(false);
    users.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('stocks', (stocks) => {
    stocks.increments('id');
    stocks.string('symbol').notNullable().unique();
    stocks.string('company_name').notNullable();
    stocks.string('primary_exchange');
    stocks.string('image_url');
  });

  // await knex.schema.createTable('watchlist', (watchlist) => {
  //   watchlist.increments('id');
  // });

  // await knex.schema.createTable('portfolio', (portfolio) => {
  //   portfolio.increments('id')
  // });
};

exports.down = async (knex) => {
  // await knex.schema.dropTableIfExists('watchlist');
  // await knex.schema.dropTableIfExists('portfolio');
  await knex.schema.dropTableIfExists('stocks');
  await knex.schema.dropTableIfExists('users');
};
