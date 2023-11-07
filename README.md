# nodeproject With AWS S3 and Authentication and Authorization

Book Management API

This is a RESTful API for managing books. It allows users to perform CRUD (Create, Read, Update, Delete) operations on books, storing the data in a MongoDB database.

------------------------------------------------------------------------------------------------------------------


API Endpoints

Add a New Book
URL: /createNewBook 
Method: POST
Request Body :
{
bookCover : "fileName",
"title": "The Book Title",
"author": "Author Name",
"summary": "Book summary or description"
}

Response: The created book object.

# bookCover is taking a photo which is stored in AWS S3 account with safty.

------------------------------------------------------------------------------------------------------------------
 

View a List of All Books
URL: /getData/:readerId
Method: GET
Response: An array of book objects.

# I applied Authentication and Authorization in this field a reader needs to be logged in for doing this activity.
------------------------------------------------------------------------------------------------------------------

View Details of a Specific Book by ID
 URL: /getParticularBook/:readerId/:id
  Method: GET
 Response: The book object with the specified ID.

# I applied Authentication and Authorization in this field a reader needs to be logged in for doing this activity.
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

  ------------------------------------------------------------------------------------------------------------------

# created User (just to add authentication and authorzation part)
URL : /registerReader
Method : POST
 { 
     "firstName":"anmol", "lastName":"kadam", "age":21, "email" :"anmol@gmail.com","password":"some@123"
}

Response : object returns.
  ------------------------------------------------------------------------------------------------------------------
# login User (added jwt token)
URL : /loginReader
Method: POST

Response : object returns.

  ------------------------------------------------------------------------------------------------------------------
  
Setting Up and Running the Application Locally Follow these steps to set up and run the application locally:

1 Clone the repository: git clone https://github.com/Anmolkadam369/nodeproject1.git 

cd nodeproject1   

2 install dependencies npm install

3 run the code npx nodemon
