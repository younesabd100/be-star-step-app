const { Tasks } = require("../db/test_data/test.schema");
const { dataConvert } = require("../utils/data_convert_for_response");
exports.createNewTask = async (taskData) => {
  const newTask1 = new Tasks(taskData);
  newTask1.save();
  const newTask = await Tasks.insertOne(taskData);
  const date = newTask.validBefore;
  const newDate = dataConvert(date);

  const readyResponse = { ...newTask._doc, validBefore: newDate };

  return readyResponse;
};
exports.removeTaskById = async (task_id) => {
  const deletedTask = await Tasks.deleteOne({ _id: task_id });
  return deletedTask;
};
exports.editTaskById = async (task_id, updates) => {
  const editedTask = await Tasks.findByIdAndUpdate(task_id, updates, {
    new: true,
  });

  const date = editedTask.validBefore;
  const newDate = dataConvert(date);

  const readyResponse = { ...editedTask._doc, validBefore: newDate };

  return readyResponse;
};
exports.fetchTasks = async (queryKey, queryValue) => {
  const requestToDb = {};
  requestToDb[queryKey] = queryValue;

  const listOfTasks = await Tasks.find(requestToDb);

  const newListOfTasks = [];

  listOfTasks.forEach((task) => {
    const date = task.validBefore;
    const newDate = dataConvert(date);
    newListOfTasks.push({ ...task._doc, validBefore: newDate });
  });

  return newListOfTasks;
};
exports.fetchTaskById = async (task_id) => {
  console.log(task_id);
  const task = await Tasks.findById(task_id);
  return task;
};
