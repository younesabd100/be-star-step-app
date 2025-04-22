require("dotenv").config();
const express = require("express");
const app = express();
const apiRouter = require("./Routes/api.router");
const cors = require("cors");
const { connectDB } = require("./db/connection");
const userRoutes = require("./Routes/user");
const versionRouter = require("./Routes/version");

app.use(cors());
connectDB();
app.use(express.json());

app.use("/api", apiRouter);
app.use("/api/user", require("./Routes/user"));

app.use("/api/version", versionRouter);

// app.all("*", (req, res) => {
//   res.status(404).send({ msg: "Not Found" });
// });

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const msg = err.msg || "Internal Server Error";
  res.status(status).json({ msg });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = { app };
