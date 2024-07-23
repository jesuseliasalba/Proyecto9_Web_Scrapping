const {
  createProduct,
  listProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");

const productsRoutes = require("express").Router();

productsRoutes.post("/create", createProduct);
productsRoutes.get("/", listProducts);
productsRoutes.put("/:id", updateProduct);
productsRoutes.delete("/:id", deleteProduct);

module.exports = productsRoutes;
