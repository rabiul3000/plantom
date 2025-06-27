const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const { ObjectId } = require("mongodb");
const { connectToDB, getCollection } = require("./db"); // Import db logic

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "https://plantium-d465f.web.app"],
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  console.log("hello world");
  res.status(200).json({ message: "The server is running" });
});

connectToDB()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });

    // POST /api/plant
    app.post("/api/plant", (req, res) => {
      const plant = req.body;
      const plants = getCollection("plants");
      plants
        .insertOne(plant)
        .then((result) => res.status(200).json({ result }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    app.get("/api/plant/:id", (req, res) => {
      const id = req.params.id;
      const plants = getCollection("plants");

      try {
        plants
          .findOne({ _id: new ObjectId(id) })
          .then((plant) => {
            if (!plant) {
              return res.status(404).json({ error: "Plant not found" });
            }
            res.status(200).json(plant);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } catch (err) {
        // In case ObjectId fails (invalid format)
        res.status(400).json({ error: "Invalid plant ID" });
      }
    });

    // GET /api/plants
    app.get("/api/plants", (req, res) => {
      const plants = getCollection("plants");
      plants
        .find()
        .toArray()
        .then((result) => {
          return res.status(200).json(result);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    });

    // GET /api/last_plants
    app.get("/api/last_plants", (req, res) => {
      const plants = getCollection("plants");
      plants
        .find()
        .toArray()
        .then((result) => res.status(200).json({ result }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    // GET /api/last_plants/:email
    app.get("/api/last_plants/:email", (req, res) => {
      const email = req.params.email;
      const plants = getCollection("plants");
      plants
        .find({ email })
        .limit(6)
        .toArray()
        .then((myPlants) => res.status(200).json({ myPlants }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    // GET /api/my_plants/:email
    app.get("/api/my_plants/:email", (req, res) => {
      const email = req.params.email;
      const plants = getCollection("plants");
      plants
        .find({ email })
        .toArray()
        .then((myPlants) => res.status(200).json({ myPlants }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });

    // PUT /api/update_plant/:id
    app.put("/api/update_plant/:id", (req, res) => {
      const { id } = req.params;
      const updateData = req.body;
      const plants = getCollection("plants");

      plants
        .updateOne({ _id: new ObjectId(id) }, { $set: updateData })
        .then((result) => res.status(200).json({ result }))
        .catch((err) => res.status(500).json({ error: err.message }));
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1); // Exit if DB connection fails
  });
