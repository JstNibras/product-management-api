import prisma from "../../config/prisma.js";

interface ProductData {
  externalId: string;
  name: string;
  price: number;
}

class ProductSqlRepository {
    async findAll() {
        return prisma.product.findMany();
    }

    async findByExternalId(externalId: string) {
        return prisma.product.findUnique({
            where: { externalId },
        });
    }

    async create(data: ProductData) {
        return prisma.product.create({ data });
    }

    async update(
        externalId: string,
        data: Omit<ProductData, "externalId">
    ) {
        return prisma.product.update({
            where: { externalId },
            data,
        });
    }

    async delete(externalId: string) {
        return prisma.product.delete({
            where: { externalId },
        });
    }
}

export default ProductSqlRepository;