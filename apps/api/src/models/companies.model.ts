import { model, Schema } from "mongoose";
import ICompanies from "../interface/companies.interface";
import ELicenseType from "../types/license_type.enum";

const CompaniesSchema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    business_name: { type: String, required: true },
    contact_email: {
      type: String,
      required: true,
    },
    contact_number: { type: String, required: true },
    password: { type: String, required: true },
    license_type: {
      type: String,
      enum: Object.values(ELicenseType),
      required: true,
    },
    license_number: { type: String, required: true },
    business_logo: { type: String, default: "" },
    country: { type: String, required: true },
    county: { type: String, required: true },
    city: { type: String, required: true },
    address: { state: String, street: String, zip: String, coordinates: [] },
    dba: { type: String, required: true },
    website: { type: String },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    license_status: {
      type: String,
      enum: ["registered", "unregistered"],
      default: "unregistered",
    },
    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
    updated_by: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);
CompaniesSchema.index({
  business_name: "text",
  contact_email: "text",
  contact_number: "text",
  license_number: "text",
});

export default model<ICompanies>("companies", CompaniesSchema);
