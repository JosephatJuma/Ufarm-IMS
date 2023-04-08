const express = require("express");
const router = express.Router();
const Register = require("../models/farmerOne/registerUfModel");
router.get("/", (req, res) => {
  res.render("registerUf.pug");
});
router.post("/", async (req, res) => {
  try {
    const register = new Register(req.body);
    await register.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(400).render("//register/uf");
  }
});

module.exports = router;
