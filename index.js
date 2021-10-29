const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// database connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6soco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // connect database
        await client.connect();
        console.log('database connect success');

        // database and collection
        const database = client.db('travelo_db');
        const packagesCollection = database.collection('packages');

        // create a document to insert
        const doc = {
            name: 'Md Rejaul karim',
            email: 'reja@gmail.com',
            role: 'generale meber'
        }
        const result = await packagesCollection.insertOne(doc);
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


// ------------------home-------------------------
app.get('/', (req, res) => {
    res.send('Running travelo server')
})
app.listen(port, () => {
    console.log(`Travelo listening at http://localhost:${port}`)
})
// ------------------home-------------------------

