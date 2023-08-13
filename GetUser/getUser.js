const dbConnect = require('../dbConnection.js');

let client;
(async () => {client = await dbConnect()})();

// const getUserByEmail = email => users.find(user => user.email === email);
// const getUserById = id => users.find(user => user.id === id);

const getUserByEmail = async (email) => await client.db("user").collection('user_registration_login').findOne({email: email});
const getUserById = async (id) => await client.db("user").collection('user_registration_login').findOne({id: id});

module.exports = { getUserByEmail, getUserById };