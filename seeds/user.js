const { User } = require('../models');

const userdata = [
  {
    username:'User01',
    password: 'Password123'
  },
  {
    username:'User03',
    password: 'Password123'
  },
  {
    username:'User04',
    password: 'Password123'
  },
  {
    username:'User05',
    password: 'Password123'
  },
  {
    username:'User06',
    password: 'Password123'
  },
  {
    username:'User07',
    password: 'Password123'
  },
  {
    username:'User08',
    password: 'Password123'
  },
  {
    username:'User09',
    password: 'Password123'
  },
  {
    username:'User10',
    password: 'Password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;