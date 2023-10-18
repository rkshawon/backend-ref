import { Types } from "mongoose";

export interface IMessage {
  room_id: Types.ObjectId;
  user_id: Types.ObjectId;
  text: String;
}
