const {
  createNewKid,
  selectKidById,
  updateStarKidById,
  getKidsByParentId,
} = require("../models/kids_model");

exports.postKid = async (req, res, next) => {
  try {
    const newKid = await createNewKid(req.body);
    res.status(201).json({ newKid });
  } catch (err) {
    next(err);
  }
};
exports.getKidById = async (req, res, next) => {
  const { childId } = req.params;
  try {
    const kid = await selectKidById(childId);

    res.status(200).json({ kid });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.patchStarsKidById = async (req, res, next) => {
  const { childId } = req.params;
  const { stars } = req.body;
  try {
    const kid = await updateStarKidById(childId, stars);

    res.status(200).json({ kid });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.getKidByParentId = async (req, res, next) => {
  const { parent_id } = req.params;
  try {
    const kid = await getKidsByParentId(parent_id);

    res.status(200).json({ kid });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
