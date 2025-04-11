const express = require("express");
const connectDB = require("./db/connection");

const app = express();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from MongoDB app!");
});

module.exports = app;
