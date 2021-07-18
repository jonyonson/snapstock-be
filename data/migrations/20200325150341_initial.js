exports.up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.increments();
    t.string('email', 128).notNullable().unique();
    t.string('password', 128).notNullable();
    t.boolean('email_verified').defaultTo(false);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('stocks', (t) => {
    t.increments();
    t.string('symbol').notNullable().unique();
    t.string('company_name').notNullable();
    t.string('primary_exchange');
    t.string('image_url');
    t.string('company_description');
    t.string('company_website');
  });

  await knex.schema.createTable('watchlist', (t) => {
    t.increments();
    t.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    t.string('symbol').notNullable().unique();
    t.string('company_name').notNullable();
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('watchlist');
  await knex.schema.dropTableIfExists('stocks');
  await knex.schema.dropTableIfExists('users');
};
