import AppError from "../../utils/app-error.js";
import ProductDualRepository from "./product.dual.repository.js";

class ProductService {
    constructor(
        private productRepository = new ProductDualRepository()
    ) {}

    async getAllProducts() {
        return this.productRepository.findAll();
    }

    async getProductById(externalId: string) {
        const product = await this.productRepository.findByExternalId(externalId);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return product;
    }

    async createProduct(data: { name: string; price: number }) {
        if (data.price <= 0) {
            throw new AppError("Price must be greater than zero", 400);
        }

        return this.productRepository.create(data);
    }

    async updateProduct(
        externalId: string,
        data: { name: string; price: number }
    ) {
        if (data.price <= 0) {
            throw new AppError("Price must be greater than zero", 400);
        }

        const product = await this.productRepository.update(
            externalId,
            data
        );

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return product;
    }

    async deleteProduct(externalId: string) {
        const product = await this.productRepository.delete(externalId);

        if (!product) {
            throw new AppError("Product not found", 404);
        }

        return product;
    }
}

export default ProductService;