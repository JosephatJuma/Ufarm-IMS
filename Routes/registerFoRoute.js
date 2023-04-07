const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("registerFo.pug");
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const foId = req.body.id;
  const phoneNumber = req.body.phone;
  res.send(req.body);
  console.log(req.body);
});

module.exports = router;
