const express = require("express");

const kidRoutes = require("./Routes/kids");
const rewardsRouter = require("./Routes/rewards");
const tasksRouter = require("./Routes/tasks");
const parentRouter = require('./Routes/parents')


const app = express();

app.use(express.json());


app.use("/api/parents", parentRoutes);
app.use("/api/kids", kidRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/rewards", rewardsRouter);


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
