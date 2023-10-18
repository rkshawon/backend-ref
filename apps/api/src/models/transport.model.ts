import { model, Schema } from "mongoose";
import { ITransport } from "../interface/ITransport.interface";

const transportSchema = new Schema<ITransport>(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "orders",
      required:true
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    delivery_date:{
      type:Date,
      required:true
    },
    origin: {
      state: String,
      street: String,
      coordinates: [],

    },
    destination: {
      state: String,
      street: String,
      coordinates: [],
    },
    company:{
      type: Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    status:{
      type:"String",
      enum:["pending","out_for_delivery","delivered"],
      default:"pending"
    },
    position:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

const Transport = model<ITransport>("transport", transportSchema);

export default Transport;
