import prisma from "./config/prisma.js";

async function testCRUD() {
  try {
    // UPDATE
    const updatedProduct = await prisma.product.update({
      where: { id: 1 },
      data: {
        name: "Gaming Laptop",
        price: 75000,
      },
    });

    console.log("Updated product:", updatedProduct);

    // READ ONE
    const product = await prisma.product.findUnique({
      where: { id: 1 },
    });

    console.log("Found product:", product);

    // DELETE
    const deletedProduct = await prisma.product.delete({
      where: { id: 1 },
    });

    console.log("Deleted product:", deletedProduct);

    // VERIFY DELETE
    const products = await prisma.product.findMany();

    console.log("Remaining products:", products);
  } catch (error) {
    console.error("SQL CRUD failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testCRUD();