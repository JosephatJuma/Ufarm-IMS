const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("register.pug");
});
router.post("/", (req, res) => {
  res.send(req.body);
});

module.exports = router;
