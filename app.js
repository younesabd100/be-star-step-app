const express = require("express");
const connectDB = require("./db/connection");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from MongoDB app!");
});
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
module.exports = app;
