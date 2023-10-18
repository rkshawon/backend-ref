import {Document} from "mongoose"
import ICompanies from "./companies.interface";
import ICompanyPermission from "./ICompanyPermission.interface";


interface IUserPermission extends Document{
    info:ICompanies;
    access:boolean;
    permissions:ICompanyPermission
}

export default IUserPermission;