const connection = require('../config/connection');
const { User, Thoughts, Reaction } = require('../models');
const { userData } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Thoughts.deleteMany({});

    await User.insertMany(userData);

    console.table(userData)
})