const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/urbanFarmer/addProductModel");

router.use(express.static(path.join(__dirname, "public")));

// Define Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/assets/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create Multer upload instance
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.render("addProduct.pug");
});

router.post("/", upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const product_fields = req.body;
  product_fields.image = filename;
  try {
    const product = new Product(product_fields);
    product.save();
    res.render("success.pug", {
      message: "Product successfully added",
      page: "add-product",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
