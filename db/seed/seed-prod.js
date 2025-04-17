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
  try {
    await connectDB();
    console.log("MongoDB Connected");

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

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  } finally {
    console.log("Closing DB connection...");
    await end();
    process.exit(0);
  }
};

async function insertedParents(parentData) {
  try {
    const updatedParentData = parentData.map((parent) => {
      if (!parent.auth0Id || !parent.parentName) {
        throw new Error("Missing auth0Id or parentName in parentData");
      }
      return {
        _id: parent.auth0Id,
        parentName: parent.parentName,
      };
    });

    console.log("Seeding parent with:", updatedParentData);

    await Parents.deleteMany({});
    const result = await Parents.insertMany(updatedParentData);
    console.log("Parents seeded");
    return result;
  } catch (err) {
    console.error("Failed to seed parents:", err);
    throw err;
  }
}

async function insertedKids(parent, kidsData, kid1Id, kid2Id) {
  try {
    await Kids.deleteMany({});

    const parentID = parent[0]._id;
    const kidsId = [kid1Id, kid2Id];

    const newKidsDataWithID = kidsData.map((kid, i) => ({
      ...kid,
      parentID: parentID,
      _id: kidsId[i],
    }));

    const result = await Kids.insertMany(newKidsDataWithID);
    console.log("Kids seeded");
    return result;
  } catch (err) {
    console.error("Failed to seed kids:", err);
    throw err;
  }
}

async function insertedTasks(
  parentsData,
  kidsData,
  tasksData,
  task1Id,
  task2Id
) {
  try {
    await Tasks.deleteMany({});

    const parentID = parentsData[0]._id;
    const newTasksDataWithID = tasksData.map((task, i) => ({
      ...task,
      createdBy: parentID,
      assignedTo: kidsData[i]._id,
      _id: [task1Id, task2Id][i],
    }));

    const result = await Tasks.insertMany(newTasksDataWithID);
    console.log("Tasks seeded");
    return result;
  } catch (err) {
    console.error("Failed to seed tasks:", err);
    throw err;
  }
}

async function insertedRewards(
  parentsData,
  kidsData,
  rewardsData,
  reward1Id,
  reward2Id
) {
  try {
    await Rewards.deleteMany({});

    const parentID = parentsData[0]._id;
    const newRewardsDataWithID = rewardsData.map((reward, i) => ({
      ...reward,
      createdBy: parentID,
      redeemedBy: kidsData[i]._id,
      _id: [reward1Id, reward2Id][i],
    }));

    const result = await Rewards.insertMany(newRewardsDataWithID);
    console.log("Rewards seeded");
    return result;
  } catch (err) {
    console.error("Failed to seed rewards:", err);
    throw err;
  }
}

// Safety: log if the script hangs
setTimeout(() => {
  console.log("Still running after 10s...");
}, 10000);

seed();
