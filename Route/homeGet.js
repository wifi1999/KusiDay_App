const dbConnect = require('../dbConnection.js');

const homeGet = async (req, res) => { 
    try{
        const client = await dbConnect();
        const fetchUser = await client.db("user").collection('user_avatar').findOne({userId: (await req.user).id});
        // console.log(fetchUser);
        res.render('index.ejs', { avatar: fetchUser });
    }  
    catch(err){
        console.error(err);
    }
};

module.exports = homeGet;