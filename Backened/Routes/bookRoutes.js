import express from "express";
const router = express.Router();
import { Book } from './models/bookModel.js'

// define the variable
const app = express(); 

// Middleware for parising request body
app.use(express.json());
 
// app is http method
// it is used to defined a route handler for HTTP GET Request to the root path '/' of your web server
// callback function in that function request and response


// GET-Method
router.get('/', async (request, response) =>
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
router.get('/books/:id', async (request, response) =>
{
  try{

   const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book)
  }
  catch (error)
  {
    console.log(error.message);
    response.status(500).send({message: error,message});
  }
});
    // Node.js + Express.js server response
    // response: obj use to dsend data back to the cilent
    // satust:234 is not standard code 
    // 234 it is unusual and in real world scenarios
    // return response.status(234).send('Welcome To Mern Stack Project');


// Route for Save a new Book 
// callback function


// post method
router.post('/', async (request, response) =>
{
   try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, author, publishYear'
      });
    }
   
      const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
  
    };
    const book = await Book.create(newBook);

    return response.status(201).send(book);
   } catch (error)
   {
    console.log(error.message);
    response.status(500).send({ message: error.message});
   }
}
);


// Route for Update a book
 app.put('/books/:id', async (request, response) =>
 {
  try {
    if(
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send
      ({
        message: 'Send all required fields: title,author, publishYear',
      })

      }
      const { id } = request.params

      const result = await Book.findByIdAndUpdate(id, request.body);
  
  if (!result)
  {
    return response.status(404).json({ message: 'Book not Found'});
  }
  return response.status(200).send({message: 'Book updated successfully'});
  }
  catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});

  }
 }
)

// Route for delete a book
router.delete('/:id', async (request, response) =>
{
  try {
    const { id } = request.params

    const result = await Book.findByIdAndDelete(id);

    if (!result)
    {
      return response.status(404).json({ message: 'Book not Found'});
    }

    return response.status(200).json({message: 'Book deleted successfully' });

  } catch (error) 
  {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
