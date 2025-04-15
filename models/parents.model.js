
const { Parents } = require("../db/test_data/test.schema");
exports.newParent = async (parentData) => {
  console.log(parentData)
  const parent = await Parents.create(parentData);;
  return parent;
};



exports.getParentById = async (parentId) => {
  
    const parent = await Parents.findById(parentId);
    return parent;
  } 
  
  