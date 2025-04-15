const { Rewards } = require("../db/test_data/test.schema")

exports.selectRewardById = (id) => {
    return Rewards.findById(id).exec()
        .then(({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
            return {
                reward_id: _id.toString(),
                title,
                cost,
                redeemedBy: redeemedBy.toString(),
                isRedeemed,
                createdBy: createdBy.toString()
            }
        })
}
exports.selectRewards = (queries) => {
    if (queries.createdBy) {
        return Rewards.find({ 'createdBy': `${queries.createdBy}` }).exec()
            .then((rewards) => {
                if (rewards.length > 0) {
                    return rewards.map(({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
                        return {
                            reward_id: _id.toString(),
                            title,
                            cost,
                            redeemedBy: redeemedBy.toString(),
                            isRedeemed,
                            createdBy: createdBy.toString()
                        }
                    })
                }
            })
    }
    else {
        return Promise.reject({ status: 400, msg: "Bad Request - use createdBy query" })
    }
}
exports.createRewards = async (body) => {
    body.isRedeemed = false
    const reward = new Rewards(body)
    return reward.save()
        .then(({ _id, title, cost, isRedeemed, createdBy }) => {
            return {
                reward_id: _id.toString(),
                title,
                cost,
                isRedeemed,
                createdBy: createdBy.toString()
            }
        })
}