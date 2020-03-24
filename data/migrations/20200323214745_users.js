exports.up = function(knex) {
  return knex.schema.createTable('users', (t) => {
    t.increments();
    t.string('email')
      .notNullable()
      .unique();
    t.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
