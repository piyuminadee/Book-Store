import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book, bookSchema} from './model/bookModel.js'

const app = express()
app.use(express.json());   //to recognize request body

app.get("/",
    (request,response) => {
        response.status(234).send("Welcome Book store System");
    }
);

//Route for save a new book

app.post('/books', async (request, response) => {
    try{
        if(
           !request.body.title ||
           !request.body.author ||
           !request.body.publishYear
        ){
          return response.status(400).send({
            message: 'Send all required fields: title, author, publishYear',

          });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);    //save the book variable in the table
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//return all books

app.get("/books", async (request,response) =>{
   try {
       const books = await Book.find({});
    return response.status(201).json({
        count : books.length,
        data : books

    });
   } catch (error) {
    console.log(error.message);
    response.status(500).send({message : error.message});
    
   }
});

//return one book

app.get("/books/:id", async (request,response) =>{
    try {
        const {id} =request.params;   //the id that we use to search book
        const book = await Book.findById(id);
     return response.status(200).json(book);
    } catch (error) {
     console.log(error.message);
     response.status(500).send({message : error.message});
     
    }
 });

 app.delete("/books/:id",  async  (request,response) =>{
        const {id} =request.params;   //the id that we use to search book

        try {
            
            const book = await Book.findByIdAndDelete(id);
            if(!book) {
                return response.status(404).send({message: 'Book not found'});
            }
            return response.status(200).send({message : 'Book delet successfully'});
        } 
        catch (error) {
            return response.status(500).json({
                message: error.message
            });
        }
    });


app.put("/books/:id", async (request, response) => {

    try { 
        //Check all field satisfy
        if(!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields : title, author, publish year",
            });
        }
    const {id} = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if(!result) {
        return response.status(404).json({message : "Not found"})
    }
    return response.status(200).send({message : "successfully updated"})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message : error.message})
    }
})    

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

