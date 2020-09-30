
exports.up = function(knex) {
  return knex.schema
    .createTable('user', function (table) {
      table.increments('id');
      table.string('username', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('passwordHash', 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("user");
};
