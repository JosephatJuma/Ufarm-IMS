const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login.pug");
});

router.post("/", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
