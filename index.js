require("dotenv").config();
const express = require("express");

const { ConnectDB } = require("./src/config/db");
const productsRoutes = require("./src/api/routes/products");

ConnectDB();

const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/product", productsRoutes);

app.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || "Unexpected error");
});

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
