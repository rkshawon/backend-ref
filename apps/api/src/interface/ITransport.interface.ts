import { Types } from "mongoose";

export interface ITransport {
  order:Types.ObjectId;
  driver: Types.ObjectId;
  origin: Object;
  delivery_date:Date;
  destination:Object;
  company:Types.ObjectId;
  status:String,
  position:Number
}
  
