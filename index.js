const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// middle war
app.use(cors());
app.use(express.json());

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
        const destinationCollection = database.collection('destinationrs');
        const ordersCollection = database.collection('orders');

        // insert destination
        app.post('/addDestination', async (req, res) => {
            const destination = req.body;
            const result = await destinationCollection.insertOne(destination);
            res.json(result);
        })

        // read destination
        app.get('/destination', async (req, res) => {
            const result = await destinationCollection.find({}).toArray();
            res.send(result)
        })

        // insert destination
        app.post('/addOrders', async (req, res) => {
            const orders = req.body;
            const result = await ordersCollection.insertOne(orders);
            console.log(result);
            res.json(result);
        })

        // read manageOrders
        app.get('/manageOrders', async (req, res) => {
            const result = await ordersCollection.find({}).toArray();
            res.send(result)
        })

        // read myOrders
        app.get('/MyOrders/:email', async (req, res) => {
            const email = req.params.email;
            const result = await ordersCollection.find({ email: email }).toArray();
            res.send(result)
        })

        // delete myOrder
        app.delete('/myOrder/order/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await ordersCollection.deleteOne(query);
            res.json(result);
        })


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

