const localStrategy = require('passport-local').Strategy; // Import the Strategy class from 'passport-local' module
const bcrypt = require('bcrypt'); // Import the bcrypt module for password hashing and comparison

function initialize(passport, getUserByEmail, getUserById){ // Define the function used for user authentication during the login process
    const authenticateUser = async (email, password, done)  => { // email, password provided by user during log in process, done call back
        try {
            const user = await getUserByEmail(email);
            
            return !user 
            ? done(null, false, { message: 'No user with that email' }) 
            : await bcrypt.compare(password, user.password) 
            ? done(null, user) 
            : done(null, false, { message: 'Password incorrect' });      
        } 
        catch (err) {
            return done(err);
        }
    }
    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser)); // Specifies username field for authentication to 'email' 
    passport.serializeUser((user, done) => done(null, user.id)); // Serialize the user's ID to the session
    passport.deserializeUser((id, done) => done(null, getUserById(id))); // Deserialize user from user's ID
}
module.exports = initialize;