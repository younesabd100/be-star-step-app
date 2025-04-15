
const { ObjectId } = require("mongodb");
const parentId = new ObjectId("000000000000000000000001");
const kid1Id = new ObjectId("000000000000000000000002");
const kid2Id = new ObjectId("000000000000000000000006");
const task1Id = new ObjectId("000000000000000000000003");
const task2Id = new ObjectId("000000000000000000000004");
const reward1Id = new ObjectId("000000000000000000000005");
module.exports = { parentId, kid1Id, kid2Id, task1Id, task2Id, reward1Id };