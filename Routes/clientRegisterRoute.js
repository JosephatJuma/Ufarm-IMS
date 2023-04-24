const express = require("express");
const router = express.Router();
const Register = require("../models/client/clientRegisterModel");
const Account = require("../models/account/accountModel");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("register.pug");
});

router.post("/", async (req, res) => {
  const salt = await bcrypt.genSalt(10); //encrypt password
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  try {
    //register client
    const register = new Register(req.body);
    await register.save().then(() => {
      //create account for client
      const account = new Account({
        id: req.body.id,
        role: "client",
        phone: req.body.phone,
        password: hashPassword,
      });
      account.save().then(() => {
        res.redirect("/login"); //now login
      });
    });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
