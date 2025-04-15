const endpoints = require("../endpoint.json");

exports.getApi = (req, res) => {
  res.status(200).send({ endpoints });
};
