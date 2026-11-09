import { Router } from "express";

const router = Router();

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 25000 },
];

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products,
    })
})

router.post("/", (req, res) => {
    const { name, price } = req.body;

    if (
        typeof name !== "string" ||
        name.trim() === "" ||
        typeof price !== "number" ||
        !Number.isFinite(price) ||
        price <= 0
    ) {
        res.status(400).json({
        success: false,
        message: "Name must be a non-empty string and price must be a positive number",
        });
        return;
    }

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