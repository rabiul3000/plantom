# Plantium API Server

This is the backend API server for the Plantium project — a plant management system built with Node.js, Express, and MongoDB.

## Live Demo

You can try the frontend and test the live API at:

[https://plantor.vercel.app/](https://plantor.vercel.app/)

---

## Features

- RESTful API endpoints to manage plants data
- Connects securely to MongoDB Atlas using environment variables
- Supports CORS, request logging, and JSON request bodies
- Built with Express.js and MongoDB native driver
- Designed for deployment on Vercel as a custom Node server

---

## API Endpoints

| Method | Endpoint              | Description                        |
|--------|-----------------------|----------------------------------|
| GET    | `/api/plants`         | Get all plants                   |
| POST   | `/api/plant`          | Add a new plant                 |
| GET    | `/api/last_plants`    | Get all plants (same as `/plants`)|
| GET    | `/api/last_plants/:email` | Get last 6 plants of a user by email |
| GET    | `/api/my_plants/:email` | Get all plants of a user by email |
| PUT    | `/api/update_plant/:id` | Update a plant by its ID        |
| GET    | `/`                   | Server status check             |

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rabiul3000/plantom.git
cd plantium-api
