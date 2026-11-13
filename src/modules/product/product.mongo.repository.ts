import ProductModel from "./product.mongo.model.js";

interface ProductData {
  externalId: string;
  name: string;
  price: number;
}

class ProductMongoRepository {
    async findAll() {
        return ProductModel.find();
    }

    async findByExternalId(externalId: string) {
        return ProductModel.findOne({ externalId });
    }

    async create(data: ProductData) {
        return ProductModel.create(data);
    }

    async update(
        externalId: string,
        data: Omit<ProductData, "externalId">
    ) {
        return ProductModel.findOneAndUpdate(
            { externalId },
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async delete(externalId: string) {
        return ProductModel.findOneAndDelete({ externalId });
    }
}

export default ProductMongoRepository;