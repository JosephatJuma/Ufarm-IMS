const express = require("express");
const router = express.Router();
const Register = require("../models/client/clientRegisterModel");
const Account = require("../models/account/accountModel");

router.get("/", (req, res) => {
  res.render("register.pug");
});

router.post("/", async (req, res) => {
  try {
    //register client
    const register = new Register(req.body);
    await register.save().then(() => {
      //create account for client
      const account = new Account({
        id: req.body.id,
        role: "client",
        phone: req.body.phone,
        password: req.body.password,
      });
      account.save().then(() => {
        res.redirect("/login"); //now login
      });
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
