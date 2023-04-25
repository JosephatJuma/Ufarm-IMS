const express = require("express");
const router = express.Router();
const Product = require("../models/urbanFarmer/addProductModel");
const requireAuth = require("../middleware/auth");
router.get("/", async (req, res) => {
  let products = await Product.find({ is_approved: true });
  if (products.length > 0) {
    res.render("products.pug", { products: products });
  } else {
    res.render("products.pug", { message: "There are no products cureently" });
  }
});

module.exports = router;
