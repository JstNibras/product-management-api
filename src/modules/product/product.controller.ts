import { Request, Response, NextFunction } from "express";
import ProductService from "./product.service.js";
import ProductRepository from "./product.repository.js";

const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);

class ProductController {
    getAllProducts = (req: Request, res: Response) => {
        const products = productService.getAllProducts();

        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    };

    getProductById = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const product = productService.getProductById(id);

            res.status(200).json({
                success: true,
                message: "Product retrieved successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    createProduct = (req: Request, res: Response, next: NextFunction) => {
        try {
            const product = productService.createProduct(req.body);

            res.status(201).json({
                success: true,
                message: "Product created successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    updateProduct = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const product = productService.updateProduct(id, req.body);

            res.status(200).json({
                success: true,
                message: "Product updated successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };

    deleteProduct = (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            const product = productService.deleteProduct(id);

            res.status(200).json({
                success: true,
                message: "Product deleted successfully",
                data: product,
            });
        } catch (error) {
            next(error);
        }
    };
}

export default new ProductController();