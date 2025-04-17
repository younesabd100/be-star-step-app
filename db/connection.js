const env = process.env.NODE_ENV || "development";
require("dotenv").config({ path: `${__dirname}/../.env.${env}` });

const mongoose = require("mongoose");
console.log(`Current environment: ${env}`);
console.log(`Loading .env file from: ${__dirname}/../.env.${env}`);
const connectDB = async () => {
  const MONGO_URI =
    process.env.MONGO_URI || "mongodb://localhost:27017/be-star-step-app-test";
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

const end = async () => {
  await mongoose.disconnect();
  console.log("✅ MongoDB Disconnected");
};

module.exports = { connectDB, end };
