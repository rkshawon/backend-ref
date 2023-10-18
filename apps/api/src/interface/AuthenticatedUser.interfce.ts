import { ObjectId } from "mongoose";
import ICompanies from "./companies.interface";
import ICompanyPermission from "./ICompanyPermission.interface";

interface IAuthenticatedUser {
  _id: ObjectId;
  role: string;
  user: {
    first_name: string;
    last_name: string;
    email: string;
    profile_pic: string;
  };
  company_list?: Array<any>;
  company?: ICompanies;
  permissions: ICompanyPermission;
  accessToken?: string;
}

export default IAuthenticatedUser;
