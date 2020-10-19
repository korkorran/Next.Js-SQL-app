
exports.up = function(knex) {
  return knex.schema
    .createTable('post', function (table) {
      table.increments('id');
      table.text('content');
      table.integer('author').unsigned().notNullable();
      table.timestamps(true, true);

      table.foreign('author').references('id').inTable('user');
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("post");
};

