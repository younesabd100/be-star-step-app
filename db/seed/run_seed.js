const testData = require("../test_data/index");
const seed = require("../seed/seed");
const db = require("../connection");

const runSeed = async () => {
  try {
    await db.connectDB();
    await seed();
  } catch (err) {
    console.error(err);
  } finally {
    await db.end();
  }
};
runSeed();
