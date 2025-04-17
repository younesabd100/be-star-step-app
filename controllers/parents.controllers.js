const { newParent, getParentById } = require("../models/parents.model");

const postParent = async (req, res) => {
  try {
    const { parentName, auth0Id } = req.body;

    if (!parentName || !auth0Id) {
      return res.status(400).send({ msg: "Missing parent name or auth0Id" });
    }

    const createdParent = await newParent({ parentName, auth0Id });
    res.status(201).send(createdParent);
  } catch (err) {
    console.error("Error creating parent:", err);
    res.status(500).send({ msg: "Error creating parent" });
  }
};

const fetchParentById = async (req, res) => {
  const { parent_id } = req.params;
  try {
    const parent = await getParentById(parent_id);

    if (!parent) {
      return res.status(404).send({ msg: "Parent not found" });
    }

    res.status(200).send(parent);
  } catch (err) {
    res.status(400).send({ msg: "Invalid id" });
  }
};

module.exports = { postParent, fetchParentById };
