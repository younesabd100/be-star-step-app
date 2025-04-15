const { selectRewardById, selectRewards, createRewards } = require("../models/rewards.models")

exports.getRewardById = (req, res) => {
    const { reward_id } = req.params
    return selectRewardById(reward_id)
        .then((reward) => {
            res.send({ reward })
        })
}

exports.getRewards = (req, res) => {
    const queries = req.query
    selectRewards(queries)
        .then((rewards) => {
            res.send({ rewards })
        })
}