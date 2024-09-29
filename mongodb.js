const { MongoClient } = require("express")

async function connectMongoDB() {
    const uri = "mongodb://localhost:27017"
    const client = new MongoClient()
    try {
        await client.connect()
        console.log("Connected to MongoDB");
        const db = client.db('testdb')
        return db
    } catch (err){
        console.error("Error connecting to MongoDB");
    }
}