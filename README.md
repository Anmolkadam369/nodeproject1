# nodeproject

Book Management API

This is a RESTful API for managing books. It allows users to perform CRUD (Create, Read, Update, Delete) operations on books, storing the data in a MongoDB database.

------------------------------------------------------------------------------------------------------------------


API Endpoints

Add a New Book
URL: /createNewBook
Method: POST
Request Body :
{
"title": "The Book Title",
"author": "Author Name",
"summary": "Book summary or description"
}

Response: The created book object.

------------------------------------------------------------------------------------------------------------------
 

View a List of All Books
URL: /getData
Method: GET
Response: An array of book objects.

------------------------------------------------------------------------------------------------------------------

View Details of a Specific Book by ID
 URL: /getParticularBook/:id
  Method: GET
 Response: The book object with the specified ID.

------------------------------------------------------------------------------------------------------------------

Update a Book's Details
URL:/updateBook/:id
  Method: PUT
Request Body: 
{ "title": "Updated Book Title", 
"author": "Updated Author Name", 
"summary": "Updated book summary or description"
 }
Response: The updated book object.

  ------------------------------------------------------------------------------------------------------------------


Delete a Book 
URL: /deleteBook/:id 
Method: DELETE 
Response: The deleted book object.
Setting Up and Running the Application Locally Follow these steps to set up and run the application locally:

1 Clone the repository: git clone https://github.com/Anmolkadam369/nodeproject1.git 

cd nodeproject1   

2 install dependencies npm install

3 run the code npx nodemon
