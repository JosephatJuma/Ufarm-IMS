const express = require("express");
const router = express.Router();
const Product = require("../models/urbanFarmer/addProductModel");
router.get("/", (req, res) => {
  res.render("addProduct.pug");
});
router.post("/", (req, res) => {
  //res.send(req.body);
  try {
    const product = new Product(req.body);
    product.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
