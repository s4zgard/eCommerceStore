import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();
const port = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

app.get("/api/products", (req, res) => res.json(products));
app.get("/api/products/:productId", (req, res) =>
  res.json(products.find((p) => p._id === req.params.productId))
);

app.listen(port, () => console.log(`Api is running on port ${port}`));
