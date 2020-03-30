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
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('stocks');
  await knex.schema.dropTableIfExists('users');
};
