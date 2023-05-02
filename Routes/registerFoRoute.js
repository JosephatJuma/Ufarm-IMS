const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Register = require("../models/agricOfficer/registerFoModel");
const Account = require("../models/account/accountModel");

router.get("/", requireAuth, (req, res) => {
  if (req.session.user.role !== "agric officer") {
    res.render("failure.pug", {
      message: "You are not alloed to register farmer one",
      user_role: req.session.user.role,
    });
  } else {
    res.render("registerFo.pug", { user_role: req.session.user.role });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const ward_already = await Register.findOne({ ward: req.body.ward });
    const nin_already = await Register.findOne({ nin: req.body.nin });
    //Check if ward is already represented
    if (ward_already) {
      res.render("registerFo.pug", {
        message: "Ward is already represented by another farmer one",
        user_role: req.session.user.role,
      });
      return;
    }
    //Check if nin is already registered
    else if (nin_already) {
      res.render("registerFo.pug", {
        message: "User with same NIN already registered",
        user_role: req.session.user.role,
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
          message: "Farmer One successfully registered",
          go_to_page: "register/fo",
          page: "list-fo",
          user_role: req.session.user.role,
        });
      });
    });
  } catch (error) {
    res
      .status(400)
      .render("/register/fo", { user_role: req.session.user.role });
  }
});

module.exports = router;
