const dbConnect = require('../dbConnection.js');

const postPost = async(req, res) => {
    const client = await dbConnect();

    const postHTML = req.body.content;
    // console.log(postHTML)

    const randID = req.body.randID;
    // console.log(randID);

    const insertPosts = async(client, newPost) => {
        await client.db("user").collection("user_kusi_feed_post").insertOne(newPost);
    }
    
    try{
        const userNewPost = {
            userNewPost : postHTML,
            userId: (await req.user).id, 
            randID: randID,
            name: (await req.user).name,
            phone: (await req.user).phone,
            email: (await req.user).email,
            address: (await req.user).address
        }

        // console.log(userNewPost)
        await insertPosts(client, userNewPost);
        
        await client.close();
        console.log('new user posts uploaded to MongoDB successfully');

        res.status(200).json({ message: 'new posts updated successfully' });
    }
    catch(err){
        console.error('Error updating posts', err);
        res.status(500).json({ message: 'error updating new posts' });
        return;
    }
}

module.exports = postPost;