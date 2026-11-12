import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
}

const productSchema = new Schema<IProduct>(
  {
    externalId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<IProduct>(
  "Product",
  productSchema
);

export default ProductModel;