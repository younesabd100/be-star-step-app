const { Parents } = require("../db/test_data/test.schema");

exports.newParent = async ({ parentName, auth0Id }) => {
  return await Parent.create({ parentName, auth0Id });
};

exports.getParentById = async (id) => {
  return await Parent.findById(id);
};
