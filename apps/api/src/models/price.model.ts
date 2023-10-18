import mongoose, { Schema } from "mongoose";
import { IPrice } from "../interface/price.interface";

const priceSchema = new mongoose.Schema<IPrice>(
  {
    product_name: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Price = mongoose.model<IPrice>("Price", priceSchema);

export default Price;
