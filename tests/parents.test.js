const request = require('supertest');
const seed =require('../db/seed/seed')
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

  describe("POST /api/parents", () => {
    test("201: respond with a sucessful parent object", () => {
    
          return request(app)
            .post('/api/parents')
            .send( {
                "parentName": "Testparent",
                "password": "idk"
              })
            .expect(201)
            .then((res) => {
                console.log(res.body)
              expect(res.body).toHaveProperty('_id')
              expect(res.body.parentName).toBe('Testparent')
            })
    });
    test('400:should return error if parentName is missing',()=>{
         
        return request(app)
          .post('/api/parents')
          .send({
          password: 'snowmannnn',
        })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('Missing parent name or password')
          })
      })
  });
  describe("GET /api/parents/:ParentId", () => {
    test("200: respond with a parent objtuect with id", () => {
    
          return request(app)
            .get('/api/parents/000000000000000000000001')
            .expect(200)
            .then((res) => {
                console.log(res.body,'aeee')
              expect(res.body).toHaveProperty('_id')
              expect(res.body.parentName).toBe('Jhon')
            })
    });
    test("404: respond with an error if invalid id is requested", () => {
    
        return request(app)
          .get('/api/parents/000000000000000000070001')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe('Parent not found')
          })
  });
  test("400: responds with error for invalid ID format",() =>{
    return request(app)
      .get("/api/parents/000000005000")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("Invalid id");
      });
  });
})



