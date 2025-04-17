const {
  postTask,
  deleteTaskById,
  patchTaskById,
  getTasks,
  getTaskById,
} = require("../controllers/tasks_controller");

const tasksRouter = require("express").Router();
tasksRouter.route("/").post(postTask).get(getTasks);
tasksRouter
  .route("/:task_id")
  .delete(deleteTaskById)
  .patch(patchTaskById)
  .get(getTaskById);

module.exports = tasksRouter;
