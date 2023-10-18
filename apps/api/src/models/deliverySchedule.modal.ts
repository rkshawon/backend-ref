import mongoose, { Schema } from "mongoose";
import { IDeliverySchedule } from "../interface/deliverySchedule";

const deliveryScheduleSchema = new Schema<IDeliverySchedule>({
  date: {
    type: Date,
    required: true,
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "vehicles",
  },
  gps: {
    type: Schema.Types.ObjectId,
    ref: "gps",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "companies",
    required: true,
  },
  metrc_status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
  },
  isTripStarted: {
    type: Boolean,
    default: false,
  },
  isScheduled: {
    type: Boolean,
    default: false,
  },
  orders: [
    {
      order_id: {
        type: Schema.Types.ObjectId,
        ref: "Order",
        require: true,
      },
      order_number: {
        type: String,
        required: true,
      },
      arrival_time: {
        type: String,
      },
      departure_time: {
        type: String,
      },
      planned_routes: {
        type: Object,
      },
      delivery_status: {
        type: String,
        enum: ["pending", "marked_as_delivered", "delivered"],
        default: "pending",
      },
    },
  ],
});

const DeliverySchedule = mongoose.model<IDeliverySchedule>(
  "DeliverySchedule",
  deliveryScheduleSchema
);

export default DeliverySchedule;
