const { createNewTask } = require("../models/task_model");

exports.postTask = (req, res, next) => {
  console.log(req.body);
  return createNewTask(req.body).then();
};
