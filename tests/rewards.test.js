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
                expect(reward).toHaveProperty("task_id", "000000000000000000000005")
                expect(reward).toHaveProperty("title", "Bike")
                expect(reward).toHaveProperty("cost", 100)
                expect(reward).toHaveProperty("redeemedBy", "000000000000000000000002")
                expect(reward).toHaveProperty("isRedeemed", false)
                expect(reward).toHaveProperty("createdBy", "000000000000000000000001")
            })
    });
})