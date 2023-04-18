const mongoose = require("mongoose");

const addProduct = new mongoose.Schema({
  id: { type: String },
  product_name: { type: String },
  date: { type: String },
  unit_price: { type: Number },
  quantity: { type: String },
  ward: { type: String },
  location: { type: String },
  produce_type: { type: String },
  delivery_mode: { type: String },
  image: { type: String },
});
module.exports = mongoose.model("product", addProduct);
