const db = require("../connection");
const {
  parentData,
  kidsData,
  tasksData,
  rewardsData,
} = require("../test_data/index");
const { Parent, Task, Reward, Child } = require("../test_data/test.schema");
// console.log(parentData);
console.log(db);
const seed = async ({ parentData, kidsData, tasksData, rewardsData }) => {
  await Parent.deleteMany({}); //database keyword to delete many items/data if any exists.
  await Parent.insertMany(parentData); //this insert's the defined data above
};

module.exports = seed;
