
exports.up = function(knex) {
  return knex.schema
    .createTable('user', function (table) {
      table.increments('id');
      table.string('username', 256).notNullable().unique();
      table.string('email', 256).notNullable().unique();
      table.string('passwordHash', 70).notNullable();
      table.text('bio');
      table.string('profilePictureURL', 1024);
      table.timestamps(true, true);
      table.boolean('isEmailConfirmed');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("user");
};
