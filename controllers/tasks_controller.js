const {
  createNewTask,
  removeTaskById,
  editTaskById,
  fetchTasks,
} = require("../models/task_model");

exports.postTask = (req, res, next) => {
  return createNewTask(req.body)
    .then((newTaskData) => {
      res.status(201).send(newTaskData);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

exports.deleteTaskById = (req, res, next) => {
  const task_id = req.params.task_id;
  return removeTaskById(task_id)
    .then((data) => {
      res.status(204).send(data);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchTaskById = (req, res, next) => {
  const task_id = req.params.task_id;
  const updates = req.body;
  return editTaskById(task_id, updates)
    .then((updatedTask) => {
      res.status(200).send(updatedTask);
    })
    .catch((err) => {
      next(err);
    });
};
exports.getTasks = (req, res, next) => {
  const queryKey = Object.keys(req.query)[0];
  const queryValue = Object.values(req.query)[0];
  if (queryKey && queryValue) {
    return fetchTasks(queryKey, queryValue)
      .then((listOfTasks) => {
        res.send(listOfTasks);
      })
      .catch((err) => {
        next(err);
      });
  } else {
    res.status(404).send("Not found");
  }
};
