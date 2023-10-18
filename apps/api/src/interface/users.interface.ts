import { Document } from "mongoose";
import IUserPermission from "./IUserPermission.interface";

interface IUsers extends Document {
  first_name: string;
  last_name: string;
  email: string;
  companies: Array<IUserPermission>;
  password: string;
  role: string;
  driver: {};
  is_deleted?: boolean;
  profile_pic: string;
  created_by?: string;
  status?: string;
  isValidPassword(password: string): boolean;
}

export default IUsers;
