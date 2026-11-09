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

    const newProduct: Product = {
        id: products.length + 1,
        name,
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

export default router;