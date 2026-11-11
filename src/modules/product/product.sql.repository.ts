import prisma from "../../config/prisma.js";

class ProductSqlRepository {
    async findAll() {
        return prisma.product.findMany();
    }

    async findById(id: number) {
        return prisma.product.findUnique({
            where: { id },
        });
    }

    async create(data: { name: string; price: number }) {
        return prisma.product.create({
            data,
        });
    }

    async update(
        id: number,
        data: { name: string; price: number }
    ) {
        return prisma.product.update({
            where: { id },
            data,
        });
    }

    async delete(id: number) {
        return prisma.product.delete({
            where: { id },
        });
    }
}

export default ProductSqlRepository;