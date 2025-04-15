const { getRewardById, getRewards, postRewards, patchRewardsById, deleteRewardsById } = require("../controllers/rewards.controllers")

const rewardsRouter = require("express").Router()

rewardsRouter.get("/:reward_id", getRewardById)
rewardsRouter.get("/", getRewards)
rewardsRouter.post("/", postRewards)
rewardsRouter.patch("/:reward_id", patchRewardsById)
rewardsRouter.delete("/:reward_id", deleteRewardsById)
module.exports = rewardsRouter