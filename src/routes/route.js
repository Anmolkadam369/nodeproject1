const express = require("express");
const router = express.Router();
const booksController = require("../Controllers/booksController");
const readerController = require("../Controllers/readerController");
const auth = require("../middlewares/auth");
const aws = require("../middlewares/aws");
router.get("/test-me", function(req,res){
    res.send({status: true, message:"Welcome to my application."})
})

router.post("/createNewBook",aws.awsLink, booksController.createNewBook);
router.get("/getData/:readerId",auth.authentication,auth.authorization, booksController.getData);
router.get("/getParticularBook/:readerId/:id",auth.authentication,auth.authorization,booksController.getParticularBook);
router.put("/updateBook/:id",booksController.updatedBook);
 router.delete("/deleteBook/:id", booksController.deleteBook);

 //person logged in
 router.post("/registerReader", readerController.registerReader);
 router.post("/loginReader",readerController.loginReader);

module.exports = router;




