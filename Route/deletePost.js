const dbConnect = require('../dbConnection.js');

const deletePost = async(req, res) => {
    const client = await dbConnect();
    const deleteID = req.body.deleteID;
    // console.log(deleteID);

    const removePost = async (client, deleteID) => {
        try{
            // console.log(deleteID);
            const deletePost = await client.db("user").collection("user_kusi_feed_post").deleteOne({ randID: deleteID });
            if(deletePost.deletedCount === 1){
                res.status(200).json({ message: 'Post deleted successfully' });
            }
            else{
                res.status(404).json({ message: 'Post not found' });
            }
        }
        catch(err){
            console.error('Error deleting post', err);
            res.status(500).json('Server error');
        }
        finally{
            await client.close();
        }
    };

    await removePost(client, deleteID);
};

module.exports = deletePost;