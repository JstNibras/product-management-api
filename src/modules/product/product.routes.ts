import { Router } from "express";

import { validateProduct } from "./product.validation";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
    })
})

router.post("/", (req, res) => {
    if (!validateProduct(req.body)) {
        res.status(400).json({
        success: false,
        message: "Invalid product data",
        });
        return;
    }

    const { name, price } = req.body;

    const newProduct: Product = {
        id: products.length + 1,
        name: name.trim(),
        price,
    }

    products.push(newProduct)

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct,
    })
})

router.get("/:id", (req, res) => {
    const id = Number(req.params.id)

    const product = products.find((product) => product.id === id)

    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
        return;
    }

    res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: product,
    })
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        (product) => product.id === id
    )

    if (productIndex === -1) {
        res.status(404).json({
            success: false,
            messsage: "Product not found",
        })
        return;
    }

    const { name, price } = req.body;

    const updatedProduct: Product = {
        id,
        name,
        price,
    }

    products[productIndex] = updatedProduct;

    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        daata: updatedProduct,
    })
})

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        (product) => product.id === id
    )

    if (productIndex === -1) {
        res.status(404).json({
            success: false,
            message: "Product not found",
        })
        return;
    }

    const deletedProduct = products.splice(productIndex, 1)[0]

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct,
    });
})

export default router;