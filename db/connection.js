require("dotenv").config({ path: `${__dirname}/../.env.test` });
const mongoose = require("mongoose");
const app = require("../app");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

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

module.exports = {
  connectDB,
  mongoose,
  end,
};
