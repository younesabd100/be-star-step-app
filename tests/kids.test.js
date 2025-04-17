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

describe("POST /api/kids", () => {
  test("201: Responds with an object  containing inserted kid's data including child_id", () => {
    const postKid = {
      name: "Tommy",
      age: 7,
      avatar:
        "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
      parentID: ["000000000000000000000001"],
    };
    return request(app)
      .post("/api/kids")
      .send(postKid)
      .expect(201)
      .then(({ body }) => {
        let { newKid } = body;
        expect(newKid).toMatchObject({
          name: "Tommy",
          age: 7,
          avatar:
            "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
          parentID: ["000000000000000000000001"],
        });
      });
  });
  test("400: Responds with an error if a field is missing", () => {
    const newKid = {
      name: "Tommy",
      avatar:
        "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x",
    };
    return request(app)
      .post("/api/kids")
      .send(newKid)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing info");
      });
  });
});
describe("GET /api/kids/:childID", () => {
  test("200: Responds with an object  containing kid's data by childId", () => {
    return request(app)
      .get("/api/kids/000000000000000000000002")
      .expect(200)
      .then(({ body }) => {
        const { kid } = body;
        expect(kid).toMatchObject({
          _id: "000000000000000000000002",
          name: "Rose",
          age: 6,
          stars: 0,
          parentID: ["000000000000000000000001"],
          avatar:
            "https://www.shutterstock.com/image-vector/vector-cartoon-funny-orange-monster-600nw-2493211707.jpg",
          __v: 0,
        });
      });
  });
});
describe("PATCH /api/kids/:childID", () => {
  test("200: Responds with an updtated object containing kid's data by childId", () => {
    const newSTars = {
      stars: 5,
    };
    return request(app)
      .patch("/api/kids/000000000000000000000002")
      .send(newSTars)
      .expect(200)
      .then(({ body }) => {
        const { kid } = body;
        expect(kid).toMatchObject({
          _id: "000000000000000000000002",
          name: "Rose",
          age: 6,
          stars: 5,
          parentID: ["000000000000000000000001"],
          avatar:
            "https://www.shutterstock.com/image-vector/vector-cartoon-funny-orange-monster-600nw-2493211707.jpg",
          __v: 0,
        });
      });
  });
});

describe("GET /api/kids?parent_id", () => {
  test("200: Responds with an object  containing kid's data by childId", () => {
    return request(app)
      .get("/api/kids?parent_id=000000000000000000000001")
      .expect(200)
      .then(({ body: { kid } }) => {
        kid.forEach((child) => {
          expect(child.parentID).toEqual(["000000000000000000000001"]);
        });
        expect(typeof kid).toBe("object");
      });
  });
});
