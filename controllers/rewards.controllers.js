const { selectRewardById, selectRewards, createRewards, updateRewardsById, removeRewardsById } = require("../models/rewards.models")

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

exports.postRewards = (req, res) => {
    const body = req.body
    return createRewards(body)
        .then((reward) => {
            res.status(201).send({ reward })
        })
}

exports.patchRewardsById = (req, res) => {
    const { reward_id } = req.params
    const body = req.body
    return updateRewardsById(reward_id, body)
        .then((reward) => {
            res.status(200).send({ reward })
        })
}

exports.deleteRewardsById = (req, res) => {
    const { reward_id } = req.params
    return removeRewardsById(reward_id)
        .then(() => {
            res.status(204).send()
        })
}