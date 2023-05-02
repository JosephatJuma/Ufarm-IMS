const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");

const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");
const Client = require("../models/client/clientRegisterModel");
const Product = require("../models/urbanFarmer/addProductModel");

router.get("/", requireAuth, async (req, res) => {
  try {
    uf = await UrbanFarmer.find();
    fo = await Farmer1.find();
    c = await Client.find();
    p = await Product.find();
    //only users with privileges should access dashbord
    if (req.session.user.role !== "client") {
      res.render("dashboard", {
        urban_farmers: uf.length,
        farmer_ones: fo.length,
        wards: 4,
        products: p.length,
        customers: c.length,
        user_role: req.session.user.role,
      });
    } else {
      res.redirect("/products");
    }
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
