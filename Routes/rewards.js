const { getRewardById } = require("../controllers/rewards.controllers")

const rewardRoutes = require("express").Router()

rewardRoutes.get("/:reward_id", getRewardById)
module.exports = rewardRoutes