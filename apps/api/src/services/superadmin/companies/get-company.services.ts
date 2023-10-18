import { ObjectId } from "mongoose";
import companiesModel from "../../../models/companies.model";
import ICompanies from "../../../interface/companies.interface";


const getCompanyService = async (id: ObjectId): Promise<ICompanies | any> => {
    const company = await companiesModel.findOne({ _id: id });
    if (company) {
      return company;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };
export default getCompanyService;
