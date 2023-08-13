const dbConnect = require('../dbConnection.js');
const bcrypt = require('bcrypt');

const insertUser = async (client, newUser) => { 
    await client.db("user").collection("user_registration_login").insertOne(newUser);
};

const registerPost = async (req, res) => { // handle register form submission. Add user to database
    try{
        const client = await dbConnect();
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = { id: Date.now().toString(), name: req.body.name, email: req.body.email, password: hashedPassword };
        await insertUser(client, newUser);
        // users.push(newUser);
        
        await client.close();
        res.redirect('/login'); // Redirect to the login page after successful registration.
    }
    catch(err){
        console.error('Error registering user:', err);
        res.redirect('/register'); // Redirect to the register page on error (e.g., hashing failure).
    }
}

module.exports = registerPost;