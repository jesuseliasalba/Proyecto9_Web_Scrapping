const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../api/models/products");
const { scrapper } = require("./scrapper");

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    console.log("Conectado a la base de datos");
    const allProducts = await Product.find();
    if (allProducts.length) {
      await Product.collection.drop();
      console.log("Todos los productos eliminados");
    }
  })
  .catch((err) => console.log(`Error borrando los datos: ${err}`))
  .then(async () => {
    const products = await scrapper();
    if (!products.length) {
      next(err);
    }
    await Product.insertMany(products);
    console.log("Todos los productos han sido añadidos correctamente");
  })
  .catch((err) => console.log(`Error borrando los datos: ${err}`))
  .finally(() => {
    mongoose.disconnect();
    console.log("Desconectado de la base de datos");
  });
