const dbConnect = require('../dbConnection.js');

const kusiServer = async (req, res) => {
    try{
        const client = await dbConnect();
        const fetchUser = await client.db("user").collection('user_avatar').findOne({userId: (await req.user).id});
        res.render('kusi-server.ejs', { avatar: fetchUser });
    }  
    catch(err){
        console.error(err);
    }
};

module.exports = kusiServer;