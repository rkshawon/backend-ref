import { model, Schema } from "mongoose";
import { IRoom } from "../interface/IRooms.interface";

const roomSchema = new Schema<IRoom>(
  {

    companies:[{
      type: Schema.Types.ObjectId,
      ref: "companies",
    }],
    users:[ {
      type: Schema.Types.ObjectId,
      ref: "users",
    }],
    topic: String,
    context: {
      type: {
        type: String,
        enum: ["product_qn", "order"],
      },
      product_id: {
        type: Schema.Types.ObjectId,
        ref: "products",
      },
      order_id: {
        type: Schema.Types.ObjectId,
        ref: "orders",
      },
    },
  },
  { timestamps: true }
);

const Room = model<IRoom>("Room", roomSchema);

export default Room;
