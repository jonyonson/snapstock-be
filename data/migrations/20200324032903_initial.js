exports.up = async (knex) => {
  await knex.schema.createTable('users', (users) => {
    users.increments();
    users.string('email', 128).notNullable().unique();
    users.string('password', 128).notNullable();
  });

  await knex.schema.createTable('stocks', (table) => {
    table.increments('id');
    table.string('symbol').notNullable().unique();
    table.string('company_name');
    table.string('primary_exchange');
    table.string('image_url');
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
  await knex.schema.dropTableIfExists('stocks');
};
