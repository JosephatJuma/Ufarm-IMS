const express = require("express");
const router = express.Router();
const Product = require("../models/urbanFarmer/addProductModel");
const requireAuth = require("../middleware/auth");
router.get("/", async (req, res) => {
  let products = await Product.find({ is_approved: true });
  if (products.length > 0) {
    res.render("products.pug", {
      products: products,
      user: req.session.user,
    });
  } else {
    res.render("products.pug", {
      message: "There are no products cureently",
      user: req.session.user,
    });
  }
});
router.get("/cart/", (req, res) => {
  res.render("cart.pug", { user: req.session.user });
});

module.exports = router;
