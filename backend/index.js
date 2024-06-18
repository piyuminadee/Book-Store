import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from './routes/bookRoutes.js';
import cors from "cors";

const app = express();
app.use(express.json()); // to recognize request body

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (request, response) => {
  response.status(234).send("Welcome to Book Store System");
});

app.use('/books', bookRoute);

mongoose
  .connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
