import { Types } from "mongoose";

export interface IRoom {
  sender:Types.ObjectId,
  companies:[Types.ObjectId];
  users:[Types.ObjectId];
  topic: String;
  messages?:Array<Object>,
  receiver_company?:Types.ObjectId;
  context: {
    type: String;
    product_id: Types.ObjectId;
    order_id: Types.ObjectId;
  };
}
