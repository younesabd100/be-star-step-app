const { newParent, getParentById } = require("../models/parents.model");

const postParent = (req, res) => {
  return newParent(req.body)
    .then((result) => {
      if (!result.parentName || !result.password) {
        return res.status(400).send({ msg: "Missing parent name or password" });
      } else {
        res.status(201).send(result);
      }
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error creating parent" });
    });
};

const fetchParentById = async (req, res) => {
  const { parent_id } = req.params;
  try {
    const parent = await getParentById(parent_id);

    if (!parent) {
      res.status(404).send({ msg: "Parent not found" });
    }
    res.status(200).send(parent);
  } catch (err) {
    return res.status(400).send({ msg: "Invalid id" });
  }
};

module.exports = { postParent, fetchParentById };
