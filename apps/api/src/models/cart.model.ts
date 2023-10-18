import mongoose, { Schema } from "mongoose";
import { ICart } from "../interface/ICart.interface"

const cartSchema = new mongoose.Schema<ICart>(
  {
    product_list: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "products",
          required:true
        },
        quantity: {
          type:Number,
          required:true
        },
        
        unit:{
          type:String,
          enum:["lb","g"],
          required:true
        }
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required:true
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
