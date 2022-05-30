require('dotenv').config();
const express = require('express')

const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3k7kd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();
        console.log('iam momin')
        const serviceCollection = client.db('manufacture').collection('services');
        const placeOrderCollection = client.db('placeOrder').collection('services');
        const reviewCollection = client.db('best_tools').collection('reviews');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const sevices = await cursor.toArray();
            res.send(sevices);
        })

        // review post 

        app.post('/review', async (req, res) => {
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
        });

        app.get('/review', async (req, res) => {
            const reviews = await reviewCollection.find().toArray();
            res.send(reviews);
        });

        app.post('/placeOrder', async (req, res) => {
            const placeOrder = req.body;
            const result = await placeOrderCollection.insertOne(placeOrder);
            res.send(result);
        })


        // git add new project

    }
    finally {

    }

}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World! menufacture app ')
})

app.listen(port, () => {
    console.log(`menufacture app listening on port ${port}`)
})








