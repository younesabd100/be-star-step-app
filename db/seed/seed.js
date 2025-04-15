const db = require("../connection");
const {
  parentData,
  kidsData,
  tasksData,
  rewardsData,
} = require("../test_data/index");
const {
  parentId,
  kid1Id,
  kid2Id,
  task1Id,
  task2Id,
  reward1Id,
  reward2Id
} = require("../test_data/test.id");
const { Parents, Tasks, Rewards, Kids } = require("../test_data/test.schema");
// console.log(parentData);

const seed = async () => {
  await Parents.deleteMany({}); //database keyword to delete many items/data if any exists.
  const parentsInsertedData = await insertedParents(parentData, parentId);

  await Kids.deleteMany({});
  const kidsInsertedData = await insertedKids(
    parentsInsertedData,
    kidsData,
    kid1Id,
    kid2Id
  ); //this insert's the defined data above

  await Tasks.deleteMany({});
  await insertedTasks(
    parentsInsertedData,
    kidsInsertedData,
    tasksData,
    task1Id,
    task2Id
  );

  await Rewards.deleteMany({});
  await insertedRewards(
    parentsInsertedData,
    kidsInsertedData,
    rewardsData,
    reward1Id,
    reward2Id
  );
};

async function insertedParents(parentData, parentId) {
  const newParentData = { ...parentData, _id: parentId };
  const insertedParentsData = await Parents.insertMany(newParentData);
  return insertedParentsData;
}

async function insertedKids(parent, kidsData, kid1Id, kid2Id) {
  // console.log(parent);
  const parentID = parent[0]._id;
  const newKidsDataWithID = [];
  const kidsId = [kid1Id, kid2Id];
  let i = 0;
  kidsData.forEach((kid) => {
    newKidsDataWithID.push({ ...kid, parentID: parentID, _id: kidsId[i] });
    i++;
  });
  const insertedKidsData = await Kids.insertMany(newKidsDataWithID);
  return insertedKidsData;
}

async function insertedTasks(
  parentsData,
  kidsData,
  tasksData,
  task1Id,
  task2Id
) {
  const parentID = parentsData[0]._id;
  const newTasksDataWithID = [];
  const tasksId = [task1Id, task2Id];
  let i = 0;
  tasksData.forEach((task) => {
    newTasksDataWithID.push({
      ...task,
      createdBy: parentID,
      assignedTo: kidsData[i]._id,
      _id: tasksId[i],
    });
    i++;
  });

  const insertedKidsData = await Tasks.insertMany(newTasksDataWithID);
  return insertedKidsData;
}

async function insertedRewards(parentsData, kidsData, rewardsData, reward1Id, reward2Id) {
  const parentID = parentsData[0]._id;
  const newRewardsDataWithID = [];
  const rewardId = [reward1Id, reward2Id]
  let i = 0;
  rewardsData.forEach((reward) => {
    newRewardsDataWithID.push({
      ...reward,
      createdBy: parentID,
      redeemedBy: kidsData[i]._id,
      _id: rewardId[i],
    });
    i++;
  });
  const insertedRewardsData = await Rewards.insertMany(newRewardsDataWithID);
  return insertedRewardsData;
}
module.exports = seed;
