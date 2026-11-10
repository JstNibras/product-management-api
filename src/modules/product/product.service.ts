import ProductRepository from "./product.repository.js";

class ProductService {
    constructor(
        private productRepository: ProductRepository
    ) {}

    getAllProducts() {
        return this.productRepository.findAll();
    }

    getProductById(id: number) {
        const product = this.productRepository.findById(id);

        if (!product) {
        throw new Error("Product not found");
        }

        return product;
    }

    createProduct(data: { name: string; price: number }) {
        if (data.price <= 0) {
            throw new Error("Price must be greater than zero");
        }

        return this.productRepository.create(data);
    }

    updateProduct(id: number, data: { name: string; price: number }) {
        if (data.price <= 0) {
            throw new Error("Price must be greater than zero");
        }

        const product = this.productRepository.update(id, data);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    deleteProduct(id: number) {
        const product = this.productRepository.delete(id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }
}

export default ProductService;