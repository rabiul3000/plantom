const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();

const { ObjectId } = require('mongodb');
const { connectToDB, getCollection } = require('./db'); // Import db logic

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	console.log('hello world');
	res.status(200).json({ message: 'The server is running' });
});

async function initRoutes() {
	await connectToDB();

	app.post('/api/plant', async (req, res) => {
		const plant = req.body;
		const plants = getCollection('plants');
		const result = await plants.insertOne(plant);
		res.status(200).json({ result });
	});

	app.get('/api/plants', async (req, res) => {
		const plants = getCollection('plants');
		const result = await plants.find().toArray();
		res.status(200).json({ result });
	});

	app.get('/api/last_plants', async (req, res) => {
		const plants = getCollection('plants');
		const result = await plants.find().toArray();
		res.status(200).json({ result });
	});

	app.get('/api/last_plants/:email', async (req, res) => {
		const plants = getCollection('plants');
		const result = await plants
			.find({ email: req.params.email })
			.limit(6)
			.toArray();
		res.status(200).json({ myPlants: result });
	});

	app.get('/api/my_plants/:email', async (req, res) => {
		const plants = getCollection('plants');
		const result = await plants.find({ email: req.params.email }).toArray();
		res.status(200).json({ myPlants: result });
	});

	app.put('/api/update_plant/:id', async (req, res) => {
		const { id } = req.params;
		const updateData = req.body;
		const plants = getCollection('plants');
		const result = await plants.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: updateData }
		);
		res.status(200).json({ result });
	});
}

initRoutes().catch(console.error);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
