const {
  postTask,
  deleteTaskById,
  patchTaskById,
  getTasks,
} = require("../controllers/tasks_controller");

const tasksRouter = require("express").Router();
tasksRouter.route("/").post(postTask).get(getTasks);
tasksRouter.route("/:task_id").delete(deleteTaskById).patch(patchTaskById);
module.exports = tasksRouter;
