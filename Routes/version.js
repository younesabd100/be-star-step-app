const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send({ version: "1.0.3 - Updated on 19 April 2025" });
});

module.exports = router;
