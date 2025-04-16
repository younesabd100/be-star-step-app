const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const User = require("../models/User");

const router = express.Router();

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"],
});

router.get("/me", checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;

    let user = await User.findOne({ auth0Id });

    if (!user) {
      user = await User.create({ auth0Id });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
