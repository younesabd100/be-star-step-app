const { getRewardById, getRewards, postRewards, patchRewardsById } = require("../controllers/rewards.controllers")

const rewardsRouter = require("express").Router()

rewardsRouter.get("/:reward_id", getRewardById)
rewardsRouter.get("/", getRewards)
rewardsRouter.post("/", postRewards)
rewardsRouter.patch("/:reward_id", patchRewardsById)
module.exports = rewardsRouter