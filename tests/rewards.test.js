const request = require("supertest")
const app = require("../app")
const seed = require("../db/seed/seed")
const { connectDB, mongoose } = require("../db/connection")

beforeAll(async () => {
    await connectDB();
})

beforeEach(async () => {
    await seed()
})

afterAll(() => {
    return mongoose.connection.close()
})

describe("GET /api/rewards/:reward_id", () => {
    test('200: responds with an object containing correct data on the reward with given id', async () => {
        return request(app)
            .get('/api/rewards/000000000000000000000005')
            .expect(200)
            .then(({ body: { reward } }) => {
                expect(reward).toHaveProperty("reward_id", "000000000000000000000005")
                expect(reward).toHaveProperty("title", "Bike")
                expect(reward).toHaveProperty("cost", 100)
                expect(reward).toHaveProperty("redeemedBy", "000000000000000000000002")
                expect(reward).toHaveProperty("isRedeemed", false)
                expect(reward).toHaveProperty("createdBy", "000000000000000000000001")
            })
    });
})

describe("GET /api/rewards", () => {
    test('200: responds with an array containing correct data on the rewards created by given parent id', async () => {
        return request(app)
            .get('/api/rewards?createdBy=000000000000000000000001')
            .expect(200)
            .then(({ body: { rewards } }) => {
                expect(rewards.length).toBe(2)
                rewards.forEach((reward) => {
                    expect(reward).toHaveProperty("reward_id")
                    expect(reward).toHaveProperty("title")
                    expect(reward).toHaveProperty("cost")
                    expect(reward).toHaveProperty("redeemedBy")
                    expect(reward).toHaveProperty("isRedeemed")
                    expect(reward).toHaveProperty("createdBy", "000000000000000000000001")
                })
            })
    });
})

describe("POST /tasks", () => {
    test("201: responds with an object containing correct data on the new created reward", () => {
        return request(app)
            .post("/api/rewards")
            .send({
                title: "Ice Cream",
                cost: 200,
                createdBy: "000000000000000000000001"
            },)
            .expect(201)
            .then(({ body: { reward } }) => {
                expect(reward).toHaveProperty("reward_id")
                expect(reward).toHaveProperty("title", "Ice Cream")
                expect(reward).toHaveProperty("cost", 200)
                expect(reward).toHaveProperty("isRedeemed", false)
                expect(reward).toHaveProperty("createdBy", "000000000000000000000001")
            })
    });
});