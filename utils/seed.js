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




  const thoughts = [];
  for (let i = 0; i < 10; i++) { // Create more thoughts than users for diversity
    const thoughtText = getRandomThoughts(1)[0]; // Assuming getRandomThoughts returns an array, get the first item
    const username = getRandomName();
    thoughts.push({ thoughtText, username });
  }

  await Thought.collection.insertMany(thoughts);

  const insertedThoughts = await Thought.find();

  const users = [];

  for (let i = 0; i < 5; i++) {
    const username = getRandomName();
    const email = getRandomEmail().replace('@', `${i}@`);
    const friends = [getRandomName(), getRandomName()];

    // This example randomly picks thoughts for each user.
    // Modify this logic as needed to fit your application's requirements.
    const userThoughts = insertedThoughts
      .filter(thought => thought.username === username)
      .map(thought => thought._id); // Assuming you want to store thought IDs in the user document

      
    users.push({
      username,
      email,
      thoughts: userThoughts, // Associate thoughts with the user
      friends,
    });
  }


  await User.collection.insertMany(users);

  console.table(thoughts);
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
