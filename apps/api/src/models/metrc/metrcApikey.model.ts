import mongoose, { Schema } from "mongoose";
import IMetrcApiKey from "../../interface/IMetrcApiKey.interface";

const metrcApiKey = new mongoose.Schema<IMetrcApiKey>(
  {
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    licenseKey: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
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
const MetrcApiKey = mongoose.model<IMetrcApiKey>("metrcApi", metrcApiKey);

export default MetrcApiKey;
