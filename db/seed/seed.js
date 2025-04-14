const db = require("../connection");
const {
  parentData,
  kidsData,
  tasksData,
  rewardsData,
} = require("../test_data/index");
const { Parents, Tasks, Rewards, Kids } = require("../test_data/test.schema");
// console.log(parentData);

const seed = async () => {
  await Parents.deleteMany({}); //database keyword to delete many items/data if any exists.
  const parentsInsertedData = await insertedParents(parentData);

  await Kids.deleteMany({});
  const kidsInsertedData = await insertedKids(parentsInsertedData, kidsData); //this insert's the defined data above

  await Tasks.deleteMany({});
  await insertedTasks(parentsInsertedData, kidsInsertedData, tasksData);

  await Rewards.deleteMany({});
  await insertedRewards(parentsInsertedData, kidsInsertedData, rewardsData);
};

async function insertedParents(parentData) {
  const insertedParentsData = await Parents.insertMany(parentData);
  return insertedParentsData;
}

async function insertedKids(parent, kidsData) {
  // console.log(parent);
  const parentID = parent[0]._id;
  const newKidsDataWithID = [];

  kidsData.forEach((kid) => {
    newKidsDataWithID.push({ ...kid, parentID: parentID });
  });
  // console.log(newKidsDataWithID);
  const insertedKidsData = await Kids.insertMany(newKidsDataWithID);
  return insertedKidsData;
}

async function insertedTasks(parentsData, kidsData, tasksData) {
  const parentID = parentsData[0]._id;
  const newTasksDataWithID = [];
  let i = 0;
  tasksData.forEach((task) => {
    newTasksDataWithID.push({
      ...task,
      createdBy: parentID,
      assignedTo: kidsData[i]._id,
    });
    i++;
  });

  const insertedKidsData = await Tasks.insertMany(newTasksDataWithID);
  return insertedKidsData;
}

async function insertedRewards(parentsData, kidsData, rewardsData) {
  const parentID = parentsData[0]._id;
  const newRewardsDataWithID = [];
  let i = 0;
  rewardsData.forEach((reward) => {
    newRewardsDataWithID.push({
      ...reward,
      createdBy: parentID,
      redeemedBy: kidsData[i]._id,
    });
    i++;
  });

  const insertedRewardsData = await Rewards.insertMany(newRewardsDataWithID);
  return insertedRewardsData;
}
module.exports = seed;
