const dbConnect = require('../dbConnection.js');

const profilePost = async (req, res) => {
    if (req.isAuthenticated()) {
      try { // add to database
          // console.log(req.body);
          const insertAvatar = async (client, newAvatar) => { 
              await client.db("user").collection("user_avatar").insertOne(newAvatar);
          };
          
          const client = await dbConnect();
          const newAvatar = { 
              userId: (await req.user).id, 
              data: req.file.buffer, 
              contentType: req.file.mimetype,
              name: req.body.name,
              phone: req.body.phone,
              email: req.body.email,
              address: req.body.address
          };
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
  }

  module.exports = profilePost;