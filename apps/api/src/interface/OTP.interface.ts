import { Document } from "mongoose";

export interface IOTP extends Document {
  email: string;
  otp: number;
  expire_at: Date;
  is_verified: boolean;
}
