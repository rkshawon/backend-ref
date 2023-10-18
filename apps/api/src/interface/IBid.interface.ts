import { Document, Types } from "mongoose";

export interface IBid extends Document {
  auction: Types.ObjectId;
  company: Types.ObjectId;
  bid_amount: number;
  updatedAt: Date;
}
