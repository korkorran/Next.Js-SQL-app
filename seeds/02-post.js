
exports.seed = function(knex) {
      return knex('post').insert([
        {
          author: 1, 
          content:"This is a post.", 
        },
      ]);
};
