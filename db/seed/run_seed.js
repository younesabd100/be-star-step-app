const testData = require("../test_data/index");
const seed = require("../seed/seed");
const db = require("../connection");

const runSeed = async () => {
  try {
    await seed(testData);
  } catch (err) {
    console.error;
  } finally {
    await db.end();
  }
};
runSeed();
