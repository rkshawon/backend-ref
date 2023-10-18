import { Document } from "mongoose";

export interface IGPS extends Document {
  device_name: string;
  device_id: string;
  status: string;
  images: [string];
  battery: number;
  last_updated: Date;
  company: {
    license_type: String;
    name: String;
    id: String;
  };
}
