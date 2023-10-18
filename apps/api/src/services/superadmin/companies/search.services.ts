import { ObjectId } from "mongoose";
import companiesModel from "../../../models/companies.model";
import ICompanies from "../../../interface/companies.interface";


const searchCompaniesService = async (
    limit: number,
    skip: number,
    searchTerm: string
  ): Promise<any> => {
    
    const totalCompanies = await companiesModel.find({
      $search: {
        index: "default",
        compound: {
          should: [
            {
              autocomplete: {
                query: `${searchTerm}`,
                path: "business_name",
              },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "contact_email" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "contact_number" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
            {
              autocomplete: { query: `${searchTerm}`, path: "license_number" },
              fuzzy: {
                maxEdits: 2,
                prefixLength: 3,
              },
            },
          ],
        },
      },
      isDeleted: false,
    }).countDocuments();

    const companies = await companiesModel.find({
      $text:{
        $search:searchTerm
      },
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    return {
      companies,
      totalCompanies,
    };
  };

export default searchCompaniesService;
