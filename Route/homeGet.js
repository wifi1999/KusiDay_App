const homeGet = async (req, res) => { 
    res.render('index.ejs', { name: (await req.user).name });
}

module.exports = homeGet;