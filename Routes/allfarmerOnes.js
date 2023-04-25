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
      res.render("allProducts.pug", {
        message: "No Products have been uploaded",
      });
    }
  } catch (error) {
    res.send({ error });
  }
});
router.get("/farmer-one/:id", requireAuth, async (req, res) => {
  const details = await Farmer1.findOne({ id: req.params.id });
  res.send({ details });
});

router.get("/delete/:id", requireAuth, async (req, res) => {
  const details = await Product.deleteOne({ id: req.params.id });
  res.render("success.pug", {
    message: "Product successfully Deleted",
    go_to_page: "list/products",
    page: "list-products",
  });
});

//edit product
router.get("/edit/:id", requireAuth, async (req, res) => {
  const details = await Product.findOne({ id: req.params.id });
  res.send({ details });
});

//approve product
router.get("/approve/:id", requireAuth, async (req, res) => {
  const filter = { id: req.params.id };
  const update = { $set: { is_approved: true } };
  await Product.updateOne(filter, update).then(() => {
    res.render("success.pug", {
      message: "Product has been successfully Approved",
      go_to_page: "list/products",
      page: "list-products",
    });
  });
});

//Dissaprove product
router.get("/disapprove/:id", requireAuth, async (req, res) => {
  const filter = { id: req.params.id };
  const update = { $set: { is_approved: false } };
  await Product.updateOne(filter, update).then(() => {
    res.render("success.pug", {
      message: "Product has been successfully Disapproved",
      go_to_page: "list/products",
      page: "list-products",
    });
  });
});

module.exports = router;
