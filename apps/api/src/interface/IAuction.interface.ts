import { Document, Schema } from "mongoose";

export interface IAuction extends Document {
  product: Schema.Types.ObjectId;
  total_quantity: number;
  start_date: Date;
  duration: number;
  end_date: Date;
  reserve_price: number;
  buy_now_price: number;
  company: {};
  winner: {};
  status: string;
}
