
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert([
        {
          username: 'Fredestrik', 
          email:"f.lang@hotmail.fr", 
          passwordHash:"$2b$10$WTkthuY29thyoU8MIqK/hukQvu982eBL.h78X/B62G.ndVvORCLkK",
          bio: "TypeScript Developer",
          profilePictureURL: "https://fredericlang.com/fredericlang.jpg",
          isEmailConfirmed : true
        },
      ]);
    });
};
