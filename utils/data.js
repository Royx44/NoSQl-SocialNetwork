const connection = require('../config/connection');
const User = require('../models/user');
const Thought = require('../models/thought');
const { userdata, thoughtdata } = require('./data');

console.time('seeding');

connection.once('open', async () => {
    await User.deleteMany();
    await Thought.deleteMany();

    for (let i = 0; i < userdata.length; i++) {
        let user = await User.create(userdata[i]);
        let thought = await Thought.create(thoughtdata[i]);

        await User.findByIdAndUpdate(
            user._id,
            {
                $addToSet: {
                    thoughts: thought._id
                }
            },
            {
                new: true
            }
        );

        console.log(user, thought);
    }

    console.timeEnd('seeding complete 🌱');
    process.exit(0);
});
