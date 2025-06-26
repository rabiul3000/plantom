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

function connectToDB() {
	return new Promise((resolve, reject) => {
		if (db) {
			return resolve(db);
		}

		client.connect()
			.then(() => {
				db = client.db('plantium');
				console.log('Connected to MongoDB');
				resolve(db);
			})
			.catch(err => {
				console.error('MongoDB connection error:', err);
				reject(err);
			});
	});
}

function getCollection(collectionName) {
	if (!db) {
		throw new Error('DB not initialized. Call connectToDB() first.');
	}
	return db.collection(collectionName);
}

module.exports = { connectToDB, getCollection };
