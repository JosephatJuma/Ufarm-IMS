const express = require("express");
const router = express.Router();
const Ward = require("../models/agricOfficer/wardModel");
const requireAuth = require("../middleware/auth");
router.get("/", requireAuth, async (req, res) => {
  const availbale_wards = await Ward.find();
  if (req.session.user.role !== "agric officer") {
    res.render("failure.pug", {
      message: "Only agricultural officer can access ward details",
      go_to_page: "admin",
      user_role: req.session.user.role,
    });
  } else {
    if (availbale_wards.length > 0) {
      res.render("wards.pug", {
        wards: availbale_wards,
        user_role: req.session.user.role,
      });
    } else {
      res.render("wards.pug", {
        message: "There are no wards available",
        user_role: req.session.user.role,
      });
    }
  }
});
router.post("/", requireAuth, async (req, res) => {
  const availbale_wards = await Ward.find();
  let id = availbale_wards.length + 1;
  const new_ward = { id: id, name: req.body.name };
  let ward = await new Ward(new_ward);
  ward.save().then(() => {
    res.render("success.pug", {
      message: "Successfully added a new ward",
      user_role: req.session.user.role,
      go_to_page: "wards",
      page: "wards",
    });
  });
});

module.exports = router;
