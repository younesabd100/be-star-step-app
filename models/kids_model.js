const { Kids, Parents } = require("../db/test_data/test.schema");

exports.createNewKid = async (kidData) => {
  const { name, age, avatar, parentID } = kidData;

  // Check required fields
  if (
    !name ||
    !age ||
    !avatar ||
    !parentID ||
    !Array.isArray(parentID) ||
    parentID.length === 0
  ) {
    throw {
      status: 400,
      msg: "Missing info",
    };
  }

  // Validate data types
  if (
    typeof name !== "string" ||
    typeof avatar !== "string" ||
    typeof age !== "number" ||
    !Number.isInteger(age) ||
    !parentID.every((id) => typeof id === "string")
  ) {
    throw { status: 400, msg: "Invalid data type entered" };
  }

  // Create and save the kid
  const kid = new Kids({ name, age, avatar, parentID });
  return await kid.save();
};

exports.selectKidById = async (childID) => {
  const kid = await Kids.findById(childID).lean();
  if (!kid) {
    throw { status: 404, msg: "Kid not found" };
  }

  return kid;
};
exports.updateStarKidById = async (childID, stars) => {
  const updtatedKid = await Kids.findByIdAndUpdate(
    childID,
    { $inc: { stars } },
    { new: true }
  ).lean();
  if (!updtatedKid) {
    throw { status: 404, msg: "Kid not found" };
  }

  return updtatedKid;
};

exports.getKidsByParentId = async (parentID) => {
  const requestToDb = {};
  requestToDb.parent_id = parentID;
  const listKid = await Kids.find(requestToDb).lean();
  return listKid;
};
