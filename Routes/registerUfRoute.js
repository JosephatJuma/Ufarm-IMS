const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Register = require("../models/farmerOne/registerUfModel");
const Account = require("../models/account/accountModel");
router.get("/", requireAuth, (req, res) => {
  res.render("registerUf.pug");
});
router.post("/", requireAuth, async (req, res) => {
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
          message: "Urban farmer successfully registered",
          go_to_page: "register/uf",
          page: "list-u",
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).render("/register/uf");
  }
});

module.exports = router;
