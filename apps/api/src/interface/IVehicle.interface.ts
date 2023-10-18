import { Document } from "mongoose";

export interface IVehicle extends Document {
  manufacture_year: number;
  make: string;
  model: string;
  license_number: string;
  images: string[];
  company: {
    license_type: String;
    name: String;
    id: String;
  };
}
