const { getRewardById, getRewards } = require("../controllers/rewards.controllers")

const rewardsRouter = require("express").Router()

rewardsRouter.get("/:reward_id", getRewardById)
rewardsRouter.get("/", getRewards)
module.exports = rewardsRouter