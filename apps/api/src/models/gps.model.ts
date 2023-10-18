import mongoose, { Schema } from "mongoose";
import { IGPS } from "../interface/IGPS.interface";

const gpsSchema = new mongoose.Schema<IGPS>(
  {
    device_name: {
      type: String,
    },
    device_id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    battery: {
      type: Number,
      required: true,
    },
    last_updated: {
      type: Date,
    },
    company: {
      license_type: String,
      name: String,
      id: {
        type: Schema.Types.ObjectId,
        ref: "companies",
      },
    },
  },
  {
    timestamps: true,
  }
);
const GPS = mongoose.model<IGPS>("gps", gpsSchema);

export default GPS;
