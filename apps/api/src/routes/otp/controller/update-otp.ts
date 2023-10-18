import { NextFunction, Request, Response } from "express";
import OTP from "../../../models/otp";

const updateOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, otp } = req.body;

    const otpData = await OTP.findOne({ email });

    if (!otpData) {
      return res.status(404).json({
        status: false,
        message: "OTP not found",
      });
    }
    console.log(otpData.otp, otp);

    if (otpData.otp !== otp) {
      return res.status(400).json({
        status: false,
        message: "Invalid OTP",
      });
    }

    const currentTimestamp = Date.now();
    if (otpData.expire_at.getTime() < currentTimestamp) {
      return res.status(404).json({
        status: false,
        message: "OTP has expired",
      });
    }

    otpData.is_verified = true;
    await otpData.save();

    res.status(200).json({
      status: true,
      message: "OTP is updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default updateOTP;
