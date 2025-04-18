const request = require("supertest");
const { app } = require("../app");
const seed = require("../db/seed/seed");
const data = require("../db/test_data/index");
const { connectDB, mongoose, end } = require("../db/connection");
const { Rewards } = require("../db/test_data/test.schema");

beforeEach(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
  await seed(data);
});
afterAll(async () => {
  await end();
});

describe("GET /api/rewards/:reward_id", () => {
  test("200: responds with an object containing correct data on the reward with given id", async () => {
    return request(app)
      .get("/api/rewards/000000000000000000000005")
      .expect(200)
      .then(({ body: { reward } }) => {
        expect(reward).toHaveProperty("reward_id", "000000000000000000000005");
        expect(reward).toHaveProperty("title", "Bike");
        expect(reward).toHaveProperty("cost", 100);
        expect(reward).toHaveProperty("redeemedBy", "000000000000000000000002");
        expect(reward).toHaveProperty("isRedeemed", false);
        expect(reward).toHaveProperty("createdBy", "000000000000000000000001");
      });
  });
});

describe("GET /api/rewards", () => {
  test("200: responds with an array containing correct data on the rewards created by given parent id", async () => {
    return request(app)
      .get("/api/rewards?createdBy=000000000000000000000001")
      .expect(200)
      .then(({ body: { rewards } }) => {
        expect(rewards.length).toBe(2);
        rewards.forEach((reward) => {
          expect(reward).toHaveProperty("reward_id");
          expect(reward).toHaveProperty("title");
          expect(reward).toHaveProperty("cost");
          expect(reward).toHaveProperty("redeemedBy");
          expect(reward).toHaveProperty("isRedeemed");
          expect(reward).toHaveProperty(
            "createdBy",
            "000000000000000000000001"
          );
        });
      });
  });
});

describe("POST /tasks", () => {
  test("201: responds with an object containing correct data on the new created reward", () => {
    return request(app)
      .post("/api/rewards")
      .send({
        title: "Ice Cream",
        cost: 200,
        createdBy: "000000000000000000000001",
      })
      .expect(201)
      .then(({ body: { reward } }) => {
        expect(reward).toHaveProperty("reward_id");
        expect(reward).toHaveProperty("title", "Ice Cream");
        expect(reward).toHaveProperty("cost", 200);
        expect(reward).toHaveProperty("isRedeemed", false);
        expect(reward).toHaveProperty("createdBy", "000000000000000000000001");
      });
  });
});

describe("PATCH /tasks/:task_id", () => {
  test("200: responds with an object containing correct data on the new updated reward", () => {
    return request(app)
      .patch("/api/rewards/000000000000000000000007")
      .send({
        title: "Candies",
        cost: 250,
        redeemedBy: "000000000000000000000002",
        isRedeemed: true,
      })
      .expect(200)
      .then(({ body: { reward } }) => {
        expect(reward).toHaveProperty("reward_id");
        expect(reward).toHaveProperty("title", "Candies");
        expect(reward).toHaveProperty("cost", 250);
        expect(reward).toHaveProperty("isRedeemed", true);
        expect(reward).toHaveProperty("redeemedBy", "000000000000000000000002");
        expect(reward).toHaveProperty("createdBy", "000000000000000000000001");
      });
  });
});

describe("DELETE /tasks/:task_id", () => {
  test("204: responds with a 204 status if reward with given id has been deleted", () => {
    return request(app)
      .delete("/api/rewards/000000000000000000000007")
      .expect(204)
      .then(() => {
        return Rewards.findById("000000000000000000000007");
      })
      .then((rewardFound) => {
        expect(rewardFound).toBe(null);
      });
  });
});
