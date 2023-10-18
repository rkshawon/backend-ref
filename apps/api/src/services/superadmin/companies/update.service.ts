import { ObjectId } from "mongoose";
import jwt from 'jsonwebtoken'
import ICompanies from "../../../interface/companies.interface";
import companiesModel from "../../../models/companies.model";

const updateCompanyService = async (
    companyDetails: ICompanies,
    id: ObjectId
  ): Promise<ICompanies | any> => {

    const company = await companiesModel.findById(id);
    if (company) {
      const company = await companiesModel.findByIdAndUpdate(
        id,
        { ...companyDetails },
        { new: true }
      );
      return company;
    } else {
      return { status: false, message: "No records found regarding this id" };
    }
  };


export default updateCompanyService;
