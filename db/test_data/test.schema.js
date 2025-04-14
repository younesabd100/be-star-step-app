const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const parentSchema = new mongoose.Schema({
  // parentID: {
  //   type: String,
  //   default: uuidv4(),
  // }

  parentName: String,
  password: { type: String, unique: true },
});
const childSchema = new mongoose.Schema({
  // childId: {
  //   type: String,
  //   default: uuidv4(),
  // },

  name: String,
  age: Number,
  stars: { type: Number, default: 0 },
  // tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  parentID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],
  avatar: String,
});
const taskSchema = new mongoose.Schema({
  // taskId: {
  //   type: String,
  //   default: uuidv4(),
  // },

  title: String,
  status: {
    type: String,
    enum: ["new", "in_progress", "done"],
    default: "new",
  },
  validBefore: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },

  starsReward: Number,
});

const rewardSchema = new mongoose.Schema({
  // rewardId: {
  //   type: String,
  //   default: uuidv4(),
  // },

  title: String,
  isRedeemed: Boolean,
  cost: Number,
  redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
});

const Parents = mongoose.model("Parent", parentSchema);
const Tasks = mongoose.model("Task", taskSchema);
const Rewards = mongoose.model("Reward", rewardSchema);
const Kids = mongoose.model("Child", childSchema);

module.exports = { Parents, Tasks, Rewards, Kids };
