import mongoose, { Schema } from "mongoose";
import {
  INotification,
  NotificationType,
} from "../interface/INotification.interface";

const notificationSchema = new mongoose.Schema<INotification>(
  {
    notification_type:{
      type: String,
      enum: Object.values(NotificationType),
      default:NotificationType.individual
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    link:String,
    is_read: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const notification = mongoose.model<INotification>(
  "notification",
  notificationSchema
);

export default notification;
