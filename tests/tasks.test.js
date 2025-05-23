const request = require("supertest");
const seed = require("../db/seed/seed");
const data = require("../db/test_data");
const { app } = require("../app");
const { connectDB, mongoose, end } = require("../db/connection");

beforeEach(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
  await seed(data);
});
afterAll(async () => {
  await end();
});

describe("POST /tasks", () => {
  test("200: Responds with an object  containing inserted task's data including task_id", () => {
    return request(app)
      .post("/api/tasks")
      .send({
        title: "Wash the dishes",
        status: "new",
        validBefore: "2025-04-29",
        createdBy: "67fca361f6013f4518e4bcf7",
        assignedTo: "67fca362f6013f4518e4bcfb",
        starsReward: "9",
        _id: "000000000000000000000007",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.title).toEqual("Wash the dishes");
        expect(body.status).toEqual("new");
        expect(body.validBefore).toEqual("29-04-2025");
        expect(body.createdBy).toEqual("67fca361f6013f4518e4bcf7");
        expect(body.assignedTo).toEqual("67fca362f6013f4518e4bcfb");
        expect(body.starsReward).toEqual(9);
        expect(body._id).toEqual("000000000000000000000007");
      });
  });
});
describe("Delete /tasks/:task_id", () => {
  test("204: Responds with status 204 'No Content' after the task is successfully deleted", () => {
    return request(app)
      .delete("/api/tasks/000000000000000000000004")
      .expect(204);
  });
});

describe("PATCH /api/tasks/:task_id", () => {
  test("200: Responds with the updated task", () => {
    return request(app)
      .patch("/api/tasks/000000000000000000000004")
      .send({ status: "in_progress" })
      .expect(200)
      .then(({ body }) => {
        expect(body._id).toEqual("000000000000000000000004");
        expect(body.status).toBe("in_progress");
      });
  });
});

describe("GET /api/tasks/:task_id", () => {
  test("200: Responds with the  task", () => {
    return request(app)
      .get("/api/tasks/000000000000000000000004")
      .expect(200)
      .then(({ body }) => {
        console.log(body);
        expect(body._id).toEqual("000000000000000000000004");
      });
  });
});
describe("GET api/tasks?createdBy=parent_id", () => {
  test("200: Responds with an array containing tasks created by parent  with requested id", () => {
    return request(app)
      .get("/api/tasks?createdBy=000000000000000000000001")
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

  test("404: Responds with an error 404 Page nor found ", () => {
    return request(app)
      .get("/api/tasks")
      .expect(404)
      .then(({ text }) => {
        expect(text).toBe("Not found");
      });
  });
});

describe("GET api/tasks?assignedTo=childId", () => {
  test("200: Responds with an array containing tasks created by parent  with requested id", () => {
    return request(app)
      .get("/api/tasks?assignedTo=000000000000000000000006")
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
