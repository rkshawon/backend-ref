import mongoose, { Schema } from "mongoose";
import { IBid } from "../interface/IBid.interface";

const bidSchema = new mongoose.Schema<IBid>(
  {
    auction: {
      type: Schema.Types.ObjectId,
      ref: "auction",
      required: true,
    },
    bid_amount: {
      type: Number,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Bid = mongoose.model<IBid>("bid", bidSchema);

export default Bid;
