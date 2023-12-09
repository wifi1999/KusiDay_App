const dbConnect = require('../dbConnection.js');

const getPost = async(req, res) => {
    const client = await dbConnect()
    const getAllPosts = async(client) => {
        return await client.db("user").collection("user_kusi_feed_post").find({}).toArray()
    };

    try{
        const posts = await getAllPosts(client)

        // console.log(posts)
        await client.close()
        console.log("all user posts retrieved successfully")
        res.status(200).json({ posts: posts })
    }
    catch(err){
        console.error('Error retrieving posts', err)
        res.status(500).json({error: 'Error retrieving posts'})
    }
};

module.exports = getPost;