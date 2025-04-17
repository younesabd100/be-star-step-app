const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const User = require("../models/User");
const { auth } = require("express-oauth2-jwt-bearer");

const router = express.Router();

console.log("AUTH0_AUDIENCE:", process.env.AUTH0_AUDIENCE);
console.log("AUTH0_DOMAIN:", process.env.AUTH0_DOMAIN);

const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
});

router.get("/me", checkJwt, async (req, res, next) => {
  try {
    const auth0Id = req.auth.payload.sub;
    // Find or create user in DB
    const user = await User.findOne({ auth0Id });
    if (!user) {
      // Optionally create user
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
