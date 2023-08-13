const passport = require('passport'); // Authentication middleware for Node.js

const loginPost = passport.authenticate('local', { // handle login form submission (passport local strategy) 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
});

module.exports = loginPost;