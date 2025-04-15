const express = require("express");
const kidRoutes = require("./Routes/kids");
const tasksRouter = require("./Routes/tasks");
const connectDB = require("./db/connection");

const app = express();

app.use(express.json());

app.use("/api/kids", kidRoutes);
app.use("/tasks", tasksRouter);

app.get("/", (req, res) => {
  res.send("Hello from MongoDB app!");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.msg || "Internal Server Error";
  res.status(status).json({ msg });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
module.exports = { app };
