const { getRewardById, getRewards, postRewards } = require("../controllers/rewards.controllers")

const rewardsRouter = require("express").Router()

rewardsRouter.get("/:reward_id", getRewardById)
rewardsRouter.get("/", getRewards)
rewardsRouter.post("/", postRewards)
module.exports = rewardsRouter