const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String },
    price: { type: Number },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("products", productSchema, "products");

module.exports = Product;
