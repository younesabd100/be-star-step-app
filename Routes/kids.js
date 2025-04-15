const {
  postKid,
  getKidById,
  patchStarsKidById,
} = require("../controllers/kids_controller");

const kidRoutes = require("express").Router();
kidRoutes.route("/").post(postKid);
kidRoutes.route("/:childId").get(getKidById).patch(patchStarsKidById);
module.exports = kidRoutes;
