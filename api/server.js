import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();
const port = process.env.PORT || 3000;

const app = express();

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Api is running on port ${port}`));
