import { Document, Types } from "mongoose";

export interface ICart extends Document {
  product_list: Array<{
    product: Types.ObjectId;
    quantity: Number;
    unit: String;
  }>;
  user?: Types.ObjectId;
  company?: Types.ObjectId;
}
