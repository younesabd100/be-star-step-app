const request = require("supertest");
const seed = require("../db/seed/seed");
const data = require("../db/test_data");
const { app } = require("../app");
const { connectDB, mongoose } = require("../db/connection");

beforeEach(async () => {
  await connectDB();
  await seed(data);
});
afterAll(() => {
  return mongoose.disconnect();
});
describe("GET /", () => {
  test("200: Responds with an text 'Hello from MongoDB app!'", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        console.log(response.text);
        expect(response.text).toEqual("Hello from MongoDB app!");
      });
  });
});

describe("POST /tasks", () => {
  test("200: Responds with an object  containing inserted task's data including task_id", () => {
    return request(app)
      .post("/tasks")
      .send({
        title: "Wash the dishes",
        status: "new",
        validBefore: "2025-04-29",
        createdBy: "67fca361f6013f4518e4bcf7",
        assignedTo: "67fca362f6013f4518e4bcfb",
        starsReward: "9",
      })
      .expect(201)
      .then(({ body }) => {
        console.log({ body });
        // expect(response.text).toEqual("Hello from MongoDB app!");
      });
  });
});
