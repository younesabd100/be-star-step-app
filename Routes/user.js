const express = require("express");
const router = express.Router();
const { auth } = require("express-oauth2-jwt-bearer");
const User = require("../models/User");

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

router.get("/me", checkJwt, async (req, res, next) => {
  try {
    const auth0Id = req.auth.payload.sub;
    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = await User.create({ auth0Id });
    }

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
