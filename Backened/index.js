import express from "express";
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js'
import booksRoute from './Routes/bookRoutes.js'

// define the variable
const app = express(); 

// Middleware for parising request body
app.use(express.json());
 
// app is http method
// it is used to defined a route handler for HTTP GET Request to the root path '/' of your web server
// callback function in that function request and response


// GET-Method
app.get('/books', async (request, response) =>
{
  try{
    const books = await Book.find({});

    return response.status(200).json(
      {
        count: books.length,
        data:books
      }
    )
  }
  catch (error)
  {
    console.log(error.message);
    response.status(500).send({message: error,message});
  }
});
  

// Route for get one book from db by Id
app.get('/', async (request, response) =>
{
   console.log(request);
   return response.status(234).send('Welcome To Mern Stack Project');
});
    // Node.js + Express.js server response
    // response: obj use to dsend data back to the cilent
    // satust:234 is not standard code 
    // 234 it is unusual and in real world scenarios
    

// Route for Save a new Book 
// callback function

app.use('/books', booksRoute);


mongoose.connect(mongoDBURL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () =>
    {
      console.log("App is listening to port: $(PORT)");
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:", error);
  });
