const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");
const Product = require("../models/urbanFarmer/addProductModel");
const Account = require("../models/account/accountModel");
const fs = require("fs");
const path = require("path");

//all farmer ones list
router.get("/fo", requireAuth, async (req, res) => {
  try {
    let list = await Farmer1.find();
    if (req.session.user.role !== "agric officer") {
      res.render("failure.pug", {
        message: "You can not access the list of farmer ones",
        go_to_page: "admin",
        user_role: req.session.user.role,
      });
    } else {
      if (list.length > 0) {
        res.render("farmerOnes.pug", {
          farmers_ones: list,
          user_role: req.session.user.role,
        });
      } else {
        res.render("farmerOnes.pug", {
          message: "There are no farmer ones registered yet",
          user_role: req.session.user.role,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.send("Error occured");
  }
});

//all urban farmers list
router.get("/uf", requireAuth, async (req, res) => {
  try {
    const list = await UrbanFarmer.find();
    if (
      req.session.user.role == "agric officer" ||
      req.session.user.role == "farmer one"
    ) {
      if (list.length > 0) {
        res.render("allUrbanFarmers.pug", {
          urban_farmers: list,
          user_role: req.session.user.role,
        });
      } else {
        res.render("allUrbanFarmers.pug", {
          message: "No urban farmers registered yet",
          user_role: req.session.user.role,
        });
      }
    } else {
      res.render("failure.pug", {
        message: "You can not access urban farmers list",
        user_role: req.session.user.role,
        go_to_page: "admin",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//all products list
router.get("/products", requireAuth, async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.render("allProducts.pug", {
        products: products,
        user_role: req.session.user.role,
      });
    } else {
      res.render("allProducts.pug", {
        message: "No Products have been uploaded",
        user_role: req.session.user.role,
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
    user_role: req.session.user.role,
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
    user_role: req.session.user.role,
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
    user_role: req.session.user.role,
  });
});

//delete product
router.get("/delete/:id", requireAuth, async (req, res) => {
  const product_id = req.params.id;
  const product = await Product.findOne({ id: product_id });
  //delete the file
  fs.unlink(
    path.join(__dirname, `../public/assets/uploads/${product.image}`),
    (err) => {
      if (err) {
        res.send(err.message);
      }
      console.log("File was deleted");
    }
  );
  await Product.deleteOne({ id: product_id }).then(() => {
    res.render("success.pug", {
      message: "Product successfully Deleted",
      go_to_page: "list/products",
      page: "list-products",
      user_role: req.session.user.role,
    });
  });
});

//edit product
router.get("/edit/:id", requireAuth, async (req, res) => {
  const details = await Product.findOne({ id: req.params.id });
  res.render("editProduct.pug", {
    product_details: details,
    user_role: req.session.user.role,
  });
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
      user_role: req.session.user.role,
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
      user_role: req.session.user.role,
    });
  });
});

module.exports = router;
