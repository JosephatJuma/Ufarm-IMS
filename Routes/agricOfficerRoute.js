const express = require("express");
const router = express.Router();
const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");
const Client = require("../models/client/clientRegisterModel");
const Product = require("../models/urbanFarmer/addProductModel");
router.get("/", async (req, res) => {
  try {
    uf = await UrbanFarmer.find();
    fo = await Farmer1.find();
    c = await Client.find();
    p = await Product.find();
  } catch (error) {}
  res.render("dashboard", {
    urban_farmers: uf.length,
    farmer_ones: fo.length,
    wards: 4,
    products: p.length,
    customers: c.length,
  });
});

module.exports = router;
