const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/urbanFarmer/addProductModel");
const requireAuth = require("../middleware/auth");
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

router.get("/", requireAuth, (req, res) => {
  res.render("addProduct.pug");
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const product_fields = req.body;
  product_fields.image = filename;
  product_fields.is_approved = false;
  product_fields.farmer_details = req.session.user;
  try {
    const product = new Product(product_fields);
    product.save();
    res.render("success.pug", {
      message: "Product successfully added",
      page: "add-product",
    });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;
