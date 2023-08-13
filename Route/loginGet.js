const loginGet = (req, res) => { // login page, login.ejs view if user not authenticated
    res.render('login.ejs');
}

module.exports = loginGet;