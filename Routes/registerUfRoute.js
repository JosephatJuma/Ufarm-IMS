const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("registerUf.pug");
});

module.exports = router;
