const { Rewards } = require("../db/test_data/test.schema")
const db = require("../db/connection");

exports.selectRewardById = async (id) => {
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