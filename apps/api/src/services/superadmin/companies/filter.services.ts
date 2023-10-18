
import companiesModel from "../../../models/companies.model";
import ICompanies from "../../../interface/companies.interface";


const filterCompaniesService =async (
    limit: number,
    skip: number,
    filterTerms: any
  ): Promise<any> => {
    const totalCompanies = await companiesModel.find({
      isDeleted: false,
    }).countDocuments();

    const companies = await companiesModel.aggregate([
      {
        $search: {
          autocomplete: {
            query: `${filterTerms}`,
            path: "business_name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
    ])
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return {
      companies,
      totalCompanies,
    };
  };


export default filterCompaniesService;
