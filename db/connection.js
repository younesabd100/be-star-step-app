const mongoose = require("mongoose");
const app = require("../app");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../.env.test` });

console.log(__dirname);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
