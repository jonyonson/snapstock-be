exports.up = async (knex) => {
  await knex.schema.createTable('users', (t) => {
    t.increments();
    t.string('uuid', 128).notNullable().unique();
    t.string('email', 128).notNullable().unique();
    t.boolean('email_verified').defaultTo(false);
    t.string('display_name', 128);
    t.string('photo_url', 128);
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
    t.string('user_id')
      .notNullable()
      .references('uuid')
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
