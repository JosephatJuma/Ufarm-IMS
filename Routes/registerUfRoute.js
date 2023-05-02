const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Register = require("../models/farmerOne/registerUfModel");
const Account = require("../models/account/accountModel");
router.get("/", requireAuth, (req, res) => {
  if (req.session.user.role !== "farmer one") {
    res.render("failure.pug", {
      message: "You can not register an urban farmer",
      user_role: req.session.user.role,
      go_to_page: "admin",
    });
  } else {
    res.render("registerUf.pug", { user_role: req.session.user.role });
  }
});
router.post("/", requireAuth, async (req, res) => {
  try {
    const nin_already = await Register.findOne({ nin: req.body.nin });

    //Check if nin is already registered
    if (nin_already) {
      res.render("registerUf.pug", {
        message: "User with same NIN already registered",
        user_role: req.session.user.role,
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
          user_role: req.session.user.role,
        });
      });
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .render("/register/uf", { user_role: req.session.user.role });
  }
});

module.exports = router;
