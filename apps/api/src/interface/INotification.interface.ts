import { Document, Types } from "mongoose";

export enum NotificationType {
  individual = "individual",
  public = "public",
}

export interface INotification extends Document {
  notification_type: NotificationType;
  notification_for: String;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
  link:String,
  is_read: boolean;
  text: string;
}