import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.DATABASE_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    },
})

try {
    await client.connect()
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB");
} catch (err) {
    console.log(err);
}

let db = client.db("employment")
export default db;
