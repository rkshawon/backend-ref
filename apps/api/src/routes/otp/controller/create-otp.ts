import { NextFunction, Request, Response } from "express";
import OTP from "../../../models/otp";
import { generateOTP } from "./utils/generateOTP";
import sendEmail from "../../../services/mail";

const createOTP = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const otp = generateOTP();
    req.body.otp = otp;

    const now = new Date();
    const expireAt = new Date(now.getTime() + 120000);
    req.body.expire_at = expireAt;

    req.body.is_verified = false;

    const filter = { email: req.body.email };
    const update = { $set: req.body };
    const options = { upsert: true, new: true };

    const data = await OTP.findOneAndUpdate(filter, update, options);

    const emailData = {
      subject: `Your OTP for Cannabis Connecter`,
      data: {
        otp: otp,
      },
    };

    await sendEmail([req.body.email], emailData, "otp_created");

    res.send({
      status: true,
      data,
    });
  } catch (err) {
    next(err);
  }
};

export default createOTP;
