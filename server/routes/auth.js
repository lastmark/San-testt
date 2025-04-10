const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user || user.password !== req.body.password) return res.status(401).send("Invalid");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.send({ token, user });
});

module.exports = router;