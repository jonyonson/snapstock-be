exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('email', 128).notNullable().unique();
    table.string('password', 128).notNullable();
    table.boolean('email_verified').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('stocks', (table) => {
    table.increments();
    table.string('symbol').notNullable().unique();
    table.string('company_name').notNullable();
    table.string('primary_exchange');
    table.string('image_url');
    table.string('company_description');
    table.string('company_website');
  });

  await knex.schema.createTable('watchlist', (table) => {
    table.increments();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('watchlist_stock_id')
      .notNullable()
      .references('id')
      .inTable('stocks')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    // table.primary(['user_id', 'watchlist_stock_id']);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('watchlist');
  await knex.schema.dropTableIfExists('stocks');
  await knex.schema.dropTableIfExists('users');
};
