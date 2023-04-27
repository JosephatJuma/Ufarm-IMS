const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");
const Product = require("../models/urbanFarmer/addProductModel");
const Account = require("../models/account/accountModel");

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

//get farmer details
router.get("/farmer-one/:id", requireAuth, async (req, res) => {
  const account = await Account.findOne({ id: req.params.id });
  const details = await Farmer1.findOne({ id: req.params.id });
  res.render("farmerDetails.pug", {
    farmer_details: details,
    farmer_account: account,
    page: "list-fo",
  });
});

//get farmer details
router.get("/urban-farmer/:id", requireAuth, async (req, res) => {
  const account = await Account.findOne({ id: req.params.id });
  const details = await UrbanFarmer.findOne({ id: req.params.id });
  res.render("farmerDetails.pug", {
    farmer_details: details,
    farmer_account: account,
    page: "list-uf",
  });
});

//assign password to farmer
router.post("/assign-password", requireAuth, async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  const filter = { id: req.body.id };
  const update = { $set: { password: hashPassword } };
  await Account.updateOne(filter, update);
  res.render("success.pug", {
    message: "Farmer passwrod has be created",
    go_to_page: "admin",
    page: "admin",
  });
});

//delete product
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
  res.render("editProduct.pug", { product_details: details });
});

//post edited product
router.post("/edit-product", requireAuth, async (req, res) => {
  // const details = await Product.findOne({ id: req.params.id });
  //res.render("editProduct.pug", { product_details: details });
  console.log(req.body);
  res.json(req.body);
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
