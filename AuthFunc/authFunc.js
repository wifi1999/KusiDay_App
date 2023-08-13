const checkAuthenticated = async (req, res, next) => req.isAuthenticated() ? next() : res.redirect('./login');
const checkNotAuthenticated = async (req, res, next) =>  req.isAuthenticated() ? res.redirect('/') : next();

module.exports = { checkAuthenticated, checkNotAuthenticated };