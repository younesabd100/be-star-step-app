const { getApi } = require("../controllers/api_controller");
const kidRoutes = require("./kids");
const parentRouter = require("./parents");
const rewardsRouter = require("./rewards");
const tasksRouter = require("./tasks");

const apiRouter = require("express").Router();

apiRouter.get("/", getApi);

apiRouter.use("/parents", parentRouter);

apiRouter.use("/kids", kidRoutes);

apiRouter.use("/tasks", tasksRouter);

apiRouter.use("/rewards", rewardsRouter);

module.exports = apiRouter;
