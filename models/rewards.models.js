const { Rewards } = require("../db/test_data/test.schema")

exports.selectRewardById = (id) => {
    return Rewards.findById(id).exec()
        .then(({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
            return {
                task_id: _id.toString(),
                title,
                cost,
                redeemedBy: redeemedBy.toString(),
                isRedeemed,
                createdBy: createdBy.toString()
            }
        })
}
exports.selectRewards = (queries) => {
    if (queries.redeemedBy) {
        return Rewards.find({ 'redeemedBy': `${queries.redeemedBy}` }).exec()
            .then((rewards) => {
                if (rewards.length > 0) {
                    return rewards.map(({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
                        return {
                            task_id: _id.toString(),
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
}