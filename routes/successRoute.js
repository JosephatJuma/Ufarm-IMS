const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("success.pug", { user_role: req.session.user.role });
});

module.exports = router;
