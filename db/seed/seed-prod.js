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
  reward2Id,
} = require("../test_data/test.id");
const { connectDB, end } = require("../connection");
const { Parents, Tasks, Rewards, Kids } = require("../test_data/test.schema");

const seed = async () => {
  await connectDB();
  const parentsInsertedData = await insertedParents(parentData);
  const kidsInsertedData = await insertedKids(
    parentsInsertedData,
    kidsData,
    kid1Id,
    kid2Id
  );

  await insertedTasks(
    parentsInsertedData,
    kidsInsertedData,
    tasksData,
    task1Id,
    task2Id
  );

  await insertedRewards(
    parentsInsertedData,
    kidsInsertedData,
    rewardsData,
    reward1Id,
    reward2Id
  );
};

async function insertedParents(parentData) {
  const updatedParentData = parentData.map((parent) => {
    if (!parent.auth0Id || !parent.parentName) {
      throw new Error("Missing auth0Id or parentName in parentData");
    }
    return {
      _id: parent.auth0Id,
      parentName: parent.parentName,
    };
  });

  console.log("🌱 Seeding parent with:", updatedParentData);

  await Parents.deleteMany({});
  await Parents.insertMany(updatedParentData);

  return updatedParentData;
}

async function insertedKids(parent, kidsData, kid1Id, kid2Id) {
  await Kids.deleteMany({});

  const parentID = parent[0]._id;
  const kidsId = [kid1Id, kid2Id];

  const newKidsDataWithID = kidsData.map((kid, i) => ({
    ...kid,
    parentID: parentID,
    _id: kidsId[i],
  }));

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
  await Tasks.deleteMany({});

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

  const insertedTaskData = await Tasks.insertMany(newTasksDataWithID);

  return insertedTaskData;
}

async function insertedRewards(
  parentsData,
  kidsData,
  rewardsData,
  reward1Id,
  reward2Id
) {
  await Rewards.deleteMany({});

  const parentID = parentsData[0]._id;
  const newRewardsDataWithID = [];
  const rewardId = [reward1Id, reward2Id];
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
  end();
}
seed();
module.exports = seed;
