const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Register = require("../models/agricOfficer/registerFoModel");
const Account = require("../models/account/accountModel");

router.get("/", requireAuth, (req, res) => {
  res.render("registerFo.pug");
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const ward_already = await Register.findOne({ ward: req.body.ward });
    const nin_already = await Register.findOne({ nin: req.body.nin });
    //Check if ward is already represented
    if (ward_already) {
      res.render("registerFo.pug", {
        message: "Ward is already represented by another farmer one",
      });
      return;
    }
    //Check if nin is already registered
    else if (nin_already) {
      res.render("registerFo.pug", {
        message: "User with same NIN already registered",
      });
      return;
    }
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
        res.render("success.pug", {
          message: "Product successfully added",
          page: "register/fo",
        });
      });
    });
  } catch (error) {
    res.status(400).render("/register/fo");
  }
});

module.exports = router;
