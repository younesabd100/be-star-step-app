const { Parents } = require("../db/test_data/test.schema");
exports.newParent = async (parentData) => {
  
  if (!result.parentName || !result.password) {
    throw {
      status: 400,
      msg: "Missing parent name or password",
    };
  }

  const parent = await Parents.create(parentData);
  return parent;
};

exports.getParentById = async (parentId) => {
  const parent = await Parents.findById(parentId);
  return parent;
};
