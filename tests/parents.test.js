const request = require("supertest");
const seed = require("../db/seed/seed");
const data = require("../db/test_data");
const { app } = require("../app");
const endpointsJSon = require("../endpoints.json");
const { connectDB, mongoose, end } = require("../db/connection");

beforeEach(async () => {
  process.env.NODE_ENV = "test";
  await connectDB();
  await seed(data);
});
afterAll(async () => {
  await end();
});

describe("GET /api", () => {
  test("200: Responds with an text 'Hello from MongoDB app!'", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJSon);
      });
  });
});

describe("POST /api/parents", () => {
  test("201: respond with a sucessful parent object", () => {
    return request(app)
      .post("/api/parents")
      .send({
        parentName: "David",
        password: "12345",
      })
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty("_id");
        expect(res.body.parentName).toBe("David");
      });
  });
  test("400:should return error if parentName is missing", () => {
    return request(app)
      .post("/api/parents")
      .send({
        password: "snowmannnn",
      })
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Missing parent name or password");
      });
  });
});
describe("GET /api/parents/:ParentId", () => {
  test("200: respond with a parent objtuect with id", () => {
    return request(app)
      .get("/api/parents/000000000000000000000001")
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("_id");
        expect(res.body.parentName).toBe("Jhon");
      });
  });
  test("404: respond with an error if invalid id is requested", () => {
    return request(app)
      .get("/api/parents/000000000000000000070001")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Parent not found");
      });
  });
  test("400: responds with error for invalid ID format", () => {
    return request(app)
      .get("/api/parents/000000005000")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid id");
      });
  });
});
