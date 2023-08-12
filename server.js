const express = require('express'); // Express Web framework for Node.js
const dotenvConfig = require('dotenv').config(); 
const dbConnect = require('./dbConnection');
const initializePassport = require('./passport-config'); 
const bcrypt = require('bcrypt'); // Library for hashing password
const passport = require('passport'); // Authentication middleware for Node.js
const flash = require('express-flash'); // Flash message middleware for Node.js
const session = require('express-session'); // Session middleware for Node.js
const methodOverride = require('method-override'); // Middleware to override HTTP request

const registerGet = require('./Route/registerGet.js');
const registerPost = require('./Route/registerPost.js');

// const users = [];
let client; (async () => {client = await dbConnect();})(); // dbConnection


// const getUserByEmail = email => users.find(user => user.email === email);
// const getUserById = id => users.find(user => user.id === id);
// const insertUser = async (client, newUser) => { const result = await client.db("user").collection("user_registration_login").insertOne(newUser);};
const getUserByEmail = async (email) => await client.db("user").collection('user_registration_login').findOne({email: email});
const getUserById = async (id) => await client.db("user").collection('user_registration_login').findOne({id: id});

const checkAuthenticated = async (req, res, next) => req.isAuthenticated() ? next() : res.redirect('./login');
const checkNotAuthenticated = async (req, res, next) =>  req.isAuthenticated() ? res.redirect('/') : next();


initializePassport(passport, getUserByEmail, getUserById); // passportConfiguration

const app = express(); // app instance for routes definition

app.set('view-engine', 'ejs'); // setting view-engine for Express to 'ejs', which is use dto render HTML page
app.use(express.urlencoded({ extended: false })); // Allows the application to access form data submitted in POST requests via req.body.
app.use(flash()); // Using flash middleware for displaying flash messages.
app.use(session({ secret: process.env.SESSION_SECRET,resave: false, saveUninitialized: false }));
app.use(passport.initialize()); // Initialize Passport.js to manage authentication
app.use(passport.session()); // Initialize Passport.js session handling
app.use(methodOverride('_method')); // Middleware to override HTTP methods based on the '_method' parameter in the query string.

app.get('/', checkAuthenticated,  async (req, res) => { // home page, passes user's name to the view
    res.render('index.ejs', { name: (await req.user).name });
});

// app.get('/register', checkNotAuthenticated, (req, res) => { // register page, register.ejs view if user not authenticated
//     res.render('register.ejs');
// });

app.get('/register', checkNotAuthenticated, registerGet);

// app.post('/register', checkNotAuthenticated, async (req, res) => { // handle register form submission. Add user to database
//     try{
//         (async () => {client = await dbConnect();})();
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const newUser = { id: Date.now().toString(), name: req.body.name, email: req.body.email, password: hashedPassword };
//         await insertUser(client, newUser);
//         // users.push(newUser);
        
//         await client.close();
//         res.redirect('/login'); // Redirect to the login page after successful registration.
//     }
//     catch(err){
//         console.error('Error registering user:', err);
//         res.redirect('/register'); // Redirect to the register page on error (e.g., hashing failure).
//     }
// });




app.post('/register', checkNotAuthenticated, registerPost);

app.get('/login', checkNotAuthenticated, (req, res) => { // login page, login.ejs view if user not authenticated
    res.render('login.ejs');
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', { // handle login form submission (passport local strategy) 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

app.delete('/logout', (req, res) => { // Handling the logout request. Logs out the user and redirects to the login page.
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.redirect('/');
        }
        res.redirect('/login');
    });
});

app.get('/profile', checkAuthenticated, async (req, res) => {
    res.render('profile.ejs', { name: (await req.user).name });
});

app.listen(3000, () => console.log('Server listen on port 3000')); 














