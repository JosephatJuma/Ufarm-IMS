const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login.pug");
});

router.post("/", (req, res) => {
  if (req.body.id != "UF-111664") {
    const message = "Wrong ID";
    res.render("login.pug", {
      message: message,
      id: req.body.id,
      password: req.body.password,
    });
  } else if (req.body.password != "12345678") {
    const message = "Wrong Password";
    res.render("login.pug", {
      message: message,
      id: req.body.id,
      password: req.body.password,
    });
  } else {
    res.redirect("/admin");
  }
});

module.exports = router;
