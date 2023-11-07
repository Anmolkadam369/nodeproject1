let mongoose = require("mongoose");
const bookModel = require("../Models/bookModel");

// Create a new book
const createNewBook = async function (req, res) {
  try {
    let data = req.body;
    let { bookCover, title, author, summary } = data;
    //body
    if (Object.keys(data).length == 0)
      return res.status(400).send({ msg: "data is mandatory" });

      bookCover = data.bookCover = req.image;
      console.log(bookCover)
    if (!title)
      return res
        .status(400)
        .send({ status: false, message: "title is required" });

    if (title == "")
      return res
        .status(400)
        .send({ status: false, message: "Please Enter title value" });

    if (typeof title != "string")
      return res
        .status(400)
        .send({ status: false, message: "title should be in String" });

    if (!author)
      return res
        .status(400)
        .send({ status: false, message: "author is required" });

    if (author == "")
      return res
        .status(400)
        .send({ status: false, message: "Please Enter author value" });

    if (typeof author != "string")
      return res
        .status(400)
        .send({ status: false, message: "author should be in String" });

    if (!summary)
      return res
        .status(400)
        .send({ status: false, message: "summary is required" });

    if (summary == "")
      return res
        .status(400)
        .send({ status: false, message: "Please Enter summary value" });

    if (typeof summary != "string")
      return res
        .status(400)
        .send({ status: false, message: "summary should be in String" });

        console.log(data)
    const createData = await bookModel.create(data);
    res.status(201).send({ msg: createData });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// Get a list of all books
const getData = async (req, res) => {
  try {
    const books = await bookModel.find({isDeleted:false});
    if (books.length == 0)
      return res.status(400).send({ status: false, message: "no Data Found" });
    res.status(200).send({ msg: books });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// // Get details of a specific book by ID
const getParticularBook = async (req, res) => {
  try {
    let bookId = req.params.id;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "please provide book Id" });
    const book = await bookModel.findOne({_id :bookId, isDeleted:false});
    if (!book) return res.status(404).send({ error: "Book not found" });
    res.status(200).send({ msg: book });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// // Update a book's details
const updatedBook = async (req, res) => {
  try {
    let data = req.body;
    let { title, author, summary } = data;

    let bookId = req.params.id;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "please provide book Id" });

    if (Object.keys(data).length == 0)
      return res.status(400).send({ msg: "please provide data" });

    if (title) {
      if (title == "")
        return res
          .status(400)
          .send({ status: false, message: "Please Enter title value" });

      if (typeof title != "string")
        return res
          .status(400)
          .send({ status: false, message: "title should be in String" });
    }

    if (author) {
      if (author == "")
        return res
          .status(400)
          .send({ status: false, message: "Please Enter author value" });

      if (typeof author != "string")
        return res
          .status(400)
          .send({ status: false, message: "author should be in String" });
    }

    if (summary) {
      if (summary == "")
        return res
          .status(400)
          .send({ status: false, message: "Please Enter summary value" });

      if (typeof summary != "string")
        return res
          .status(400)
          .send({ status: false, message: "summary should be in String" });
    }
    console.log(data)
    const foundBook = await bookModel.findOne({_id:bookId,isDeleted:false})
    if (!foundBook) return res.status(404).json({ message: "Book not found" });
    const updatedBook = await bookModel.findByIdAndUpdate(
      bookId,{ $set : { title:title, author:author, summary:summary }},{ new: true });
        console.log(updatedBook)
    return res.status(200).send({ msg: updatedBook });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// // Delete a book
const deleteBook=async (req, res) => {
    try {
       
    let bookId = req.params.id;
    if (!bookId)
      return res
        .status(400)
        .send({ status: false, message: "please provide book Id" });
        const findBook = await bookModel.findById(bookId);
        console.log(findBook.isDeleted)
        if(findBook.isDeleted==true) return res.status(400).send({ status: false, message:"book is already deleted" });
        const deletedBook = await bookModel.findByIdAndUpdate(
            bookId,{ $set : { isDeleted:true}},{ new: true });
            if (!deletedBook)  res.status(404).json({ error: "Book not found" });
            res.json(deletedBook);
    } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
    }


};

module.exports = { createNewBook, getData, getParticularBook, updatedBook , deleteBook};
