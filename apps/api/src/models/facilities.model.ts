import { model, Schema } from "mongoose";
import IFacilities from "../interface/IFacilities.interface";
import ELicenseType from "../types/license_type.enum";

const FacilitiesSchema = new Schema(
  {
    business_name: { type: String, required: true },
    license_type: {
      type: String,
      // enum: Object.values(ELicenseType),
      required: true,
    },
    license_number: { type: String, required: true },
    country: { type: String, default: "United States" },
    county: { type: String, required: true },
    state: { type: String, default: "Oklahoma" },
    city: { type: String, required: true },
    address: { state: String, street: String, zip: String, coordinates: [] },
    dba: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    licenseExpiryDate: { type: String },
  },
  {
    timestamps: true,
  }
);
export default model<IFacilities>("facilities", FacilitiesSchema);
