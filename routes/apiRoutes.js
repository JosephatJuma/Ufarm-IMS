const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/urbanFarmer/addProductModel");
const requireAuth = require("../middleware/auth");
const dashbardRoute = require("./dashbordRoute");

router.use("/dashboard", requireAuth, dashbardRoute);
module.exports = router;
