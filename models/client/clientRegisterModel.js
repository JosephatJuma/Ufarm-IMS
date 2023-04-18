const mongoose = require("mongoose");
const Register = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  dob: { type: String },
  phone: { type: String },
  gender: { type: String },
});

module.exports = mongoose.model("clients", Register);
