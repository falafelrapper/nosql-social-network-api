const connection = require('../config/connection');
const { User } = require('../models');
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


  for (let i = 0; i < 20; i++) {

    const thoughts = getRandomThoughts(2);

    const username = getRandomName();
    const email = getRandomEmail().replace('@', `${i}@`);
    const friends = getRandomName(2);

    users.push({
      username,
      email,
      thoughts,
      friends,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);


  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
