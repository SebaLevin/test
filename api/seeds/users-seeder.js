const User = require('../models/User');
const faker = require('faker');

const seedUsers = async () => {
    try {
        const users = [];
        const quantity = 10;
        for(let i = 0; i < quantity; i++) {
            users.push(
                new User({
                    name: faker.name.firstName(),
                    email: faker.internet.email(),
                    password: faker.internet.password()
                })
            );
        }
        users.map(user => {
            User.create(user)
        })
    }
    catch (error){
        console.log(error);
    }
};

module.exports = seedUsers;