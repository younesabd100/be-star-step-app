const { selectRewardById } = require("../models/rewards.models")

exports.getRewardById = (req, res) => {
    const { reward_id } = req.params
    return selectRewardById(reward_id)
        .then((reward) => {
            res.send({ reward })
        })
}