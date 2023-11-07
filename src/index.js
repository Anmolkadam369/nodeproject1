const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const port = process.env.PORT || 3001;
const router = require("./routes/route");
mongoose.set("strictQuery", true);
const app = express();
app.use(express.json());
app.use(cors());
app.use(multer().any());
mongoose
  .connect(
    "mongodb+srv://nehajaiswal:neha123@nehadb.pcorgpc.mongodb.net/simplebook",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("mongoDB is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

 app.use("/", router);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
