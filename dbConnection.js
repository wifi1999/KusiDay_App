const { MongoClient } = require('mongodb'); 

async function dbConnect(){
    const client = new MongoClient(process.env.DB_URL);

    try{
        await client.connect();
        console.log("Connected to MongoDB");
        return client;
    } 
    catch(err){
        console.error("Error connecting to MongoDB: ", err);
        throw err;
    }
}
module.exports = dbConnect;