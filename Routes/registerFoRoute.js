const express = require("express");
const router = express.Router();
const Register = require("../models/agricOfficer/registerFoModel");

router.get("/", (req, res) => {
  res.render("registerFo.pug");
});

router.post("/", async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.save();
    res.redirect("/");
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(400).render("/register/fo");
  }
});

module.exports = router;
