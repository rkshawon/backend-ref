import { Document } from "mongoose";
import { Types } from "mongoose";

interface IMetrcApiKey extends Document {
  apiKey: String;
  licenseKey: String;
  user: Types.ObjectId;
  company: {
    license_type: String;
    name: String;
    id: String;
  };
}

export default IMetrcApiKey;
