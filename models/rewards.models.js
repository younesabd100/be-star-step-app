const { Rewards } = require("../db/test_data/test.schema");

exports.selectRewardById = (id) => {
  return Rewards.findById(id).then(
    ({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
      return {
        reward_id: _id,
        title,
        cost,
        redeemedBy,
        isRedeemed,
        createdBy,
      };
    }
  );
};
exports.selectRewards = (queries) => {
  if (queries.createdBy) {
    return Rewards.find({ createdBy: `${queries.createdBy}` }).then(
      (rewards) => {
        if (rewards.length > 0) {
          return rewards.map(
            ({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
              return {
                reward_id: _id,
                title,
                cost,
                redeemedBy,
                isRedeemed,
                createdBy,
              };
            }
          );
        }
      }
    );
  } else {
    return Promise.reject({
      status: 400,
      msg: "Bad Request - use createdBy query",
    });
  }
};
exports.createRewards = (body) => {
  body.isRedeemed = false;

  return Rewards.create(body).then(
    ({ _id, title, cost, isRedeemed, createdBy }) => {
      return {
        reward_id: _id,
        title,
        cost,
        isRedeemed,
        createdBy,
      };
    }
  );
};
exports.updateRewardsById = (reward_id, body) => {
  return Rewards.findByIdAndUpdate(reward_id, body, { new: true }).then(
    ({ _id, title, cost, redeemedBy, isRedeemed, createdBy }) => {
      return {
        reward_id: _id,
        title,
        cost,
        redeemedBy,
        isRedeemed,
        createdBy,
      };
    }
  );
};
exports.removeRewardsById = (reward_id) => {
  return Rewards.findByIdAndDelete(reward_id);
};
