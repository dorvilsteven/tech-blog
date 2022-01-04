const { User } = require('../models');

const userdata = [
  {
    username:'RandomGeneratedUser01',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser03',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser04',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser05',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser06',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser07',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser08',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser09',
    password: 'RandomGeneratedPassword123'
  },
  {
    username:'RandomGeneratedUser10',
    password: 'RandomGeneratedPassword123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;