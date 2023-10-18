
import companiesModel from "../../../models/companies.model";
import ICompanies from "../../../interface/companies.interface";


const findAllCompaniesService =async (limit: number, skip: number): Promise<any> => {
    const totalCompanies = await companiesModel.find({
      isDeleted: false,
    }).countDocuments();

    const companies = await companiesModel.find({ isDeleted: false })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return {
      companies,
      totalCompanies,
    };
  };

export default findAllCompaniesService;
