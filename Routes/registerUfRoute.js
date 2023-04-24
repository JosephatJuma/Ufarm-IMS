const express = require("express");
const router = express.Router();
const Register = require("../models/farmerOne/registerUfModel");
const Account = require("../models/account/accountModel");
router.get("/", (req, res) => {
  res.render("registerUf.pug");
});
router.post("/", async (req, res) => {
  try {
    const nin_already = await Register.findOne({ nin: req.body.nin });

    //Check if nin is already registered
    if (nin_already) {
      res.render("registerUf.pug", {
        message: "User with same NIN already registered",
      });
      return;
    }
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
        res.render("success.pug", {
          message: "Product successfully added",
          page: "register/uf",
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).render("/register/uf");
  }
});

module.exports = router;
