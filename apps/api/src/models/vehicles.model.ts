import mongoose, { Schema } from "mongoose";
import { IVehicle } from "../interface/IVehicle.interface";

const vehiclesSchema = new mongoose.Schema<IVehicle>(
  {
    manufacture_year: {
      type: Number,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    license_number: {
      type: String,
      required: true,
      unique: true,
    },
    images: [String],
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
const Vehicle = mongoose.model<IVehicle>("vehicles", vehiclesSchema);

export default Vehicle;
