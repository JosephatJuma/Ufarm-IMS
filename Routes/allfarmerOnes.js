const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");
const Product = require("../models/urbanFarmer/addProductModel");

router.get("/fo", requireAuth, async (req, res) => {
  try {
    let list = await Farmer1.find();
    res.render("farmerOnes.pug", { farmers_ones: list });
  } catch (error) {
    console.log(error);
    res.send("No Date found");
  }
});

//urban farmers list
router.get("/uf", requireAuth, async (req, res) => {
  try {
    const list = await UrbanFarmer.find();
    if (list.length > 0) {
      res.render("allUrbanFarmers.pug", { urban_farmers: list });
    } else {
      res.render("allUrbanFarmers.pug", {
        message: "No urban farmers registered yet",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//products list
router.get("/products", requireAuth, async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.render("allProducts.pug", { products: products });
    } else {
      res.render("allUrbanFarmers.pug", {
        message: "No Products",
      });
    }
  } catch (error) {
    res.send({ error });
  }
});
router.get("/farmer-one", requireAuth, async (req, res) => {
  const userId = req.query.id;
  const details = await Farmer1.findOne({ id: userId });
  res.send({ details });
});

module.exports = router;
