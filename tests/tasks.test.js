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
        expect(body.title).toEqual("Wash the dishes");
        expect(body.status).toEqual("new");
        expect(body.validBefore).toEqual("29-04-2025");
        expect(body.createdBy).toEqual("67fca361f6013f4518e4bcf7");
        expect(body.assignedTo).toEqual("67fca362f6013f4518e4bcfb");
        expect(body.starsReward).toEqual(9);
      });
  });
});
describe("Delete /tasks/:task_id", () => {
  test("204: Responds with status 204 'No Content' after the task is successfully deleted", () => {
    return request(app).delete("/tasks/000000000000000000000004").expect(204);
  });
});

describe("PATCH /api/tasks/:task_id", () => {
  test("200: Responds with the updated task", () => {
    return request(app)
      .patch("/tasks/000000000000000000000004")
      .send({ status: "in_progress" })
      .expect(200)
      .then(({ body }) => {
        expect(body._id).toEqual("000000000000000000000004");
        expect(body.status).toBe("in_progress");
      });
  });
});

describe("GET api/tasks?createdBy=parent_id", () => {
  test("200: Responds with an array containing tasks created by parent  with requested id", () => {
    return request(app)
      .get("/tasks?createdBy=000000000000000000000001")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        body.forEach((task) => {
          expect(typeof task.title).toBe("string");
          expect(typeof task._id).toBe("string");
          expect(typeof task.status).toBe("string");
          expect(typeof task.validBefore).toBe("string");
          expect(task.createdBy).toBe("000000000000000000000001");
          expect(typeof task.assignedTo).toBe("string");
          expect(typeof task.starsReward).toBe("number");
        });
      });
  });
});

describe("GET api/tasks?assignedTo=childId", () => {
  test("200: Responds with an array containing tasks created by parent  with requested id", () => {
    return request(app)
      .get("/tasks?assignedTo=000000000000000000000006")
      .expect(200)
      .then(({ body }) => {
        expect(typeof body).toBe("object");
        body.forEach((task) => {
          expect(typeof task.title).toBe("string");
          expect(typeof task._id).toBe("string");
          expect(typeof task.status).toBe("string");
          expect(typeof task.validBefore).toBe("string");
          expect(typeof task.createdBy).toBe("string");
          expect(task.assignedTo).toBe("000000000000000000000006");
          expect(typeof task.starsReward).toBe("number");
        });
      });
  });
});
