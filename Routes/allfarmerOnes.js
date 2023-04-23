const express = require("express");
const router = express.Router();
const Farmer1 = require("../models/agricOfficer/registerFoModel");
const UrbanFarmer = require("../models/farmerOne/registerUfModel");

router.get("/fo", async (req, res) => {
  try {
    let list = await Farmer1.find();
    console.log(list);
    res.render("farmerOnes.pug", { farmers_ones: list });
  } catch (error) {
    console.log(error);
    res.send("No Date found");
  }
});

router.get("/uf", async (req, res) => {
  try {
    const list = await UrbanFarmer.find();
    if (list.length > 0) {
      res.send({ urban_farmers: list });
    } else {
      res.send("Do Data found");
    }

    console.log(list);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
