const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const seed = require("../seed/seed");
const { Parents, Kids, Tasks, Rewards } = require("../test_data/test.schema");
const { forEach } = require("../test_data/test.data.rewards");
require("dotenv").config();
// console.log(process.env.MONGO_URI);
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: "be-star-step-app-test",
  });
  await seed();
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
});

describe("Database Seeding", () => {
  beforeEach(async () => {
    await seed();
  });

  test("should insert parents", async () => {
    const parents = await Parents.find({});
    expect(parents.length).toBeGreaterThan(0);
    expect(parents[0]).toHaveProperty("parentName");
  });

  test("should insert kids", async () => {
    const parent = await Parents.find({});
    const kids = await Kids.find({});

    expect(kids.length).toBeGreaterThan(0);
    expect(kids[0]).toHaveProperty("name");
    expect(kids[0]).toHaveProperty("parentID");
    // console.log(parent[0]);
    // console.log(kids[1]);
    expect(kids[1].parentID).toEqual([parent[0]._id]);
  });

  test("should insert tasks", async () => {
    const parent = await Parents.find({});
    const kids = await Kids.find({});

    const tasks = await Tasks.find({});
    expect(tasks.length).toBeGreaterThan(0);
    tasks.forEach((task) => {
      expect(task).toHaveProperty("title");
      expect(task).toHaveProperty("status");
      expect(typeof task.validBefore).toBe("object");
      expect(task.createdBy).toEqual(parent[0]._id);
    });

    expect(tasks[0].assignedTo).toEqual(kids[0]._id);
    expect(tasks[1].assignedTo).toEqual(kids[1]._id);
  });

  test("should insert rewards", async () => {
    const parent = await Parents.find({});
    const kids = await Kids.find({});

    const rewards = await Rewards.find({});
    expect(rewards.length).toBeGreaterThan(0);
    rewards.forEach((reward) => {
      expect(reward).toHaveProperty("title");
      expect(reward).toHaveProperty("cost");
      expect(typeof reward.isRedeemed).toBe("boolean");
      expect(typeof reward.cost).toBe("number");
      expect(reward.createdBy).toEqual(parent[0]._id);
    });

    expect(rewards[0].redeemedBy).toEqual(kids[0]._id);
  });
});
