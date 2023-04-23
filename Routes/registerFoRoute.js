const express = require("express");
const router = express.Router();
const Register = require("../models/agricOfficer/registerFoModel");
const Account = require("../models/account/accountModel");

router.get("/", (req, res) => {
  res.render("registerFo.pug");
});

router.post("/", async (req, res) => {
  try {
    //register farmer one
    const register = new Register(req.body);
    await register.save().then(() => {
      //create account for farmer one
      const account = new Account({
        id: req.body.id,
        role: "farmer one",
        phone: req.body.phone,
      });
      account.save().then(() => {
        res.redirect("/admin");
        console.log("Done");
       
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).render("/register/fo");
  }
});

module.exports = router;
