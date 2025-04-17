const { Parents } = require("../db/test_data/test.schema");

// exports.newParent = async ({ parentName, auth0Id }) => {
//   if (!parentName || !auth0Id) {
//     throw {
//       status: 400,
//       msg: "Missing parent name or auth0Id",
//     };
//   }

//   const parent = await Parents.create({ parentName, auth0Id });
//   return parent;
// };

exports.newParent = async ({ parentName, auth0Id }) => {
  return await Parent.create({ _id: auth0Id, parentName });
};

exports.getParentById = async (id) => {
  return await Parents.findById(id);
};
