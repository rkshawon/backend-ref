import mongoose, { Schema } from "mongoose";
import { IOrder } from "../interface/order.interface";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    order_number: String,
    product_list: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "products",
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "companies",
    },
    users: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    status: {
      type: String,
      enum: [
        "pending",
        "order_received",
        "transport_organize",
        "delivery_schedule",
        "out_for_delivery",
        "delivered",
        "failed",
      ],
      default: "pending",
    },
    delivery_schedule: {
      type: Schema.Types.ObjectId,
      ref: "DeliverySchedule",
    },
    order_type: {
      type: String,
      enum: ["marketplace", "auction"],
      default: "marketplace",
    },
    timeline: [
      {
        title: String,
        postedBy: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
