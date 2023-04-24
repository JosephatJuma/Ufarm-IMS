const express = require("express");
//const session=require("express-session")
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
      if (user.role === "agric officer") {
        req.session.user = user;
        res.redirect("/admin");
      } else if (user.role === "farmer one") {
        req.session.user = user;
        res.redirect("/admin");
      } else {
        req.session.user = user;
        //req.session.authenticated = true;
        res.redirect("/products");
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
