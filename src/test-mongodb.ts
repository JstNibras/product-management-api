import "dotenv/config";
import mongoose from "mongoose";

import connectMongoDB from "./config/mongodb.js";
import ProductModel from "./modules/product/product.mongo.model.js";

async function testMongoDB() {
  try {
    await connectMongoDB();

    // UPDATE
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      "6af430cb9cefcff6fc92f575",
      {
        name: "Mechanical Gaming Mouse",
        price: 3000,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    console.log("Updated product:", updatedProduct);

    // READ ONE
    const product = await ProductModel.findById(
      "6af430cb9cefcff6fc92f575"
    );

    console.log("Found product:", product);

    // DELETE
    const deletedProduct = await ProductModel.findByIdAndDelete(
      "6af430cb9cefcff6fc92f575"
    );

    console.log("Deleted product:", deletedProduct);

    // VERIFY DELETE
    const products = await ProductModel.find();

    console.log("Remaining products:", products);
  } catch (error) {
    console.error("MongoDB CRUD failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

testMongoDB();