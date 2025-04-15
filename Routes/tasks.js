const { postTask } = require("../controllers/tasks_controller");

const taskRoutes = require("express").Router();
taskRoutes.route("/").post(postTask);
module.exports = taskRoutes;
