const usernames = [
  'vgd199',
  'falafelrapper',
  'bigThinker12345',
  'ADDMEFORHAPPYTHOUGHTS',
  'dril',
  'lernantino'
];

const emails = [
  'vgd199@gmail.com',
  'darlene58@yahoo.com',
  'thinkerguy123@hotmail.com',
  'onlyreacting99@mac.com',
  'xXnosqlguy03Xx@gmail.com',
  'reactman@gmail.com'
]

const thoughts = [
  'Decision Tracker',
  'Find My Phone',
  'Learn Piano',
  'Starbase Defender',
  'Tower Defense',
  'Monopoly Money Manager',
  'Movie trailers',
  'Hello world',
  'Stupid Social Media App',
  'Notes',
  'Messages',
  'Email',
  'Compass',
  'Firefox',
  'Running app',
  'Cooking app',
  'Poker',
  'Deliveries',
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomName = () =>
  getRandomArrItem(usernames);
  
const getRandomEmail = () =>
  getRandomArrItem(emails);

const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts)
    });
  }
  return results;
};


module.exports = { getRandomName, getRandomThoughts, getRandomEmail };
