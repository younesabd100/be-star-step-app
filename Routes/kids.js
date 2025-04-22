const {
  postKid,
  getKidById,
  patchStarsKidById,
  getKidByParentId,
} = require("../controllers/kids_controller");

const kidRoutes = require("express").Router();
kidRoutes.route("/").post(postKid);
kidRoutes.route("/:parentID").get(getKidByParentId);
kidRoutes.route("/:childId").get(getKidById).patch(patchStarsKidById);
module.exports = kidRoutes;
