const express = require('express'); 
const app = express(); 
const dotenvConfig = require('dotenv').config(); 
const passport = require('passport'); 
const flash = require('express-flash'); 
const session = require('express-session'); 
const methodOverride = require('method-override'); 
const initializePassport = require('./passport-config'); 
const {checkAuthenticated, checkNotAuthenticated} = require('./AuthFunc/authFunc.js');
const {getUserByEmail, getUserById} = require('./GetUser/getUser.js');
const registerGet = require('./Route/registerGet.js');
const registerPost = require('./Route/registerPost.js');
const homeGet = require('./Route/homeGet.js');
const loginGet = require('./Route/loginGet.js');
const loginPost = require('./Route/loginPost.js');
const logout = require('./Route/logout.js');

const dbConnect = require('./dbConnection.js');


initializePassport(passport, getUserByEmail, getUserById); // passportConfiguration

app.set('view-engine', 'ejs'); // setting view-engine for Express to 'ejs', which is use dto render HTML page
app.use(express.urlencoded({ extended: false })); // Allows the application to access form data submitted in POST requests via req.body.
app.use(flash()); // Using flash middleware for displaying flash messages.
app.use(session({ secret: process.env.SESSION_SECRET,resave: false, saveUninitialized: false }));
app.use(passport.initialize()); // Initialize Passport.js to manage authentication
app.use(passport.session()); // Initialize Passport.js session handling
app.use(methodOverride('_method')); // Middleware to override HTTP methods based on the '_method' parameter in the query string.


app.get('/register', checkNotAuthenticated, registerGet);
app.post('/register', checkNotAuthenticated, registerPost);
app.get('/login', checkNotAuthenticated, loginGet);
app.post('/login', checkNotAuthenticated, loginPost);
app.get('/', checkAuthenticated, homeGet);
app.delete('/logout', logout);

const multer  = require('multer');
const upload = multer();

app.post('/profile', upload.single('avatar'), async (req, res) => {
  if (req.isAuthenticated()) {
    try { // add to database
        const insertAvatar = async (client, newAvatar) => { 
            await client.db("user").collection("user_avatar").insertOne(newAvatar);
        };
        
        const client = await dbConnect();
        const newAvatar = { userId: (await req.user).id, data: req.file.buffer, contentType: req.file.mimetype };
        await insertAvatar(client, newAvatar);
        await client.close();

        console.log('Avatar uploaded to MongoDB successfully');

        res.redirect('/profile');
    } 
    catch (error) {
        console.error('Error uploading avatar:', error);
        res.redirect('/profile');
    }
  } 
  else {
    res.redirect('/login');
  }
});

app.get('/profile', checkAuthenticated, async (req, res) => {
    try{
        const client = await dbConnect();
        const fetchUser = await client.db("user").collection('user_avatar').findOne({userId: (await req.user).id});
        res.render('profile.ejs', {avatar: fetchUser});
    }
    catch(err){
        console.error(err);
    }
});


app.listen(3000, () => console.log('Server listen on port 3000')); 




















