const express = require("express");
const router = express.Router();
const Register = require("../models/farmerOne/registerUfModel");
const Account = require("../models/account/accountModel");
router.get("/", (req, res) => {
  res.render("registerUf.pug");
});
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    //register urban farmer
    const register = new Register(req.body);
    await register.save().then(() => {
      //create account for urban farmer
      const account = new Account({
        id: req.body.id,
        role: "urban farmer",
        phone: req.body.phone,
      });
      account.save().then(() => {
        res.redirect("/admin"); //redirection page to be created
        console.log(account);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).render("/register/uf");
  }
});

module.exports = router;
