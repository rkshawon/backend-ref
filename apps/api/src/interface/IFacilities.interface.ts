import { Document } from "mongoose";

export default interface IFacilities extends Document {
  license_number: string;
  business_name: string;
  license_type: string;
  dba: string;
  expiration: Date;
  country: string;
  county: string;
  state: string;
  city: string;
  email: string;
  phone: string;
  licenseExpiryDate: string;
  address: { state: string; street: string; zip: string; coordinates: [] };
}
