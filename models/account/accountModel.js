const mongoose = require("mongoose");
const Account = new mongoose.Schema({
  id: { type: String },
  phone: { type: String },
  password: { type: String },
  role: { type: String },
});
module.exports = mongoose.model("account", Account);
