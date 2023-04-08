const mongoose = require("mongoose");

const registerUrbanFarmer = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  ward: { type: String },
  gender: { type: String },
  dor: { type: Date },
  dob: { type: Date },
  activity: { type: String },
  nin: { type: String },
  phone: { type: String },
  email: { type: String },
});

module.exports = mongoose.model("urbanfarmer", registerUrbanFarmer);
