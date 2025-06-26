// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://mdrabiul:${process.env.DB_PASSWORD}@cluster0.ds2zjwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

let db;

async function connectToDB() {
	if (!db) {
		await client.connect();
		db = client.db('plantium');
		console.log('Connected to MongoDB');
	}
	return db;
}

function getCollection(collectionName) {
	if (!db) {
		throw new Error('DB not initialized. Call connectToDB() first.');
	}
	return db.collection(collectionName);
}

module.exports = { connectToDB, getCollection };
