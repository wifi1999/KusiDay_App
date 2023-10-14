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
const profilePost = require('./Route/profilePost.js');
const profileGet = require('./Route/profileGet.js');
const kusiServer = require('./Route/kusiServer');
const kusiClient = require('./Route/kusiClient');
const postPost = require('./Route/postPost');
const getPost = require('./Route/getPost');
const deletePost = require('./Route/deletePost');
const dbConnect = require('./dbConnection.js');

const multer = require('multer');

// const storage = multer.memoryStorage()
// const upload = multer({ 
//     storage: storage,
//     limit: {fileSize: 1000 * 1024 * 1024}
// })

const upload = multer();
// new add..
const bodyParser = require('body-parser');

initializePassport(passport, getUserByEmail, getUserById); // passportConfiguration

app.set('view-engine', 'ejs'); // setting view-engine for Express to 'ejs', which is use dto render HTML page
app.use(express.urlencoded({ extended: false })); // Allows the application to access form data submitted in POST requests via req.body.
app.use(flash()); // Using flash middleware for displaying flash messages.
app.use(session({ secret: process.env.SESSION_SECRET,resave: false, saveUninitialized: false }));
app.use(passport.initialize()); // Initialize Passport.js to manage authentication
app.use(passport.session()); // Initialize Passport.js session handling
app.use(methodOverride('_method')); // Middleware to override HTTP methods based on the '_method' parameter in the query string.
app.use(express.text());
app.use(bodyParser.json({ limit: '300mb' }));
app.use(bodyParser.urlencoded({limit: '300mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/register', checkNotAuthenticated, registerGet);
app.post('/register', checkNotAuthenticated, registerPost);
app.get('/login', checkNotAuthenticated, loginGet);
app.post('/login', checkNotAuthenticated, loginPost);
app.get('/profile', checkAuthenticated, profileGet);
app.post('/profile', upload.single('avatar'), profilePost);
app.get('/', checkAuthenticated, homeGet);
app.get('/kusi-server', checkAuthenticated, kusiClient);
app.get('/kusi-client', checkAuthenticated, kusiServer);
app.post('/new-post', checkAuthenticated, postPost);
app.get('/getPosts', checkAuthenticated, getPost);
app.delete('/delete-post', checkAuthenticated, deletePost);
app.delete('/logout', logout);
app.get('/favicon.ico', (req, res) => {
    res.status(204)
})
app.listen(3000, () => console.log('Server listen on port 3000')); 


















