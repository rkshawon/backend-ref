import { model, Schema } from "mongoose";
import { IMessage } from "../interface/IMessage";

const messageSchema = new Schema<IMessage>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    room_id:{
        type: Schema.Types.ObjectId,
        ref: "rooms",
    },
    text:String
  },
  { timestamps: true }
);

const Messages = model<IMessage>("messages", messageSchema);

export default Messages;
