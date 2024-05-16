import mongoose, { Schema } from "mongoose";
import {
  ProductCollection,
  ProductColor,
  ProductSize,
} from "../libs/enums/product.enum";

const productSchema = new Schema(
  {
    productCollection: {
      type: String,
      enum: ProductCollection,
      // required: true,
    },
    productName: {
      type: String,
      // required: true,
    },
    productPrice: {
      type: Number,
      // required: true,
    },
    productLeftCount: {
      type: Number,
      // required: true,
    },
    productSize: {
      type: String,
      enum: ProductSize,
    },

    productColor: {
      type: String,
      enum: ProductColor,
    },
    productDesc: {
      type: String,
    },
    productImages: {
      type: [String],
      default: [],
    },
    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

productSchema.index(
  { productName: 1, productSize: 1 /*, productVolume: 1 */ },
  { unique: true }
);
export default mongoose.model("Product", productSchema);
