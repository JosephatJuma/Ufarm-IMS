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
  res.render("addProduct.pug", { user_role: req.session.user.role });
});

router.post("/", requireAuth, upload.single("image"), async (req, res) => {
  const filename = req.file.filename;
  const product_fields = req.body;
  product_fields.image = filename;
  product_fields.is_approved = false;
  product_fields.farmer_details = {
    id: req.session.user.id,
    phone: req.session.user.phone,
  };
  try {
    const product = new Product(product_fields);
    product.save();
    res.render("success.pug", {
      message: "Product successfully added",
      go_to_page: "add-product",
      page: "add-products",
      user_role: req.session.user.role,
    });
  } catch (error) {
    res.send({ error });
  }
});

module.exports = router;

// https://meet.google.com/vxr-giuo-cnf
