const mongoose = require("mongoose");
const { v4, uuid4 } = require("uuid");

const parentSchema = new mongoose.Schema({
  parentID: {
    String,
    default: uuid4,
  },
  parentName: String,
  password: { type: String, unique: true },
});

const taskSchema = new mongoose.Schema({
  taskId: {
    String,
    default: uuid4,
  },
  title: String,
  status: {
    type: String,
    enum: ["new", "in progress", "done"],
    default: "new",
  },
  validBefore: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  completed: Boolean,
  starsReward: Number,
});

const rewardSchema = new mongoose.Schema({
  rewardId: {
    String,
    default: uuid4,
  },
  title: String,
  status: Boolean,
  cost: Number,
  redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
});

const childSchema = new mongoose.Schema({
  childId: { String, default: uuid4 },
  name: String,
  age: Number,
  stars: { type: Number, default: 0 },
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  parentID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
  avatar: String,
});
const Parent = mongoose.model("Parent", parentSchema);
const Task = mongoose.model("Task", taskSchema);
const Reward = mongoose.model("Reward", rewardSchema);
const Child = mongoose.model("Child", childSchema);
