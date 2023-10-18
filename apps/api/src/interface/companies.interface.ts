import { Document } from "mongoose";
import ELicenseType from "../types/license_type.enum";

interface ICompanies extends Document {
  business_name: string;
  license_type: ELicenseType;
  contact_email: string;
  business_logo: string;
  contact_number: string;
  password: string;
  first_name: string;
  last_name: string;
  country: string;
  county: string;
  city: string;
  dba: string;
  license_number: string;
  address: {};
  website: string;
  isVerified?: string;
  isDeleted?: boolean;
  status?: string;
}

export default ICompanies;
