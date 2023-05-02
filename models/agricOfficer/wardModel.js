const mongoose = require("mongoose");

const Ward = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  farmerone_details: { type: Object },
});

module.exports = mongoose.model("ward", Ward);
