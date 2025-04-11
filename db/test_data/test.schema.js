const mongoose = require("mongoose");
const { v4, uuid4 } = require("uuid");

const parentSchema = new mongoose.Schema({
  parentID: {
    Number,
    default: uuid4,
  },
  parentName: String,
  password: { type: String, unique: true },
  kids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Child" }],
});

const taskSchema = new mongoose.Schema({
  taskId: {
    Number,
    default: uuid4,
  },
  title: String,
  description: String,
  status: String,
  validBefore: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  completed: Boolean,
  starsReward: Number,
});

const rewardSchema = new mongoose.Schema({
  rewardId: {
    Number,
    default: uuid4,
  },
  title: String,
  status: Boolean,
  cost: Number,
  redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
});

const childSchema = new mongoose.Schema({
  name: String,
  age: Number,
  stars: { type: Number, default: 0 },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  avatar: String,
});
