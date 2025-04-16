const { newParent, getParentById } = require("../models/parents.model");

const postParent = async (req, res) => {
  try {
    const createdParent = await newParent(req.body);
    res.status(201).send(createdParent);
  }
  catch (err) {
    console.warn(err);
    next(err);
  }
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
