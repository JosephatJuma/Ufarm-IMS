const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  ward: { type: String },
  id: { type: String },
  gender: { type: String },
  dor: { type: String },
  dob: { type: String },
  activity: { type: String },
  nin: { type: String },
  phone: { type: String, trim: true },
  address: { type: String },
  residence: { type: String },
  period: { type: Number },
});

module.exports = mongoose.model("farmerone", registerSchema);
