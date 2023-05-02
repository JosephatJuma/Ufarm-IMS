const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");
const Client = require("../models/client/clientRegisterModel");
const Product = require("../models/urbanFarmer/addProductModel");

router.get("/", requireAuth, async (req, res) => {
  try {
    let uf = await UrbanFarmer.find();
    let fo = await Farmer1.find();
    let c = await Client.find();
    let p = await Product.find();
    let farmer_products = await Product.find({
      "farmer_details.id": req.session.user.id,
    });

    //only users with privileges should access dashbord
    if (req.session.user.role !== "client") {
      res.render("dashboard", {
        urban_farmers: uf.length,
        farmer_ones: fo.length,
        wards: 4,
        products: p.length,
        customers: c.length,
        user_role: req.session.user.role,
        user_id: req.session.user.id,
        farmer_products: farmer_products.length,
      });
    } else {
      res.redirect("/products");
    }
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
