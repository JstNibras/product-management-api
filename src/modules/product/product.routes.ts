import { Router } from "express";
import productController from "./product.controller.js";
import { validateProduct } from "./product.validation";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);

router.post("/", (req, res, next) => {
  if (!validateProduct(req.body)) {
    res.status(400).json({
      success: false,
      message: "Invalid product data",
    });
    return;
  }

  next();
}, productController.createProduct);

router.put("/:id", (req, res, next) => {
  if (!validateProduct(req.body)) {
    res.status(400).json({
      success: false,
      message: "Invalid product data",
    });
    return;
  }

  next();
}, productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

export default router;