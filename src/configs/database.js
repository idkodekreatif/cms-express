const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cms-ejs");
    console.log("Connection to MongoDB successful");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToDatabase;
