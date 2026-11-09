import express from "express";
import productRoutes from "./modules/product/product.routes.js";

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
  });
});

export default app;