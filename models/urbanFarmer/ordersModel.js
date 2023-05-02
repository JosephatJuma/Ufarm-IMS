const mongoose = require("mongoose");

const Order = new mongoose.Schema({
  id: { type: String },
  product: { type: Object },
  farmer: { type: Object },
  client: { type: Object },
  date: { type: Date },
});

module.exports = mongoose.model("order", Order);
