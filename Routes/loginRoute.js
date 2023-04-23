const express = require("express");
const router = express.Router();
const Account = require("../models/account/accountModel");
const bcrypt = require("bcryptjs");
router.get("/", (req, res) => {
  res.render("login.pug");
});

router.post("/", async (req, res) => {
  //check user availability in db
  const user = await Account.findOne({ id: req.body.id });
  if (user) {
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) {
      const message = "Wrong Password!";
      res.render("login.pug", {
        message: message,
        id: req.body.id,
        password: req.body.password,
      });
    } else {
      if (user.role === "client") {
        res.redirect("/products");
      } else {
        res.redirect("/admin");
      }
    }
  } else {
    res.render("login.pug", {
      message: "No user found with the id provided!",
      id: req.body.id,
      password: req.body.password,
    });
  }
});

module.exports = router;
