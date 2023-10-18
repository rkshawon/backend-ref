import mongoose from "mongoose";
import { IOTP } from "../interface/OTP.interface";

const otpSchema = new mongoose.Schema<IOTP>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expire_at: {
      type: Date,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const OTP = mongoose.model<IOTP>("otp", otpSchema);

export default OTP;
