const db = require("../connection");
const {
  parentData,
  kidsData,
  tasksData,
  rewardsData,
} = require("../test_data/index");
const { Parents, Tasks, Rewards, Kids } = require("../test_data/test.schema");
// console.log(parentData);
console.log(db);
const seed = async () => {
  await Parents.deleteMany({}); //database keyword to delete many items/data if any exists.
  await Parents.insertMany(parentData);
  await Kids.deleteMany({});
  await Kids.insertMany(kidsData); //this insert's the defined data above
  await Tasks.deleteMany({});
  await Tasks.insertMany(tasksData);
  await Rewards.deleteMany({});
  await Rewards.insertMany(rewardsData);
};

module.exports = seed;
