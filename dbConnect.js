require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB(connectionString) {
  return mongoose.connect(connectionString);
}

module.exports = connectDB;