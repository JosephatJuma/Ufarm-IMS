const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("registerFo.pug");
});

module.exports = router;
