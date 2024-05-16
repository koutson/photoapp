const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose
    // .connect(process.env.DB_URL)
    .connect("mongodb+srv://hung:hung123@nmhung.94gppfg.mongodb.net/?retryWrites=true&w=majority&appName=nmhung")
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
