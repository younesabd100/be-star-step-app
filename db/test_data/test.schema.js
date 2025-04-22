const mongoose = require("mongoose");
// import { ObjectId } from "mongodb";
const { v4: uuidv4 } = require("uuid");

// const parentSchema = new mongoose.Schema({
//   // parentID: {
//   //   type: String,
//   //   default: uuidv4(),
//   // }
//   // _id: {default: },
//   parentName: String,
//   password: { type: String, unique: true },
// });

const parentSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  parentName: {
    type: String,
    required: true,
  },
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
  // parentID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Parent" }],

  parentID: {
    type: String,
    ref: "Parent",
  },

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
  createdBy: {
    type: String,
    ref: "Parent",
    required: true,
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  starsReward: { type: Number, default: 0 },
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
  // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Parent" },
  createdBy: {
    type: String,
    ref: "Parents",
    required: true,
  },
});

const Parents = mongoose.model("Parent", parentSchema);
const Tasks = mongoose.model("Task", taskSchema);
const Rewards = mongoose.model("Reward", rewardSchema);
const Kids = mongoose.model("Child", childSchema);

module.exports = { Parents, Tasks, Rewards, Kids };
