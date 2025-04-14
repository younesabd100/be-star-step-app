const express = require("express");
const parentRoutes = require("./Routes/parents");
const kidRoutes = require("./Routes/kids");
const taskRoutes = require("./Routes/tasks");
const rewardRoutes = require("./Routes/rewards");
const connectDB = require("./db/connection");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(express.json());

app.use("/api/parents", parentRoutes);
app.use("/api/kids", kidRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/rewards", rewardRoutes);

app.get("/", (req, res) => {
  res.send("Hello from MongoDB app!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
module.exports = app;
