import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book, bookSchema} from './model/bookModel.js';
import bookRoute from './routes/bookRoutes.js';
import cros from "cors";

const app = express()
app.use(express.json());   //to recognize request body

app.use(cros())

app.use(
    cros({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.get("/",
    (request,response) => {
        response.status(234).send("Welcome Book store System");
    }
);

app.use('/books', bookRoute);

//Route for save a new book



mongoose
.connect(mongoDBURL)
.then(()=> {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`App is listent PORT ${PORT}`)
    });

}).catch((error) => {
    console.log(error);
})

