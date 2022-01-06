const sequelize = require('../config/connection');
const seedUsers = require('./user');
const seedPosts = require('./post');
const seedComments = require('./comment');

async function seedAll() {
  await sequelize.sync({ force: true });
  console.log('\nseeding...');
  await seedUsers();
  await seedPosts();
  await seedComments();
}

seedAll().then(
  process.exit(0)
);