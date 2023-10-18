import { Schema, model } from "mongoose";
import { IAuction } from "../interface/IAuction.interface";

const AuctionSchema = new Schema<IAuction>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
    total_quantity: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    reserve_price: {
      type: Number,
      required: true,
    },
    buy_now_price: {
      type: Number,
    },
    company: {},
    winner: {},
    status: {
      type: String,
      enum: ["pending", "awarded", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Auction = model<IAuction>("auction", AuctionSchema);

export default Auction;
