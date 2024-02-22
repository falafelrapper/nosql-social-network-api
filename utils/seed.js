const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomThoughts, getRandomEmail } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.dropCollection('thoughts');
    }

    let usersCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (usersCheck.length) {
      await connection.dropCollection('users');
    }



  const users = [];


  for (let i = 0; i < 5; i++) {

    
    const username = getRandomName();
    const email = getRandomEmail().replace('@', `${i}@`);
    const thoughts = getRandomThoughts(2);
    const friends = getRandomName(2);

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  await User.collection.insertMany(users);


  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
