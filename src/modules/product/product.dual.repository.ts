import { randomUUID } from "crypto";
import ProductSqlRepository from "./product.sql.repository.js";
import ProductMongoRepository from "./product.mongo.repository.js";

interface ProductData {
  name: string;
  price: number;
}

class ProductDualRepository {
    constructor(
        private sqlRepository = new ProductSqlRepository(),
        private mongoRepository = new ProductMongoRepository()
    ) {}

    async findAll() {
        return this.sqlRepository.findAll();
    }

    async findByExternalId(externalId: string) {
        return this.sqlRepository.findByExternalId(externalId);
    }

    async create(data: ProductData) {
        const externalId = randomUUID();

        const sqlProduct = await this.sqlRepository.create({
            externalId,
            ...data,
        });

        try {
            const mongoProduct = await this.mongoRepository.create({
                externalId,
                ...data,
            });

            return {
                externalId,
                sqlProduct,
                mongoProduct,
            };
        } catch (error) {
            try {
                await this.sqlRepository.delete(externalId);
            } catch (rollbackError) {
                console.error("SQL rollback failed:", rollbackError);
            }

            throw error;
        }
    }

    async update(externalId: string, data: ProductData) {
        const existing = await this.sqlRepository.findByExternalId(externalId);

        if (!existing) return null;

        const updatedSql = await this.sqlRepository.update(externalId, data);

        const updatedMongo = await this.mongoRepository.update(externalId, data);

        return {
            sqlProduct: updatedSql,
            mongoProduct: updatedMongo,
        };
    }

    async delete(externalId: string) {
        const existing = await this.sqlRepository.findByExternalId(externalId);

        if (!existing) return null;

        await this.mongoRepository.delete(externalId);
        await this.sqlRepository.delete(externalId);

        return existing;
    }
}

export default ProductDualRepository;