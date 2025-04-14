const { postTask } = require("../controllers/tasks_controller");

const tasksRouter = require("express").Router();
tasksRouter.route("/").post(postTask);
module.exports = tasksRouter;
